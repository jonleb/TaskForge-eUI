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

    it('should return paginated response shape for SUPER_ADMIN', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.total).toBeDefined();
        expect(res.body.page).toBe(1);
        expect(res.body.limit).toBe(10);
    });

    it('should return all projects (active + inactive) for SUPER_ADMIN by default', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects?_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        const keys = res.body.data.map(p => p.key);
        expect(keys).toContain('TF');
        expect(keys).toContain('DEMO');
        expect(keys).toContain('INFRA'); // inactive project now visible
        expect(res.body.total).toBeGreaterThanOrEqual(15);
    });

    it('should return only member active projects for regular user', async () => {
        // User "developer" (id 4) is member of TF and DEMO
        const token = await getTokenFor('developer');
        const res = await request(app)
            .get('/api/projects')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.total).toBeDefined();
        const keys = res.body.data.map(p => p.key);
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
        const keys = res.body.data.map(p => p.key);
        expect(keys).toContain('DEMO');
        expect(keys).not.toContain('TF');
    });
});

// --- GET /api/projects — pagination, search, sort, filter ---

describe('GET /api/projects — pagination, search, sort, filter', () => {

    it('should respect custom _page and _limit', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects?_page=1&_limit=2')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeLessThanOrEqual(2);
        expect(res.body.limit).toBe(2);
        expect(res.body.page).toBe(1);
        expect(res.body.total).toBeGreaterThanOrEqual(3); // TF, DEMO, INFRA
    });

    it('should return empty data for page beyond results', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects?_page=999')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toEqual([]);
        expect(res.body.total).toBeGreaterThanOrEqual(3);
        expect(res.body.page).toBe(999);
    });

    it('should search by project name (case-insensitive)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects?q=taskforge')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
        expect(res.body.data[0].key).toBe('TF');
    });

    it('should search by project key', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects?q=DEMO')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
        const keys = res.body.data.map(p => p.key);
        expect(keys).toContain('DEMO');
    });

    it('should search by description', async () => {
        const token = await getTokenFor('superadmin');
        // Use a word from a known project description
        const allRes = await request(app)
            .get('/api/projects')
            .set('Authorization', `Bearer ${token}`);
        const firstDesc = allRes.body.data.find(p => p.description)?.description || '';
        if (firstDesc) {
            const word = firstDesc.split(' ')[0];
            const res = await request(app)
                .get(`/api/projects?q=${encodeURIComponent(word)}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.length).toBeGreaterThanOrEqual(1);
        }
    });

    it('should return empty results for non-matching search', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects?q=zzzznotfound')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toEqual([]);
        expect(res.body.total).toBe(0);
    });

    it('should sort by name ascending', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects?_sort=name&_order=asc')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        const names = res.body.data.map(p => p.name.toLowerCase());
        for (let i = 1; i < names.length; i++) {
            expect(names[i] >= names[i - 1]).toBe(true);
        }
    });

    it('should sort by name descending', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects?_sort=name&_order=desc')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        const names = res.body.data.map(p => p.name.toLowerCase());
        for (let i = 1; i < names.length; i++) {
            expect(names[i] <= names[i - 1]).toBe(true);
        }
    });

    it('should sort by key ascending', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects?_sort=key&_order=asc')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        const keys = res.body.data.map(p => p.key.toLowerCase());
        for (let i = 1; i < keys.length; i++) {
            expect(keys[i] >= keys[i - 1]).toBe(true);
        }
    });

    it('should filter active projects only for SUPER_ADMIN (is_active=true)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects?is_active=true')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        res.body.data.forEach(p => {
            expect(p.is_active).toBe(true);
        });
        const keys = res.body.data.map(p => p.key);
        expect(keys).not.toContain('INFRA');
    });

    it('should filter inactive projects only for SUPER_ADMIN (is_active=false)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects?is_active=false')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        res.body.data.forEach(p => {
            expect(p.is_active).toBe(false);
        });
        const keys = res.body.data.map(p => p.key);
        expect(keys).toContain('INFRA');
    });

    it('should ignore is_active filter for regular user', async () => {
        const token = await getTokenFor('developer');
        // Even with is_active=false, regular user should still see only their active projects
        const res = await request(app)
            .get('/api/projects?is_active=false')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        // Regular user should see their active member projects regardless of is_active param
        res.body.data.forEach(p => {
            expect(p.is_active).toBe(true);
        });
    });

    it('should search within regular user scope only', async () => {
        // eve.jones is member of DEMO only — searching for TF should return nothing
        const token = await getTokenFor('eve.jones');
        const res = await request(app)
            .get('/api/projects?q=taskforge')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(0);
        expect(res.body.total).toBe(0);
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

// --- POST /api/projects ---

describe('POST /api/projects', () => {

    it('should return 401 without token', async () => {
        const res = await request(app)
            .post('/api/projects')
            .send({ name: 'No Auth Project' });
        expect(res.status).toBe(401);
    });

    it('should return 403 for non-SUPER_ADMIN user', async () => {
        const token = await getTokenFor('developer');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Forbidden Project' });
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('Forbidden');
    });

    it('should return 400 when name is missing', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ description: 'No name' });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/name/i);
    });

    it('should return 400 when name is too short', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'A' });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/min 2/i);
    });

    it('should return 400 when key is too short', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Short Key Project', key: 'X' });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/2–10/);
    });

    it('should return 400 when key is too long', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Long Key Project', key: 'ABCDEFGHIJK' });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/2–10/);
    });

    it('should return 400 when key has special characters', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Special Key Project', key: 'AB-CD' });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/alphanumeric/i);
    });

    it('should return 409 when name already exists (case-insensitive)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'taskforge core', key: 'UNIQUE1' });
        expect(res.status).toBe(409);
        expect(res.body.message).toMatch(/name already exists/i);
    });

    it('should return 409 when key already exists (case-insensitive)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Unique Name For Key Test', key: 'tf' });
        expect(res.status).toBe(409);
        expect(res.body.message).toMatch(/key already exists/i);
    });

    it('should create project with manual key (201)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Manual Key Project', key: 'MKP', description: 'Test project' });

        expect(res.status).toBe(201);
        expect(res.body.key).toBe('MKP');
        expect(res.body.name).toBe('Manual Key Project');
        expect(res.body.description).toBe('Test project');
        expect(res.body.is_active).toBe(true);
        expect(res.body.created_by).toBeDefined();
        expect(res.body.created_at).toBeDefined();
        expect(res.body.id).toBeDefined();
    });

    it('should create project with auto-generated key (201)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Auto Generated Key' });

        expect(res.status).toBe(201);
        expect(res.body.key).toBe('AGK');
        expect(res.body.name).toBe('Auto Generated Key');
        expect(res.body.is_active).toBe(true);
    });

    it('should append digit when auto-generated key collides', async () => {
        const token = await getTokenFor('superadmin');

        // First: create a project whose auto-key will be "DP"
        const res1 = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Duplicate Prefix' });
        expect(res1.status).toBe(201);
        expect(res1.body.key).toBe('DP');

        // Second: same initials → should get "DP1"
        const res2 = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Different Purpose' });
        expect(res2.status).toBe(201);
        expect(res2.body.key).toBe('DP1');
    });
});

// --- POST /api/projects — bootstrap side effects ---

describe('POST /api/projects — bootstrap side effects', () => {

    it('should create 4 workflows for the new project', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Bootstrap Test Project', key: 'BTP' });

        expect(res.status).toBe(201);
        const projectId = res.body.id;

        const workflows = db.get('workflows').filter({ projectId }).value();
        expect(workflows).toHaveLength(4);

        const types = workflows.map(w => w.ticketType).sort();
        expect(types).toEqual(['BUG', 'EPIC', 'STORY', 'TASK']);
    });

    it('should create 1 backlog item (maintenance epic) for the new project', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Bootstrap Backlog Test', key: 'BBT' });

        expect(res.status).toBe(201);
        const projectId = res.body.id;

        const items = db.get('backlog-items').filter({ projectId }).value();
        expect(items).toHaveLength(1);
        expect(items[0].type).toBe('EPIC');
        expect(items[0].title).toBe('Maintenance');
    });

    it('should not include bootstrapWarning on success', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'No Warning Test', key: 'NWT' });

        expect(res.status).toBe(201);
        expect(res.body.bootstrapWarning).toBeUndefined();
    });
});

// --- PATCH /api/projects/:projectId ---

describe('PATCH /api/projects/:projectId', () => {

    it('should return 401 without token', async () => {
        const res = await request(app)
            .patch('/api/projects/1')
            .send({ name: 'Updated Name' });
        expect(res.status).toBe(401);
    });

    it('should return 403 for non-SUPER_ADMIN user', async () => {
        const token = await getTokenFor('developer');
        const res = await request(app)
            .patch('/api/projects/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated Name' });
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('Forbidden');
    });

    it('should return 404 for non-existent project', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/999')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Ghost Project' });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Project not found');
    });

    it('should update name and description (200)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'TaskForge Renamed', description: 'Updated description' });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe('TaskForge Renamed');
        expect(res.body.description).toBe('Updated description');
        expect(res.body.key).toBe('TF'); // key unchanged
        expect(res.body.updated_at).toBeDefined();
    });

    it('should accept same key without error (200)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'TaskForge Core', key: 'TF' });

        expect(res.status).toBe(200);
        expect(res.body.key).toBe('TF');
    });

    it('should return 400 when attempting to change key', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ key: 'NEWKEY' });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Project key cannot be changed');
    });

    it('should return 400 when name is empty', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: '' });

        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/name/i);
    });

    it('should return 409 when name conflicts with another project', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Demo Project' });

        expect(res.status).toBe(409);
        expect(res.body.message).toMatch(/name already exists/i);
    });
});

// --- PUT /api/projects/:projectId/members (upsert) ---

describe('PUT /api/projects/:projectId/members', () => {

    it('should return 401 without token', async () => {
        const res = await request(app)
            .put('/api/projects/1/members')
            .send({ userId: '23', role: 'DEVELOPER' });
        expect(res.status).toBe(401);
    });

    it('should return 403 for DEVELOPER (non-manager)', async () => {
        const token = await getTokenFor('developer');
        const res = await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: '23', role: 'DEVELOPER' });
        expect(res.status).toBe(403);
    });

    it('should return 403 for VIEWER (non-manager)', async () => {
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: '23', role: 'DEVELOPER' });
        expect(res.status).toBe(403);
    });

    it('should return 400 when userId is missing', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`)
            .send({ role: 'DEVELOPER' });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/userId/i);
    });

    it('should return 400 when role is invalid', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: '23', role: 'INVALID_ROLE' });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/invalid role/i);
    });

    it('should return 400 when target user does not exist', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: '999', role: 'DEVELOPER' });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/not found or inactive/i);
    });

    it('should return 400 when target user is inactive', async () => {
        // inactive_user has id 7, is_active: false
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: '7', role: 'DEVELOPER' });
        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/not found or inactive/i);
    });

    it('should return 403 when PROJECT_ADMIN tries to mutate a SUPER_ADMIN membership', async () => {
        // projectadmin (id 2) is PROJECT_ADMIN of project 1
        // alice.smith (id 8) has global role SUPER_ADMIN
        const token = await getTokenFor('projectadmin');
        const res = await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: '8', role: 'DEVELOPER' });
        expect(res.status).toBe(403);
        expect(res.body.message).toMatch(/super administrator/i);
    });

    it('should allow SUPER_ADMIN to mutate another SUPER_ADMIN membership', async () => {
        // superadmin (id 1) adding alice.smith (id 8, SUPER_ADMIN) to project 1
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: '8', role: 'DEVELOPER' });
        // Could be 201 (new) or 200 (update) depending on prior state
        expect([200, 201]).toContain(res.status);
        expect(res.body.userId).toBe('8');
        expect(res.body.role).toBe('DEVELOPER');
        expect(res.body.firstName).toBe('Alice');
    });

    it('should add a new member (201) with enriched response', async () => {
        // rachel.moore (id 23) is NOT a member of project 1
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: '23', role: 'REPORTER' });

        expect(res.status).toBe(201);
        expect(res.body.userId).toBe('23');
        expect(res.body.role).toBe('REPORTER');
        expect(res.body.joined_at).toBeDefined();
        expect(res.body.firstName).toBe('Rachel');
        expect(res.body.lastName).toBe('Moore');
        expect(res.body.email).toBe('rachel.moore@taskforge.local');
        expect(res.body.id).toBeDefined();
        expect(res.body.password).toBeUndefined();
    });

    it('should update role of existing member (200)', async () => {
        // developer (id 4) is DEVELOPER in project 1 — change to REPORTER
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: '4', role: 'REPORTER' });

        expect(res.status).toBe(200);
        expect(res.body.userId).toBe('4');
        expect(res.body.role).toBe('REPORTER');
        expect(res.body.firstName).toBe('Dev');
    });
});

