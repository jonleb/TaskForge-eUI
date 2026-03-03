# 20-Tickets-Page — Cross-Project Tickets Page

## What this branch does

Adds a global Tickets page accessible from the sidebar that aggregates backlog items across all projects the user has access to. Features a two-column layout with a collapsible filter panel (search, quick filters, status/type/priority checkboxes, project/sprint selects) and a paginated card list. Includes full i18n support (EN/FR).

## Step-by-step walkthrough

### 1. Backend endpoints (STORY-001)

- Added `GET /api/tickets` endpoint aggregating backlog items across all projects with filtering (q, status, type, priority, project_id, assignee_id, sprint_id) and pagination.
- Added `GET /api/user/projects` endpoint returning projects accessible to the authenticated user.
- `sprint_id=open` filter returns tickets in ACTIVE/PLANNED sprints.
- 20 integration tests (Jest + supertest).

Files: `mock/app/routes/ticket_routes.js`, `mock/app/routes/ticket_routes.test.js`, `mock/app/routes/index.js`

### 2. Frontend service and models (STORY-002)

- Created `TicketsService` with `getTickets()` and `getUserProjects()` methods.
- Created `TicketsListParams` interface with all filter params.
- Added `sprint_id` to `BacklogListParams` for consistency.
- 8 unit tests.

Files: `src/app/core/tickets/tickets.service.ts`, `src/app/core/tickets/tickets.models.ts`, `src/app/core/tickets/index.ts`, `src/app/core/tickets/tickets.service.spec.ts`

### 3. Tickets page component + i18n (STORY-003 + STORY-006)

- Created `TicketsComponent` with OnPush change detection, two-column layout using `eui-page-columns`.
- Left column: collapsible filter panel with text search (debounced), status/type/priority checkbox groups in collapsible `eui-card` sections.
- Right column: result count with `aria-live`, filter chips, content cards with type/status/priority chips, paginator.
- Lazy-loaded route at `screen/tickets`, sidebar entry between Home and Projects.
- ~45 i18n keys for EN and FR.
- 28 unit tests.

Files: `src/app/features/tickets/tickets.component.ts`, `.html`, `.scss`, `.spec.ts`, `tickets.routes.ts`, `src/app/app.routes.ts`, `src/app/layout/layout.component.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 4. Filter panel extension (STORY-004)

- Added Quick Filters section: "Assigned to me" checkbox (uses `permissionService.getUserId()`), "Open Sprints" checkbox (`sprint_id=open`).
- Added Advanced Filters section (collapsed by default): Project select (loads user projects), Sprint select (loads sprints when project selected, disabled otherwise).
- Open Sprints and Sprint select are mutually exclusive.
- Filter chips generated for all dimensions with chip removal support.
- `clearAllFilters()` resets all filter state.
- 20 new unit tests (48 total).

Files: `src/app/features/tickets/tickets.component.ts`, `.html`, `.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 5. Create Ticket dialog (STORY-005)

- Added "Create Ticket" button in `eui-page-header-action-items` (visible only when `canCreate` is true).
- `canCreate` determined after `getUserProjects()` resolves: SUPER_ADMIN always true, regular users true if they have at least one project.
- `eui-dialog` with mandatory Project select that drives Assignee and Epic dropdowns (loaded via `getProjectMembers` / `getEpics` on project change).
- Form fields: Project (required), Type (STORY/BUG/TASK), Title (2-200 chars with inline validation), Description (textarea), Priority, Assignee (disabled until project selected), Epic (disabled until project selected).
- Successful create: closes dialog, success growl with project key + ticket number, reloads ticket list.
- Error handling: inline `eui-feedback-message` with `aria-live="polite"`.
- Form resets on dismiss.
- `cdr.detectChanges()` before `openDialog()` per eUI dialog accept label timing pitfall.
- 19 new unit tests (67 total for tickets component).

Files: `src/app/features/tickets/tickets.component.ts`, `.html`, `.scss`, `.spec.ts`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/20-Tickets-Page/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

