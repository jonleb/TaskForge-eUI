# FEATURE-019 Kanban Board - Business Summary

## Business objective
Deliver a project-level board that enables fast daily execution while keeping ticket status changes governed by workflow rules.

## Front-end business needs
- Derive board columns dynamically from the project's workflow statuses (fetched via `GET /api/projects/:projectId/workflows`). Each unique status across all ticket-type workflows becomes a column, preserving the order from the workflow definitions.
- Provide board columns with clear ticket-card visibility (ticket number, type badge, title, priority, assignee).
- Support project-scoped board access with optional sprint filtering (all tickets, or filtered by a specific sprint).
- Enable drag-and-drop ticket movement across status columns for authorized users, constrained by the workflow transition rules (only allow drops on columns that are valid transitions from the ticket's current status).
- Surface deterministic success/failure feedback for status transition attempts (growl on success, error feedback on invalid transition or permission denial).
- Keep board state resilient by reloading authoritative data after transition actions.

## Backend business needs
- Reuse existing `GET /api/projects/:projectId/backlog` endpoint with optional `sprint_id` filter for board data.
- Reuse existing `GET /api/projects/:projectId/workflows` endpoint to provide the column definitions and transition rules.
- Reuse existing `PATCH /api/projects/:projectId/backlog/:ticketNumber` for board-driven status changes (already validates workflow transitions, returns 400 on invalid transition).
- No new backend endpoints needed — the board is a frontend projection of existing data.

## Current implementation context

### Workflow system (already implemented)
- Each project has 4 workflows (one per ticket type: STORY, BUG, TASK, EPIC), created automatically via `bootstrapProject()`.
- Default statuses: STORY/BUG/TASK use `TO_DO → IN_PROGRESS → IN_REVIEW → DONE`; EPIC uses `TO_DO → IN_PROGRESS → DONE`.
- Project admins can customize statuses and transitions per workflow via the Settings page (`PUT /api/projects/:projectId/workflows/:workflowId`).
- Status format: uppercase letters, digits, underscores (regex `^[A-Z][A-Z0-9_]{0,29}$`).
- Transitions are validated server-side: `PATCH /backlog/:ticketNumber` with a `status` field checks `workflow.transitions[currentStatus].includes(newStatus)` and returns 400 if invalid.

### Data model (already implemented)
- `WorkflowStatus` type: currently typed as `'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE'` in `project.models.ts` — but the workflow system supports custom statuses. The board must handle any status string returned by the API.
- `BacklogItem.status`: stores the current workflow status.
- `Workflow.statuses`: ordered array of status strings for a given ticket type.
- `Workflow.transitions`: `Record<status, status[]>` defining valid transitions from each status.

### Existing services (reusable)
- `ProjectService.getWorkflows(projectId)` — fetches all workflows for the project.
- `ProjectService.getBacklog(projectId, params)` — fetches backlog items with optional filters.
- `ProjectService.updateTicket(projectId, ticketNumber, payload)` — updates ticket fields including status.
- `ProjectService.getSprints(projectId)` — fetches sprints for the sprint filter dropdown.
- `PermissionService.hasProjectRole()` — checks user's project role for authorization.
- `EuiGrowlService` — success/error notifications.

## Role coverage for this feature
- Project members with read access (any role) can view the board in their project scope.
- Status transition actions follow ticket-update authorization rules: the backend validates role and ownership constraints on `PATCH /backlog/:ticketNumber`.
- Unauthorized or invalid transition attempts are blocked with 400 (invalid transition) or 403 (forbidden) responses, surfaced as error feedback in the UI.

## Expected business outcomes
- Faster ticket flow updates during day-to-day delivery.
- Better team visibility into work-in-progress and bottlenecks.
- Reduced process drift through enforced workflow transition controls.
- Board columns always reflect the project's actual workflow configuration — no hardcoded assumptions.
