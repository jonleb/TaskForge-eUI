const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory');
const { bootstrapProject } = require('./bootstrap');

function createDb(data = {}) {
    const adapter = new Memory();
    const db = low(adapter);
    db.defaults({
        workflows: [],
        'backlog-items': [],
        ...data,
    }).write();
    return db;
}

describe('bootstrapProject', () => {
    it('creates 4 workflows for a new project', () => {
        const db = createDb();
        const result = bootstrapProject(db, '99');

        expect(result.workflows).toBe(4);
        expect(result.skipped).toBe(false);

        const workflows = db.get('workflows').filter({ projectId: '99' }).value();
        expect(workflows).toHaveLength(4);
    });

    it('creates 1 maintenance epic in backlog-items', () => {
        const db = createDb();
        const result = bootstrapProject(db, '99');

        expect(result.backlogItems).toBe(1);

        const items = db.get('backlog-items').filter({ projectId: '99' }).value();
        expect(items).toHaveLength(1);
        expect(items[0].type).toBe('EPIC');
        expect(items[0].title).toBe('Maintenance');
        expect(items[0].status).toBe('TO_DO');
        expect(items[0].created_by).toBe('system');
    });

    it('STORY workflow has 4 statuses with IN_REVIEW', () => {
        const db = createDb();
        bootstrapProject(db, '99');

        const story = db.get('workflows')
            .find({ projectId: '99', ticketType: 'STORY' })
            .value();

        expect(story.statuses).toEqual(['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE']);
        expect(story.transitions.IN_PROGRESS).toContain('IN_REVIEW');
        expect(story.transitions.IN_REVIEW).toContain('DONE');
    });

    it('EPIC workflow has 3 statuses without IN_REVIEW', () => {
        const db = createDb();
        bootstrapProject(db, '99');

        const epic = db.get('workflows')
            .find({ projectId: '99', ticketType: 'EPIC' })
            .value();

        expect(epic.statuses).toEqual(['TO_DO', 'IN_PROGRESS', 'DONE']);
        expect(epic.statuses).not.toContain('IN_REVIEW');
        expect(epic.transitions.IN_PROGRESS).toContain('DONE');
        expect(epic.transitions.IN_PROGRESS).not.toContain('IN_REVIEW');
    });

    it('is idempotent — skips if workflows already exist for the project', () => {
        const db = createDb();
        bootstrapProject(db, '99');
        const result = bootstrapProject(db, '99');

        expect(result.skipped).toBe(true);
        expect(result.workflows).toBe(0);
        expect(result.backlogItems).toBe(0);

        // Still only 4 workflows, not 8
        const workflows = db.get('workflows').filter({ projectId: '99' }).value();
        expect(workflows).toHaveLength(4);
    });

    it('generates unique auto-incremented IDs', () => {
        const db = createDb({
            workflows: [{ id: '10', projectId: '1', ticketType: 'STORY' }],
            'backlog-items': [{ id: '5', projectId: '1' }],
        });

        bootstrapProject(db, '99');

        const workflows = db.get('workflows').filter({ projectId: '99' }).value();
        const ids = workflows.map(w => parseInt(w.id, 10));
        expect(ids).toEqual([11, 12, 13, 14]);

        const items = db.get('backlog-items').filter({ projectId: '99' }).value();
        expect(items[0].id).toBe('6');
    });
});
