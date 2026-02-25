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
            const { username, password } = req.body;

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

            const payload = {
                userId: user.id,
                role: user.role,
                exp: Date.now() + 3600000,
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
         * GET /api/auth/me
         * Protected — requires valid token.
         * Returns the current user's profile (without password).
         */
        app.get('/api/auth/me', authMiddleware, (req, res) => {
            const user = db.get('users').find({ id: req.user.userId }).value();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const { password, ...profile } = user;
            return res.status(200).json(profile);
        });

    });
};
