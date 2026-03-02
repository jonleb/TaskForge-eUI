# FEATURE-020 Tickets Page — Story Breakdown

## Context

This feature adds a global "Tickets" page accessible from the main sidebar (between Home and Projects) that aggregates tickets across all projects the current user has access to. The page reuses the backlog's two-column layout (collapsible filter panel on the left, card results on the right) but operates at a cross-project scope. Users can filter by project, assignee, sprint, status, type, and priority. Authorized users can create tickets from this page via a dialog that includes a mandatory project selector.

The application currently has:
- Backend: `GET /api/projects/:projectId/backlog` (project-scoped, paginated, with text search, type/status/priority/sprint_id filters). `GET /api/projects` (paginated, membership-filtered). `POST /api/projects/:projectId/backlog` (create ticket). `GET /api/projects/:projectId/sprints` (with optional status filter). `GET /api/projects/:projectId/members`.
- Frontend: `BacklogComponent` with two-column layout (filter panel + card list), `eui-content-card` cards, `eui-paginator`, create ticket dialog. `ProjectService` with `getBacklog()`, `getSprints()`, `getProjectMembers()`, `getEpics()`, `createTicket()`, `getProjects()`.
- `PermissionService` with `getUserId()`, `isSuperAdmin()`, `hasProjectRole()`.
- Routing: `app.routes.ts` has `screen/home`, `screen/projects`, `screen/admin/users` under the `LayoutComponent` shell.
- Sidebar: global items (Home, Projects, Users) and project-scoped items (Dashboard, Members, Backlog, Sprints, Board, Settings).
- Seed data: 3 projects (TF, DEMO, INFRA), 16 project-member records, ~30+ backlog items, multiple sprints.
- i18n: `en.json` and `fr.json` translation files.

## eUI Components Used

| Component | Import | Usage |
|-----------|--------|-------|
| `eui-page` | `EUI_PAGE` from `@eui/components/eui-page` | Page structure |
| `eui-page-columns` / `eui-page-column` | from `@eui/components/eui-page` | Two-column layout (filter + results) |
| `eui-page-header` | from `@eui/components/eui-page` | Page title + Create button slot |
| `eui-content-card` | `EUI_CONTENT_CARD` from `@eui/components/eui-content-card` | Ticket cards |
| `eui-chip` | `EUI_CHIP` from `@eui/components/eui-chip` | Type, status, priority badges + filter chips |
| `eui-paginator` | `EuiPaginatorComponent` from `@eui/components/eui-paginator` | Pagination |
| `eui-card` | `EUI_CARD` from `@eui/components/eui-card` | Collapsible filter sections |
| `eui-dialog` | `EuiDialogComponent` from `@eui/components/eui-dialog` | Create ticket dialog |
| `eui-progress-bar` | from `@eui/components/eui-progress-bar` | Loading indicator |
| `eui-feedback-message` | from `@eui/components/eui-feedback-message` | Inline errors in dialog |
| `input[euiInputText]` | from `@eui/components/eui-input-text` | Search input |
| `input[euiInputCheckBox]` | from `@eui/components/eui-input-checkbox` | Filter checkboxes |
| `select[euiSelect]` | from `@eui/components/eui-select` | Project, Sprint, form selects |
| `textarea[euiTextArea]` | from `@eui/components/eui-textarea` | Description field |
| `label[euiLabel]` | from `@eui/components/eui-label` | Form labels |
| `EuiGrowlService` | from `@eui/core` | Success/error notifications |

---

## Execution Order

Stories must be implemented in this exact order. Each story depends on the previous one.

---

## STORY-001: Backend — Cross-Project Tickets Endpoint & User Projects Endpoint

