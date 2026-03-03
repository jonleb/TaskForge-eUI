# STORY-001: Backend — Workflow Update Endpoint

## Objective

Add a PUT endpoint to update a workflow's statuses and transitions for a given project and ticket type. Enforce strict validation to prevent breaking existing tickets that rely on current statuses.

## Existing Code

- `mock/app/routes/project_routes.js` — contains `GET /api/projects/:projectId/workflows` (line ~217). All endpoints are inside the `db.then(db => { ... })` block.
- `mock/app/middleware/authorize.js` — `requireProjectRole(db, ...roles)` checks project membership. SUPER_ADMIN automatic bypass.
- `mock/app/middleware/auth.js` — `authMiddleware` validates JWT and sets `req.user` with `{ userId, username, role }`.
- `mock/db/db.json` — `workflows` collection (4 entries per project). `backlog-items` collection references `status` values from workflows.
- `mock/app/services/bootstrap.js` — `bootstrapProject()` creates default workflows with `FOUR_STATUS_TRANSITIONS` and `THREE_STATUS_TRANSITIONS` templates.
- `mock/app/routes/project_routes.test.js` — existing tests. Helper `getTokenFor(username)` available.

### Key Users for Tests

| Username | ID | Global Role | Project 1 Membership |
|----------|-----|-------------|----------------------|
| `superadmin` | 1 | SUPER_ADMIN | — (bypass) |
| `projectadmin` | 2 | PROJECT_ADMIN | PROJECT_ADMIN |
| `developer` | 4 | DEVELOPER | DEVELOPER |
| `viewer` | 6 | VIEWER | VIEWER |

### Current Workflow Shape (db.json)

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
  "created_at": "2025-01-20T09:00:00.000Z"
}
```

## Implementation Plan

### 1. Add `PUT /api/projects/:projectId/workflows/:workflowId` in `project_routes.js`

Update a workflow's statuses and transitions.

```
PUT /api/projects/:projectId/workflows/:workflowId
  Middleware: authMiddleware, requireProjectRole(db, 'PROJECT_ADMIN')
  Body: { statuses: string[], transitions: Record<string, string[]> }
```

#### Processing Pipeline

1. Find workflow by `workflowId` — 404 if not found
2. Verify workflow belongs to `projectId` — 404 if mismatch
3. Validate body:
   - `statuses` required, must be non-empty array of strings
   - Each status must be a non-empty uppercase string (alphanumeric + underscore), max 30 chars
   - No duplicate statuses
   - `transitions` required, must be an object
4. Validate transition integrity:
   - Every key in `transitions` must be a status in `statuses`
   - Every target in transition arrays must be a status in `statuses`
   - No self-transitions (a status cannot transition to itself)
   - Every status must have a key in `transitions` (can be empty array)
5. Safety check — statuses in use:
   - Query `backlog-items` for tickets in this project with matching `ticketType` (derived from the workflow's `ticketType`)
   - Collect all distinct `status` values currently used by those tickets
   - If any used status is being removed (present in current `statuses` but absent from new `statuses`) → 409 Conflict with message listing the blocked statuses
6. Update the workflow record: set `statuses`, `transitions`, `updated_at = now()`
7. Return 200 with updated workflow

#### Error Responses

| Status | Condition | Body |
|--------|-----------|------|
| 400 | `statuses` missing or empty | `{ "message": "statuses must be a non-empty array" }` |
| 400 | Duplicate status | `{ "message": "Duplicate status: <name>" }` |
| 400 | Invalid status format | `{ "message": "Invalid status format: <name>. Use uppercase letters, digits, and underscores (max 30 chars)" }` |
| 400 | `transitions` missing or not object | `{ "message": "transitions must be an object" }` |
| 400 | Transition key not in statuses | `{ "message": "Transition key '<key>' is not a defined status" }` |
| 400 | Transition target not in statuses | `{ "message": "Transition target '<target>' from '<key>' is not a defined status" }` |
| 400 | Self-transition | `{ "message": "Self-transition not allowed: '<status>'" }` |
| 400 | Missing transition key | `{ "message": "Missing transitions for status: '<status>'" }` |
| 403 | Insufficient role | `{ "message": "Forbidden" }` (via `requireProjectRole`) |
| 404 | Workflow not found | `{ "message": "Workflow not found" }` |
| 409 | Status in use by tickets | `{ "message": "Cannot remove statuses currently in use: <list>" }` |

### 2. Integration tests in `project_routes.test.js`

~18 tests in a `describe('PUT /api/projects/:projectId/workflows/:workflowId')` block.

| # | Test |
|---|------|
| 1 | Returns 200 and updates statuses + transitions |
| 2 | Returns updated workflow with new statuses |
| 3 | Returns 404 for non-existent workflow ID |
| 4 | Returns 404 for workflow belonging to different project |
| 5 | Returns 400 when statuses is missing |
| 6 | Returns 400 when statuses is empty array |
| 7 | Returns 400 for duplicate status |
| 8 | Returns 400 for invalid status format (lowercase) |
| 9 | Returns 400 when transitions is missing |
| 10 | Returns 400 for transition key not in statuses |
| 11 | Returns 400 for transition target not in statuses |
| 12 | Returns 400 for self-transition |
| 13 | Returns 400 for missing transition key for a status |
| 14 | Returns 409 when removing a status used by existing tickets |
| 15 | Allows removing unused statuses |
| 16 | Allows adding new statuses |
| 17 | Returns 403 for DEVELOPER role |
| 18 | Returns 401 without token |

### 3. DB changes

No schema changes needed. The `workflows` collection already supports the required shape. The `updated_at` field will be added to updated records (new field, backward-compatible).

## Files Modified

| File | Modification |
|------|----|
| `mock/app/routes/project_routes.js` | Add PUT endpoint (~80 lines) |
| `mock/app/routes/project_routes.test.js` | Add 1 describe block (~18 tests) |

## Acceptance Criteria

- [ ] PUT updates workflow statuses and transitions (200)
- [ ] PUT validates statuses: non-empty, no duplicates, uppercase format
- [ ] PUT validates transitions: keys match statuses, targets match statuses, no self-transitions, all statuses have a key
- [ ] PUT rejects removal of statuses used by existing tickets (409)
- [ ] PUT allows adding new statuses freely
- [ ] PUT allows removing unused statuses
- [ ] PUT sets `updated_at` timestamp on the workflow
- [ ] Only SUPER_ADMIN and PROJECT_ADMIN have access (DEVELOPER/REPORTER/VIEWER → 403)
- [ ] Without token → 401
- [ ] 404 for non-existent or mismatched workflow
- [ ] Integration tests cover all cases (~18 tests)
- [ ] All mock server tests pass (`npm run test:mock`)
