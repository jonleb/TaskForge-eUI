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

/**
 * Helper: generates a unique suffix for test data to avoid conflicts across runs.
 */
const ts = Date.now();
let counter = 0;
function uniqueName(prefix) {
    counter++;
    return `${prefix}-${ts}-${counter}`;
}

// ─── Authorization ───────────────────────────────────────────────────────────

describe('Admin user endpoints — authorization', () => {

    it('GET /api/admin/users returns 401 without token', async () => {
        const res = await request(app).get('/api/admin/users');
        expect(res.status).toBe(401);
    });

    it('GET /api/admin/users returns 403 for non-SUPER_ADMIN', async () => {
        // Use viewer (id 6) — not mutated by any other test
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it('GET /api/admin/users returns 200 for SUPER_ADMIN', async () => {
        const token = await getTokenFor('superadmin');
        const res = await request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('POST /api/admin/users returns 403 for non-SUPER_ADMIN', async () => {
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'x', firstName: 'X', lastName: 'X', email: 'x@x.com', role: 'DEVELOPER' });
        expect(res.status).toBe(403);
    });

    it('POST /api/admin/users/:userId/reset-password returns 403 for non-SUPER_ADMIN', async () => {
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .post('/api/admin/users/6/reset-password')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it('PATCH /api/admin/users/:userId/deactivate returns 403 for non-SUPER_ADMIN', async () => {
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .patch('/api/admin/users/6/deactivate')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(403);
    });

    it('PATCH /api/admin/users/:userId/reactivate returns 403 for non-SUPER_ADMIN', async () => {
        const token = await getTokenFor('viewer');
        const res = await request(app)
            .patch('/api/admin/users/7/reactivate')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(403);
    });
});

// ─── GET /api/admin/users — List ─────────────────────────────────────────────

describe('GET /api/admin/users', () => {
    let token;

    beforeAll(async () => {
        token = await getTokenFor('superadmin');
    });

    it('returns paginated results with default page=1, limit=10', async () => {
        const res = await request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.page).toBe(1);
        expect(res.body.limit).toBe(10);
        expect(res.body.data.length).toBeLessThanOrEqual(10);
        expect(res.body.total).toBeGreaterThan(10);
    });

    it('response contains data, total, page, limit fields', async () => {
        const res = await request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('page');
        expect(res.body).toHaveProperty('limit');
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('data items do not contain password field', async () => {
        const res = await request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${token}`);

        res.body.data.forEach(user => {
            expect(user.password).toBeUndefined();
        });
    });

    it('_page=2&_limit=5 returns correct slice', async () => {
        const res = await request(app)
            .get('/api/admin/users?_page=2&_limit=5')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.page).toBe(2);
        expect(res.body.limit).toBe(5);
        expect(res.body.data.length).toBeLessThanOrEqual(5);
    });

    it('q=super returns only users matching "super"', async () => {
        const res = await request(app)
            .get('/api/admin/users?q=super&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        res.body.data.forEach(user => {
            const combined = `${user.username} ${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();
            expect(combined).toContain('super');
        });
        expect(res.body.total).toBeGreaterThan(0);
    });

    it('q search is case-insensitive', async () => {
        const res1 = await request(app)
            .get('/api/admin/users?q=SUPER&_limit=100')
            .set('Authorization', `Bearer ${token}`);
        const res2 = await request(app)
            .get('/api/admin/users?q=super&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res1.body.total).toBe(res2.body.total);
    });

    it('is_active=true returns only active users', async () => {
        const res = await request(app)
            .get('/api/admin/users?is_active=true&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        res.body.data.forEach(user => {
            expect(user.is_active).toBe(true);
        });
    });

    it('is_active=false returns only inactive users', async () => {
        const res = await request(app)
            .get('/api/admin/users?is_active=false&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
        res.body.data.forEach(user => {
            expect(user.is_active).toBe(false);
        });
    });

    it('_sort=username&_order=asc returns users sorted by username ascending', async () => {
        const res = await request(app)
            .get('/api/admin/users?_sort=username&_order=asc&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        const usernames = res.body.data.map(u => u.username.toLowerCase());
        const sorted = [...usernames].sort();
        expect(usernames).toEqual(sorted);
    });

    it('_sort=email&_order=desc returns users sorted by email descending', async () => {
        const res = await request(app)
            .get('/api/admin/users?_sort=email&_order=desc&_limit=100')
            .set('Authorization', `Bearer ${token}`);

        const emails = res.body.data.map(u => u.email.toLowerCase());
        const sorted = [...emails].sort().reverse();
        expect(emails).toEqual(sorted);
    });

    it('combined filters work: q + is_active + pagination', async () => {
        const res = await request(app)
            .get('/api/admin/users?q=admin&is_active=true&_page=1&_limit=5')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeLessThanOrEqual(5);
        res.body.data.forEach(user => {
            expect(user.is_active).toBe(true);
            const combined = `${user.username} ${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();
            expect(combined).toContain('admin');
        });
    });
});

// ─── GET /api/admin/users/:userId — Get single user ─────────────────────────

describe('GET /api/admin/users/:userId', () => {
    let token;

    beforeAll(async () => {
        token = await getTokenFor('superadmin');
    });

    it('returns user without password for valid id', async () => {
        const res = await request(app)
            .get('/api/admin/users/1')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe('1');
        expect(res.body.username).toBe('superadmin');
        expect(res.body.password).toBeUndefined();
    });

    it('returns 404 for non-existent id', async () => {
        const res = await request(app)
            .get('/api/admin/users/99999')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
    });
});

// ─── POST /api/admin/users — Create user ─────────────────────────────────────

describe('POST /api/admin/users', () => {
    let token;

    beforeAll(async () => {
        token = await getTokenFor('superadmin');
    });

    it('returns 201 with user and temporaryPassword for valid input', async () => {
        const name = uniqueName('newuser');
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: name,
                firstName: 'New',
                lastName: 'User',
                email: `${name}@taskforge.local`,
                role: 'DEVELOPER',
            });

        expect(res.status).toBe(201);
        expect(res.body.user).toBeDefined();
        expect(res.body.temporaryPassword).toBeDefined();
        expect(res.body.user.password).toBeUndefined();
    });

    it('temporaryPassword is a 12-character string', async () => {
        const name = uniqueName('pwlen');
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: name,
                firstName: 'PW',
                lastName: 'Len',
                email: `${name}@taskforge.local`,
                role: 'REPORTER',
            });

        expect(res.status).toBe(201);
        expect(typeof res.body.temporaryPassword).toBe('string');
        expect(res.body.temporaryPassword.length).toBe(12);
    });

    it('returns 400 when username is missing', async () => {
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({ firstName: 'A', lastName: 'B', email: 'a@b.com', role: 'DEVELOPER' });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain('required');
    });

    it('returns 400 when firstName is missing', async () => {
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'a', lastName: 'B', email: 'a@b.com', role: 'DEVELOPER' });

        expect(res.status).toBe(400);
    });

    it('returns 400 when email is missing', async () => {
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'a', firstName: 'A', lastName: 'B', role: 'DEVELOPER' });

        expect(res.status).toBe(400);
    });

    it('returns 400 when role is missing', async () => {
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'a', firstName: 'A', lastName: 'B', email: 'a@b.com' });

        expect(res.status).toBe(400);
    });

    it('returns 400 for invalid role', async () => {
        const name = uniqueName('badrole');
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: name,
                firstName: 'Bad',
                lastName: 'Role',
                email: `${name}@taskforge.local`,
                role: 'INVALID_ROLE',
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Invalid role');
    });

    it('returns 409 for duplicate email (case-insensitive)', async () => {
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: uniqueName('dupemail'),
                firstName: 'Dup',
                lastName: 'Email',
                email: 'SUPERADMIN@taskforge.local',
                role: 'DEVELOPER',
            });

        expect(res.status).toBe(409);
        expect(res.body.message).toContain('email');
    });

    it('returns 409 for duplicate username (case-insensitive)', async () => {
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: 'SUPERADMIN',
                firstName: 'Dup',
                lastName: 'User',
                email: `${uniqueName('dupuser')}@taskforge.local`,
                role: 'DEVELOPER',
            });

        expect(res.status).toBe(409);
        expect(res.body.message).toContain('username');
    });

    it('email is normalized to lowercase', async () => {
        const name = uniqueName('emailnorm');
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: name,
                firstName: 'Email',
                lastName: 'Norm',
                email: `  ${name.toUpperCase()}@TaskForge.Local  `,
                role: 'VIEWER',
            });

        expect(res.status).toBe(201);
        expect(res.body.user.email).toBe(`${name}@taskforge.local`);
    });

    it('username is normalized to lowercase', async () => {
        const name = uniqueName('UserNorm');
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: `  ${name.toUpperCase()}  `,
                firstName: 'User',
                lastName: 'Norm',
                email: `${name}@taskforge.local`,
                role: 'VIEWER',
            });

        expect(res.status).toBe(201);
        expect(res.body.user.username).toBe(name.toLowerCase());
    });

    it('created user has is_active: true and timestamps', async () => {
        const name = uniqueName('active');
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: name,
                firstName: 'Active',
                lastName: 'Test',
                email: `${name}@taskforge.local`,
                role: 'DEVELOPER',
            });

        expect(res.status).toBe(201);
        expect(res.body.user.is_active).toBe(true);
        expect(res.body.user.created_at).toBeDefined();
        expect(res.body.user.updated_at).toBeDefined();
    });

    it('created user has correct global_role for SUPER_ADMIN', async () => {
        const name = uniqueName('newsuperadmin');
        const res = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: name,
                firstName: 'New',
                lastName: 'SuperAdmin',
                email: `${name}@taskforge.local`,
                role: 'SUPER_ADMIN',
            });

        expect(res.status).toBe(201);
        expect(res.body.user.role).toBe('SUPER_ADMIN');
        expect(res.body.user.global_role).toBe('SUPER_ADMIN');
    });

    it('created user can be retrieved via GET', async () => {
        const name = uniqueName('retrievable');
        const createRes = await request(app)
            .post('/api/admin/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: name,
                firstName: 'Retrieve',
                lastName: 'Test',
                email: `${name}@taskforge.local`,
                role: 'REPORTER',
            });

        expect(createRes.status).toBe(201);
        const userId = createRes.body.user.id;

        const getRes = await request(app)
            .get(`/api/admin/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(getRes.status).toBe(200);
        expect(getRes.body.username).toBe(name);
    });
});

// ─── POST /api/admin/users/:userId/reset-password ────────────────────────────

describe('POST /api/admin/users/:userId/reset-password', () => {
    let token;

    beforeAll(async () => {
        token = await getTokenFor('superadmin');
    });

    it('returns 200 with a new temporaryPassword for valid user', async () => {
        // Use id 29 (victor.perez) — not used by other test suites for login
        const res = await request(app)
            .post('/api/admin/users/29/reset-password')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.temporaryPassword).toBeDefined();
        expect(typeof res.body.temporaryPassword).toBe('string');
        expect(res.body.temporaryPassword.length).toBe(12);
    });

    it('returns a different password on each call', async () => {
        // Use id 30 (wendy.thompson) — not used by other test suites for login
        const res1 = await request(app)
            .post('/api/admin/users/30/reset-password')
            .set('Authorization', `Bearer ${token}`);
        const res2 = await request(app)
            .post('/api/admin/users/30/reset-password')
            .set('Authorization', `Bearer ${token}`);

        expect(res1.status).toBe(200);
        expect(res2.status).toBe(200);
        // Extremely unlikely to be the same (62^12 possibilities)
        expect(res1.body.temporaryPassword).not.toBe(res2.body.temporaryPassword);
    });

    it('returns 404 for non-existent user', async () => {
        const res = await request(app)
            .post('/api/admin/users/99999/reset-password')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
    });

    it('updates the user updated_at timestamp', async () => {
        const beforeRes = await request(app)
            .get('/api/admin/users/29')
            .set('Authorization', `Bearer ${token}`);
        const beforeUpdatedAt = beforeRes.body.updated_at;

        // Small delay to ensure timestamp differs
        await new Promise(r => setTimeout(r, 10));

        await request(app)
            .post('/api/admin/users/29/reset-password')
            .set('Authorization', `Bearer ${token}`);

        const afterRes = await request(app)
            .get('/api/admin/users/29')
            .set('Authorization', `Bearer ${token}`);

        expect(afterRes.body.updated_at).not.toBe(beforeUpdatedAt);
    });
});

// ─── PATCH /api/admin/users/:userId/deactivate ───────────────────────────────

describe('PATCH /api/admin/users/:userId/deactivate', () => {
    let token;

    beforeAll(async () => {
        token = await getTokenFor('superadmin');
    });

    it('returns 200 and sets is_active to false for an active user', async () => {
        // Use id 21 (nathan.wilson) — active PROJECT_ADMIN, not used by other suites
        // First ensure user is active
        const checkRes = await request(app)
            .get('/api/admin/users/21')
            .set('Authorization', `Bearer ${token}`);

        if (!checkRes.body.is_active) {
            // Reactivate first if needed from a previous test run
            await request(app)
                .patch('/api/admin/users/21/reactivate')
                .set('Authorization', `Bearer ${token}`);
        }

        const res = await request(app)
            .patch('/api/admin/users/21/deactivate')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.is_active).toBe(false);
        expect(res.body.password).toBeUndefined();
    });

    it('returns 400 when user is already inactive', async () => {
        // id 7 (inactive_user) is already inactive
        const res = await request(app)
            .patch('/api/admin/users/7/deactivate')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('User is already inactive');
    });

    it('returns 404 for non-existent user', async () => {
        const res = await request(app)
            .patch('/api/admin/users/99999/deactivate')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
    });

    it('returns 409 when trying to deactivate yourself', async () => {
        // superadmin is id 1
        const res = await request(app)
            .patch('/api/admin/users/1/deactivate')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(409);
        expect(res.body.message).toContain('your own account');
    });

    it('does not strip password from response', async () => {
        // Verify the response from a successful deactivation has no password
        const checkRes = await request(app)
            .get('/api/admin/users/21')
            .set('Authorization', `Bearer ${token}`);

        expect(checkRes.body.password).toBeUndefined();
    });
});

// ─── PATCH /api/admin/users/:userId/reactivate ───────────────────────────────

describe('PATCH /api/admin/users/:userId/reactivate', () => {
    let token;

    beforeAll(async () => {
        token = await getTokenFor('superadmin');
    });

    it('returns 200 and sets is_active to true for an inactive user', async () => {
        // id 24 (quinn.taylor) is inactive by default — not used by other test suites
        const res = await request(app)
            .patch('/api/admin/users/24/reactivate')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.is_active).toBe(true);
        expect(res.body.password).toBeUndefined();
    });

    it('returns 400 when user is already active', async () => {
        // After the previous test, id 24 is now active
        const res = await request(app)
            .patch('/api/admin/users/24/reactivate')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('User is already active');
    });

    it('returns 404 for non-existent user', async () => {
        const res = await request(app)
            .patch('/api/admin/users/99999/reactivate')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
    });

    it('reactivated user can be verified via GET', async () => {
        // Use id 44 (kira.torres) — inactive SUPER_ADMIN, not used by other suites
        // First ensure inactive
        const check = await request(app)
            .get('/api/admin/users/44')
            .set('Authorization', `Bearer ${token}`);

        if (check.body.is_active) {
            await request(app)
                .patch('/api/admin/users/44/deactivate')
                .set('Authorization', `Bearer ${token}`);
        }

        const reactivateRes = await request(app)
            .patch('/api/admin/users/44/reactivate')
            .set('Authorization', `Bearer ${token}`);

        expect(reactivateRes.status).toBe(200);

        const getRes = await request(app)
            .get('/api/admin/users/44')
            .set('Authorization', `Bearer ${token}`);

        expect(getRes.body.is_active).toBe(true);
    });
});
