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

// --- GET /api/tickets ---

describe('GET /api/tickets', () => {
    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/tickets');
        expect(res.status).toBe(401);
    });

    it('SUPER_ADMIN sees tickets from all active projects', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.total).toBeGreaterThan(0);
        // Should include items from multiple projects
        const projectIds = [...new Set(res.body.data.map(i => i.projectId))];
        expect(projectIds.length).toBeGreaterThanOrEqual(1);
    });

    it('regular user sees only tickets from member projects', async () => {
        // viewer (id=6) is member of project 1 and 6 only
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .get('/api/tickets?_limit=100')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        const projectIds = [...new Set(res.body.data.map(i => i.projectId))];
        // viewer is member of project 1 and 6
        projectIds.forEach(pid => {
            expect(['1', '6']).toContain(pid);
        });
    });

    it('should filter by project_id', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets?project_id=1')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.every(i => i.projectId === '1')).toBe(true);
        expect(res.body.total).toBeGreaterThan(0);
    });

    it('should filter by assignee_id', async () => {
        const token = await getTokenFor('superadmin');
        // Find an item with an assignee to test against
        const allRes = await request(app)
            .get('/api/tickets?_limit=100')
            .set('Authorization', `Bearer ${token}`);
        const withAssignee = allRes.body.data.find(i => i.assignee_id);
        if (!withAssignee) return; // skip if no assigned items in seed data

        const res = await request(app)
            .get(`/api/tickets?assignee_id=${withAssignee.assignee_id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.every(i => i.assignee_id === withAssignee.assignee_id)).toBe(true);
    });

    it('should filter by sprint_id (specific)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets?sprint_id=sp-2')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.every(i => i.sprint_id === 'sp-2')).toBe(true);
        expect(res.body.total).toBeGreaterThan(0);
    });

    it('should filter by sprint_id=open (ACTIVE sprints)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets?sprint_id=open')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        // All returned items should have a sprint_id matching an ACTIVE sprint
        const activeSprints = db.get('sprints').filter({ status: 'ACTIVE' }).map('id').value();
        expect(res.body.data.every(i => activeSprints.includes(i.sprint_id))).toBe(true);
        expect(res.body.total).toBeGreaterThan(0);
    });

    it('should filter by text search q', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets?q=maintenance')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        res.body.data.forEach(i => {
            const match = i.title.toLowerCase().includes('maintenance') ||
                (i.description && i.description.toLowerCase().includes('maintenance'));
            expect(match).toBe(true);
        });
    });

    it('should filter by type (single)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets?type=BUG')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.every(i => i.type === 'BUG')).toBe(true);
    });

    it('should filter by type (multi)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets?type=BUG,TASK')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.every(i => ['BUG', 'TASK'].includes(i.type))).toBe(true);
    });

    it('should filter by status', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets?status=TO_DO')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.every(i => i.status === 'TO_DO')).toBe(true);
    });

    it('should filter by priority', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets?priority=HIGH')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data.every(i => i.priority === 'HIGH')).toBe(true);
    });

    it('should paginate with defaults (page 1, limit 10)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.page).toBe(1);
        expect(res.body.limit).toBe(10);
        expect(res.body.data.length).toBeLessThanOrEqual(10);
    });

    it('should paginate with custom _page and _limit', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets?_page=2&_limit=5')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.page).toBe(2);
        expect(res.body.limit).toBe(5);
        expect(res.body.data.length).toBeLessThanOrEqual(5);
    });

    it('should sort by ticket_number desc', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets?_sort=ticket_number&_order=desc&_limit=50')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        const numbers = res.body.data.map(i => i.ticket_number);
        for (let i = 1; i < numbers.length; i++) {
            expect(numbers[i]).toBeLessThanOrEqual(numbers[i - 1]);
        }
    });

    it('should combine multiple filters', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/tickets?project_id=1&type=STORY&status=TO_DO')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        res.body.data.forEach(i => {
            expect(i.projectId).toBe('1');
            expect(i.type).toBe('STORY');
            expect(i.status).toBe('TO_DO');
        });
    });
});

// --- GET /api/user/projects ---

describe('GET /api/user/projects', () => {
    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/user/projects');
        expect(res.status).toBe(401);
    });

    it('SUPER_ADMIN sees all active projects', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/user/projects')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        // Should match the count of active projects
        const activeCount = db.get('projects').filter({ is_active: true }).value().length;
        expect(res.body.length).toBe(activeCount);
        // All should be active
        expect(res.body.every(p => p.is_active === true)).toBe(true);
    });

    it('regular user sees only member projects', async () => {
        // viewer (id=6) is member of project 1 and 6
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .get('/api/user/projects')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        const ids = res.body.map(p => p.id);
        expect(ids).toContain('1');
        expect(ids).toContain('6');
        // Should not contain projects user is not a member of
        expect(ids).not.toContain('2');
    });

    it('projects are sorted by name ascending', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/user/projects')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        const names = res.body.map(p => p.name);
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sorted);
    });
});
