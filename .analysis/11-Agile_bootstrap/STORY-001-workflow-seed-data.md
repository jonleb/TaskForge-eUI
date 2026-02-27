# STORY-001: Backend — Workflow and Backlog Data Model + Seed Data

## Goal

Add `workflows` and `backlog-items` collections to `mock/db/db.json` with seed data for all 14 existing projects, establishing the data model for the agile bootstrap feature.

## Existing Code

- `mock/db/db.json` — 4 collections: `user-details`, `users`, `projects`, `project-members`. 14 projects exist (IDs "1"–"14").
- No workflow or backlog collections exist yet.

## Implementation Plan

### 1. Add `workflows` collection to `mock/db/db.json`

Each project gets 4 workflow records (one per ticket type):

| Ticket Type | Statuses | Transitions |
|-------------|----------|-------------|
| `STORY` | TO_DO, IN_PROGRESS, IN_REVIEW, DONE | TO_DO→IN_PROGRESS, IN_PROGRESS→IN_REVIEW/TO_DO, IN_REVIEW→DONE/IN_PROGRESS, DONE→∅ |
| `BUG` | TO_DO, IN_PROGRESS, IN_REVIEW, DONE | Same as STORY |
| `TASK` | TO_DO, IN_PROGRESS, IN_REVIEW, DONE | Same as STORY |
| `EPIC` | TO_DO, IN_PROGRESS, DONE | TO_DO→IN_PROGRESS, IN_PROGRESS→DONE/TO_DO, DONE→∅ |

Schema per record:

```json
{
  "id": "1",
  "projectId": "1",
  "ticketType": "STORY",
  "statuses": ["TO_DO", "IN_PROGRESS", "IN_REVIEW", "DONE"],
  "transitions": {
    "TO_DO": ["IN_PROGRESS"],
    "IN_PROGRESS": ["IN_REVIEW", "TO_DO"],
    "IN_REVIEW": ["DONE", "IN_PROGRESS"],
    "DONE": []
  },
  "created_at": "2026-01-20T09:00:00.000Z"
}
```

Total: 14 projects × 4 types = 56 workflow records. IDs: "1"–"56".

### 2. Add `backlog-items` collection to `mock/db/db.json`

Each project gets 1 default maintenance epic:

```json
{
  "id": "1",
  "projectId": "1",
  "type": "EPIC",
  "title": "Maintenance",
  "description": "Default epic for maintenance and operational tasks",
  "status": "TO_DO",
  "created_by": "system",
  "created_at": "2026-01-20T09:00:00.000Z"
}
```

Total: 14 records. IDs: "1"–"14".

### 3. No new endpoints or routes in this story

This story only adds seed data. Read endpoints come in STORY-003.

## Files Changed

| File | Change |
|------|--------|
| `mock/db/db.json` | Add `workflows` (56 records) and `backlog-items` (14 records) collections |

## Acceptance Criteria

- [ ] `workflows` collection exists with 56 records (4 per project × 14 projects)
- [ ] Each workflow has `id`, `projectId`, `ticketType`, `statuses`, `transitions`, `created_at`
- [ ] STORY/BUG/TASK workflows have 4 statuses with review step
- [ ] EPIC workflows have 3 statuses (no review step)
- [ ] `backlog-items` collection exists with 14 records (1 per project)
- [ ] Each backlog item has `id`, `projectId`, `type`, `title`, `description`, `status`, `created_by`, `created_at`
- [ ] All existing tests still pass (`npm run test:mock`)
- [ ] Mock server starts without errors (`npm run start-mock-server`)
