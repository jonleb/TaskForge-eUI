const authMiddleware = require('../middleware/auth');

module.exports = function (app, db) {
    db.then(db => {

        /**
         * GET /api/tickets
         * Cross-project ticket aggregation with membership filtering.
         * SUPER_ADMIN sees tickets from all active projects.
         * Regular users see only tickets from projects where they are a member.
         * Supports: project_id, assignee_id, sprint_id (or "open"), q, type, status, priority,
         *           _sort, _order, _page, _limit.
         */
        app.get('/api/tickets', authMiddleware, (req, res) => {
            // 1. Determine accessible project IDs
            let accessibleProjectIds;
            if (req.user.role === 'SUPER_ADMIN') {
                accessibleProjectIds = db.get('projects')
                    .filter({ is_active: true })
                    .map('id')
                    .value();
            } else {
                const memberProjectIds = db.get('project-members')
                    .filter({ userId: String(req.user.userId) })
                    .map('projectId')
                    .value();
                const activeProjectIds = new Set(
                    db.get('projects').filter({ is_active: true }).map('id').value()
                );
                accessibleProjectIds = memberProjectIds.filter(id => activeProjectIds.has(id));
            }

            // 2. Base dataset
            let items = db.get('backlog-items').value()
                .filter(i => accessibleProjectIds.includes(i.projectId));

            // 3. Filters
            // project_id
            const projectId = req.query.project_id;
            if (projectId) {
                items = items.filter(i => i.projectId === projectId);
            }

            // assignee_id
            const assigneeId = req.query.assignee_id;
            if (assigneeId) {
                items = items.filter(i => i.assignee_id === assigneeId);
            }

            // sprint_id — special value "open" means all ACTIVE sprints
            const sprintId = req.query.sprint_id;
            if (sprintId) {
                if (sprintId === 'open') {
                    const activeSprintIds = db.get('sprints')
                        .filter({ status: 'ACTIVE' })
                        .value()
                        .filter(s => accessibleProjectIds.includes(s.projectId))
                        .map(s => s.id);
                    items = items.filter(i => i.sprint_id && activeSprintIds.includes(i.sprint_id));
                } else {
                    items = items.filter(i => i.sprint_id === sprintId);
                }
            }

            // q — text search on title/description
            const q = (req.query.q || '').toLowerCase().trim();
            if (q) {
                items = items.filter(i =>
                    i.title.toLowerCase().includes(q) ||
                    (i.description && i.description.toLowerCase().includes(q))
                );
            }

            // type (comma-separated)
            const type = (req.query.type || '').trim();
            if (type) {
                const types = type.split(',').map(t => t.trim()).filter(Boolean);
                if (types.length > 0) {
                    items = items.filter(i => types.includes(i.type));
                }
            }

            // status (comma-separated)
            const status = (req.query.status || '').trim();
            if (status) {
                const statuses = status.split(',').map(s => s.trim()).filter(Boolean);
                if (statuses.length > 0) {
                    items = items.filter(i => statuses.includes(i.status));
                }
            }

            // priority (comma-separated)
            const priority = (req.query.priority || '').trim();
            if (priority) {
                const priorities = priority.split(',').map(p => p.trim()).filter(Boolean);
                if (priorities.length > 0) {
                    items = items.filter(i => i.priority && priorities.includes(i.priority));
                }
            }

            // 4. Sort
            const sortField = req.query._sort || 'created_at';
            const sortOrder = req.query._order || 'desc';
            items.sort((a, b) => {
                const valA = a[sortField] ?? '';
                const valB = b[sortField] ?? '';
                if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });

            // 5. Paginate
            const total = items.length;
            const page = Math.max(1, parseInt(req.query._page, 10) || 1);
            const limit = Math.min(100, Math.max(1, parseInt(req.query._limit, 10) || 10));
            const start = (page - 1) * limit;
            const data = items.slice(start, start + limit);

            return res.json({ data, total, page, limit });
        });

        /**
         * GET /api/user/projects
         * Returns active projects the current user can access.
         * SUPER_ADMIN: all active projects. Others: member projects only.
         * Sorted by name ascending. No pagination.
         */
        app.get('/api/user/projects', authMiddleware, (req, res) => {
            let projects;
            if (req.user.role === 'SUPER_ADMIN') {
                projects = db.get('projects').filter({ is_active: true }).value();
            } else {
                const memberProjectIds = db.get('project-members')
                    .filter({ userId: String(req.user.userId) })
                    .map('projectId')
                    .value();
                projects = db.get('projects').value()
                    .filter(p => p.is_active && memberProjectIds.includes(p.id));
            }

            projects.sort((a, b) => a.name.localeCompare(b.name));
            return res.json(projects);
        });

    });
};
