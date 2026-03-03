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

// --- GET /api/link-types ---

describe('GET /api/link-types', () => {

    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/link-types');
        expect(res.status).toBe(401);
    });

    it('should return all seeded link types', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/link-types')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(4);

        const names = res.body.map(t => t.name);
        expect(names).toContain('BLOCKS');
        expect(names).toContain('RELATES_TO');
        expect(names).toContain('DUPLICATES');
        expect(names).toContain('PARENT_OF');
    });

    it('should return link types for non-admin user', async () => {
        const token = await getTokenFor('developer');
        const res = await request(app)
            .get('/api/link-types')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

// --- POST /api/link-types ---

describe('POST /api/link-types', () => {

    it('should create a new link type (SUPER_ADMIN)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/link-types')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'CLONES', inward: 'is cloned by', outward: 'clones' });

        expect(res.status).toBe(201);
        expect(res.body.name).toBe('CLONES');
        expect(res.body.inward).toBe('is cloned by');
        expect(res.body.outward).toBe('clones');
        expect(res.body.scope).toBe('GLOBAL');
        expect(res.body.id).toBeDefined();
    });

    it('should reject missing name', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/link-types')
            .set('Authorization', `Bearer ${token}`)
            .send({ inward: 'x', outward: 'y' });

        expect(res.status).toBe(400);
    });

    it('should reject invalid name format', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/link-types')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'lower-case', inward: 'x', outward: 'y' });

        expect(res.status).toBe(400);
    });

    it('should reject duplicate name (409)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/link-types')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'BLOCKS', inward: 'x', outward: 'y' });

        expect(res.status).toBe(409);
    });

    it('should reject missing inward/outward', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/link-types')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'VALID_NAME' });

        expect(res.status).toBe(400);
    });

    it('should reject non-SUPER_ADMIN (403)', async () => {
        const token = await getTokenFor('developer');
        const res = await request(app)
            .post('/api/link-types')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'NOPE', inward: 'x', outward: 'y' });

        expect(res.status).toBe(403);
    });
});


// --- DELETE /api/link-types/:id ---

describe('DELETE /api/link-types/:id', () => {

    let createdId;

    beforeAll(async () => {
        // Create a disposable link type for delete tests
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/link-types')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'DELETABLE', inward: 'del inward', outward: 'del outward' });
        createdId = res.body.id;
    });

    it('should delete a link type (SUPER_ADMIN)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .delete(`/api/link-types/${createdId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(204);
    });

    it('should return 404 for unknown id', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .delete('/api/link-types/99999')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
    });

    it('should return 409 if link type is in use', async () => {
        const token = await getTokenFor('superadmin');

        // Manually insert a ticket_link referencing BLOCKS (id "1")
        db.get('ticket_links').push({
            id: 'test-in-use',
            projectId: '1',
            linkTypeId: '1',
            sourceTicketNumber: 1,
            targetTicketNumber: 2,
            targetProjectId: '1',
            created_by: '1',
            created_at: new Date().toISOString(),
        }).write();

        const res = await request(app)
            .delete('/api/link-types/1')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(409);

        // Cleanup
        db.get('ticket_links').remove({ id: 'test-in-use' }).write();
    });

    it('should reject non-SUPER_ADMIN (403)', async () => {
        const token = await getTokenFor('developer');
        const res = await request(app)
            .delete('/api/link-types/2')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(403);
    });
});
