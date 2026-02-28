# STORY-001 — Backend: Sprint CRUD endpoints & seed data

## Objective
Add sprint persistence and REST endpoints to the mock backend so sprints can be created, listed, updated, and transitioned through lifecycle states.

## Seed data
Add `sprints` collection to `mock/db/db.json`:
- 3 sprints for project "1": one PLANNED, one ACTIVE, one CLOSED
- 1 sprint for project "2": PLANNED

Fields per sprint:
```json
{
  "id": "sp-1",
  "projectId": "1",
  "name": "Sprint 1",
  "goal": "Complete onboarding flow",
  "status": "CLOSED",
  "start_date": "2025-12-01",
  "end_date": "2025-12-14",
  "created_by": "1",
  "created_at": "2025-11-30T10:00:00.000Z",
  "updated_at": "2025-12-14T18:00:00.000Z"
}
```

## Endpoints

### GET /api/projects/:projectId/sprints
- Auth: any project member (all roles). SUPER_ADMIN bypasses.
- Query: `?status=PLANNED,ACTIVE` (comma-separated filter)
- Returns: `Sprint[]` sorted by `created_at desc`

### POST /api/projects/:projectId/sprints
- Auth: PROJECT_ADMIN, PRODUCT_OWNER. SUPER_ADMIN bypasses.
- Body: `{ name: string, goal?: string }`
- Validation: name required, 2–100 chars. Goal max 500 chars.
- Creates sprint with status=PLANNED, no dates, auto-generated id.
- Returns 201 with created sprint.

### PATCH /api/projects/:projectId/sprints/:sprintId
- Auth: PROJECT_ADMIN, PRODUCT_OWNER. SUPER_ADMIN bypasses.
- Body: `{ name?, goal?, start_date?, end_date? }`
- Only PLANNED or ACTIVE sprints can be updated.
- Validation: name 2–100 chars, goal max 500 chars, dates ISO format.
- Returns updated sprint.

### PATCH /api/projects/:projectId/sprints/:sprintId/status
- Auth: PROJECT_ADMIN, PRODUCT_OWNER. SUPER_ADMIN bypasses.
- Body: `{ status: 'ACTIVE' | 'CLOSED', move_open_tickets_to_backlog?: boolean }`
- Transitions: PLANNED→ACTIVE, ACTIVE→CLOSED only.
- PLANNED→ACTIVE: sets start_date if not already set.
- ACTIVE→CLOSED: if any sprint tickets have status ≠ DONE, block unless `move_open_tickets_to_backlog=true`. When true, set those tickets' `sprint_id` to null. Sets end_date.
- Returns updated sprint.

## Route file
Add to `mock/app/routes/project_routes.js` (or a new `sprint_routes.js` if cleaner).

## Tests
Integration tests (Jest + supertest) covering:
- List sprints (empty, with data, status filter)
- Create sprint (success, validation errors, role gating)
- Update sprint (success, CLOSED sprint rejection)
- Status transition (start, close with all done, close with open tickets blocked, close with move flag)
- Auth: non-privileged role blocked from mutations
