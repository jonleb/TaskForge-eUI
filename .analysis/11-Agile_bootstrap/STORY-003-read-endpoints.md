# STORY-003: Backend — Workflow and Backlog Read Endpoints

## Goal

Expose read endpoints for workflows and backlog items so the frontend can display bootstrapped agile data.

## Existing Code

- `mock/app/routes/project_routes.js` — has project CRUD, member endpoints. No workflow/backlog endpoints.
- `mock/db/db.json` — `workflows` and `backlog-items` collections populated (from STORY-001/002).
- Auth pattern: `authMiddleware` + `requireProjectRole(db, ...ALL_PROJECT_ROLES)` for project-scoped reads.

## Implementation Plan

### 1. Add `GET /api/projects/:projectId/workflows`

```
GET /api/projects/:projectId/workflows
  Middleware: authMiddleware, requireProjectRole(db, ...ALL_PROJECT_ROLES)
  Response: Workflow[]
```

Returns all workflows for the project, sorted by ticket type alphabetically.

Response shape:
```json
[
  {
    "id": "1",
    "projectId": "1",
    "ticketType": "BUG",
    "statuses": ["TO_DO", "IN_PROGRESS", "IN_REVIEW", "DONE"],
    "transitions": { ... },
    "created_at": "..."
  }
]
```

Returns empty array if no workflows exist (project not yet bootstrapped).

### 2. Add `GET /api/projects/:projectId/backlog`

```
GET /api/projects/:projectId/backlog
  Middleware: authMiddleware, requireProjectRole(db, ...ALL_PROJECT_ROLES)
  Query params: type (optional, filter by item type)
  Response: BacklogItem[]
```

Returns all backlog items for the project, sorted by `created_at` descending.

Optional filter: `?type=EPIC` returns only epics.

Response shape:
```json
[
  {
    "id": "1",
    "projectId": "1",
    "type": "EPIC",
    "title": "Maintenance",
    "description": "Default epic for maintenance and operational tasks",
    "status": "TO_DO",
    "created_by": "system",
    "created_at": "..."
  }
]
```

### 3. Integration tests

Add to `project_routes.test.js`:

| # | Test | Expected |
|---|------|----------|
| 1 | GET workflows returns 4 records for seeded project | 200, array of 4 |
| 2 | GET workflows returns empty array for project without workflows | 200, `[]` |
| 3 | GET workflows requires auth | 401 |
| 4 | GET workflows requires project membership | 403 |
| 5 | SUPER_ADMIN can access any project's workflows | 200 |
| 6 | GET backlog returns items for seeded project | 200, array with maintenance epic |
| 7 | GET backlog with `?type=EPIC` filters correctly | 200, only EPIC items |
| 8 | GET backlog returns empty array for project without items | 200, `[]` |
| 9 | GET backlog requires auth | 401 |
| 10 | GET backlog requires project membership | 403 |

## Files Changed

| File | Change |
|------|--------|
| `mock/app/routes/project_routes.js` | Add 2 GET endpoints (workflows, backlog) |
| `mock/app/routes/project_routes.test.js` | Add 10 integration tests |

## Acceptance Criteria

- [ ] `GET /api/projects/:projectId/workflows` returns workflows for the project
- [ ] `GET /api/projects/:projectId/backlog` returns backlog items for the project
- [ ] Backlog supports `?type=` filter
- [ ] Both endpoints require authentication (401 without token)
- [ ] Both endpoints require project membership (403 for non-members)
- [ ] SUPER_ADMIN bypasses membership check
- [ ] Empty arrays returned for projects without data (not 404)
- [ ] All integration tests pass (`npm run test:mock`)
- [ ] DB restored after test run (`git checkout mock/db/db.json`)
