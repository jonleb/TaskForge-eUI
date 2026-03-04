const authMiddleware = require('../middleware/auth');

module.exports = function (app, db) {
    db.then(db => {

        /**
         * POST /api/auth/login
         * Authenticates a user and returns an access token.
         *
         * Request body: { username: string, password: string }
         *
         * Responses:
         *   200 - { accessToken, user: { userId, firstName, lastName, email, role } }
         *   401 - { message: "Invalid username or password" }
         *   403 - { message: "Account is deactivated" }
         */
        app.post('/api/auth/login', (req, res) => {
            const { username, password, rememberMe } = req.body;

            if (!username || !password) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const user = db.get('users').find({ username }).value();

            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            if (user.password !== password) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            if (!user.is_active) {
                return res.status(403).json({ message: 'Account is deactivated' });
            }

            // 7 days if rememberMe, 1 hour otherwise
            const ttl = rememberMe ? 7 * 24 * 3600000 : 3600000;
            const payload = {
                userId: user.id,
                role: user.role,
                exp: Date.now() + ttl,
            };
            const accessToken = Buffer.from(JSON.stringify(payload)).toString('base64');

            return res.status(200).json({
                accessToken,
                user: {
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                },
            });
        });

        /**
         * POST /api/auth/logout
         * Protected — requires valid token.
         * Returns 200 on success. Token invalidation is client-side (clear localStorage).
         */
        app.post('/api/auth/logout', authMiddleware, (req, res) => {
            return res.status(200).json({ message: 'Logged out' });
        });

        /**
         * POST /api/auth/refresh
         * Protected — requires valid token.
         * Returns a new token with extended expiry (same TTL as original).
         */
        app.post('/api/auth/refresh', authMiddleware, (req, res) => {
            const user = db.get('users').find({ id: req.user.userId }).value();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!user.is_active) {
                return res.status(403).json({ message: 'Account is deactivated' });
            }

            // Decode original token to preserve TTL intent
            const authHeader = req.headers.authorization;
            const oldToken = authHeader.split(' ')[1];
            const decoded = JSON.parse(Buffer.from(oldToken, 'base64').toString());
            const originalTtl = decoded.exp - (decoded.iat || (decoded.exp - 3600000));
            // Use 1 hour as default refresh TTL, or 7 days if original TTL was > 1 day
            const ttl = (decoded.exp - Date.now()) > 86400000 || originalTtl > 86400000 ? 7 * 24 * 3600000 : 3600000;

            const payload = {
                userId: user.id,
                role: user.role,
                exp: Date.now() + ttl,
            };
            const accessToken = Buffer.from(JSON.stringify(payload)).toString('base64');

            return res.status(200).json({ accessToken });
        });

        /**
         * GET /api/auth/me
         * Protected — requires valid token.
         * Returns the current user's profile (without password).
         */
        app.get('/api/auth/me', authMiddleware, (req, res) => {
            const user = db.get('users').find({ id: req.user.userId }).value();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const { password, id, ...profile } = user;
            return res.status(200).json({ userId: id, ...profile });
        });

    });
};
