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
         * SUPER_ADMIN sees all active projects.
         * Regular users see only active projects they are a member of.
         */
        app.get('/api/projects', authMiddleware, (req, res) => {
            const allProjects = db.get('projects').filter({ is_active: true }).value();

            if (req.user.role === 'SUPER_ADMIN') {
                return res.json(allProjects);
            }

            const memberProjectIds = db.get('project-members')
                .filter({ userId: String(req.user.userId) })
                .map('projectId')
                .value();

            const userProjects = allProjects.filter(p => memberProjectIds.includes(p.id));
            return res.json(userProjects);
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

    });
};