- **eui-page-columns two-column layout**: Used the eUI Search filter template pattern with a collapsible left column for filters and a main content column for results. This matches the established pattern in the backlog component.
- **Debounce with real RxJS Subject**: Text search uses `debounceTime(300)` via a `Subject` pipe rather than template-level debounce, keeping the component testable with `vi.useFakeTimers()`.
- **Paginator init guard**: `paginatorReady` flag set in `ngAfterViewInit` prevents spurious API calls from `eui-paginator`'s initialization `pageChange` event (known eUI pitfall).
- **OnPush + markForCheck**: All async operations explicitly call `cdr.markForCheck()` since the component uses `ChangeDetectionStrategy.OnPush`.
- **Checkbox filter pattern**: Reused the `Record<X, boolean>` + `Set<X>` pattern from the backlog component for status/type/priority filters, extended with project/assignee/sprint dimensions.
- **Sprint/Open Sprints mutual exclusivity**: Selecting a specific sprint unchecks "Open Sprints" and vice versa, preventing conflicting filter states.
- **Subject cleanup in tests**: `afterEach` calls `component.ngOnDestroy()` to prevent "component threw errors during cleanup" from pending subscriptions (especially `NEVER` observables and debounce timers).

## Git history

```
09c8b30 feat(STORY-005): add Create Ticket dialog with project-driven form
0c11eea docs(020): add history file for Tickets Page feature
31b2841 feat(STORY-004): add filter panel with project, assigned-to-me, sprints, and advanced filters
099c0bc feat(STORY-003): add Tickets page with route, sidebar, card list, filters, and i18n
ba6fcbb feat(STORY-002): add TicketsService, TicketsListParams model, and barrel export
3c28534 feat(STORY-001): add GET /api/tickets and GET /api/user/projects endpoints
bfd2379 docs: align filter panel layout with eUI Search filter template pattern
d200a56 docs: add FEATURE-020 Tickets Page analysis — feature doc, 6 stories, story breakdown
```

## Test summary

