# FEATURE-020 Tickets Page — Global Cross-Project Ticket View

## Business objective

Provide a global "Tickets" page accessible from the main sidebar (between Home and Projects) that aggregates tickets across all projects the current user has access to. The page reuses the backlog's two-column layout (filter panel on the left, card results on the right) but operates at a cross-project scope, giving users a single place to find, filter, and create tickets without navigating into individual projects.

## Front-end business needs

### Page layout

- Reuse the same `eui-page` > `eui-page-columns` structure as the Backlog page: a collapsible left filter column and a right results column.
- Page header label: "Tickets" (i18n key `tickets.page-title`).
- No reordering capability — cards are read-only (no drag-and-drop, no position arrows).
- Paginated results with `eui-paginator` (same page-size options as backlog: 10 / 25 / 50).

### Card view

- Each ticket is rendered as an `eui-content-card` identical to the backlog card, showing: ticket number (prefixed with project key, e.g. `TF-42`), type chip, title, status chip, priority chip, assignee name.
- Clicking a card navigates to the ticket detail page within its project context: `screen/projects/:projectId/backlog/:ticketNumber`.
- The project name or key should be visible on each card (since tickets come from multiple projects).

### Left filter panel

The filter panel follows the eUI "Search filter" pattern (see template). Controls are organized into collapsible `eui-card` sections, top to bottom:

#### Search (always visible, top of panel)
- **Text search** (`input` + search icon button) — Free-text search on title/description. Debounced (300ms) on input, also triggerable via the search icon button. Placed at the very top of the filter column, outside any collapsible section.

#### Quick filters (collapsible `eui-card` section)
- **Assigned to me** (`checkbox`) — When checked, filters tickets where `assignee_id` matches the current user's ID.
- **Open Sprints** (`checkbox`) — When checked, filters tickets that belong to any sprint with status `ACTIVE` across the selected project(s).

#### Criteria (collapsible `eui-card` sections)
- **Status checkboxes** — Same as backlog (TO_DO, IN_PROGRESS, IN_REVIEW, DONE).
- **Type checkboxes** — Same as backlog (STORY, BUG, TASK, EPIC).
- **Priority checkboxes** — Same as backlog (CRITICAL, HIGH, MEDIUM, LOW).

#### Advanced filter (collapsible `eui-card` section, collapsed by default)
- **Project** (`select`) — Dropdown listing all projects the user is a member of (or all active projects for SUPER_ADMIN). Selecting a project scopes all results to that project. Default: empty (all accessible projects).
- **Sprint** (`select`) — Dropdown listing sprints from the selected project (disabled when no project is selected). Selecting a sprint filters tickets assigned to that sprint.

#### Filter interactions
- When "Project" changes, the Sprint dropdown reloads with that project's sprints. If no project is selected, the Sprint dropdown is disabled.
- "Open Sprints" and "Sprint" are mutually exclusive: checking "Open Sprints" clears the Sprint select, and selecting a specific Sprint unchecks "Open Sprints".
- Active filter chips are displayed above the results (same chip pattern as backlog) with a "Clear all" button.

### Create ticket dialog

- A "Create Ticket" button in the page header (`eui-page-header-action-items`), visible to users who have create permission on at least one project.
- Opens a dialog (`eui-dialog`) with the same fields as the backlog create dialog, plus a mandatory **Project** select at the top:
  - **Project** (required) — select from the user's accessible projects where the user has create permission (PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, or REPORTER role).
  - **Type** (required) — STORY, BUG, TASK.
  - **Title** (required, 2–200 chars).
  - **Description** (optional, max 2000 chars).
  - **Priority** (required) — CRITICAL, HIGH, MEDIUM, LOW.
  - **Assignee** (optional) — loaded from the selected project's members.
  - **Epic** (optional) — loaded from the selected project's epics.
- When the Project select changes, the Assignee and Epic dropdowns reload for that project.
- On successful creation, a success growl is shown and the ticket list refreshes.

### Sidebar menu

- Add a "Tickets" item in the global sidebar between "Home" and "Projects": `{ label: 'nav.tickets', url: 'screen/tickets' }`.
- The item is visible to all authenticated users (no role restriction).

### Routing

- New route: `screen/tickets` → `TicketsComponent` (lazy-loaded).
- The page is outside the project context (no `ProjectContextService` dependency for the page itself).

## Backend business needs

### New endpoint: `GET /api/tickets`

A new cross-project endpoint is needed because the existing `GET /api/projects/:projectId/backlog` is scoped to a single project.

**Request:**
- Auth: requires valid token.
- Query params:
  - `project_id` (optional) — filter by project ID.
  - `assignee_id` (optional) — filter by assignee user ID.
  - `sprint_id` (optional) — filter by sprint ID. Special value `open` returns tickets in any ACTIVE sprint.
  - `q` (optional) — text search on title/description.
  - `type` (optional) — comma-separated ticket types.
  - `status` (optional) — comma-separated statuses.
  - `priority` (optional) — comma-separated priorities.
  - `_sort`, `_order`, `_page`, `_limit` — standard pagination/sort params.

**Authorization logic:**
- SUPER_ADMIN sees tickets from all active projects.
- Other users see only tickets from projects where they are a member. The endpoint filters `backlog-items` to only include items whose `projectId` is in the user's membership list.

**Response:** `{ data: BacklogItem[], total, page, limit }` — same shape as the project-scoped backlog response, but items may come from multiple projects.

### New endpoint: `GET /api/user/projects`

A lightweight endpoint returning the list of projects the current user has access to (for populating the Project filter and Create dialog dropdowns).

**Request:** Auth required.
**Response:** `Project[]` — for SUPER_ADMIN, all active projects; for others, projects where the user is a member.

## Current implementation context

### Reusable services and patterns
- `ProjectService` — already has `getBacklog()`, `getSprints()`, `getProjectMembers()`, `getEpics()`, `createTicket()`. The Tickets page will call these per-project for dialog data, and the new cross-project endpoint for the main list.
- `PermissionService` — `getUserId()` for "Assigned to me" filter, `isSuperAdmin()` for visibility rules, `hasProjectRole()` for create permission checks.
- `EuiGrowlService` — success/error notifications.
- Backlog component patterns — card layout, filter panel, chip management, paginator guard, create dialog form.

### Data model
- `BacklogItem` already has `projectId` — the card can use this to resolve the project key for display.
- `Sprint` model has `status` field — the "Open Sprints" filter needs sprints with `status === 'ACTIVE'`.

## Role coverage for this feature

- **All authenticated users** can see the Tickets menu item and access the page.
- **Ticket visibility** is governed by project membership: users only see tickets from projects they belong to. SUPER_ADMIN sees all.
- **Create ticket** button is visible only if the user has create permission (PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, or REPORTER) on at least one project.
- **Sprint/assignee data** in the create dialog is loaded per-project based on the selected project.

## Expected business outcomes

- Users get a single view of all their tickets across projects without navigating into each project individually.
- The "Assigned to me" filter provides a quick personal task list.
- The "Open Sprints" filter surfaces current iteration work across projects.
- Ticket creation from the global page reduces friction for users working across multiple projects.
