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

        // Remove all tickets from sp-2 first
        const sprintItems = db.get('backlog-items')
            .filter(i => i.projectId === '1' && i.sprint_id === 'sp-2')
            .value();
        for (const item of sprintItems) {
            db.get('backlog-items').find({ id: item.id }).assign({ sprint_id: null }).write();
        }

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
        for (const item of sprintItems) {
            db.get('backlog-items').find({ id: item.id }).assign({ sprint_id: 'sp-2' }).write();
        }
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


// --- PUT /api/projects/:projectId/sprints/:sprintId/items ---

describe('PUT /api/projects/:projectId/sprints/:sprintId/items', () => {
    it('should assign tickets to a sprint', async () => {
        const token = await getTokenFor('superadmin');
        // Find unassigned tickets in project 1
        const backlog = db.get('backlog-items')
            .filter(i => i.projectId === '1' && !i.sprint_id && i.type !== 'EPIC')
            .value();
        const tn = backlog[0].ticket_number;

        const res = await request(app)
            .put('/api/projects/1/sprints/sp-3/items')
            .set('Authorization', `Bearer ${token}`)
            .send({ ticket_numbers: [tn] });
        expect(res.status).toBe(200);
        expect(res.body.assigned).toBe(1);

        // Verify
        const item = db.get('backlog-items')
            .find(i => i.projectId === '1' && i.ticket_number === tn)
            .value();
        expect(item.sprint_id).toBe('sp-3');

        // Cleanup
        db.get('backlog-items')
            .find(i => i.projectId === '1' && i.ticket_number === tn)
            .assign({ sprint_id: null })
            .write();
    });

    it('should reject empty ticket_numbers', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/sprints/sp-3/items')
            .set('Authorization', `Bearer ${token}`)
            .send({ ticket_numbers: [] });
        expect(res.status).toBe(400);
    });

    it('should reject ticket in another sprint', async () => {
        const token = await getTokenFor('superadmin');
        // Find a ticket already in sp-2
        const inSprint = db.get('backlog-items')
            .find(i => i.projectId === '1' && i.sprint_id === 'sp-2')
            .value();

        const res = await request(app)
            .put('/api/projects/1/sprints/sp-3/items')
            .set('Authorization', `Bearer ${token}`)
            .send({ ticket_numbers: [inSprint.ticket_number] });
        expect(res.status).toBe(400);
        expect(res.body.message).toContain('already in another sprint');
    });

    it('should reject adding to CLOSED sprint', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/sprints/sp-1/items')
            .set('Authorization', `Bearer ${token}`)
            .send({ ticket_numbers: [1] });
        expect(res.status).toBe(400);
    });
});

// --- DELETE /api/projects/:projectId/sprints/:sprintId/items/:ticketNumber ---

describe('DELETE /api/projects/:projectId/sprints/:sprintId/items/:ticketNumber', () => {
    it('should remove a ticket from a sprint', async () => {
        const token = await getTokenFor('superadmin');
        const inSprint = db.get('backlog-items')
            .find(i => i.projectId === '1' && i.sprint_id === 'sp-3')
            .value();

        const res = await request(app)
            .delete(`/api/projects/1/sprints/sp-3/items/${inSprint.ticket_number}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.removed).toBe(true);

        // Restore
        db.get('backlog-items')
            .find({ id: inSprint.id })
            .assign({ sprint_id: 'sp-3' })
            .write();
    });

    it('should reject removing ticket not in this sprint', async () => {
        const token = await getTokenFor('superadmin');
        const inOther = db.get('backlog-items')
            .find(i => i.projectId === '1' && i.sprint_id === 'sp-2')
            .value();

        const res = await request(app)
            .delete(`/api/projects/1/sprints/sp-3/items/${inOther.ticket_number}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(400);
    });
});

// --- Backlog sprint_id filter ---

describe('GET /api/projects/:projectId/backlog — sprint_id filter', () => {
    it('should filter by sprint_id', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?sprint_id=sp-2&_limit=100')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.every(i => i.sprint_id === 'sp-2')).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should filter unassigned tickets with sprint_id=null', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?sprint_id=null&_limit=100')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.every(i => !i.sprint_id)).toBe(true);
    });
});
