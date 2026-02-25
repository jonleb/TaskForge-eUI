const request = require('supertest');
const createApp = require('../../app');

let app;
let db;

beforeAll(async () => {
    const instance = createApp('mock/db/db.json');
    app = instance.app;
    db = await instance.db;
});

/**
 * Helper: logs in and returns a valid token for the given username.
 */
async function getTokenFor(username) {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ username, password: 'SecurePassword!123' });
    return res.body.accessToken;
}

// --- GET /api/projects ---

describe('GET /api/projects', () => {

    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/projects');
        expect(res.status).toBe(401);
    });

    it('should return all active projects for SUPER_ADMIN', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        // Should include active projects TF and DEMO
        const keys = res.body.map(p => p.key);
        expect(keys).toContain('TF');
        expect(keys).toContain('DEMO');
    });

    it('should not return inactive projects for SUPER_ADMIN', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects')
            .set('Authorization', `Bearer ${token}`);

        const keys = res.body.map(p => p.key);
        expect(keys).not.toContain('INFRA');
    });

    it('should return only member projects for regular user', async () => {
        // User "developer" (id 4) is member of TF and DEMO
        const token = await getTokenFor('developer');
        const res = await request(app)
            .get('/api/projects')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        const keys = res.body.map(p => p.key);
        expect(keys).toContain('TF');
        expect(keys).toContain('DEMO');
    });

    it('should not return projects the user is not a member of', async () => {
        // User "eve.jones" (id 12) is member of DEMO only
        const token = await getTokenFor('eve.jones');
        const res = await request(app)
            .get('/api/projects')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        const keys = res.body.map(p => p.key);
        expect(keys).toContain('DEMO');
        expect(keys).not.toContain('TF');
    });
});

// --- GET /api/projects/:projectId ---

describe('GET /api/projects/:projectId', () => {

    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/projects/1');
        expect(res.status).toBe(401);
    });

    it('should return project for SUPER_ADMIN', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.key).toBe('TF');
    });

    it('should return project for a member', async () => {
        const token = await getTokenFor('developer');
        const res = await request(app)
            .get('/api/projects/1')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.key).toBe('TF');
    });

    it('should return 403 for non-member', async () => {
        // User "eve.jones" (id 12) is NOT a member of project 1 (TF)
        const token = await getTokenFor('eve.jones');
        const res = await request(app)
            .get('/api/projects/1')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(403);
        expect(res.body.message).toBe('Forbidden');
    });

    it('should return 404 for non-existent project', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/999')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Project not found');
    });

    it('should allow SUPER_ADMIN to access inactive project', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/3')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.key).toBe('INFRA');
        expect(res.body.is_active).toBe(false);
    });
});

// --- GET /api/projects/:projectId/members ---

describe('GET /api/projects/:projectId/members', () => {

    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/projects/1/members');
        expect(res.status).toBe(401);
    });

    it('should return members for SUPER_ADMIN', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(5);

        // Check enriched fields
        const first = res.body[0];
        expect(first.userId).toBeDefined();
        expect(first.role).toBeDefined();
        expect(first.firstName).toBeDefined();
        expect(first.email).toBeDefined();
        expect(first.password).toBeUndefined();
    });

    it('should return members for a project member', async () => {
        // User "developer" (id 4) is a member of project 1
        const token = await getTokenFor('developer');
        const res = await request(app)
            .get('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return 403 for non-member', async () => {
        // User "eve.jones" (id 12) is NOT a member of project 1
        const token = await getTokenFor('eve.jones');
        const res = await request(app)
            .get('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(403);
        expect(res.body.message).toBe('Forbidden');
    });

    it('should not include password in member details', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`);

        res.body.forEach(member => {
            expect(member.password).toBeUndefined();
        });
    });
});

// --- Authorization middleware: requireGlobalRole ---

describe('requireGlobalRole middleware', () => {

    // We test this indirectly — no route currently uses requireGlobalRole,
    // but we can verify the middleware logic via unit-style tests.
    // For now, the project routes test SUPER_ADMIN bypass which exercises
    // the same role-checking pattern. Direct requireGlobalRole tests will
    // be added when an admin-only route is created (STORY-007).

    it('SUPER_ADMIN can access all project routes (implicit global role check)', async () => {
        const token = await getTokenFor('superadmin');

        const res1 = await request(app)
            .get('/api/projects')
            .set('Authorization', `Bearer ${token}`);
        expect(res1.status).toBe(200);

        const res2 = await request(app)
            .get('/api/projects/1')
            .set('Authorization', `Bearer ${token}`);
        expect(res2.status).toBe(200);

        const res3 = await request(app)
            .get('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`);
        expect(res3.status).toBe(200);
    });
});
