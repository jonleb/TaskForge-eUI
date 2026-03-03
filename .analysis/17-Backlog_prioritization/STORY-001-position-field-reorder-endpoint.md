# STORY-001: Backend — Position Field & Reorder Endpoint

## Objective

Add a `position` field to all backlog items for explicit ordering, seed positions for existing items, and expose a PUT endpoint to persist reorder operations.

## Data Model Changes

Add `position: number` to every backlog item in `mock/db/db.json`. Seed values based on current order (position 1 = highest priority). New tickets created via POST should auto-assign `position = max + 1` (lowest priority).

## Endpoints

### PUT /api/projects/:projectId/backlog/reorder
- Persists new positions for a batch of tickets
- Body: `{ items: [{ ticket_number: number, position: number }] }`
- Auth: SUPER_ADMIN, PROJECT_ADMIN, PRODUCT_OWNER
- Validates: all ticket_numbers belong to the project, positions are positive integers, no duplicate positions, no duplicate ticket_numbers
- Response: 200 with `{ updated: number }` (count of updated items)
- Errors: 400 validation, 403 forbidden

### GET /api/projects/:projectId/backlog (modification)
- Add `position` as a valid sort field
- Default sort should remain `ticket_number desc` (no breaking change)

### POST /api/projects/:projectId/backlog (modification)
- Auto-assign `position` to new tickets (max existing position + 1)

## Integration Tests (~10)

| # | Test |
|---|------|
| 1 | PUT reorder updates positions for valid items |
| 2 | PUT reorder returns 400 for empty items array |
| 3 | PUT reorder returns 400 for missing ticket_number |
| 4 | PUT reorder returns 400 for non-positive position |
| 5 | PUT reorder returns 400 for duplicate positions |
| 6 | PUT reorder returns 400 for duplicate ticket_numbers |
| 7 | PUT reorder returns 400 for ticket not in project |
| 8 | PUT reorder returns 403 for VIEWER |
| 9 | PUT reorder returns 403 for REPORTER |
| 10 | POST backlog auto-assigns position to new ticket |

## Files Modified

| File | Modification |
|------|-------------|
| `mock/db/db.json` | Add `position` field to all backlog items |
| `mock/app/routes/project_routes.js` | Add PUT reorder endpoint, modify POST to auto-assign position |
| `mock/app/routes/project_routes.test.js` | Add ~10 integration tests |
