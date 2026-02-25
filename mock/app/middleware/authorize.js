/**
 * Authorization middleware factories.
 * Must be used AFTER authMiddleware (req.user must exist).
 */

/**
 * Requires the authenticated user to have one of the specified global roles.
 * @param {...string} roles - Allowed global roles (e.g. 'SUPER_ADMIN')
 * @returns {Function} Express middleware
 */
function requireGlobalRole(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}

/**
 * Requires the authenticated user to be a project member with one of the specified roles.
 * SUPER_ADMIN users bypass the membership check.
 *
 * @param {object} db - lowdb instance (resolved)
 * @param {...string} roles - Allowed project roles (e.g. 'PROJECT_ADMIN', 'DEVELOPER')
 * @returns {Function} Express middleware
 */
function requireProjectRole(db, ...roles) {
    return (req, res, next) => {
        const projectId = req.params.projectId || req.body.projectId || req.query.projectId;

        if (!projectId) {
            return res.status(400).json({ message: 'Project ID is required' });
        }

        // SUPER_ADMIN bypasses project membership
        if (req.user.role === 'SUPER_ADMIN') {
            req.projectRole = 'SUPER_ADMIN';
            return next();
        }

        const member = db.get('project-members')
            .find({ projectId: String(projectId), userId: String(req.user.userId) })
            .value();

        if (!member) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        if (!roles.includes(member.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.projectRole = member.role;
        next();
    };
}

module.exports = { requireGlobalRole, requireProjectRole };
