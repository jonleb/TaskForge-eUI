# STORY-001: Backend — Backlog Data Model Extension + Seed Data Backfill

## Goal

Extend the `backlog-items` collection schema with `priority`, `assignee_id`, `epic_id`, and `ticket_number` fields. Backfill all 16 existing EPIC records with sensible defaults so the data model is consistent before the create endpoint is added.

## Existing Code

- `mock/db/db.json` — `backlog-items` collection has 16 records (IDs "1"–"16"), one maintenance EPIC per project. Current schema: `{ id, projectId, type, title, description, status, created_by, created_at }`.
- `mock/app/services/bootstrap.js` — creates the maintenance epic on project creation. Must be updated to include the new fields.
- No `priority`, `assignee_id`, `epic_id`, or `ticket_number` fields exist anywhere in the codebase.

## Implementation Plan

### 1. Backfill existing `backlog-items` in `mock/db/db.json`

Add the following fields to each of the 16 existing EPIC records:

```json
{
  "id": "1",
  "projectId": "1",
  "type": "EPIC",
  "title": "Maintenance",
  "description": "Default epic for maintenance and operational tasks",
  "status": "TO_DO",
  "priority": null,
  "assignee_id": null,
  "epic_id": null,
  "ticket_number": 1,
  "created_by": "system",
  "created_at": "2025-01-20T09:00:00.000Z"
}
```

Rationale:
- `priority: null` — EPICs don't have a priority in this taxonomy (priority applies to STORY/BUG/TASK).
- `assignee_id: null` — no assignee for system-created epics.
- `epic_id: null` — EPICs cannot have a parent epic.
- `ticket_number: 1` — the maintenance epic is the first ticket in every project.

### 2. Update `mock/app/services/bootstrap.js`

Update the maintenance epic creation in `bootstrapProject()` to include the new fields:

```javascript
backlog.push({
    id: String(maxBlId + 1),
    projectId: pid,
    type: 'EPIC',
    title: 'Maintenance',
    description: 'Default epic for maintenance and operational tasks',
    status: 'TO_DO',
    priority: null,
    assignee_id: null,
    epic_id: null,
    ticket_number: 1,
    created_by: 'system',
    created_at: now,
}).write();
```

### 3. Update bootstrap unit tests

Update `mock/app/services/bootstrap.test.js` to verify the new fields are present on the created maintenance epic:
- Assert `priority` is `null`
- Assert `assignee_id` is `null`
- Assert `epic_id` is `null`
- Assert `ticket_number` is `1`

## Files Changed

| File | Change |
|------|--------|
| `mock/db/db.json` | Add `priority`, `assignee_id`, `epic_id`, `ticket_number` to all 16 backlog-items |
| `mock/app/services/bootstrap.js` | Add new fields to maintenance epic creation |
| `mock/app/services/bootstrap.test.js` | Update assertions for new fields |

## Acceptance Criteria

- [ ] All 16 existing backlog-items have `priority: null`, `assignee_id: null`, `epic_id: null`, `ticket_number: 1`
- [ ] `bootstrapProject()` creates maintenance epic with the 4 new fields
- [ ] Bootstrap unit tests verify the new fields
- [ ] All existing tests still pass (`npm run test:mock`)
- [ ] Mock server starts without errors (`npm run start-mock-server`)
- [ ] DB restored after test run (`git checkout mock/db/db.json`)
