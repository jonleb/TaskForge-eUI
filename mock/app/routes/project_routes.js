const authMiddleware = require('../middleware/auth');
const { requireProjectRole } = require('../middleware/authorize');

const ALL_PROJECT_ROLES = ['PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER', 'VIEWER'];

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

    });
};
