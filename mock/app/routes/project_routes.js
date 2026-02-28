const authMiddleware = require('../middleware/auth');
const { requireGlobalRole, requireProjectRole } = require('../middleware/authorize');
const { bootstrapProject } = require('../services/bootstrap');

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

/**
 * Enriches a project-member record with user details (no password).
 */
function enrichMember(db, member) {
    const user = db.get('users').find({ id: member.userId }).value();
    return {
        id: member.id,
        userId: member.userId,
        role: member.role,
        joined_at: member.joined_at,
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        email: user ? user.email : '',
    };
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

                const enriched = members.map(m => enrichMember(db, m));

                return res.json(enriched);
            }
        );

        /**
         * GET /api/projects/:projectId/members/candidates?q=search
         * Protected — requires PROJECT_ADMIN role (SUPER_ADMIN bypasses).
         * Returns active users matching search who are NOT already members of the project.
         * Response: [{ id, firstName, lastName, email, role }] (max 10).
         */
        app.get(
            '/api/projects/:projectId/members/candidates',
            authMiddleware,
            requireProjectRole(db, 'PROJECT_ADMIN'),
            (req, res) => {
                const q = (req.query.q || '').trim().toLowerCase();
                if (q.length < 2) {
                    return res.json([]);
                }

                const memberUserIds = db.get('project-members')
                    .filter({ projectId: req.params.projectId })
                    .map('userId')
                    .value();

                const candidates = db.get('users').value()
                    .filter(u =>
                        u.is_active === true &&
                        !memberUserIds.includes(u.id) &&
                        (
                            u.firstName.toLowerCase().includes(q) ||
                            u.lastName.toLowerCase().includes(q) ||
                            u.email.toLowerCase().includes(q)
                        )
                    )
                    .slice(0, 10)
                    .map(u => ({
                        id: u.id,
                        firstName: u.firstName,
                        lastName: u.lastName,
                        email: u.email,
                        role: u.role,
                    }));

                return res.json(candidates);
            }
        );

        /**
         * GET /api/projects/:projectId/workflows
         * Returns all workflows for the project, sorted by ticketType alphabetically.
         * Protected — requires valid token + project membership (any role).
         * SUPER_ADMIN bypasses membership check.
         */
        app.get(
            '/api/projects/:projectId/workflows',
            authMiddleware,
            requireProjectRole(db, ...ALL_PROJECT_ROLES),
            (req, res) => {
                const workflows = db.get('workflows')
                    .filter({ projectId: req.params.projectId })
                    .sortBy('ticketType')
                    .value();

                return res.json(workflows);
            }
        );

        /**
         * PUT /api/projects/:projectId/workflows/:workflowId
         * Update a workflow's statuses and transitions.
         * Validates status format, transition integrity, and prevents removal of statuses in use.
         * Protected — requires PROJECT_ADMIN role. SUPER_ADMIN bypasses.
         */
        app.put(
            '/api/projects/:projectId/workflows/:workflowId',
            authMiddleware,
            requireProjectRole(db, 'PROJECT_ADMIN'),
            (req, res) => {
                const { projectId, workflowId } = req.params;
                const workflow = db.get('workflows').find({ id: workflowId }).value();
                if (!workflow || workflow.projectId !== projectId) {
                    return res.status(404).json({ message: 'Workflow not found' });
                }

                const { statuses, transitions } = req.body;

                // Validate statuses
                if (!Array.isArray(statuses) || statuses.length === 0) {
                    return res.status(400).json({ message: 'statuses must be a non-empty array' });
                }
                const STATUS_RE = /^[A-Z][A-Z0-9_]{0,29}$/;
                for (const s of statuses) {
                    if (typeof s !== 'string' || !STATUS_RE.test(s)) {
                        return res.status(400).json({ message: `Invalid status format: ${s}. Use uppercase letters, digits, and underscores (max 30 chars)` });
                    }
                }
                const seen = new Set();
                for (const s of statuses) {
                    if (seen.has(s)) {
                        return res.status(400).json({ message: `Duplicate status: ${s}` });
                    }
                    seen.add(s);
                }

                // Validate transitions
                if (!transitions || typeof transitions !== 'object' || Array.isArray(transitions)) {
                    return res.status(400).json({ message: 'transitions must be an object' });
                }
                const statusSet = new Set(statuses);
                for (const s of statuses) {
                    if (!(s in transitions)) {
                        return res.status(400).json({ message: `Missing transitions for status: '${s}'` });
                    }
                }
                for (const [key, targets] of Object.entries(transitions)) {
                    if (!statusSet.has(key)) {
                        return res.status(400).json({ message: `Transition key '${key}' is not a defined status` });
                    }
                    if (!Array.isArray(targets)) {
                        return res.status(400).json({ message: `transitions must be an object` });
                    }
                    for (const t of targets) {
                        if (!statusSet.has(t)) {
                            return res.status(400).json({ message: `Transition target '${t}' from '${key}' is not a defined status` });
                        }
                        if (t === key) {
                            return res.status(400).json({ message: `Self-transition not allowed: '${key}'` });
                        }
                    }
                }

                // Safety check: statuses in use by existing tickets
                const removedStatuses = workflow.statuses.filter(s => !statusSet.has(s));
                if (removedStatuses.length > 0) {
                    const tickets = db.get('backlog-items')
                        .filter({ projectId, type: workflow.ticketType })
                        .value();
                    const usedStatuses = [...new Set(tickets.map(t => t.status))];
                    const blocked = removedStatuses.filter(s => usedStatuses.includes(s));
                    if (blocked.length > 0) {
                        return res.status(409).json({ message: `Cannot remove statuses currently in use: ${blocked.join(', ')}` });
                    }
                }

                // Update
                db.get('workflows')
                    .find({ id: workflowId })
                    .assign({ statuses, transitions, updated_at: new Date().toISOString() })
                    .write();

                const updated = db.get('workflows').find({ id: workflowId }).value();
                return res.json(updated);
            }
        );

        /**
         * GET /api/projects/:projectId/backlog
         * Returns paginated backlog items for the project.
         * Query params:
         *   ?type=EPIC         — filter by ticket type
         *   ?status=TO_DO      — filter by workflow status
         *   ?priority=HIGH     — filter by priority (excludes null-priority items)
         *   ?q=search          — case-insensitive search on title or description
         *   ?_sort=field       — sort field (default: created_at)
         *   ?_order=asc|desc   — sort order (default: desc)
         *   ?_page=1           — page number, 1-indexed (default: 1)
         *   ?_limit=10         — items per page (default: 10, max: 100)
         * Response: { data: BacklogItem[], total: number, page: number, limit: number }
         * Protected — requires valid token + project membership (any role).
         * SUPER_ADMIN bypasses membership check.
         */
        app.get(
            '/api/projects/:projectId/backlog',
            authMiddleware,
            requireProjectRole(db, ...ALL_PROJECT_ROLES),
            (req, res) => {
                let items = db.get('backlog-items')
                    .filter({ projectId: req.params.projectId })
                    .value();

                // Text search (q) — case-insensitive on title or description
                const q = (req.query.q || '').toLowerCase().trim();
                if (q) {
                    items = items.filter(i =>
                        i.title.toLowerCase().includes(q) ||
                        (i.description && i.description.toLowerCase().includes(q))
                    );
                }

                // Type filter (supports comma-separated multi-value, e.g. ?type=STORY,BUG)
                const type = (req.query.type || '').trim();
                if (type) {
                    const types = type.split(',').map(t => t.trim()).filter(Boolean);
                    if (types.length > 0) {
                        items = items.filter(i => types.includes(i.type));
                    }
                }

                // Status filter (supports comma-separated multi-value, e.g. ?status=TO_DO,IN_PROGRESS)
                const status = (req.query.status || '').trim();
                if (status) {
                    const statuses = status.split(',').map(s => s.trim()).filter(Boolean);
                    if (statuses.length > 0) {
                        items = items.filter(i => statuses.includes(i.status));
                    }
                }

                // Priority filter (supports comma-separated multi-value, e.g. ?priority=HIGH,CRITICAL)
                const priority = (req.query.priority || '').trim();
                if (priority) {
                    const priorities = priority.split(',').map(p => p.trim()).filter(Boolean);
                    if (priorities.length > 0) {
                        items = items.filter(i => i.priority && priorities.includes(i.priority));
                    }
                }

                // Sprint filter
                if (req.query.sprint_id !== undefined) {
                    const sprintId = req.query.sprint_id;
                    if (sprintId === 'null') {
                        items = items.filter(i => !i.sprint_id);
                    } else {
                        items = items.filter(i => i.sprint_id === sprintId);
                    }
                }

                // Sort
                const sortField = req.query._sort || 'created_at';
                const sortOrder = req.query._order || 'desc';
                items.sort((a, b) => {
                    const valA = a[sortField] ?? '';
                    const valB = b[sortField] ?? '';
                    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                    return 0;
                });

                // Pagination
                const total = items.length;
                const page = Math.max(1, parseInt(req.query._page, 10) || 1);
                const limit = Math.min(100, Math.max(1, parseInt(req.query._limit, 10) || 10));
                const start = (page - 1) * limit;
                const data = items.slice(start, start + limit);

                return res.json({ data, total, page, limit });
            }
        );

        const VALID_TICKET_TYPES = ['STORY', 'BUG', 'TASK'];
        const VALID_PRIORITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

        /**
         * POST /api/projects/:projectId/backlog
         * Create a new ticket (STORY, BUG, or TASK) in the project backlog.
         * Protected — requires project membership with non-VIEWER role.
         * SUPER_ADMIN bypasses membership check.
         * Body: { type, title, description?, priority, assignee_id?, epic_id? }
         * Returns 201 with the created BacklogItem.
         */
        app.post(
            '/api/projects/:projectId/backlog',
            authMiddleware,
            requireProjectRole(db, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER'),
            (req, res) => {
                const projectId = req.params.projectId;

                // Check project exists and is active
                const project = db.get('projects').find({ id: projectId }).value();
                if (!project) {
                    return res.status(404).json({ message: 'Project not found' });
                }
                if (!project.is_active) {
                    return res.status(400).json({ message: 'Cannot create tickets in an archived project' });
                }

                const { type, title, description, priority, assignee_id, epic_id } = req.body;

                // Validate type
                if (type === 'EPIC') {
                    return res.status(400).json({ message: 'Cannot create EPIC tickets. EPICs are system-managed.' });
                }
                if (!type || !VALID_TICKET_TYPES.includes(type)) {
                    return res.status(400).json({ message: 'Invalid type. Must be one of: STORY, BUG, TASK' });
                }

                // Validate title
                const trimmedTitle = (title || '').trim();
                if (!trimmedTitle || trimmedTitle.length < 2 || trimmedTitle.length > 200) {
                    return res.status(400).json({ message: 'Title is required (2–200 characters)' });
                }

                // Validate description
                const trimmedDesc = (description || '').trim();
                if (trimmedDesc.length > 2000) {
                    return res.status(400).json({ message: 'Description must not exceed 2000 characters' });
                }

                // Validate priority
                if (!priority || !VALID_PRIORITIES.includes(priority)) {
                    return res.status(400).json({ message: 'Invalid priority. Must be one of: CRITICAL, HIGH, MEDIUM, LOW' });
                }

                // Validate assignee_id (optional)
                let resolvedAssignee = null;
                if (assignee_id !== undefined && assignee_id !== null && assignee_id !== '') {
                    const targetUser = db.get('users').find({ id: String(assignee_id) }).value();
                    if (!targetUser || !targetUser.is_active) {
                        return res.status(400).json({ message: 'Assignee must be an active project member' });
                    }
                    const membership = db.get('project-members')
                        .find({ projectId, userId: String(assignee_id) })
                        .value();
                    if (!membership) {
                        return res.status(400).json({ message: 'Assignee must be an active project member' });
                    }
                    resolvedAssignee = String(assignee_id);
                }

                // Validate epic_id (optional)
                let resolvedEpic = null;
                if (epic_id !== undefined && epic_id !== null && epic_id !== '') {
                    const epic = db.get('backlog-items')
                        .find({ id: String(epic_id), projectId })
                        .value();
                    if (!epic || epic.type !== 'EPIC') {
                        return res.status(400).json({ message: 'Epic not found in this project' });
                    }
                    resolvedEpic = String(epic_id);
                }

                // Validate workflow exists for this ticket type
                const workflow = db.get('workflows')
                    .find({ projectId, ticketType: type })
                    .value();
                if (!workflow || !workflow.statuses.includes('TO_DO')) {
                    return res.status(400).json({ message: 'No valid workflow found for this ticket type' });
                }

                // Auto-increment ticket_number per project
                const projectItems = db.get('backlog-items').filter({ projectId }).value();
                const maxNumber = projectItems.reduce((max, item) => Math.max(max, item.ticket_number || 0), 0);
                const maxPosition = projectItems.reduce((max, item) => Math.max(max, item.position || 0), 0);

                // Auto-increment ID
                const allItems = db.get('backlog-items').value();
                const maxId = allItems.reduce((max, item) => Math.max(max, parseInt(item.id, 10) || 0), 0);

                const now = new Date().toISOString();
                const newItem = {
                    id: String(maxId + 1),
                    projectId,
                    type,
                    title: trimmedTitle,
                    description: trimmedDesc,
                    status: 'TO_DO',
                    priority,
                    assignee_id: resolvedAssignee,
                    epic_id: resolvedEpic,
                    ticket_number: maxNumber + 1,
                    position: maxPosition + 1,
                    created_by: String(req.user.userId),
                    created_at: now,
                };

                db.get('backlog-items').push(newItem).write();
                return res.status(201).json(newItem);
            }
        );

        /**
         * PUT /api/projects/:projectId/backlog/reorder
         * Persists new positions for a batch of tickets.
         * Body: { items: [{ ticket_number: number, position: number }] }
         * Auth: SUPER_ADMIN, PROJECT_ADMIN, PRODUCT_OWNER.
         */
        app.put(
            '/api/projects/:projectId/backlog/reorder',
            authMiddleware,
            requireProjectRole(db, 'PROJECT_ADMIN', 'PRODUCT_OWNER'),
            (req, res) => {
                const projectId = req.params.projectId;
                const { items } = req.body || {};

                if (!Array.isArray(items) || items.length === 0) {
                    return res.status(400).json({ message: 'items must be a non-empty array' });
                }

                const ticketNumbers = new Set();
                const positions = new Set();

                for (const entry of items) {
                    if (entry.ticket_number === undefined || entry.ticket_number === null) {
                        return res.status(400).json({ message: 'Each item must have a ticket_number' });
                    }
                    if (!Number.isInteger(entry.position) || entry.position < 1) {
                        return res.status(400).json({ message: 'Each item must have a positive integer position' });
                    }
                    if (ticketNumbers.has(entry.ticket_number)) {
                        return res.status(400).json({ message: 'Duplicate ticket_number in items' });
                    }
                    if (positions.has(entry.position)) {
                        return res.status(400).json({ message: 'Duplicate position in items' });
                    }
                    ticketNumbers.add(entry.ticket_number);
                    positions.add(entry.position);
                }

                // Verify all tickets belong to the project
                const projectItems = db.get('backlog-items').filter({ projectId }).value();
                const projectTicketNumbers = new Set(projectItems.map(i => i.ticket_number));

                for (const tn of ticketNumbers) {
                    if (!projectTicketNumbers.has(tn)) {
                        return res.status(400).json({ message: `Ticket number ${tn} not found in project` });
                    }
                }

                // Apply updates
                let updated = 0;
                for (const entry of items) {
                    db.get('backlog-items')
                        .find(i => i.projectId === projectId && i.ticket_number === entry.ticket_number)
                        .assign({ position: entry.position })
                        .write();
                    updated++;
                }

                return res.json({ updated });
            }
        );

        /**
         * GET /api/projects/:projectId/backlog/:ticketNumber
         * Returns a single backlog item by ticket number within the project.
         * Protected — requires valid token + project membership (any role).
         * SUPER_ADMIN bypasses membership check.
         */
        app.get(
            '/api/projects/:projectId/backlog/:ticketNumber',
            authMiddleware,
            requireProjectRole(db, ...ALL_PROJECT_ROLES),
            (req, res) => {
                const projectId = req.params.projectId;
                const ticketNumber = parseInt(req.params.ticketNumber, 10);

                if (isNaN(ticketNumber)) {
                    return res.status(400).json({ message: 'Invalid ticket number' });
                }

                const item = db.get('backlog-items')
                    .find({ projectId, ticket_number: ticketNumber })
                    .value();

                if (!item) {
                    return res.status(404).json({ message: 'Ticket not found' });
                }

                return res.json(item);
            }
        );

        const VALID_STATUSES = ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];

        /**
         * PATCH /api/projects/:projectId/backlog/:ticketNumber
         * Update a single backlog item. Allowed fields: title, description, status, priority, assignee_id, epic_id.
         * Status changes are validated against workflow transitions.
         * REPORTER can only update tickets they created.
         * Protected — requires non-VIEWER project role.
         * SUPER_ADMIN bypasses membership check.
         * Generates activity entries for each changed field.
         */
        app.patch(
            '/api/projects/:projectId/backlog/:ticketNumber',
            authMiddleware,
            requireProjectRole(db, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER'),
            (req, res) => {
                const projectId = req.params.projectId;
                const ticketNumber = parseInt(req.params.ticketNumber, 10);

                if (isNaN(ticketNumber)) {
                    return res.status(400).json({ message: 'Invalid ticket number' });
                }

                const item = db.get('backlog-items')
                    .find({ projectId, ticket_number: ticketNumber })
                    .value();

                if (!item) {
                    return res.status(404).json({ message: 'Ticket not found' });
                }

                // REPORTER can only update own tickets
                if (req.projectRole === 'REPORTER' && item.created_by !== String(req.user.userId)) {
                    return res.status(403).json({ message: 'Reporters can only edit their own tickets' });
                }

                const { title, description, status, priority, assignee_id, epic_id } = req.body;
                const updates = {};
                const activities = [];
                const now = new Date().toISOString();

                // Validate & collect title change
                if (title !== undefined) {
                    const trimmed = (title || '').trim();
                    if (!trimmed || trimmed.length < 2 || trimmed.length > 200) {
                        return res.status(400).json({ message: 'Title must be 2–200 characters' });
                    }
                    if (trimmed !== item.title) {
                        activities.push({ field: 'title', oldValue: item.title, newValue: trimmed });
                        updates.title = trimmed;
                    }
                }

                // Validate & collect description change
                if (description !== undefined) {
                    const trimmed = (description || '').trim();
                    if (trimmed.length > 2000) {
                        return res.status(400).json({ message: 'Description must not exceed 2000 characters' });
                    }
                    if (trimmed !== item.description) {
                        activities.push({ field: 'description', oldValue: item.description || '', newValue: trimmed });
                        updates.description = trimmed;
                    }
                }

                // Validate & collect status change (workflow transition)
                if (status !== undefined) {
                    if (!VALID_STATUSES.includes(status)) {
                        return res.status(400).json({ message: 'Invalid status' });
                    }
                    if (status !== item.status) {
                        const workflow = db.get('workflows')
                            .find({ projectId, ticketType: item.type })
                            .value();
                        if (!workflow) {
                            return res.status(400).json({ message: 'No workflow found for this ticket type' });
                        }
                        const allowed = workflow.transitions[item.status] || [];
                        if (!allowed.includes(status)) {
                            return res.status(400).json({
                                message: `Invalid status transition from ${item.status} to ${status}`,
                            });
                        }
                        activities.push({ field: 'status', oldValue: item.status, newValue: status });
                        updates.status = status;
                    }
                }

                // Validate & collect priority change
                if (priority !== undefined) {
                    if (priority !== null && !VALID_PRIORITIES.includes(priority)) {
                        return res.status(400).json({ message: 'Invalid priority' });
                    }
                    if (priority !== item.priority) {
                        activities.push({ field: 'priority', oldValue: item.priority || '', newValue: priority || '' });
                        updates.priority = priority;
                    }
                }

                // Validate & collect assignee change
                if (assignee_id !== undefined) {
                    if (assignee_id !== null && assignee_id !== '') {
                        const targetUser = db.get('users').find({ id: String(assignee_id) }).value();
                        if (!targetUser || !targetUser.is_active) {
                            return res.status(400).json({ message: 'Assignee must be an active user' });
                        }
                        const membership = db.get('project-members')
                            .find({ projectId, userId: String(assignee_id) })
                            .value();
                        if (!membership) {
                            return res.status(400).json({ message: 'Assignee must be a project member' });
                        }
                    }
                    const newAssignee = assignee_id === '' ? null : assignee_id;
                    if (newAssignee !== item.assignee_id) {
                        activities.push({ field: 'assignee_id', oldValue: item.assignee_id || '', newValue: newAssignee || '' });
                        updates.assignee_id = newAssignee;
                    }
                }

                // Validate & collect epic change
                if (epic_id !== undefined) {
                    if (epic_id !== null && epic_id !== '') {
                        const epic = db.get('backlog-items')
                            .find({ id: String(epic_id), projectId })
                            .value();
                        if (!epic || epic.type !== 'EPIC') {
                            return res.status(400).json({ message: 'Epic not found in this project' });
                        }
                    }
                    const newEpic = epic_id === '' ? null : epic_id;
                    if (newEpic !== item.epic_id) {
                        activities.push({ field: 'epic_id', oldValue: item.epic_id || '', newValue: newEpic || '' });
                        updates.epic_id = newEpic;
                    }
                }

                if (Object.keys(updates).length === 0) {
                    return res.json(item);
                }

                // Apply updates
                db.get('backlog-items')
                    .find({ id: item.id })
                    .assign(updates)
                    .write();

                // Generate activity entries
                const allActivity = db.get('ticket-activity').value();
                let actMaxId = allActivity.reduce((max, a) => Math.max(max, parseInt(a.id, 10) || 0), 0);
                for (const act of activities) {
                    actMaxId++;
                    db.get('ticket-activity').push({
                        id: String(actMaxId),
                        projectId,
                        ticketId: item.id,
                        ticketNumber,
                        field: act.field,
                        oldValue: act.oldValue,
                        newValue: act.newValue,
                        changedBy: String(req.user.userId),
                        created_at: now,
                    }).write();
                }

                const updated = db.get('backlog-items').find({ id: item.id }).value();
                return res.json(updated);
            }
        );

        /**
         * GET /api/projects/:projectId/backlog/:ticketNumber/comments
         * Returns all comments for a ticket, sorted by created_at desc.
         * Protected — requires valid token + project membership (any role).
         */
        app.get(
            '/api/projects/:projectId/backlog/:ticketNumber/comments',
            authMiddleware,
            requireProjectRole(db, ...ALL_PROJECT_ROLES),
            (req, res) => {
                const projectId = req.params.projectId;
                const ticketNumber = parseInt(req.params.ticketNumber, 10);

                if (isNaN(ticketNumber)) {
                    return res.status(400).json({ message: 'Invalid ticket number' });
                }

                const item = db.get('backlog-items')
                    .find({ projectId, ticket_number: ticketNumber })
                    .value();

                if (!item) {
                    return res.status(404).json({ message: 'Ticket not found' });
                }

                const comments = db.get('ticket-comments')
                    .filter({ projectId, ticketId: item.id })
                    .sortBy('created_at')
                    .value()
                    .reverse();

                return res.json(comments);
            }
        );

        /**
         * POST /api/projects/:projectId/backlog/:ticketNumber/comments
         * Add a comment to a ticket.
         * Body: { content: string } (1–2000 chars)
         * Protected — requires non-VIEWER project role.
         */
        app.post(
            '/api/projects/:projectId/backlog/:ticketNumber/comments',
            authMiddleware,
            requireProjectRole(db, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER'),
            (req, res) => {
                const projectId = req.params.projectId;
                const ticketNumber = parseInt(req.params.ticketNumber, 10);

                if (isNaN(ticketNumber)) {
                    return res.status(400).json({ message: 'Invalid ticket number' });
                }

                const item = db.get('backlog-items')
                    .find({ projectId, ticket_number: ticketNumber })
                    .value();

                if (!item) {
                    return res.status(404).json({ message: 'Ticket not found' });
                }

                const { content } = req.body;
                const trimmed = (content || '').trim();
                if (!trimmed || trimmed.length < 1 || trimmed.length > 2000) {
                    return res.status(400).json({ message: 'Comment content must be 1–2000 characters' });
                }

                // Resolve author name
                const author = db.get('users').find({ id: String(req.user.userId) }).value();
                const authorName = author ? `${author.firstName} ${author.lastName}` : 'Unknown';

                const allComments = db.get('ticket-comments').value();
                const maxId = allComments.reduce((max, c) => Math.max(max, parseInt(c.id, 10) || 0), 0);

                const now = new Date().toISOString();
                const newComment = {
                    id: String(maxId + 1),
                    projectId,
                    ticketId: item.id,
                    ticketNumber,
                    authorId: String(req.user.userId),
                    authorName,
                    content: trimmed,
                    created_at: now,
                };

                db.get('ticket-comments').push(newComment).write();
                return res.status(201).json(newComment);
            }
        );

        /**
         * GET /api/projects/:projectId/backlog/:ticketNumber/activity
         * Returns all activity entries for a ticket, sorted by created_at desc.
         * Protected — requires valid token + project membership (any role).
         */
        app.get(
            '/api/projects/:projectId/backlog/:ticketNumber/activity',
            authMiddleware,
            requireProjectRole(db, ...ALL_PROJECT_ROLES),
            (req, res) => {
                const projectId = req.params.projectId;
                const ticketNumber = parseInt(req.params.ticketNumber, 10);

                if (isNaN(ticketNumber)) {
                    return res.status(400).json({ message: 'Invalid ticket number' });
                }

                const item = db.get('backlog-items')
                    .find({ projectId, ticket_number: ticketNumber })
                    .value();

                if (!item) {
                    return res.status(404).json({ message: 'Ticket not found' });
                }

                const activities = db.get('ticket-activity')
                    .filter({ projectId, ticketId: item.id })
                    .sortBy('created_at')
                    .value()
                    .reverse();

                return res.json(activities);
            }
        );

        /**
         * PUT /api/projects/:projectId/members
         * Upsert a project member (add or update role).
         * Protected — requires PROJECT_ADMIN role (SUPER_ADMIN bypasses).
         * Body: { userId: string, role: string }
         * Returns 201 for new member, 200 for role update. Body: enriched member.
         */
        app.put(
            '/api/projects/:projectId/members',
            authMiddleware,
            requireProjectRole(db, 'PROJECT_ADMIN'),
            (req, res) => {
                const { userId, role } = req.body;

                // Validate userId
                if (!userId || String(userId).trim() === '') {
                    return res.status(400).json({ message: 'userId is required' });
                }

                // Validate role
                if (!role || !ALL_PROJECT_ROLES.includes(role)) {
                    return res.status(400).json({
                        message: 'Invalid role. Must be one of: PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER, VIEWER',
                    });
                }

                // Check target user exists and is active
                const targetUser = db.get('users').find({ id: String(userId) }).value();
                if (!targetUser || targetUser.is_active === false) {
                    return res.status(400).json({ message: 'User not found or inactive' });
                }

                // SUPER_ADMIN protection: PROJECT_ADMIN cannot mutate a SUPER_ADMIN membership
                if (targetUser.role === 'SUPER_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
                    return res.status(403).json({ message: 'Cannot modify membership of a super administrator' });
                }

                const projectId = req.params.projectId;
                const existing = db.get('project-members')
                    .find({ projectId, userId: String(userId) })
                    .value();

                if (existing) {
                    // Update role
                    db.get('project-members')
                        .find({ id: existing.id })
                        .assign({ role })
                        .write();
                    const updated = db.get('project-members').find({ id: existing.id }).value();
                    return res.status(200).json(enrichMember(db, updated));
                } else {
                    // Create new membership
                    const allMembers = db.get('project-members').value();
                    const maxId = allMembers.reduce((max, m) => Math.max(max, parseInt(m.id, 10) || 0), 0);
                    const newMember = {
                        id: String(maxId + 1),
                        projectId,
                        userId: String(userId),
                        role,
                        joined_at: new Date().toISOString(),
                    };
                    db.get('project-members').push(newMember).write();
                    return res.status(201).json(enrichMember(db, newMember));
                }
            }
        );

        /**
         * DELETE /api/projects/:projectId/members/:userId
         * Remove a member from the project.
         * Protected — requires PROJECT_ADMIN role (SUPER_ADMIN bypasses).
         * Returns 204 on success.
         */
        app.delete(
            '/api/projects/:projectId/members/:userId',
            authMiddleware,
            requireProjectRole(db, 'PROJECT_ADMIN'),
            (req, res) => {
                const projectId = req.params.projectId;
                const userId = req.params.userId;

                const membership = db.get('project-members')
                    .find({ projectId, userId: String(userId) })
                    .value();

                if (!membership) {
                    return res.status(404).json({ message: 'Member not found' });
                }

                // SUPER_ADMIN protection
                const targetUser = db.get('users').find({ id: String(userId) }).value();
                if (targetUser && targetUser.role === 'SUPER_ADMIN' && req.user.role !== 'SUPER_ADMIN') {
                    return res.status(403).json({ message: 'Cannot modify membership of a super administrator' });
                }

                db.get('project-members').remove({ id: membership.id }).write();
                return res.status(204).send();
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

            // Bootstrap default agile assets (workflows + maintenance epic)
            let bootstrapWarning = null;
            try {
                bootstrapProject(db, newProject.id);
            } catch (err) {
                bootstrapWarning = 'Project created but agile bootstrap failed. Default workflows may be missing.';
            }

            const response = { ...newProject };
            if (bootstrapWarning) {
                response.bootstrapWarning = bootstrapWarning;
            }
            return res.status(201).json(response);
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

        // ─── Ticket Links ───────────────────────────────────────────────

        /**
         * GET /api/projects/:projectId/backlog/:ticketNumber/links
         * Returns all links where the ticket is source or target (within this project).
         * Auth: any project member.
         */
        app.get('/api/projects/:projectId/backlog/:ticketNumber/links',
            authMiddleware,
            requireProjectRole(db, ...ALL_PROJECT_ROLES),
            (req, res) => {
                const { projectId, ticketNumber } = req.params;
                const num = parseInt(ticketNumber, 10);

                // Verify ticket exists
                const ticket = db.get('backlog-items')
                    .find(t => t.projectId === projectId && t.ticket_number === num)
                    .value();
                if (!ticket) {
                    return res.status(404).json({ error: 'Ticket not found.' });
                }

                const allLinks = db.get('ticket_links').value() || [];
                const linkTypes = db.get('link_types').value() || [];

                // Links where this ticket is source or target in this project
                const relevant = allLinks.filter(l =>
                    (l.projectId === projectId && l.sourceTicketNumber === num) ||
                    (l.targetProjectId === projectId && l.targetTicketNumber === num),
                );

                // Enrich with link type labels and direction
                const enriched = relevant.map(l => {
                    const lt = linkTypes.find(t => t.id === l.linkTypeId);
                    const isSource = l.projectId === projectId && l.sourceTicketNumber === num;
                    return {
                        ...l,
                        linkTypeName: lt ? lt.name : 'UNKNOWN',
                        linkLabel: lt ? (isSource ? lt.outward : lt.inward) : 'unknown',
                    };
                });

                res.json(enriched);
            },
        );

        /**
         * POST /api/projects/:projectId/backlog/:ticketNumber/links
         * Creates a new link from this ticket to a target ticket.
         * Body: { linkTypeId, targetTicketNumber, targetProjectId? }
         * Auth: SUPER_ADMIN, PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER (own tickets).
         */
        app.post('/api/projects/:projectId/backlog/:ticketNumber/links',
            authMiddleware,
            requireProjectRole(db, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER'),
            (req, res) => {
                const { projectId, ticketNumber } = req.params;
                const num = parseInt(ticketNumber, 10);
                const { linkTypeId, targetTicketNumber, targetProjectId } = req.body;
                const tgtProjectId = targetProjectId || projectId;

                // Verify source ticket exists
                const sourceTicket = db.get('backlog-items')
                    .find(t => t.projectId === projectId && t.ticket_number === num)
                    .value();
                if (!sourceTicket) {
                    return res.status(404).json({ error: 'Source ticket not found.' });
                }

                // REPORTER can only link own tickets
                if (req.projectRole === 'REPORTER' && sourceTicket.created_by !== String(req.user.userId)) {
                    return res.status(403).json({ error: 'Reporters can only link their own tickets.' });
                }

                // Validate required fields
                if (!linkTypeId) {
                    return res.status(400).json({ error: 'linkTypeId is required.' });
                }
                if (targetTicketNumber === undefined || targetTicketNumber === null) {
                    return res.status(400).json({ error: 'targetTicketNumber is required.' });
                }

                // Validate link type exists
                const linkType = db.get('link_types').find({ id: String(linkTypeId) }).value();
                if (!linkType) {
                    return res.status(400).json({ error: 'Invalid linkTypeId.' });
                }

                // Prevent self-link
                const tgtNum = parseInt(targetTicketNumber, 10);
                if (projectId === tgtProjectId && num === tgtNum) {
                    return res.status(400).json({ error: 'Cannot link a ticket to itself.' });
                }

                // Validate target ticket exists
                const targetTicket = db.get('backlog-items')
                    .find(t => t.projectId === tgtProjectId && t.ticket_number === tgtNum)
                    .value();
                if (!targetTicket) {
                    return res.status(400).json({ error: 'Target ticket not found.' });
                }

                // Check for duplicate (same type, same source→target)
                const existing = db.get('ticket_links').find(l =>
                    l.projectId === projectId &&
                    l.sourceTicketNumber === num &&
                    l.targetTicketNumber === tgtNum &&
                    l.targetProjectId === tgtProjectId &&
                    l.linkTypeId === String(linkTypeId),
                ).value();
                if (existing) {
                    return res.status(409).json({ error: 'Duplicate link.' });
                }

                const allLinks = db.get('ticket_links').value() || [];
                const maxId = allLinks.reduce((max, l) => Math.max(max, parseInt(l.id, 10) || 0), 0);

                const newLink = {
                    id: String(maxId + 1),
                    projectId,
                    linkTypeId: String(linkTypeId),
                    sourceTicketNumber: num,
                    targetTicketNumber: tgtNum,
                    targetProjectId: tgtProjectId,
                    created_by: String(req.user.userId),
                    created_at: new Date().toISOString(),
                };

                db.get('ticket_links').push(newLink).write();
                res.status(201).json(newLink);
            },
        );

        /**
         * DELETE /api/projects/:projectId/backlog/:ticketNumber/links/:linkId
         * Deletes a link.
         * Auth: SUPER_ADMIN, PROJECT_ADMIN, or link creator.
         */
        app.delete('/api/projects/:projectId/backlog/:ticketNumber/links/:linkId',
            authMiddleware,
            requireProjectRole(db, ...ALL_PROJECT_ROLES),
            (req, res) => {
                const { projectId, ticketNumber, linkId } = req.params;
                const num = parseInt(ticketNumber, 10);

                const link = db.get('ticket_links').find({ id: linkId }).value();
                if (!link) {
                    return res.status(404).json({ error: 'Link not found.' });
                }

                // Verify link belongs to this ticket context
                const belongsToTicket =
                    (link.projectId === projectId && link.sourceTicketNumber === num) ||
                    (link.targetProjectId === projectId && link.targetTicketNumber === num);
                if (!belongsToTicket) {
                    return res.status(404).json({ error: 'Link not found.' });
                }

                // Authorization: SUPER_ADMIN, PROJECT_ADMIN, or link creator
                const isSuperAdmin = req.user.role === 'SUPER_ADMIN';
                const isProjectAdmin = req.projectRole === 'PROJECT_ADMIN';
                const isCreator = link.created_by === String(req.user.userId);
                if (!isSuperAdmin && !isProjectAdmin && !isCreator) {
                    return res.status(403).json({ error: 'Only admins or the link creator can delete links.' });
                }

                db.get('ticket_links').remove({ id: linkId }).write();
                res.status(204).send();
            },
        );

    });
};
