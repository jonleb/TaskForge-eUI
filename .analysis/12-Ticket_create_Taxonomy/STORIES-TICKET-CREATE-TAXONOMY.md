# FEATURE-012 Ticket Create Taxonomy — Story Breakdown

## Context

This feature enables teams to create tickets (STORY, BUG, TASK) within a project using a consistent taxonomy (type, priority, status). Tickets are created inside the project backlog, scoped to a parent epic, and follow the project's workflow for initial status assignment.

The application currently has:
- Backend: `mock/db/db.json` with `backlog-items` collection containing only EPIC-type items (1 maintenance epic per project, 16 total). No STORY/BUG/TASK items exist yet.
- Backend: `GET /api/projects/:projectId/backlog` returns backlog items with optional `?type=` filter. No create endpoint exists.
- Backend: `POST /api/projects` triggers `bootstrapProject()` which seeds 4 workflows + 1 maintenance epic. Workflows define valid statuses per ticket type.
- Frontend: `BacklogItem` interface has `{ id, projectId, type, title, description, status, created_by, created_at }`. No `priority`, `assignee_id`, or `epic_id` fields exist.
- Frontend: `DashboardComponent` shows a backlog summary (count + list). No dedicated Backlog page exists.
- Frontend: Sidebar has a "Backlog" entry pointing to `/projects/:id/backlog` but no route or component is registered for it.
- Frontend: `TicketType`, `WorkflowStatus`, `TICKET_TYPES`, `WORKFLOW_STATUSES` constants exist.
- Authorization: `requireProjectRole(db, ...roles)` middleware. VIEWER role is read-only. SUPER_ADMIN bypasses membership.

## Data Model Evolution

### Extended `backlog-items` schema

The existing `BacklogItem` record gains new fields:

```json
{
  "id": "17",
  "projectId": "1",
  "type": "STORY",
  "title": "Implement login page",
  "description": "As a user I want to log in so I can access the app",
  "status": "TO_DO",
  "priority": "MEDIUM",
  "assignee_id": "3",
  "epic_id": "1",
  "ticket_number": 2,
  "created_by": "1",
  "created_at": "2026-02-27T10:00:00.000Z"
}
```

New fields:
- `priority`: `"CRITICAL" | "HIGH" | "MEDIUM" | "LOW"` — required on creation, defaults to `"MEDIUM"`.
- `assignee_id`: `string | null` — optional, must reference an active project member.
- `epic_id`: `string | null` — optional, must reference an existing EPIC in the same project.
- `ticket_number`: `number` — auto-incremented per project (1-based). Used for display as `{PROJECT_KEY}-{ticket_number}` (e.g. `TF-2`).

