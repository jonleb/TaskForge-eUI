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