### Objective
Create `GET /api/tickets` (cross-project ticket aggregation with membership filtering) and `GET /api/user/projects` (lightweight list of the current user's accessible projects).

### Backend changes
See `STORY-001-backend-endpoints.md` for full details.

### Acceptance Criteria
- [ ] `GET /api/tickets` returns tickets from all accessible projects
- [ ] SUPER_ADMIN sees tickets from all active projects
- [ ] Regular users see only tickets from their member projects
- [ ] All filters work: `project_id`, `assignee_id`, `sprint_id`, `sprint_id=open`, `q`, `type`, `status`, `priority`
- [ ] Pagination, sort, and response shape match backlog endpoint
- [ ] `GET /api/user/projects` returns accessible projects for the current user
- [ ] Integration tests cover all branches (~20 tests)
- [ ] All mock server tests pass (`npm run test:mock`)

---

## STORY-002: Frontend — TicketsService and Models

### Objective
Create the frontend service layer to communicate with the new cross-project endpoints and extend existing models.

### Frontend changes
See `STORY-002-tickets-service.md` for full details.

### Acceptance Criteria
- [ ] `TicketsService` created with `getTickets()` and `getUserProjects()` methods
- [ ] `TicketsListParams` interface created with all filter fields
- [ ] `BacklogListParams` extended with `sprint_id` field
- [ ] Unit tests for service methods
- [ ] Build passes

---

## STORY-003: Frontend — Tickets Page (route, sidebar, card list)

### Objective
Create the `TicketsComponent` with the two-column layout, card list, pagination, and basic text search. Wire up the route and sidebar menu item.

### Frontend changes
See `STORY-003-tickets-page.md` for full details.

### Acceptance Criteria
- [ ] Page accessible at `screen/tickets`
- [ ] "Tickets" menu item in global sidebar between Home and Projects
- [ ] Two-column layout: collapsible filter panel (left) + results (right)
- [ ] Ticket cards show project key prefix, type, title, status, priority, assignee
- [ ] Clicking a card navigates to the ticket detail within its project
- [ ] Text search with 300ms debounce
- [ ] Pagination with 10/25/50 page sizes
- [ ] Loading, empty, and error states
- [ ] `aria-live="polite"` on result count
- [ ] All a11y criteria met (keyboard nav, labels, focus indicators)
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-004: Frontend — Filter Panel (Project, Assigned to me, Sprints, Status, Type, Priority)

### Objective
Implement the full filter panel with Project select, "Assigned to me" checkbox, "Open Sprints" checkbox, Sprint select, and the standard status/type/priority checkbox groups. Include active filter chips.

### Frontend changes
See `STORY-004-filter-panel.md` for full details.

### Acceptance Criteria
- [ ] Project select lists user's accessible projects
- [ ] "Assigned to me" checkbox filters by current user's ID
- [ ] "Open Sprints" checkbox filters tickets in ACTIVE sprints
- [ ] Sprint select loads sprints from selected project (disabled when no project selected)
- [ ] "Open Sprints" and Sprint select are mutually exclusive
- [ ] Status, Type, Priority checkbox groups work as in backlog
- [ ] Active filter chips displayed above results with "Clear all" button
- [ ] Chip removal updates corresponding filter
- [ ] All filters reset page to 1
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-005: Frontend — Create Ticket Dialog

### Objective
Add a "Create Ticket" button and dialog that allows creating a ticket from the global Tickets page, with a mandatory Project selector that drives the Assignee and Epic dropdowns.

### Frontend changes
See `STORY-005-create-ticket-dialog.md` for full details.

### Acceptance Criteria
- [ ] "Create Ticket" button visible in page header for users with create permission on at least one project
- [ ] Dialog has mandatory Project select (only projects where user can create)
- [ ] Changing project reloads Assignee and Epic dropdowns
- [ ] Type, Title, Description, Priority, Assignee, Epic fields match backlog dialog
- [ ] Title validation: 2–200 chars, inline error with `aria-describedby`
- [ ] Successful creation: close dialog, success growl, reload ticket list
- [ ] Error: inline message in dialog
- [ ] Form resets on dismiss
- [ ] All a11y criteria met (labels, aria-required, keyboard)
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-006: i18n — Translation Keys

### Objective
Add all translation keys for the Tickets page to `en.json` and `fr.json`.

### Frontend changes
See `STORY-006-i18n-translations.md` for full details.

### Acceptance Criteria
- [ ] All `tickets.*` keys added to `en.json` and `fr.json`
- [ ] `nav.tickets` key added for sidebar
- [ ] Language switch works correctly on the Tickets page
- [ ] Build passes

---

## Dependency Graph

```
STORY-001 (Backend — endpoints)
    └── STORY-002 (Frontend — service + models)
            └── STORY-003 (Frontend — page, route, sidebar, card list)
                    └── STORY-004 (Frontend — filter panel)
                    └── STORY-005 (Frontend — create ticket dialog)

STORY-006 (i18n) — should be done first or in parallel with STORY-003
```

## Technical Notes

- The Tickets page is a global page (not project-scoped). It does NOT use `ProjectContextService` — it operates independently of the current project context.
- The `GET /api/tickets` endpoint aggregates across projects server-side. This avoids N+1 API calls from the frontend.
- The `GET /api/user/projects` endpoint is lightweight (no pagination needed — project count is small) and reusable for both the filter dropdown and the create dialog.
- Card layout reuses the same `eui-content-card` structure as the backlog, with the addition of a project key/name indicator on each card.
- No reordering capability — no drag-and-drop, no position arrows, no CDK DragDropModule.
- `eui-paginator` fires `pageChange` during init — guard with `AfterViewInit` + `paginatorReady` flag.
- "Create Ticket" button goes in `<eui-page-header-action-items>` (not in `<eui-page-content>`).
- `eui-dialog` captures `[acceptLabel]` at overlay creation time — set properties before `openDialog()` and call `cdr.detectChanges()`.
- Sprint select is disabled when no project is selected (sprints are project-scoped).
- "Open Sprints" and Sprint select are mutually exclusive: checking "Open Sprints" clears the Sprint select, selecting a Sprint unchecks "Open Sprints".
- The `sprint_id=open` special value on the backend resolves to all ACTIVE sprints across the user's projects (or the selected project).
- Card navigation: clicking a card sets the project context and navigates to `screen/projects/:projectId/backlog/:ticketNumber`.
