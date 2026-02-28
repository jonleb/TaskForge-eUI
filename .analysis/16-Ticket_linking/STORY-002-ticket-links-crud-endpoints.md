# STORY-002: Backend — Ticket Links CRUD Endpoints

## Objective

Add POST/GET/DELETE endpoints for creating, listing, and removing links between tickets within a project context.

## Endpoints

### GET /api/projects/:projectId/backlog/:ticketNumber/links
- Returns all links where the ticket is source or target
- Auth: any project member
- Response: enriched link objects with link type labels and ticket info

### POST /api/projects/:projectId/backlog/:ticketNumber/links
- Creates a new link from this ticket to a target ticket
- Body: `{ linkTypeId, targetTicketNumber, targetProjectId? }`
- Auth: SUPER_ADMIN, PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER (own tickets)
- Validates: link type exists, target ticket exists, no self-link, no duplicate
- Response: 201 with created link

### DELETE /api/projects/:projectId/backlog/:ticketNumber/links/:linkId
- Deletes a link
- Auth: SUPER_ADMIN, PROJECT_ADMIN, or link creator
- Response: 204
- Errors: 404 not found, 403 forbidden

## Unit Tests (~12)

| # | Test |
|---|------|
| 1 | GET returns empty array when no links |
| 2 | GET returns links for a ticket |
| 3 | GET returns 401 without token |
| 4 | POST creates a link (SUPER_ADMIN) |
| 5 | POST creates a link (DEVELOPER) |
| 6 | POST rejects self-link (400) |
| 7 | POST rejects missing linkTypeId (400) |
| 8 | POST rejects invalid target ticket (400) |
| 9 | POST rejects duplicate link (409) |
| 10 | POST rejects VIEWER (403) |
| 11 | DELETE removes a link (creator) |
| 12 | DELETE returns 404 for unknown link |

## Files Modified

| File | Modification |
|------|-------------|
| `mock/app/routes/project_routes.js` | Add link endpoints under project/backlog routes |
| `mock/app/routes/project_routes.test.js` | Add ~12 integration tests |
