# STORY-002: Backend — Create Ticket Endpoint

## Goal

Add `POST /api/projects/:projectId/backlog` to create STORY, BUG, or TASK tickets with full taxonomy validation, auto-numbering, and role-based authorization. Also extend `GET /api/projects/:projectId/backlog` with sorting support.

## Existing Code

- `mock/app/routes/project_routes.js` — has `GET /api/projects/:projectId/backlog` (read-only, filters by projectId, optional `?type=`). No POST endpoint.
- `mock/app/middleware/authorize.js` — `requireProjectRole(db, ...roles)` middleware. SUPER_ADMIN bypasses.
- `mock/db/db.json` — `backlog-items` collection with extended schema (from STORY-001): `{ id, projectId, type, title, description, status, priority, assignee_id, epic_id, ticket_number, created_by, created_at }`.
- `workflows` collection — defines valid statuses per ticket type per project.
- `project-members` collection — used for assignee validation.
- `ALL_PROJECT_ROLES` constant: `['PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER', 'VIEWER']`.
- `VIEWER` is the read-only role that must be excluded from ticket creation.

## Implementation Plan

### 1. Add `POST /api/projects/:projectId/backlog`

```
POST /api/projects/:projectId/backlog
  Middleware: authMiddleware, requireProjectRole(db, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER')
  Body: {
    type: string,        // required: "STORY" | "BUG" | "TASK"
    title: string,       // required: min 2 chars, max 200 chars
    description?: string, // optional: max 2000 chars
    priority: string,    // required: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
    assignee_id?: string, // optional: must be active project member
    epic_id?: string     // optional: must be existing EPIC in same project
  }
  Response: 201 Created — full BacklogItem record
```

#### Validation rules

| Field | Rule | Error |
|-------|------|-------|
| `type` | Must be one of `STORY`, `BUG`, `TASK` | 400 `"Invalid type. Must be one of: STORY, BUG, TASK"` |
| `type` | `EPIC` is explicitly rejected | 400 `"Cannot create EPIC tickets. EPICs are system-managed."` |
| `title` | Required, trimmed, 2–200 chars | 400 `"Title is required (2–200 characters)"` |
| `description` | Optional, trimmed, max 2000 chars | 400 `"Description must not exceed 2000 characters"` |
| `priority` | Must be one of `CRITICAL`, `HIGH`, `MEDIUM`, `LOW` | 400 `"Invalid priority. Must be one of: CRITICAL, HIGH, MEDIUM, LOW"` |
| `assignee_id` | If provided, must be an active user AND a member of the project | 400 `"Assignee must be an active project member"` |
| `epic_id` | If provided, must be an existing backlog-item of type EPIC in the same project | 400 `"Epic not found in this project"` |
| project | Must exist and be active (`is_active: true`) | 400 `"Cannot create tickets in an archived project"` |

#### Auto-numbering

```javascript
const projectItems = db.get('backlog-items').filter({ projectId }).value();
const maxNumber = projectItems.reduce((max, item) => Math.max(max, item.ticket_number || 0), 0);
const ticketNumber = maxNumber + 1;
```

#### Status assignment

New tickets always start at `TO_DO`. The endpoint validates that `TO_DO` is a valid status in the project's workflow for the given ticket type:

```javascript
const workflow = db.get('workflows').find({ projectId, ticketType: type }).value();
if (!workflow || !workflow.statuses.includes('TO_DO')) {
    return res.status(400).json({ message: 'No valid workflow found for this ticket type' });
}
```

#### Response shape

```json
{
  "id": "17",
  "projectId": "1",
  "type": "STORY",
  "title": "Implement login page",
  "description": "As a user I want to log in",
  "status": "TO_DO",
  "priority": "MEDIUM",
  "assignee_id": "3",
  "epic_id": "1",
  "ticket_number": 2,
  "created_by": "1",
  "created_at": "2026-02-27T10:00:00.000Z"
}
```

### 2. Extend `GET /api/projects/:projectId/backlog` with sorting

Add optional `_sort` and `_order` query params to the existing GET endpoint:

```
GET /api/projects/:projectId/backlog?_sort=ticket_number&_order=desc&type=STORY
```

- `_sort`: field name to sort by (default: `created_at`)
- `_order`: `asc` or `desc` (default: `desc`)
- Existing `?type=` filter continues to work alongside sorting.

### 3. Integration tests

Add to `project_routes.test.js`:

| # | Test | Expected |
|---|------|----------|
| 1 | POST creates a STORY with all fields | 201, full record with `ticket_number` |
| 2 | POST creates a BUG with minimal fields (no assignee, no epic) | 201, `assignee_id: null`, `epic_id: null` |
| 3 | POST creates a TASK with priority CRITICAL | 201, `priority: "CRITICAL"` |
| 4 | POST rejects EPIC type | 400, error message |
| 5 | POST rejects invalid type | 400 |
| 6 | POST rejects missing title | 400 |
| 7 | POST rejects title too short (1 char) | 400 |
| 8 | POST rejects title too long (201 chars) | 400 |
| 9 | POST rejects invalid priority | 400 |
| 10 | POST rejects missing priority | 400 |
| 11 | POST rejects assignee who is not a project member | 400 |
| 12 | POST rejects assignee who is inactive | 400 |
| 13 | POST rejects epic_id that doesn't exist | 400 |
| 14 | POST rejects epic_id that is not an EPIC type | 400 |
| 15 | POST requires auth | 401 |
| 16 | POST rejects VIEWER role | 403 |
| 17 | SUPER_ADMIN can create tickets | 201 |
| 18 | POST auto-increments ticket_number per project | 201, sequential numbers |
| 19 | POST sets status to TO_DO | 201, `status: "TO_DO"` |
| 20 | POST rejects creation in archived project | 400 |
| 21 | GET with `_sort=ticket_number&_order=asc` returns sorted results | 200, sorted |
| 22 | POST rejects description over 2000 chars | 400 |

## Files Changed

| File | Change |
|------|--------|
| `mock/app/routes/project_routes.js` | Add POST endpoint, extend GET with sorting |
| `mock/app/routes/project_routes.test.js` | Add ~22 integration tests |

## Acceptance Criteria

- [ ] `POST /api/projects/:projectId/backlog` creates STORY, BUG, or TASK tickets
- [ ] EPIC type is explicitly rejected with clear error message
- [ ] All validation rules enforced (type, title length, priority, assignee membership, epic existence)
- [ ] `ticket_number` auto-increments per project
- [ ] Status is always set to `TO_DO` and validated against project workflow
- [ ] VIEWER role gets 403
- [ ] SUPER_ADMIN can create tickets in any project
- [ ] Archived projects reject ticket creation
- [ ] GET endpoint supports `_sort` and `_order` query params
- [ ] All integration tests pass (`npm run test:mock`)
- [ ] DB restored after test run (`git checkout mock/db/db.json`)
