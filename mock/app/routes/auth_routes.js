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

            // User not found — generic error (no distinction from wrong password)
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Wrong password — same generic error
            if (user.password !== password) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Inactive user
            if (!user.is_active) {
                return res.status(403).json({ message: 'Account is deactivated' });
            }

            // Generate access token (base64-encoded JSON, expires in 1 hour)
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

    });
};
