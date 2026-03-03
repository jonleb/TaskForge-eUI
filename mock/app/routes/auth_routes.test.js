const request = require('supertest');
const createApp = require('../../app');

let app;
let db;

beforeAll(async () => {
    const instance = createApp('mock/db/db.json');
    app = instance.app;
    db = await instance.db;
});

describe('POST /api/auth/login', () => {

    it('should return 200 with token and user for valid superadmin credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'superadmin', password: 'SecurePassword!123' });

        expect(res.status).toBe(200);
        expect(res.body.accessToken).toBeDefined();
        expect(res.body.user).toEqual({
            userId: '1',
            firstName: 'Super',
            lastName: 'Admin',
            email: 'superadmin@taskforge.local',
            role: 'SUPER_ADMIN',
        });
    });

    it('should return a base64 token containing userId, role, and exp', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'superadmin', password: 'SecurePassword!123' });

        const decoded = JSON.parse(Buffer.from(res.body.accessToken, 'base64').toString());
        expect(decoded.userId).toBe('1');
        expect(decoded.role).toBe('SUPER_ADMIN');
        expect(decoded.exp).toBeGreaterThan(Date.now());
    });

    it.each([
        ['projectadmin', 'PROJECT_ADMIN'],
        ['productowner', 'PRODUCT_OWNER'],
        ['developer', 'DEVELOPER'],
        ['reporter', 'REPORTER'],
        ['viewer', 'VIEWER'],
    ])('should return 200 for %s with role %s', async (username, expectedRole) => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username, password: 'SecurePassword!123' });

        expect(res.status).toBe(200);
        expect(res.body.user.role).toBe(expectedRole);
        expect(res.body.accessToken).toBeDefined();
    });

    it('should return 401 for wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'superadmin', password: 'wrongpassword' });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid username or password');
    });

    it('should return 401 for non-existent user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'nobody', password: 'whatever' });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid username or password');
    });

    it('should return the same error for wrong password and non-existent user', async () => {
        const resBadPw = await request(app)
            .post('/api/auth/login')
            .send({ username: 'superadmin', password: 'wrong' });

        const resBadUser = await request(app)
            .post('/api/auth/login')
            .send({ username: 'nobody', password: 'whatever' });

        expect(resBadPw.body.message).toBe(resBadUser.body.message);
    });

    it('should return 403 for inactive user with correct password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'inactive_user', password: 'SecurePassword!123' });

        expect(res.status).toBe(403);
        expect(res.body.message).toBe('Account is deactivated');
    });

    it('should return 401 when username is missing', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ password: 'SecurePassword!123' });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid username or password');
    });

    it('should return 401 when password is missing', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'superadmin' });

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid username or password');
    });

    it('should not return the password field in the user object', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'superadmin', password: 'SecurePassword!123' });

        expect(res.body.user.password).toBeUndefined();
    });
});


// --- STORY-002: Auth Middleware, Logout & /me ---

/**
 * Helper: logs in as superadmin and returns a valid token.
 */
async function getValidToken() {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'superadmin', password: 'SecurePassword!123' });
    return res.body.accessToken;
}

/**
 * Helper: creates an expired token for testing.
 */
function getExpiredToken() {
    const payload = { userId: '1', role: 'SUPER_ADMIN', exp: Date.now() - 1000 };
    return Buffer.from(JSON.stringify(payload)).toString('base64');
}

describe('Auth Middleware — protected routes', () => {

    it('should return 401 when no Authorization header is provided', async () => {
        const res = await request(app).get('/api/auth/me');

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Session expired or invalid');
    });

    it('should return 401 when Authorization header has no Bearer prefix', async () => {
        const token = await getValidToken();
        const res = await request(app)
            .get('/api/auth/me')
            .set('Authorization', token);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Session expired or invalid');
    });

    it('should return 401 when token is malformed (not valid base64 JSON)', async () => {
        const res = await request(app)
            .get('/api/auth/me')
            .set('Authorization', 'Bearer not-a-valid-token');

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Session expired or invalid');
    });

    it('should return 401 when token is expired', async () => {
        const res = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${getExpiredToken()}`);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Session expired or invalid');
    });

    it('should return 401 when token payload is missing required fields', async () => {
        const incomplete = Buffer.from(JSON.stringify({ userId: '1' })).toString('base64');
        const res = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${incomplete}`);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Session expired or invalid');
    });

    it('should pass through with valid token', async () => {
        const token = await getValidToken();
        const res = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    });
});

describe('GET /api/auth/me', () => {

    it('should return the current user profile without password', async () => {
        const token = await getValidToken();
        const res = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.userId).toBe('1');
        expect(res.body.firstName).toBe('Super');
        expect(res.body.lastName).toBe('Admin');
        expect(res.body.email).toBe('superadmin@taskforge.local');
        expect(res.body.role).toBe('SUPER_ADMIN');
        expect(res.body.password).toBeUndefined();
    });

    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/auth/me');

        expect(res.status).toBe(401);
    });
});

describe('POST /api/auth/logout', () => {

    it('should return 200 with valid token', async () => {
        const token = await getValidToken();
        const res = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Logged out');
    });

    it('should return 401 without token', async () => {
        const res = await request(app).post('/api/auth/logout');

        expect(res.status).toBe(401);
    });

    it('should return 401 with expired token', async () => {
        const res = await request(app)
            .post('/api/auth/logout')
            .set('Authorization', `Bearer ${getExpiredToken()}`);

        expect(res.status).toBe(401);
    });
});

describe('POST /api/auth/login — remains public', () => {

    it('should still work without Authorization header', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'superadmin', password: 'SecurePassword!123' });

        expect(res.status).toBe(200);
        expect(res.body.accessToken).toBeDefined();
    });
});

describe('Protected user routes', () => {

    it('GET /api/users should return 401 without token', async () => {
        const res = await request(app).get('/api/users');

        expect(res.status).toBe(401);
    });

    it('GET /api/users should return 200 with valid token', async () => {
        const token = await getValidToken();
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    });

    it('GET /api/user-details should return 401 without token', async () => {
        const res = await request(app).get('/api/user-details');

        expect(res.status).toBe(401);
    });

    it('GET /api/user-details should return 200 with valid token', async () => {
        const token = await getValidToken();
        const res = await request(app)
            .get('/api/user-details')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
    });
});
