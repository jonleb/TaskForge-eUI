# STORIES — FEATURE-019 Kanban Board

## Overview
3 stories to deliver a project-level Kanban board with dynamic workflow-driven columns, sprint filtering, and drag & drop status transitions.

## Stories

| # | Story | Scope | Depends on |
|---|-------|-------|------------|
| 1 | Board page with dynamic columns | Route, component, workflow-driven columns, ticket cards, sprint filter, i18n (en/fr) | — |
| 2 | Drag & drop status transitions | CDK DnD across columns, workflow transition validation, error feedback, i18n (en/fr) | STORY-001 |

## Notes
- eUI has no kanban/board component — use Angular CDK `DragDropModule` (same pattern as sprints/backlog DnD).
- Board columns are derived from the union of all workflow statuses for the project (preserving order from workflow definitions).
- Sprint filter uses `select[euiSelect]` directive.
- Ticket cards show: ticket number, type badge, title, priority, assignee.
- Status transitions are validated server-side via `PATCH /backlog/:ticketNumber` (returns 400 on invalid transition).
- No new backend endpoints needed.
