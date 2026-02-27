/**
 * Bootstrap service — provisions default agile assets for a new project.
 *
 * bootstrapProject(db, projectId)
 *   - Creates 4 workflows (STORY, BUG, TASK, EPIC)
 *   - Creates 1 maintenance epic in backlog-items
 *   - Idempotent: skips if workflows already exist for the project
 *   - Returns: { workflows: number, backlogItems: number, skipped: boolean }
 */

const FOUR_STATUS_TRANSITIONS = {
    TO_DO: ['IN_PROGRESS'],
    IN_PROGRESS: ['IN_REVIEW', 'TO_DO'],
    IN_REVIEW: ['DONE', 'IN_PROGRESS'],
    DONE: [],
};

const THREE_STATUS_TRANSITIONS = {
    TO_DO: ['IN_PROGRESS'],
    IN_PROGRESS: ['DONE', 'TO_DO'],
    DONE: [],
};

const WORKFLOW_TEMPLATES = [
    {
        ticketType: 'STORY',
        statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
        transitions: FOUR_STATUS_TRANSITIONS,
    },
    {
        ticketType: 'BUG',
        statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
        transitions: FOUR_STATUS_TRANSITIONS,
    },
    {
        ticketType: 'TASK',
        statuses: ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
        transitions: FOUR_STATUS_TRANSITIONS,
    },
    {
        ticketType: 'EPIC',
        statuses: ['TO_DO', 'IN_PROGRESS', 'DONE'],
        transitions: THREE_STATUS_TRANSITIONS,
    },
];

function bootstrapProject(db, projectId) {
    const pid = String(projectId);

    // Idempotency: skip if workflows already exist for this project
    const existing = db.get('workflows').filter({ projectId: pid }).value();
    if (existing.length > 0) {
        return { workflows: 0, backlogItems: 0, skipped: true };
    }

    const now = new Date().toISOString();

    // Create workflows
    const workflows = db.get('workflows');
    let maxWfId = workflows.value().reduce((max, r) => Math.max(max, parseInt(r.id, 10) || 0), 0);

    WORKFLOW_TEMPLATES.forEach(template => {
        maxWfId++;
        workflows.push({
            id: String(maxWfId),
            projectId: pid,
            ticketType: template.ticketType,
            statuses: [...template.statuses],
            transitions: { ...template.transitions },
            created_at: now,
        }).write();
    });

    // Create maintenance epic
    const backlog = db.get('backlog-items');
    const maxBlId = backlog.value().reduce((max, r) => Math.max(max, parseInt(r.id, 10) || 0), 0);

    backlog.push({
        id: String(maxBlId + 1),
        projectId: pid,
        type: 'EPIC',
        title: 'Maintenance',
        description: 'Default epic for maintenance and operational tasks',
        status: 'TO_DO',
        created_by: 'system',
        created_at: now,
    }).write();

    return { workflows: 4, backlogItems: 1, skipped: false };
}

module.exports = { bootstrapProject };
