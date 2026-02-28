const authMiddleware = require('../middleware/auth');
const { requireProjectRole } = require('../middleware/authorize');

const ALL_PROJECT_ROLES = ['PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER', 'VIEWER'];
const MANAGE_ROLES = ['PROJECT_ADMIN', 'PRODUCT_OWNER'];

module.exports = function (app, db) {
    db.then(db => {

        /**
         * GET /api/projects/:projectId/sprints
         * List sprints for a project. Optional ?status=PLANNED,ACTIVE filter.
         * Auth: any project member. SUPER_ADMIN bypasses.
         */
        app.get(
            '/api/projects/:projectId/sprints',
            authMiddleware,
            requireProjectRole(db, ...ALL_PROJECT_ROLES),
            (req, res) => {
                let sprints = db.get('sprints')
                    .filter({ projectId: req.params.projectId })
                    .value();

                const statusFilter = (req.query.status || '').trim();
                if (statusFilter) {
                    const statuses = statusFilter.split(',').map(s => s.trim()).filter(Boolean);
                    if (statuses.length > 0) {
                        sprints = sprints.filter(s => statuses.includes(s.status));
                    }
                }

                // Sort: created_at desc
                sprints.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));

                return res.json(sprints);
            }
        );

        /**
         * POST /api/projects/:projectId/sprints
         * Create a new sprint in PLANNED state.
         * Auth: PROJECT_ADMIN, PRODUCT_OWNER. SUPER_ADMIN bypasses.
         */
        app.post(
            '/api/projects/:projectId/sprints',
            authMiddleware,
            requireProjectRole(db, ...MANAGE_ROLES),
            (req, res) => {
                const projectId = req.params.projectId;

                const project = db.get('projects').find({ id: projectId }).value();
                if (!project) {
                    return res.status(404).json({ message: 'Project not found' });
                }

                const { name, goal } = req.body;
                const trimmedName = (name || '').trim();
                if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
                    return res.status(400).json({ message: 'Name is required (2–100 characters)' });
                }

                const trimmedGoal = (goal || '').trim();
                if (trimmedGoal.length > 500) {
                    return res.status(400).json({ message: 'Goal must not exceed 500 characters' });
                }

                const allSprints = db.get('sprints').value();
                const maxId = allSprints.reduce((max, s) => {
                    const num = parseInt(s.id.replace('sp-', ''), 10) || 0;
                    return Math.max(max, num);
                }, 0);

                const now = new Date().toISOString();
                const newSprint = {
                    id: `sp-${maxId + 1}`,
                    projectId,
                    name: trimmedName,
                    goal: trimmedGoal,
                    status: 'PLANNED',
                    start_date: null,
                    end_date: null,
                    created_by: String(req.user.userId),
                    created_at: now,
                    updated_at: now,
                };

                db.get('sprints').push(newSprint).write();
                return res.status(201).json(newSprint);
            }
        );

        /**
         * PATCH /api/projects/:projectId/sprints/:sprintId
         * Update sprint metadata (name, goal, start_date, end_date).
         * Only PLANNED or ACTIVE sprints can be updated.
         * Auth: PROJECT_ADMIN, PRODUCT_OWNER. SUPER_ADMIN bypasses.
         */
        app.patch(
            '/api/projects/:projectId/sprints/:sprintId',
            authMiddleware,
            requireProjectRole(db, ...MANAGE_ROLES),
            (req, res) => {
                const { projectId, sprintId } = req.params;
                const sprint = db.get('sprints').find({ id: sprintId }).value();

                if (!sprint || sprint.projectId !== projectId) {
                    return res.status(404).json({ message: 'Sprint not found' });
                }

                if (sprint.status === 'CLOSED') {
                    return res.status(400).json({ message: 'Cannot update a closed sprint' });
                }

                const { name, goal, start_date, end_date } = req.body;
                const updates = {};

                if (name !== undefined) {
                    const trimmed = (name || '').trim();
                    if (!trimmed || trimmed.length < 2 || trimmed.length > 100) {
                        return res.status(400).json({ message: 'Name must be 2–100 characters' });
                    }
                    updates.name = trimmed;
                }

                if (goal !== undefined) {
                    const trimmed = (goal || '').trim();
                    if (trimmed.length > 500) {
                        return res.status(400).json({ message: 'Goal must not exceed 500 characters' });
                    }
                    updates.goal = trimmed;
                }

                if (start_date !== undefined) {
                    updates.start_date = start_date;
                }
                if (end_date !== undefined) {
                    updates.end_date = end_date;
                }

                updates.updated_at = new Date().toISOString();

                db.get('sprints').find({ id: sprintId }).assign(updates).write();
                const updated = db.get('sprints').find({ id: sprintId }).value();
                return res.json(updated);
            }
        );

        /**
         * PATCH /api/projects/:projectId/sprints/:sprintId/status
         * Transition sprint status: PLANNED→ACTIVE or ACTIVE→CLOSED.
         * Body: { status: 'ACTIVE'|'CLOSED', move_open_tickets_to_backlog?: boolean }
         * Close guardrail: blocks if unresolved tickets exist unless move flag is true.
         * Auth: PROJECT_ADMIN, PRODUCT_OWNER. SUPER_ADMIN bypasses.
         */
        app.patch(
            '/api/projects/:projectId/sprints/:sprintId/status',
            authMiddleware,
            requireProjectRole(db, ...MANAGE_ROLES),
            (req, res) => {
                const { projectId, sprintId } = req.params;
                const sprint = db.get('sprints').find({ id: sprintId }).value();

                if (!sprint || sprint.projectId !== projectId) {
                    return res.status(404).json({ message: 'Sprint not found' });
                }

                const { status, move_open_tickets_to_backlog } = req.body;

                if (!status || !['ACTIVE', 'CLOSED'].includes(status)) {
                    return res.status(400).json({ message: 'Status must be ACTIVE or CLOSED' });
                }

                // Validate transitions
                if (status === 'ACTIVE' && sprint.status !== 'PLANNED') {
                    return res.status(400).json({ message: 'Only PLANNED sprints can be started' });
                }
                if (status === 'CLOSED' && sprint.status !== 'ACTIVE') {
                    return res.status(400).json({ message: 'Only ACTIVE sprints can be closed' });
                }

                const now = new Date().toISOString();
                const updates = { status, updated_at: now };

                if (status === 'ACTIVE') {
                    if (!sprint.start_date) {
                        updates.start_date = now.split('T')[0];
                    }
                }

                if (status === 'CLOSED') {
                    // Check for unresolved tickets
                    const sprintTickets = db.get('backlog-items')
                        .filter(t => t.projectId === projectId && t.sprint_id === sprintId)
                        .value();
                    const unresolved = sprintTickets.filter(t => t.status !== 'DONE');

                    if (unresolved.length > 0 && !move_open_tickets_to_backlog) {
                        return res.status(409).json({
                            message: 'Sprint has unresolved tickets',
                            unresolved_count: unresolved.length,
                            unresolved_tickets: unresolved.map(t => ({
                                ticket_number: t.ticket_number,
                                title: t.title,
                                status: t.status,
                            })),
                        });
                    }

                    if (unresolved.length > 0 && move_open_tickets_to_backlog) {
                        for (const ticket of unresolved) {
                            db.get('backlog-items')
                                .find({ id: ticket.id })
                                .assign({ sprint_id: null })
                                .write();
                        }
                    }

                    updates.end_date = now.split('T')[0];
                }

                db.get('sprints').find({ id: sprintId }).assign(updates).write();
                const updated = db.get('sprints').find({ id: sprintId }).value();
                return res.json(updated);
            }
        );

    });
};
