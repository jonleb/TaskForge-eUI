const authMiddleware = require('../middleware/auth');
const { requireGlobalRole } = require('../middleware/authorize');

const VALID_ROLES = ['SUPER_ADMIN', 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER', 'VIEWER'];

/**
 * Generates a random 12-character alphanumeric temporary password.
 */
function generateTemporaryPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Returns a copy of the user object without the password field.
 */
function stripPassword(user) {
    const { password, ...rest } = user;
    return rest;
}

module.exports = function (app, db) {
    db.then(db => {
        const adminAuth = [authMiddleware, requireGlobalRole('SUPER_ADMIN')];

        /**
         * GET /api/admin/users
         * List users with pagination, search, sort, and status filter.
         * Protected: SUPER_ADMIN only.
         */
        app.get('/api/admin/users', ...adminAuth, (req, res) => {
            let users = db.get('users').value();

            // 1. Filter by is_active
            const isActiveParam = req.query.is_active;
            if (isActiveParam === 'true') {
                users = users.filter(u => u.is_active === true);
            } else if (isActiveParam === 'false') {
                users = users.filter(u => u.is_active === false);
            }

            // 1b. Filter by role
            const roleParam = req.query.role;
            if (roleParam) {
                users = users.filter(u => u.role === roleParam);
            }

            // 2. Search
            const q = (req.query.q || '').trim().toLowerCase();
            if (q) {
                users = users.filter(u =>
                    u.username.toLowerCase().includes(q) ||
                    u.firstName.toLowerCase().includes(q) ||
                    u.lastName.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q)
                );
            }

            // 3. Total count (after filter + search, before pagination)
            const total = users.length;

            // 4. Sort
            const sortField = req.query._sort || 'created_at';
            const sortOrder = req.query._order || 'desc';
            users.sort((a, b) => {
                const valA = (a[sortField] || '').toString().toLowerCase();
                const valB = (b[sortField] || '').toString().toLowerCase();
                if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });

            // 5. Paginate
            const page = Math.max(1, parseInt(req.query._page, 10) || 1);
            const limit = Math.max(1, Math.min(100, parseInt(req.query._limit, 10) || 10));
            const start = (page - 1) * limit;
            const paginatedUsers = users.slice(start, start + limit);

            // 6. Strip passwords
            const data = paginatedUsers.map(stripPassword);

            return res.json({ data, total, page, limit });
        });

        /**
         * GET /api/admin/users/:userId
         * Get a single user by ID.
         * Protected: SUPER_ADMIN only.
         */
        app.get('/api/admin/users/:userId', ...adminAuth, (req, res) => {
            const user = db.get('users').find({ id: req.params.userId }).value();
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(stripPassword(user));
        });

        /**
         * POST /api/admin/users
         * Create a new user with a temporary password.
         * Protected: SUPER_ADMIN only.
         */
        app.post('/api/admin/users', ...adminAuth, (req, res) => {
            const { username, firstName, lastName, email, role } = req.body;

            // Validate required fields
            if (!username || !firstName || !lastName || !email || !role) {
                return res.status(400).json({
                    message: 'All fields are required: username, firstName, lastName, email, role',
                });
            }

            // Validate role
            if (!VALID_ROLES.includes(role)) {
                return res.status(400).json({ message: 'Invalid role' });
            }

            const normalizedEmail = email.trim().toLowerCase();
            const normalizedUsername = username.trim().toLowerCase();

            // Check email uniqueness
            const existingEmail = db.get('users')
                .find(u => u.email.toLowerCase() === normalizedEmail)
                .value();
            if (existingEmail) {
                return res.status(409).json({ message: 'A user with this email already exists' });
            }

            // Check username uniqueness
            const existingUsername = db.get('users')
                .find(u => u.username.toLowerCase() === normalizedUsername)
                .value();
            if (existingUsername) {
                return res.status(409).json({ message: 'A user with this username already exists' });
            }

            // Generate ID (auto-increment)
            const allUsers = db.get('users').value();
            const maxId = allUsers.reduce((max, u) => Math.max(max, parseInt(u.id, 10) || 0), 0);

            const temporaryPassword = generateTemporaryPassword();
            const now = new Date().toISOString();

            const newUser = {
                id: String(maxId + 1),
                username: normalizedUsername,
                password: temporaryPassword,
                email: normalizedEmail,
                role: role,
                global_role: role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : role,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                is_active: true,
                created_at: now,
                updated_at: now,
            };

            db.get('users').push(newUser).write();

            return res.status(201).json({
                user: stripPassword(newUser),
                temporaryPassword,
            });
        });

        /**
         * POST /api/admin/users/:userId/reset-password
         * Reset a user's password and return a new temporary password.
         * Protected: SUPER_ADMIN only.
         */
        app.post('/api/admin/users/:userId/reset-password', ...adminAuth, (req, res) => {
            const userRef = db.get('users').find({ id: req.params.userId });
            const user = userRef.value();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const temporaryPassword = generateTemporaryPassword();
            userRef.assign({
                password: temporaryPassword,
                updated_at: new Date().toISOString(),
            }).write();

            return res.json({ temporaryPassword });
        });

        /**
         * PATCH /api/admin/users/:userId/deactivate
         * Deactivate a user account.
         * Protected: SUPER_ADMIN only.
         * Blocks self-deactivation and last-active-SUPER_ADMIN deactivation.
         */
        app.patch('/api/admin/users/:userId/deactivate', ...adminAuth, (req, res) => {
            const userRef = db.get('users').find({ id: req.params.userId });
            const user = userRef.value();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!user.is_active) {
                return res.status(400).json({ message: 'User is already inactive' });
            }

            // Block self-deactivation
            if (String(req.user.userId) === String(user.id)) {
                return res.status(409).json({ message: 'You cannot deactivate your own account' });
            }

            // Block last-active-SUPER_ADMIN deactivation
            if (user.role === 'SUPER_ADMIN') {
                const activeSuperAdmins = db.get('users')
                    .filter(u => u.role === 'SUPER_ADMIN' && u.is_active === true)
                    .value();
                if (activeSuperAdmins.length <= 1) {
                    return res.status(409).json({ message: 'Cannot deactivate the last active super admin' });
                }
            }

            userRef.assign({
                is_active: false,
                updated_at: new Date().toISOString(),
            }).write();

            return res.json(stripPassword(userRef.value()));
        });

        /**
         * PATCH /api/admin/users/:userId/reactivate
         * Reactivate a user account.
         * Protected: SUPER_ADMIN only.
         */
        app.patch('/api/admin/users/:userId/reactivate', ...adminAuth, (req, res) => {
            const userRef = db.get('users').find({ id: req.params.userId });
            const user = userRef.value();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.is_active) {
                return res.status(400).json({ message: 'User is already active' });
            }

            userRef.assign({
                is_active: true,
                updated_at: new Date().toISOString(),
            }).write();

            return res.json(stripPassword(userRef.value()));
        });
    });
};
