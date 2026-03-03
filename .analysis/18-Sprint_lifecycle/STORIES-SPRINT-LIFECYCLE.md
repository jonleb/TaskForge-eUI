# STORIES — FEATURE-018 Sprint Lifecycle

## Overview

Implements Jira-style sprint operations: create, list, plan (assign tickets), start, and close sprints with lifecycle guardrails. Sprints are project-scoped with three states: `PLANNED → ACTIVE → CLOSED`.

## Stories

### STORY-001 — Backend: Sprint CRUD endpoints & seed data
Add `sprints` collection to `mock/db/db.json` with seed data. Implement REST endpoints:
- `GET /api/projects/:projectId/sprints` — list sprints (filterable by status)
- `POST /api/projects/:projectId/sprints` — create sprint (PLANNED state)
- `PATCH /api/projects/:projectId/sprints/:sprintId` — update sprint (name, goal, start_date, end_date)
- `PATCH /api/projects/:projectId/sprints/:sprintId/status` — transition status (start/close)
- Close guardrail: block close if unresolved tickets exist unless `move_open_tickets_to_backlog=true`

Role gating: SUPER_ADMIN, PROJECT_ADMIN, PRODUCT_OWNER for mutations. All project members for read.

### STORY-002 — Backend: Sprint planning endpoints
- `PUT /api/projects/:projectId/sprints/:sprintId/items` — assign tickets to sprint (set `sprint_id` on backlog items)
- `DELETE /api/projects/:projectId/sprints/:sprintId/items/:ticketNumber` — remove ticket from sprint
- Add `sprint_id` field to backlog items in seed data (most null, some assigned to seed sprints)
- Backlog GET endpoint: support `sprint_id` filter param

### STORY-003 — Frontend: Sprint models & service methods
Add Sprint interface, SprintStatus type, and all service methods to ProjectService. Add i18n keys for EN/FR.

### STORY-004 — Frontend: Sprint list page with lifecycle actions
New `SprintsComponent` at route `projects/:projectId/sprints`. Displays sprints grouped by status using collapsible `eui-card` sections. Each sprint card shows name, goal, dates, ticket count, and lifecycle action buttons (Start, Close). Create Sprint button in page header. Add "Sprints" to sidebar navigation.

### STORY-005 — Frontend: Create sprint dialog & sprint planning
Create Sprint dialog (name + optional goal). Sprint detail view with ticket assignment: shows unassigned backlog tickets, allows adding/removing tickets to/from the sprint via checkbox selection.

### STORY-006 — Frontend: Close sprint confirmation dialog
When closing a sprint with unresolved tickets (status ≠ DONE), show a confirmation dialog listing the unresolved tickets and offering to move them back to backlog. Calls the close endpoint with `move_open_tickets_to_backlog=true`.

## Dependencies
- STORY-001 before STORY-002 (sprint collection must exist)
- STORY-003 before STORY-004, STORY-005, STORY-006
- STORY-004 before STORY-005, STORY-006
