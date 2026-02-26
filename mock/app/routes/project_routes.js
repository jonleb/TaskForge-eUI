const authMiddleware = require('../middleware/auth');
const { requireGlobalRole, requireProjectRole } = require('../middleware/authorize');

const ALL_PROJECT_ROLES = ['PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER', 'VIEWER'];

/**
 * Generates a project key from the project name.
 * Takes first letter of each word, uppercased, truncated to 5 chars.
 * If result < 2 chars, takes first 2 chars of name instead.
 * Appends incrementing digit on collision.
 */
function generateProjectKey(name, existingKeys) {
    const upperKeys = existingKeys.map(k => k.toUpperCase());

    // Build base key from first letters of words
    let base = name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase();
    if (base.length < 2) {
        base = name.trim().replace(/\s+/g, '').substring(0, 2).toUpperCase();
    }
    base = base.substring(0, 5);

    if (!upperKeys.includes(base)) {
        return base;
    }

    for (let i = 1; i <= 99; i++) {
        const candidate = `${base}${i}`;
        if (!upperKeys.includes(candidate)) {
            return candidate;
        }
    }

    return base + Date.now(); // fallback — should never happen
}

module.exports = function (app, db) {
    db.then(db => {

        /**
         * GET /api/projects
         * Protected — requires valid token.
         * Supports: _page, _limit, _sort, _order, q, is_active.
         * SUPER_ADMIN sees all projects (active + inactive) by default, can filter by is_active.
         * Regular users see only active projects they are a member of (is_active ignored).
         * Response: { data: Project[], total: number, page: number, limit: number }
         */
        app.get('/api/projects', authMiddleware, (req, res) => {
            let projects;

            if (req.user.role === 'SUPER_ADMIN') {
                // SUPER_ADMIN sees all projects by default
                projects = db.get('projects').value();

                // Status filter (SUPER_ADMIN only)
                const isActiveParam = req.query.is_active;
                if (isActiveParam === 'true') {
                    projects = projects.filter(p => p.is_active === true);
                } else if (isActiveParam === 'false') {
                    projects = projects.filter(p => p.is_active === false);
                }
            } else {
                // Regular users: only active projects they are a member of
                const activeProjects = db.get('projects').filter({ is_active: true }).value();
                const memberProjectIds = db.get('project-members')
                    .filter({ userId: String(req.user.userId) })
                    .map('projectId')
                    .value();
                projects = activeProjects.filter(p => memberProjectIds.includes(p.id));
            }

            // Search
            const q = (req.query.q || '').trim().toLowerCase();
            if (q) {
                projects = projects.filter(p =>
                    p.name.toLowerCase().includes(q) ||
                    p.key.toLowerCase().includes(q) ||
                    (p.description || '').toLowerCase().includes(q)
                );
            }

            // Total count (after filter + search, before sort/paginate)
            const total = projects.length;

            // Sort
            const sortField = req.query._sort || 'name';
            const sortOrder = req.query._order || 'asc';
            projects.sort((a, b) => {
                const valA = (a[sortField] || '').toString().toLowerCase();
                const valB = (b[sortField] || '').toString().toLowerCase();
                if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });

            // Paginate
            const page = Math.max(1, parseInt(req.query._page, 10) || 1);
            const limit = Math.max(1, Math.min(100, parseInt(req.query._limit, 10) || 10));
            const start = (page - 1) * limit;
            const data = projects.slice(start, start + limit);

            return res.json({ data, total, page, limit });
        });

        /**
         * GET /api/projects/:projectId
         * Protected — requires valid token.
         * SUPER_ADMIN can access any project.
         * Regular users must be a member of the project.
         */
        app.get('/api/projects/:projectId', authMiddleware, (req, res) => {
            const project = db.get('projects')
                .find({ id: req.params.projectId })
                .value();

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            if (req.user.role === 'SUPER_ADMIN') {
                return res.json(project);
            }

            const member = db.get('project-members')
                .find({ projectId: req.params.projectId, userId: String(req.user.userId) })
                .value();

            if (!member) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            return res.json(project);
        });

        /**
         * GET /api/projects/:projectId/members
         * Protected — requires valid token + project membership (any role).
         * SUPER_ADMIN bypasses membership check.
         * Returns members with user details (no passwords).
         */
        app.get(
            '/api/projects/:projectId/members',
            authMiddleware,
            requireProjectRole(db, ...ALL_PROJECT_ROLES),
            (req, res) => {
                const members = db.get('project-members')
                    .filter({ projectId: req.params.projectId })
                    .value();

                const enriched = members.map(m => {
                    const user = db.get('users').find({ id: m.userId }).value();
                    return {
                        id: m.id,
                        userId: m.userId,
                        role: m.role,
                        joined_at: m.joined_at,
                        firstName: user ? user.firstName : '',
                        lastName: user ? user.lastName : '',
                        email: user ? user.email : '',
                    };
                });

                return res.json(enriched);
            }
        );

        /**
         * POST /api/projects
         * Create a new project.
         * Protected: SUPER_ADMIN only.
         * Body: { name: string, description?: string, key?: string }
         */
        app.post('/api/projects', authMiddleware, requireGlobalRole('SUPER_ADMIN'), (req, res) => {
            const { name, description, key } = req.body;

            // Validate name
            const trimmedName = (name || '').trim();
            if (!trimmedName || trimmedName.length < 2) {
                return res.status(400).json({ message: 'Project name is required (min 2 characters)' });
            }

            // Check name uniqueness (case-insensitive)
            const existingName = db.get('projects')
                .find(p => p.name.toLowerCase() === trimmedName.toLowerCase())
                .value();
            if (existingName) {
                return res.status(409).json({ message: 'A project with this name already exists' });
            }

            const allProjects = db.get('projects').value();
            const existingKeys = allProjects.map(p => p.key);

            // Resolve key
            let projectKey;
            if (key !== undefined && key !== null && key !== '') {
                // Manual key — validate format
                projectKey = String(key).toUpperCase().trim();
                if (!/^[A-Z0-9]{2,10}$/.test(projectKey)) {
                    return res.status(400).json({ message: 'Project key must be 2–10 uppercase alphanumeric characters' });
                }
                // Check key uniqueness (case-insensitive)
                if (existingKeys.some(k => k.toUpperCase() === projectKey)) {
                    return res.status(409).json({ message: 'A project with this key already exists' });
                }
            } else {
                // Auto-generate key
                projectKey = generateProjectKey(trimmedName, existingKeys);
            }

            // Generate ID (auto-increment)
            const maxId = allProjects.reduce((max, p) => Math.max(max, parseInt(p.id, 10) || 0), 0);
            const now = new Date().toISOString();

            const newProject = {
                id: String(maxId + 1),
                key: projectKey,
                name: trimmedName,
                description: (description || '').trim(),
                created_by: String(req.user.userId),
                created_at: now,
                updated_at: now,
                is_active: true,
            };

            db.get('projects').push(newProject).write();

            return res.status(201).json(newProject);
        });

        /**
         * PATCH /api/projects/:projectId
         * Update project name/description. Key is immutable.
         * Protected: SUPER_ADMIN only.
         */
        app.patch('/api/projects/:projectId', authMiddleware, requireGlobalRole('SUPER_ADMIN'), (req, res) => {
            const project = db.get('projects').find({ id: req.params.projectId }).value();
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const { name, description, key } = req.body;

            // Key immutability — reject if different from current
            if (key !== undefined && key !== null && key !== '') {
                if (String(key).toUpperCase().trim() !== project.key.toUpperCase()) {
                    return res.status(400).json({ message: 'Project key cannot be changed' });
                }
            }

            const updates = { updated_at: new Date().toISOString() };

            // Name validation & uniqueness
            if (name !== undefined) {
                const trimmedName = (name || '').trim();
                if (!trimmedName || trimmedName.length < 2) {
                    return res.status(400).json({ message: 'Project name is required (min 2 characters)' });
                }
                const duplicate = db.get('projects')
                    .find(p => p.id !== req.params.projectId && p.name.toLowerCase() === trimmedName.toLowerCase())
                    .value();
                if (duplicate) {
                    return res.status(409).json({ message: 'A project with this name already exists' });
                }
                updates.name = trimmedName;
            }

            // Description update
            if (description !== undefined) {
                updates.description = (description || '').trim();
            }

            db.get('projects').find({ id: req.params.projectId }).assign(updates).write();
            const updated = db.get('projects').find({ id: req.params.projectId }).value();
            return res.status(200).json(updated);
        });

    });
};
