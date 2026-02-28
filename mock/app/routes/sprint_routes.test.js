const request = require('supertest');
const createApp = require('../../app');

let app;
let db;

beforeAll(async () => {
    const instance = createApp('mock/db/db.json');
    app = instance.app;
    db = await instance.db;
});

async function getTokenFor(username) {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ username, password: 'SecurePassword!123' });
    return res.body.accessToken;
}

// --- GET /api/projects/:projectId/sprints ---

describe('GET /api/projects/:projectId/sprints', () => {
    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/projects/1/sprints');
        expect(res.status).toBe(401);
    });

    it('should return sprints for project 1', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/sprints')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(3);
    });

    it('should filter by status', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/sprints?status=ACTIVE')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.every(s => s.status === 'ACTIVE')).toBe(true);
    });

    it('should return empty array for project with no sprints', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/3/sprints')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
});

// --- POST /api/projects/:projectId/sprints ---

describe('POST /api/projects/:projectId/sprints', () => {
    it('should create a sprint in PLANNED state', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/sprints')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test Sprint', goal: 'Test goal' });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Test Sprint');
        expect(res.body.goal).toBe('Test goal');
        expect(res.body.status).toBe('PLANNED');
        expect(res.body.projectId).toBe('1');
        expect(res.body.start_date).toBeNull();

        // Cleanup
        db.get('sprints').remove({ id: res.body.id }).write();
    });

    it('should reject empty name', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/sprints')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: '' });
        expect(res.status).toBe(400);
    });

    it('should reject name shorter than 2 chars', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/sprints')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'A' });
        expect(res.status).toBe(400);
    });

    it('should block VIEWER from creating sprints', async () => {
        // eve.jones (id 12) is VIEWER in project 2
        const token = await getTokenFor('eve.jones');
        const res = await request(app)
            .post('/api/projects/2/sprints')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Blocked Sprint' });
        expect(res.status).toBe(403);
    });
});

// --- PATCH /api/projects/:projectId/sprints/:sprintId ---

describe('PATCH /api/projects/:projectId/sprints/:sprintId', () => {
    it('should update a PLANNED sprint name', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/sprints/sp-3')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Sprint 3 Updated' });
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Sprint 3 Updated');

        // Restore
        db.get('sprints').find({ id: 'sp-3' }).assign({ name: 'Sprint 3' }).write();
    });

    it('should reject update on CLOSED sprint', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/sprints/sp-1')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Nope' });
        expect(res.status).toBe(400);
    });

    it('should return 404 for non-existent sprint', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/sprints/sp-999')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Nope' });
        expect(res.status).toBe(404);
    });
});

// --- PATCH /api/projects/:projectId/sprints/:sprintId/status ---

describe('PATCH /api/projects/:projectId/sprints/:sprintId/status', () => {
    it('should start a PLANNED sprint', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/sprints/sp-3/status')
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'ACTIVE' });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('ACTIVE');
        expect(res.body.start_date).toBeTruthy();

        // Restore
        db.get('sprints').find({ id: 'sp-3' }).assign({
            status: 'PLANNED', start_date: null, name: 'Sprint 3'
        }).write();
    });

    it('should reject starting an ACTIVE sprint', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/sprints/sp-2/status')
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'ACTIVE' });
        expect(res.status).toBe(400);
    });

    it('should reject closing a PLANNED sprint', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/sprints/sp-3/status')
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'CLOSED' });
        expect(res.status).toBe(400);
    });

    it('should close ACTIVE sprint with no tickets', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/sprints/sp-2/status')
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'CLOSED' });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('CLOSED');
        expect(res.body.end_date).toBeTruthy();

        // Restore
        db.get('sprints').find({ id: 'sp-2' }).assign({
            status: 'ACTIVE', end_date: null
        }).write();
    });

    it('should reject invalid status value', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/sprints/sp-2/status')
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'INVALID' });
        expect(res.status).toBe(400);
    });
});