- Frontend: 693 unit tests (vitest) — all passing
- Backend: 20 integration tests (Jest + supertest) — all passing
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full Tickets Page feature on a fresh eUI Angular project that already has: project CRUD with backlog, sprints, members, and epics endpoints, a `ProjectService` with `getBacklog()`, `getSprints()`, `getProjectMembers()`, `getEpics()`, `createTicket()`, a `PermissionService` with `getUserId()`, `isSuperAdmin()`, `hasProjectRole()`, a mock Express/json-server backend with auth middleware, a sidebar with global navigation, and i18n (EN/FR) via eUI `I18nService`. Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> Implement a global cross-project Tickets page that aggregates backlog items across all projects the user has access to, with a two-column filter/results layout and a create ticket dialog.
>
> **STORY-001: Backend endpoints**
> 1. Add `GET /api/tickets` endpoint in `mock/app/routes/ticket_routes.js`. Auth required. Aggregates `backlog-items` across projects. SUPER_ADMIN sees all active projects; other users see only projects where they are a member (look up `project-members` by `userId`).
> 2. Query params: `q` (text search on title/description, case-insensitive), `status` (comma-separated), `type` (comma-separated), `priority` (comma-separated), `project_id`, `assignee_id`, `sprint_id` (special value `open` = tickets in ACTIVE/PLANNED sprints), `_sort` (default `createdAt`), `_order` (default `desc`), `_page` (default 1), `_limit` (default 10).
> 3. Response shape: `{ data: BacklogItem[], total, page, limit }`.
> 4. Add `GET /api/user/projects` endpoint. Auth required. Returns `Project[]` — for SUPER_ADMIN all active projects, for others projects where user is a member.
> 5. Register routes in `mock/app/routes/index.js`.
> 6. Write ~20 integration tests (Jest + supertest) covering: auth required, SUPER_ADMIN sees all, regular user sees only member projects, text search, status/type/priority filters, project_id filter, assignee_id filter, sprint_id filter, sprint_id=open, pagination, sorting, combined filters, user/projects endpoint for both roles.
>
> **STORY-002: Frontend service and models**
> 1. Create `TicketsService` (standalone injectable) in `src/app/core/tickets/`. Methods: `getTickets(params: TicketsListParams): Observable<{ data, total, page, limit }>` calling `GET /api/tickets`, `getUserProjects(): Observable<Project[]>` calling `GET /api/user/projects`.
> 2. Create `TicketsListParams` interface with fields: `q?`, `status?`, `type?`, `priority?`, `project_id?`, `assignee_id?`, `sprint_id?`, `_sort?`, `_order?`, `_page?`, `_limit?`.
> 3. Create barrel export `index.ts`.
> 4. Write ~8 unit tests covering HTTP calls, param serialization, and error propagation.
>
> **STORY-003: Tickets page component with route, sidebar, and i18n**
> 1. Create `TicketsComponent` (standalone, `ChangeDetectionStrategy.OnPush`) with `eui-page` > `eui-page-header` > `eui-page-content` > `eui-page-columns` structure.
> 2. Left column: collapsible filter panel. Text search input with `debounceTime(300)` via RxJS `Subject`. Status/Type/Priority checkbox groups in collapsible `eui-card` sections using `Record<X, boolean>` + `Set<X>` pattern.
> 3. Right column: result count with `aria-live="polite"`, active filter chips with removal support, content cards (`eui-content-card`) showing project key + ticket number, type/status/priority chips, title, assignee. Cards link to `screen/projects/:projectId/backlog/:ticketNumber`.
> 4. `eui-paginator` with page sizes `[10, 25, 50]`. Guard paginator init event with `AfterViewInit` + `paginatorReady` flag to prevent spurious API calls.
> 5. Lazy-loaded route at `screen/tickets`. Add sidebar entry between Home and Projects: `{ label: 'nav.tickets', url: 'screen/tickets' }`.
> 6. Add ~45 i18n keys for EN and FR under `tickets.*` namespace.
> 7. Write ~28 unit tests covering data loading, filter application, chip display/removal, pagination, card rendering, navigation, empty state, error/retry.
>
> **STORY-004: Filter panel with quick filters and advanced filters**
> 1. Quick Filters section (collapsible `eui-card`): "Assigned to me" checkbox (uses `PermissionService.getUserId()` to set `assignee_id`), "Open Sprints" checkbox (sets `sprint_id=open`).
> 2. Advanced Filters section (collapsible `eui-card`, collapsed by default): Project select (loads user projects via `getUserProjects()`), Sprint select (loads sprints via `ProjectService.getSprints()` when project selected, disabled otherwise).
> 3. Open Sprints and Sprint select are mutually exclusive: checking Open Sprints clears Sprint select, selecting a Sprint unchecks Open Sprints.
> 4. When Project changes, Sprint dropdown reloads. If no project selected, Sprint is disabled.
> 5. Filter chips generated for all dimensions with chip removal support. `clearAllFilters()` resets all state.
> 6. Write ~20 new unit tests for quick filters, advanced filters, mutual exclusivity, chip generation, clear all.
>
> **STORY-005: Create Ticket dialog**
> 1. Add "Create Ticket" button in `eui-page-header-action-items` (visible only when `canCreate` is true). `canCreate` = SUPER_ADMIN always true, regular users true if `getUserProjects()` returns at least one project.
> 2. `eui-dialog` with form fields: Project (required, select from user projects), Type (STORY/BUG/TASK), Title (required, 2-200 chars with inline validation via `eui-feedback-message`), Description (optional textarea), Priority (CRITICAL/HIGH/MEDIUM/LOW), Assignee (optional, disabled until project selected, loads via `getProjectMembers()`), Epic (optional, disabled until project selected, loads via `getEpics()`).
> 3. When Project select changes, reload Assignee and Epic dropdowns, reset their values.
> 4. On successful create via `ProjectService.createTicket()`: close dialog, success growl with project key + ticket number, reload ticket list.
> 5. Error handling: inline `eui-feedback-message` with `aria-live="polite"`.
> 6. Form resets on dismiss. Call `cdr.detectChanges()` before `openDialog()` per eUI dialog accept label timing pitfall.
> 7. Write ~19 new unit tests for dialog open/close, form validation, project-driven dropdowns, create success/error, form reset.
>
> **eUI gotchas:**
> - "Create Ticket" button in `eui-page-header-action-items`, not page content (content area stretches buttons full width)
> - `eui-page-header` must use open/close tags (not self-closing) for content projection
> - `eui-paginator` fires `pageChange` on init — guard with `paginatorReady` flag in `ngAfterViewInit`
> - `eui-dialog` captures `[acceptLabel]` at overlay creation — set property + `cdr.detectChanges()` before `openDialog()`
> - Use `eui-icon-svg` with proper naming: `eui-close`, `eui-search`, `filter:regular`, etc. Never bare names
> - `eui-icon-button` uses `[euiDisabled]`, not `[disabled]`
> - All `OnPush` components need `cdr.markForCheck()` after async operations
>
> **a11y requirements:**
> - `aria-live="polite"` on result count and error messages
> - `aria-label` on icon-only buttons and filter sections
> - All form inputs have associated `<label>` with `euiLabel` directive
> - Required fields use `aria-required="true"`
> - Filter chips are keyboard-navigable
> - Cards use semantic structure with meaningful `aria-label`
>
> **Test commands:**
> - `npm run test:mock` — all backend tests pass
> - `npm run test:ci` — all frontend tests pass
> - `npx ng build --configuration=development` — build passes