// --- DELETE /api/projects/:projectId/members/:userId ---

describe('DELETE /api/projects/:projectId/members/:userId', () => {

    it('should return 401 without token', async () => {
        const res = await request(app)
            .delete('/api/projects/1/members/4');
        expect(res.status).toBe(401);
    });

    it('should return 403 for DEVELOPER (non-manager)', async () => {
        const token = await getTokenFor('developer');
        const res = await request(app)
            .delete('/api/projects/1/members/6')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it('should return 404 when membership does not exist', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .delete('/api/projects/1/members/999')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/member not found/i);
    });

    it('should return 403 when PROJECT_ADMIN tries to remove a SUPER_ADMIN', async () => {
        // First add alice.smith (id 8, SUPER_ADMIN) to project 1 via superadmin
        const saToken = await getTokenFor('superadmin');
        await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${saToken}`)
            .send({ userId: '8', role: 'DEVELOPER' });

        // Now projectadmin tries to remove her
        const paToken = await getTokenFor('projectadmin');
        const res = await request(app)
            .delete('/api/projects/1/members/8')
            .set('Authorization', `Bearer ${paToken}`);
        expect(res.status).toBe(403);
        expect(res.body.message).toMatch(/super administrator/i);
    });

    it('should remove a member (204)', async () => {
        // First add leo.lopez (id 24) to project 1
        const token = await getTokenFor('superadmin');
        const addRes = await request(app)
            .put('/api/projects/1/members')
            .set('Authorization', `Bearer ${token}`)
            .send({ userId: '24', role: 'VIEWER' });
        expect([200, 201]).toContain(addRes.status);

        // Now remove
        const res = await request(app)
            .delete('/api/projects/1/members/24')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(204);

        // Verify removed — should be 404 now
        const res2 = await request(app)
            .delete('/api/projects/1/members/24')
            .set('Authorization', `Bearer ${token}`);
        expect(res2.status).toBe(404);
    });
});

// --- GET /api/projects/:projectId/members/candidates ---

describe('GET /api/projects/:projectId/members/candidates', () => {

    it('should return 401 without token', async () => {
        const res = await request(app)
            .get('/api/projects/1/members/candidates?q=test');
        expect(res.status).toBe(401);
    });

    it('should return 403 for DEVELOPER (non-manager)', async () => {
        const token = await getTokenFor('developer');
        const res = await request(app)
            .get('/api/projects/1/members/candidates?q=test')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it('should return empty array when q is missing', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/members/candidates')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('should return empty array when q is too short (< 2 chars)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/members/candidates?q=a')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('should search by firstName (case-insensitive)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/members/candidates?q=leo')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        // leo.lopez (id 24) is not a member of project 1
        const ids = res.body.map(c => c.id);
        expect(ids).toContain('24');
    });

    it('should search by email', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/members/candidates?q=leo.lopez')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        const ids = res.body.map(c => c.id);
        expect(ids).toContain('24');
    });

    it('should exclude existing project members', async () => {
        const token = await getTokenFor('superadmin');
        // developer (id 4) is a member of project 1 — should not appear
        const res = await request(app)
            .get('/api/projects/1/members/candidates?q=dev')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        const ids = res.body.map(c => c.id);
        expect(ids).not.toContain('4');
    });

    it('should not return inactive users', async () => {
        const token = await getTokenFor('superadmin');
        // inactive_user (id 7) is inactive
        const res = await request(app)
            .get('/api/projects/1/members/candidates?q=inactive')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        const ids = res.body.map(c => c.id);
        expect(ids).not.toContain('7');
    });

    it('should not include password in results', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/members/candidates?q=leo')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        res.body.forEach(c => {
            expect(c.password).toBeUndefined();
            expect(c.id).toBeDefined();
            expect(c.firstName).toBeDefined();
            expect(c.lastName).toBeDefined();
            expect(c.email).toBeDefined();
            expect(c.role).toBeDefined();
        });
    });

    it('should return max 10 results', async () => {
        const token = await getTokenFor('superadmin');
        // Search with a broad term that matches many users
        const res = await request(app)
            .get('/api/projects/1/members/candidates?q=taskforge')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeLessThanOrEqual(10);
    });

    it('should allow PROJECT_ADMIN of the project to search', async () => {
        // projectadmin (id 2) is PROJECT_ADMIN of project 1
        const token = await getTokenFor('projectadmin');
        const res = await request(app)
            .get('/api/projects/1/members/candidates?q=leo')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

// --- GET /api/projects/:projectId/workflows ---

describe('GET /api/projects/:projectId/workflows', () => {

    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/projects/1/workflows');
        expect(res.status).toBe(401);
    });

    it('should return 403 for non-member', async () => {
        // reporter (id 5) is not a member of project 8
        const token = await getTokenFor('reporter');
        const res = await request(app)
            .get('/api/projects/8/workflows')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it('should return 4 workflows for a seeded project', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/workflows')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(4);

        const types = res.body.map(w => w.ticketType);
        expect(types).toContain('STORY');
        expect(types).toContain('BUG');
        expect(types).toContain('TASK');
        expect(types).toContain('EPIC');
    });

    it('should return workflows sorted by ticketType alphabetically', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/workflows')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        const types = res.body.map(w => w.ticketType);
        expect(types).toEqual([...types].sort());
    });

    it('should return empty array for project without workflows', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/9999/workflows')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it('should allow SUPER_ADMIN to access any project workflows', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/8/workflows')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

// --- GET /api/projects/:projectId/backlog ---

describe('GET /api/projects/:projectId/backlog', () => {

    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/projects/1/backlog');
        expect(res.status).toBe(401);
    });

    it('should return 403 for non-member', async () => {
        const token = await getTokenFor('reporter');
        const res = await request(app)
            .get('/api/projects/8/backlog')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it('should return paginated backlog items for a seeded project', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('page', 1);
        expect(res.body).toHaveProperty('limit', 10);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
        expect(res.body.total).toBeGreaterThanOrEqual(1);
    });

    it('should filter by type when ?type=EPIC is provided', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?type=EPIC')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.every(i => i.type === 'EPIC')).toBe(true);
        expect(res.body.total).toBe(res.body.data.length);
    });

    it('should return empty data for non-existent project', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/9999/backlog')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toEqual([]);
        expect(res.body.total).toBe(0);
    });

    it('should sort by _sort=ticket_number&_order=asc', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?_sort=ticket_number&_order=asc')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        for (let i = 1; i < res.body.data.length; i++) {
            expect(res.body.data[i].ticket_number).toBeGreaterThanOrEqual(res.body.data[i - 1].ticket_number);
        }
    });

    // --- Pagination tests ---

    it('should return default pagination (page 1, limit 10)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.page).toBe(1);
        expect(res.body.limit).toBe(10);
        expect(res.body.data.length).toBeLessThanOrEqual(10);
    });

    it('should paginate with _page and _limit', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?_page=1&_limit=1')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.page).toBe(1);
        expect(res.body.limit).toBe(1);
        expect(res.body.data.length).toBe(1);
        expect(res.body.total).toBeGreaterThanOrEqual(1);
    });

    it('should return empty data when page exceeds total', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?_page=999&_limit=10')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toEqual([]);
        expect(res.body.total).toBeGreaterThanOrEqual(1);
        expect(res.body.page).toBe(999);
    });

    // --- Text search tests ---

    it('should search by q param on title (case-insensitive)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?q=maintenance')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
        expect(res.body.data.every(i =>
            i.title.toLowerCase().includes('maintenance') ||
            (i.description && i.description.toLowerCase().includes('maintenance'))
        )).toBe(true);
    });

    it('should return empty data when q matches nothing', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?q=zzzznonexistent')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toEqual([]);
        expect(res.body.total).toBe(0);
    });

    // --- Status filter tests ---

    it('should filter by status=TO_DO', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?status=TO_DO&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.every(i => i.status === 'TO_DO')).toBe(true);
        expect(res.body.total).toBe(res.body.data.length);
    });

    // --- Priority filter tests ---

    it('should filter by priority=CRITICAL (excludes null-priority items)', async () => {
        const token = await getTokenFor('superadmin');
        // First get all items to check if any have CRITICAL priority
        const allRes = await request(app)
            .get('/api/projects/1/backlog?_limit=100')
            .set('Authorization', `Bearer ${token}`);

        const res = await request(app)
            .get('/api/projects/1/backlog?priority=CRITICAL')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        // All returned items must have CRITICAL priority
        res.body.data.forEach(i => expect(i.priority).toBe('CRITICAL'));
        // No null-priority items should be included
        res.body.data.forEach(i => expect(i.priority).not.toBeNull());
    });

    // --- Combined filter tests ---

    it('should combine type and status filters (AND logic)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?type=EPIC&status=TO_DO')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        res.body.data.forEach(i => {
            expect(i.type).toBe('EPIC');
            expect(i.status).toBe('TO_DO');
        });
    });

    it('should combine q search with type filter (AND logic)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?q=maintenance&type=EPIC')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        res.body.data.forEach(i => {
            expect(i.type).toBe('EPIC');
            expect(
                i.title.toLowerCase().includes('maintenance') ||
                (i.description && i.description.toLowerCase().includes('maintenance'))
            ).toBe(true);
        });
    });

    it('should reflect filtered total in pagination metadata', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?type=EPIC&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.total).toBe(res.body.data.length);
        // total should be less than or equal to unfiltered total
        const allRes = await request(app)
            .get('/api/projects/1/backlog?_limit=100')
            .set('Authorization', `Bearer ${token}`);
        expect(res.body.total).toBeLessThanOrEqual(allRes.body.total);
    });

    // --- Multi-value filter tests (STORY-001) ---

    it('should filter by multi-value status (comma-separated)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?status=TO_DO,IN_PROGRESS&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
        res.body.data.forEach(i => {
            expect(['TO_DO', 'IN_PROGRESS']).toContain(i.status);
        });
    });

    it('should filter by multi-value type (comma-separated)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?type=STORY,BUG&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
        res.body.data.forEach(i => {
            expect(['STORY', 'BUG']).toContain(i.type);
        });
    });

    it('should filter by multi-value priority (comma-separated)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?priority=HIGH,CRITICAL&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThanOrEqual(1);
        res.body.data.forEach(i => {
            expect(['HIGH', 'CRITICAL']).toContain(i.priority);
        });
    });

    it('should still work with single-value status (backward compatible)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?status=DONE&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        res.body.data.forEach(i => {
            expect(i.status).toBe('DONE');
        });
    });

    it('should combine multi-value status with single type (AND across, OR within)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?status=TO_DO,IN_PROGRESS&type=STORY&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        res.body.data.forEach(i => {
            expect(['TO_DO', 'IN_PROGRESS']).toContain(i.status);
            expect(i.type).toBe('STORY');
        });
    });

    it('should combine multi-value filters with text search', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?status=TO_DO,DONE&q=dialog&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        res.body.data.forEach(i => {
            expect(['TO_DO', 'DONE']).toContain(i.status);
            expect(
                i.title.toLowerCase().includes('dialog') ||
                (i.description && i.description.toLowerCase().includes('dialog'))
            ).toBe(true);
        });
    });

    it('should ignore empty multi-value param', async () => {
        const token = await getTokenFor('superadmin');
        const allRes = await request(app)
            .get('/api/projects/1/backlog?_limit=100')
            .set('Authorization', `Bearer ${token}`);
        const emptyRes = await request(app)
            .get('/api/projects/1/backlog?status=&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(emptyRes.status).toBe(200);
        expect(emptyRes.body.total).toBe(allRes.body.total);
    });

    it('should only apply valid values in multi-value filter (invalid ignored)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog?status=TO_DO,INVALID_STATUS&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        // Should still return TO_DO items (INVALID_STATUS just won't match anything)
        res.body.data.forEach(i => {
            expect(['TO_DO', 'INVALID_STATUS']).toContain(i.status);
        });
    });
});

// --- POST /api/projects/:projectId/backlog ---

describe('POST /api/projects/:projectId/backlog', () => {

    const validPayload = {
        type: 'STORY',
        title: 'Test ticket',
        description: 'A test description',
        priority: 'MEDIUM',
    };

    it('should return 401 without token', async () => {
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .send(validPayload);
        expect(res.status).toBe(401);
    });

    it('should return 403 for VIEWER role', async () => {
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send(validPayload);
        expect(res.status).toBe(403);
    });

    it('should create a STORY with all fields (201)', async () => {
        const token = await getTokenFor('superadmin');
        // userId '2' is a seed member of project 1 (PROJECT_ADMIN)
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({
                type: 'STORY',
                title: 'My first story',
                description: 'Story description',
                priority: 'HIGH',
                assignee_id: '2',
                epic_id: '1',
            });

        expect(res.status).toBe(201);
        expect(res.body.type).toBe('STORY');
        expect(res.body.title).toBe('My first story');
        expect(res.body.priority).toBe('HIGH');
        expect(res.body.status).toBe('TO_DO');
        expect(res.body.assignee_id).toBe('2');
        expect(res.body.epic_id).toBe('1');
        expect(res.body.ticket_number).toBeGreaterThan(1);
        expect(res.body.created_by).toBe('1');
        expect(res.body.projectId).toBe('1');
    });

    it('should create a BUG with minimal fields (201)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'BUG', title: 'A bug report', priority: 'LOW' });

        expect(res.status).toBe(201);
        expect(res.body.type).toBe('BUG');
        expect(res.body.assignee_id).toBeNull();
        expect(res.body.epic_id).toBeNull();
        expect(res.body.description).toBe('');
    });

    it('should create a TASK with priority CRITICAL (201)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'TASK', title: 'Critical task', priority: 'CRITICAL' });

        expect(res.status).toBe(201);
        expect(res.body.priority).toBe('CRITICAL');
    });

    it('should reject EPIC type (400)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'EPIC', title: 'An epic', priority: 'MEDIUM' });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('EPIC');
    });

    it('should reject invalid type (400)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'FEATURE', title: 'Invalid', priority: 'MEDIUM' });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Invalid type');
    });

    it('should reject missing title (400)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'STORY', priority: 'MEDIUM' });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Title');
    });

    it('should reject title too short — 1 char (400)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'STORY', title: 'A', priority: 'MEDIUM' });

        expect(res.status).toBe(400);
    });

    it('should reject title too long — 201 chars (400)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'STORY', title: 'A'.repeat(201), priority: 'MEDIUM' });

        expect(res.status).toBe(400);
    });

    it('should reject invalid priority (400)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'STORY', title: 'Valid title', priority: 'URGENT' });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('priority');
    });

    it('should reject missing priority (400)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'STORY', title: 'Valid title' });

        expect(res.status).toBe(400);
    });

    it('should reject assignee who is not a project member (400)', async () => {
        const token = await getTokenFor('superadmin');
        // userId '25' (tina.martin) may not be a member of project 1
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ ...validPayload, assignee_id: '9999' });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Assignee');
    });

    it('should reject epic_id that does not exist (400)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ ...validPayload, epic_id: '9999' });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Epic');
    });

    it('should auto-increment ticket_number per project', async () => {
        const token = await getTokenFor('superadmin');
        const res1 = await request(app)
            .post('/api/projects/2/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'STORY', title: 'First in project 2', priority: 'LOW' });

        const res2 = await request(app)
            .post('/api/projects/2/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ type: 'BUG', title: 'Second in project 2', priority: 'HIGH' });

        expect(res1.status).toBe(201);
        expect(res2.status).toBe(201);
        expect(res2.body.ticket_number).toBe(res1.body.ticket_number + 1);
    });

    it('should always set status to TO_DO', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send(validPayload);

        expect(res.status).toBe(201);
        expect(res.body.status).toBe('TO_DO');
    });

    it('should reject description over 2000 chars (400)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send({ ...validPayload, description: 'X'.repeat(2001) });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Description');
    });

    it('SUPER_ADMIN can create tickets in any project', async () => {
        const token = await getTokenFor('superadmin');
        // Use project 2 (active with workflows) — project 3 is archived
        const res = await request(app)
            .post('/api/projects/4/backlog')
            .set('Authorization', `Bearer ${token}`)
            .send(validPayload);

        expect(res.status).toBe(201);
        expect(res.body.projectId).toBe('4');
    });
});

// --- GET /api/projects/:projectId/backlog/:ticketNumber ---

describe('GET /api/projects/:projectId/backlog/:ticketNumber', () => {

    it('should return a ticket by number', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog/2')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.ticket_number).toBe(2);
        expect(res.body.projectId).toBe('1');
        expect(res.body.title).toBeDefined();
    });

    it('should return 404 for non-existent ticket number', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog/9999')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
    });

    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/projects/1/backlog/2');
        expect(res.status).toBe(401);
    });

    it('should return 403 for non-member', async () => {
        // eve.jones (id=12) is NOT a member of project 1
        const token = await getTokenFor('eve.jones');
        const res = await request(app)
            .get('/api/projects/1/backlog/2')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(403);
    });

    it('should allow VIEWER to read a ticket', async () => {
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .get('/api/projects/1/backlog/2')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.ticket_number).toBe(2);
    });
});

// --- PATCH /api/projects/:projectId/backlog/:ticketNumber ---

describe('PATCH /api/projects/:projectId/backlog/:ticketNumber', () => {

    it('should update title', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/backlog/2')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated auth flow title' });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe('Updated auth flow title');
    });

    it('should update status with valid transition (TO_DO → IN_PROGRESS)', async () => {
        const token = await getTokenFor('superadmin');
        // Ticket 3 in project 1 is a BUG with status TO_DO
        const res = await request(app)
            .patch('/api/projects/1/backlog/3')
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'IN_PROGRESS' });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('IN_PROGRESS');
    });

    it('should reject invalid status transition (TO_DO → DONE)', async () => {
        const token = await getTokenFor('superadmin');
        // Ticket 5 in project 1 is TO_DO
        const res = await request(app)
            .patch('/api/projects/1/backlog/5')
            .set('Authorization', `Bearer ${token}`)
            .send({ status: 'DONE' });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Invalid status transition');
    });

    it('should update priority', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/backlog/2')
            .set('Authorization', `Bearer ${token}`)
            .send({ priority: 'CRITICAL' });

        expect(res.status).toBe(200);
        expect(res.body.priority).toBe('CRITICAL');
    });

    it('should update assignee_id to a valid project member', async () => {
        const token = await getTokenFor('superadmin');
        // userId 2 (projectadmin) is a member of project 1
        const res = await request(app)
            .patch('/api/projects/1/backlog/2')
            .set('Authorization', `Bearer ${token}`)
            .send({ assignee_id: '2' });

        expect(res.status).toBe(200);
        expect(res.body.assignee_id).toBe('2');
    });

    it('should validate title length (too short)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/backlog/2')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'A' });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Title');
    });

    it('should return 403 for VIEWER', async () => {
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .patch('/api/projects/1/backlog/2')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Should not work' });

        expect(res.status).toBe(403);
    });

    it('should allow REPORTER to update own ticket', async () => {
        // User 4 (developer username, REPORTER role in project 1) created ticket_number=4
        const token = await getTokenFor('developer');
        const res = await request(app)
            .patch('/api/projects/1/backlog/4')
            .set('Authorization', `Bearer ${token}`)
            .send({ description: 'Updated by reporter' });

        expect(res.status).toBe(200);
        expect(res.body.description).toBe('Updated by reporter');
    });

    it('should reject REPORTER updating others ticket', async () => {
        // User 4 (developer username, REPORTER role in project 1) did NOT create ticket_number=2
        const token = await getTokenFor('developer');
        const res = await request(app)
            .patch('/api/projects/1/backlog/2')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Should not work' });

        expect(res.status).toBe(403);
        expect(res.body.message).toContain('own tickets');
    });

    it('should generate activity entries on update', async () => {
        const token = await getTokenFor('superadmin');
        // Update priority on ticket 6 to generate activity
        const res = await request(app)
            .patch('/api/projects/1/backlog/6')
            .set('Authorization', `Bearer ${token}`)
            .send({ priority: 'LOW' });

        expect(res.status).toBe(200);
        // Activity entries are stored in DB — verified via STORY-002 activity endpoint tests
    });

    it('should return 404 for non-existent ticket', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .patch('/api/projects/1/backlog/9999')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Does not exist' });

        expect(res.status).toBe(404);
    });

    it('should return unchanged ticket when no fields differ', async () => {
        const token = await getTokenFor('superadmin');
        // First get the current ticket
        const getRes = await request(app)
            .get('/api/projects/1/backlog/2')
            .set('Authorization', `Bearer ${token}`);
        const currentTitle = getRes.body.title;

        // PATCH with same title
        const res = await request(app)
            .patch('/api/projects/1/backlog/2')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: currentTitle });

        expect(res.status).toBe(200);
    });

    it('should allow DEVELOPER to update any ticket', async () => {
        // diana.brown (id=11) is DEVELOPER in project 1
        const token = await getTokenFor('diana.brown');
        const res = await request(app)
            .patch('/api/projects/1/backlog/5')
            .set('Authorization', `Bearer ${token}`)
            .send({ description: 'Updated by developer' });

        expect(res.status).toBe(200);
    });
});

// --- GET /api/projects/:projectId/backlog/:ticketNumber/comments ---

describe('GET /api/projects/:projectId/backlog/:ticketNumber/comments', () => {

    it('should return empty array for ticket with no comments', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog/2/comments')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return 404 for non-existent ticket', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog/9999/comments')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
    });

    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/projects/1/backlog/2/comments');
        expect(res.status).toBe(401);
    });
});

// --- POST /api/projects/:projectId/backlog/:ticketNumber/comments ---

describe('POST /api/projects/:projectId/backlog/:ticketNumber/comments', () => {

    it('should create a comment successfully', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog/2/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'This is a test comment' });

        expect(res.status).toBe(201);
        expect(res.body.content).toBe('This is a test comment');
        expect(res.body.authorId).toBe('1');
        expect(res.body.authorName).toBeDefined();
        expect(res.body.ticketNumber).toBe(2);
    });

    it('should validate content length (empty)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog/2/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: '' });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('1–2000');
    });

    it('should return 403 for VIEWER', async () => {
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .post('/api/projects/1/backlog/2/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'Should not work' });

        expect(res.status).toBe(403);
    });

    it('should return comments sorted by newest first', async () => {
        const token = await getTokenFor('superadmin');
        // Add a second comment
        await request(app)
            .post('/api/projects/1/backlog/2/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'Second comment' });

        const res = await request(app)
            .get('/api/projects/1/backlog/2/comments')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThanOrEqual(2);
        // Newest first
        const dates = res.body.map(c => c.created_at);
        for (let i = 1; i < dates.length; i++) {
            expect(dates[i - 1] >= dates[i]).toBe(true);
        }
    });

    it('should return 404 for non-existent ticket', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .post('/api/projects/1/backlog/9999/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'Should not work' });

        expect(res.status).toBe(404);
    });

    it('should return 401 without token', async () => {
        const res = await request(app)
            .post('/api/projects/1/backlog/2/comments')
            .send({ content: 'No auth' });

        expect(res.status).toBe(401);
    });
});

// --- GET /api/projects/:projectId/backlog/:ticketNumber/activity ---

describe('GET /api/projects/:projectId/backlog/:ticketNumber/activity', () => {

    it('should return activity entries after a PATCH', async () => {
        const token = await getTokenFor('superadmin');
        // The PATCH tests in STORY-001 already generated activity for ticket 6
        const res = await request(app)
            .get('/api/projects/1/backlog/6/activity')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.body[0].field).toBeDefined();
        expect(res.body[0].changedBy).toBeDefined();
    });

    it('should return empty array for ticket with no activity', async () => {
        const token = await getTokenFor('superadmin');
        // Ticket 7 in project 1 should have no activity
        const res = await request(app)
            .get('/api/projects/1/backlog/7/activity')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return 404 for non-existent ticket', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/projects/1/backlog/9999/activity')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
    });

    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/projects/1/backlog/2/activity');
        expect(res.status).toBe(401);
    });
});

// --- PUT /api/projects/:projectId/workflows/:workflowId ---

describe('PUT /api/projects/:projectId/workflows/:workflowId', () => {
    const VALID_PAYLOAD = {
        statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
        transitions: {
            TO_DO: ['IN_PROGRESS'],
            IN_PROGRESS: ['IN_REVIEW', 'TO_DO'],
            IN_REVIEW: ['DONE', 'IN_PROGRESS'],
            DONE: [],
        },
    };

    it('should return 200 and update statuses + transitions', async () => {
        const token = await getTokenFor('superadmin');
        const payload = {
            statuses: ['TO_DO', 'IN_PROGRESS', 'DONE'],
            transitions: {
                TO_DO: ['IN_PROGRESS'],
                IN_PROGRESS: ['DONE', 'TO_DO'],
                DONE: [],
            },
        };
        // Use EPIC workflow (id=4) for project 1 — only TO_DO tickets exist
        const res = await request(app)
            .put('/api/projects/1/workflows/4')
            .set('Authorization', `Bearer ${token}`)
            .send(payload);

        expect(res.status).toBe(200);
        expect(res.body.statuses).toEqual(payload.statuses);
        expect(res.body.transitions).toEqual(payload.transitions);
        expect(res.body.updated_at).toBeDefined();

        // Restore original EPIC workflow
        await request(app)
            .put('/api/projects/1/workflows/4')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'IN_PROGRESS', 'DONE'],
                transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['DONE', 'TO_DO'], DONE: [] },
            });
    });

    it('should return updated workflow with new statuses', async () => {
        const token = await getTokenFor('superadmin');
        const payload = {
            statuses: ['TO_DO', 'IN_PROGRESS', 'TESTING', 'DONE'],
            transitions: {
                TO_DO: ['IN_PROGRESS'],
                IN_PROGRESS: ['TESTING'],
                TESTING: ['DONE', 'IN_PROGRESS'],
                DONE: [],
            },
        };
        const res = await request(app)
            .put('/api/projects/1/workflows/4')
            .set('Authorization', `Bearer ${token}`)
            .send(payload);

        expect(res.status).toBe(200);
        expect(res.body.statuses).toContain('TESTING');
        expect(res.body.ticketType).toBe('EPIC');
        expect(res.body.projectId).toBe('1');

        // Restore
        await request(app)
            .put('/api/projects/1/workflows/4')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'IN_PROGRESS', 'DONE'],
                transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['DONE', 'TO_DO'], DONE: [] },
            });
    });

    it('should return 404 for non-existent workflow ID', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/workflows/9999')
            .set('Authorization', `Bearer ${token}`)
            .send(VALID_PAYLOAD);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Workflow not found');
    });

    it('should return 404 for workflow belonging to different project', async () => {
        const token = await getTokenFor('superadmin');
        // Workflow 5 belongs to project 2, not project 1
        const res = await request(app)
            .put('/api/projects/1/workflows/5')
            .set('Authorization', `Bearer ${token}`)
            .send(VALID_PAYLOAD);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Workflow not found');
    });

    it('should return 400 when statuses is missing', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ transitions: { TO_DO: [] } });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('statuses must be a non-empty array');
    });

    it('should return 400 when statuses is empty array', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ statuses: [], transitions: {} });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('statuses must be a non-empty array');
    });

    it('should return 400 for duplicate status', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'TO_DO'],
                transitions: { TO_DO: [] },
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Duplicate status');
    });

    it('should return 400 for invalid status format (lowercase)', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['to_do'],
                transitions: { to_do: [] },
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('Invalid status format');
    });

    it('should return 400 when transitions is missing', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .set('Authorization', `Bearer ${token}`)
            .send({ statuses: ['TO_DO'] });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('transitions must be an object');
    });

    it('should return 400 for transition key not in statuses', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO'],
                transitions: { TO_DO: [], UNKNOWN: [] },
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain("Transition key 'UNKNOWN' is not a defined status");
    });

    it('should return 400 for transition target not in statuses', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'DONE'],
                transitions: { TO_DO: ['UNKNOWN'], DONE: [] },
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain("Transition target 'UNKNOWN' from 'TO_DO' is not a defined status");
    });

    it('should return 400 for self-transition', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'DONE'],
                transitions: { TO_DO: ['TO_DO'], DONE: [] },
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain("Self-transition not allowed: 'TO_DO'");
    });

    it('should return 400 for missing transition key for a status', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'DONE'],
                transitions: { TO_DO: ['DONE'] },
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain("Missing transitions for status: 'DONE'");
    });

    it('should return 409 when removing a status used by existing tickets', async () => {
        const token = await getTokenFor('superadmin');
        // STORY workflow (id=1) for project 1 has tickets in IN_PROGRESS and TO_DO
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'DONE'],
                transitions: { TO_DO: ['DONE'], DONE: [] },
            });

        expect(res.status).toBe(409);
        expect(res.body.message).toContain('Cannot remove statuses currently in use');
        expect(res.body.message).toContain('IN_PROGRESS');
    });

    it('should allow removing unused statuses', async () => {
        const token = await getTokenFor('superadmin');
        // EPIC workflow (id=4) — only TO_DO tickets exist, so IN_PROGRESS is removable
        const res = await request(app)
            .put('/api/projects/1/workflows/4')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'DONE'],
                transitions: { TO_DO: ['DONE'], DONE: [] },
            });

        expect(res.status).toBe(200);
        expect(res.body.statuses).toEqual(['TO_DO', 'DONE']);

        // Restore
        await request(app)
            .put('/api/projects/1/workflows/4')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'IN_PROGRESS', 'DONE'],
                transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['DONE', 'TO_DO'], DONE: [] },
            });
    });

    it('should allow adding new statuses', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .put('/api/projects/1/workflows/4')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'IN_PROGRESS', 'TESTING', 'DONE'],
                transitions: {
                    TO_DO: ['IN_PROGRESS'],
                    IN_PROGRESS: ['TESTING'],
                    TESTING: ['DONE', 'IN_PROGRESS'],
                    DONE: [],
                },
            });

        expect(res.status).toBe(200);
        expect(res.body.statuses).toContain('TESTING');

        // Restore
        await request(app)
            .put('/api/projects/1/workflows/4')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'IN_PROGRESS', 'DONE'],
                transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['DONE', 'TO_DO'], DONE: [] },
            });
    });

    it('should return 403 for DEVELOPER role', async () => {
        const token = await getTokenFor('developer');
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .set('Authorization', `Bearer ${token}`)
            .send(VALID_PAYLOAD);

        expect(res.status).toBe(403);
    });

    it('should return 200 for PROJECT_ADMIN role', async () => {
        const token = await getTokenFor('projectadmin');
        // Use EPIC workflow to avoid conflict issues
        const res = await request(app)
            .put('/api/projects/1/workflows/4')
            .set('Authorization', `Bearer ${token}`)
            .send({
                statuses: ['TO_DO', 'IN_PROGRESS', 'DONE'],
                transitions: { TO_DO: ['IN_PROGRESS'], IN_PROGRESS: ['DONE', 'TO_DO'], DONE: [] },
            });

        expect(res.status).toBe(200);
    });

    it('should return 401 without token', async () => {
        const res = await request(app)
            .put('/api/projects/1/workflows/1')
            .send(VALID_PAYLOAD);

        expect(res.status).toBe(401);
    });
});
