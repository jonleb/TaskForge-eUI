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
