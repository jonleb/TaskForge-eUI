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
                    created_by: String(req.user.userId),
                    created_at: now,
                };

                db.get('backlog-items').push(newItem).write();
                return res.status(201).json(newItem);
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

    });
};
