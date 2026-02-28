# STORY-002 — Backend: Sprint planning endpoints

## Objective
Allow tickets to be assigned to and removed from sprints. Add `sprint_id` field to backlog items.

## Data changes
- Add `sprint_id` field (nullable string) to all backlog items in `mock/db/db.json`.
- Assign some tickets in project "1" to the ACTIVE sprint (sp-2) and some to the PLANNED sprint (sp-3).
- Most tickets remain `sprint_id: null` (unassigned / in backlog).

## Endpoints

### PUT /api/projects/:projectId/sprints/:sprintId/items
- Auth: PROJECT_ADMIN, PRODUCT_OWNER. SUPER_ADMIN bypasses.
- Body: `{ ticket_numbers: number[] }`
- Validation:
  - Sprint must exist and belong to project.
  - Sprint must be PLANNED or ACTIVE (cannot add to CLOSED).
  - Each ticket_number must exist in the project.
  - Tickets already in another sprint are rejected (must remove first).
- Sets `sprint_id` on each matching backlog item.
- Returns `{ assigned: number }`.

### DELETE /api/projects/:projectId/sprints/:sprintId/items/:ticketNumber
- Auth: PROJECT_ADMIN, PRODUCT_OWNER. SUPER_ADMIN bypasses.
- Sprint must be PLANNED or ACTIVE.
- Ticket must currently belong to this sprint.
- Sets `sprint_id = null` on the ticket.
- Returns `{ removed: true }`.

### Backlog GET enhancement
- Add `sprint_id` query param support to `GET /api/projects/:projectId/backlog`:
  - `?sprint_id=sp-2` — tickets in that sprint
  - `?sprint_id=null` — unassigned tickets (backlog only)
  - No param — all tickets (existing behavior)

## Tests
- Assign tickets to sprint (success, validation errors)
- Remove ticket from sprint (success, not in sprint error)
- Backlog filter by sprint_id
- Role gating for mutations