Existing EPIC records (seed data) are backfilled with `priority: null`, `assignee_id: null`, `epic_id: null`, `ticket_number: 1` (the maintenance epic is ticket #1 in each project).

### Priority taxonomy

| Value | Display (EN) | Display (FR) |
|-------|-------------|-------------|
| `CRITICAL` | Critical | Critique |
| `HIGH` | High | Haute |
| `MEDIUM` | Medium | Moyenne |
| `LOW` | Low | Basse |

## eUI Components Used

| Component | Import | Usage |
|-----------|--------|-------|
| `eui-dialog` | `EUI_DIALOG` from `@eui/components/eui-dialog` | Create ticket dialog |
| `eui-select` | `EuiSelectDirective` from `@eui/components/eui-select` | Type, priority, epic, assignee dropdowns |
| `euiTextArea` | `EuiTextareaComponent` from `@eui/components/eui-textarea` | Description field |
| `euiInputText` | `EuiInputTextDirective` from `@eui/components/eui-input-text` | Title field |
| `eui-page` | `EUI_PAGE` from `@eui/components/eui-page` | Backlog page structure |
| `eui-table` | `EUI_TABLE` from `@eui/components/eui-table` | Backlog list table |
| `eui-chip` | `EUI_CHIP` from `@eui/components/eui-chip` | Type and priority badges |
| `eui-feedback-message` | `EUI_FEEDBACK_MESSAGE` from `@eui/components/eui-feedback-message` | Error states |
| `EuiGrowlService` | from `@eui/core` | Success/error notifications |

---

## Execution Order

Stories must be implemented in this exact order. Each story depends on the previous one unless stated otherwise.

---

## STORY-001: Backend — Backlog Data Model Extension + Seed Data Backfill

### Objective
Extend the `backlog-items` schema with `priority`, `assignee_id`, `epic_id`, and `ticket_number` fields. Backfill existing EPIC records.

### Details → [STORY-001-backlog-model-extension.md](STORY-001-backlog-model-extension.md)

---

## STORY-002: Backend — Create Ticket Endpoint

### Objective
Add `POST /api/projects/:projectId/backlog` to create STORY, BUG, or TASK tickets with taxonomy validation, auto-numbering, and authorization.

### Details → [STORY-002-create-ticket-endpoint.md](STORY-002-create-ticket-endpoint.md)

---

## STORY-003: Frontend — Ticket Models + Service Extension

### Objective
Extend the `BacklogItem` interface with new fields, add priority types/constants, and add `createTicket()` service method.

### Details → [STORY-003-frontend-models-service.md](STORY-003-frontend-models-service.md)

---

## STORY-004: Frontend — Backlog Page with Ticket Table

### Objective
Create a Backlog page under the project shell that displays all backlog items in an `eui-table` with type, ticket number, title, priority, status, and assignee columns.

### Details → [STORY-004-backlog-page.md](STORY-004-backlog-page.md)

---

## STORY-005: Frontend — Create Ticket Dialog

### Objective
Add a "Create Ticket" dialog to the Backlog page with type, title, description, priority, assignee, and epic fields. Role-gated to non-VIEWER members.

### Details → [STORY-005-create-ticket-dialog.md](STORY-005-create-ticket-dialog.md)

---

## STORY-006: Frontend — Dashboard Backlog Summary Enhancement

### Objective
Update the dashboard backlog summary to show ticket numbers, priority chips, and link to the Backlog page.

### Details → [STORY-006-dashboard-backlog-enhancement.md](STORY-006-dashboard-backlog-enhancement.md)

---

## Dependency Graph

```
STORY-001 (Backend — Data model extension + seed backfill)
    └── STORY-002 (Backend — Create ticket endpoint)
            └── STORY-003 (Frontend — Models + service)
                    ├── STORY-004 (Frontend — Backlog page)
                    │       └── STORY-005 (Frontend — Create ticket dialog)
                    └── STORY-006 (Frontend — Dashboard enhancement)
```

## Technical Notes

- Ticket numbering is per-project, auto-incremented from the max `ticket_number` in that project's backlog items. The maintenance epic is always ticket #1.
- Only STORY, BUG, and TASK can be created via the dialog. EPIC creation is out of scope for this feature (EPICs are system-seeded by bootstrap).
- The `status` field on new tickets is always set to `TO_DO` (the initial status in every workflow). The backend validates this against the project's workflow for the given ticket type.
- VIEWER role is blocked from creating tickets (403). All other project roles (PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER) and SUPER_ADMIN can create.
- Assignee validation: if provided, must be an active user who is a member of the project.
- Epic validation: if provided, must be an existing backlog item of type EPIC in the same project.
- The Backlog page replaces the placeholder sidebar link. It becomes the primary ticket list surface.
- The `GET /api/projects/:projectId/backlog` endpoint is extended to support `_sort` and `_order` query params for table sorting.
- All i18n keys must be added to both `en.json` and `fr.json`.
- The create dialog uses `FormsModule` + `ngModel` (consistent with the members dialog pattern).
- Priority display uses `eui-chip` with severity variants: CRITICAL → `euiDanger`, HIGH → `euiWarning`, MEDIUM → `euiInfo`, LOW → default (no severity).
