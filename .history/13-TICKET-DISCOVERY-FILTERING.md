# 13-TICKET-DISCOVERY-FILTERING — Ticket Discovery & Filtering

## What this branch does

This branch transforms the Backlog page from a simple "load all items" list into a full discovery surface with server-side search, multi-dimension filtering, column sorting, and pagination. The backend endpoint gains pagination (`_page`/`_limit`), text search (`q`), and status/priority/type filters with an envelope response `{ data, total, page, limit }`. The frontend is refactored from a static `eui-table` to an async table with `eui-paginator`, `eui-table-filter` (debounced 300ms), and two `eui-toggle-group` controls for status and type filtering. Contextual empty state messages adapt based on active search/filters, and a growl notification fires on load errors.

## Step-by-step walkthrough

### 1. Backend — Paginated & Filterable Backlog Endpoint (STORY-001)

- Extended `GET /api/projects/:projectId/backlog` with pagination (`_page` 1-indexed, `_limit` default 10 max 100), text search (`q` — case-insensitive match on title/description), status filter, and priority filter.
- All filters combinable with AND logic. Existing `type` filter preserved.
- Response changed to envelope format: `{ data, total, page, limit }`.
- 18 integration tests covering pagination, search, status/priority/type filters, combined filters, and edge cases.

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`

### 2. Frontend — Backlog List Params + Service (STORY-002)

- Added `BacklogListParams` interface: `_page`, `_limit`, `_sort`, `_order`, `q`, `type`, `status`, `priority`.
- Added `BacklogListResponse` interface: `{ data: BacklogItem[], total: number, page: number, limit: number }`.
- Updated `ProjectService.getBacklog()` to accept `BacklogListParams` and return `Observable<BacklogListResponse>`.
- Updated `getEpics()` to pass `{ type: 'EPIC', _limit: 100 }` and unwrap `.data` from the envelope.
- Updated `DashboardComponent` to unwrap `.data` from the new response shape.
- Updated all related unit tests.

Files: `src/app/core/project/project.models.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/index.ts`, `src/app/core/project/project.service.spec.ts`, `src/app/features/projects/dashboard/dashboard.component.ts`, `src/app/features/projects/dashboard/dashboard.component.spec.ts`

### 3. Frontend — Async Table with Sorting & Pagination (STORY-003)

- Refactored `BacklogComponent` from static `<table eui-table>` to async `euiTable` with `ng-template euiTemplate="header"/"body"/"noData"`.
- Added `params: BacklogListParams` object tracking `_page`, `_limit`, `_sort`, `_order` and domain filters.
- Added `total` property for paginator length.
- Added `eui-paginator` with `[pageSizeOptions]=[10, 25, 50]` and `paginatorReady` flag (AfterViewInit) to guard against init event.
- Added sortable columns: ticket_number, type, title, priority, status.
- Added `onSortChange()`, `onPageChange()`, `loadBacklog()` handlers.
- Updated result count to "Showing X of Y" format with `aria-live="polite"`.
- Rewrote all unit tests (30 tests).

Files: `src/app/features/projects/backlog/backlog.component.ts`, `src/app/features/projects/backlog/backlog.component.html`, `src/app/features/projects/backlog/backlog.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 4. Frontend — Search & Filter Bar (STORY-004)

- Added `eui-table-filter` with debounced 300ms search (title/description).
- Added `eui-toggle-group` for status filter: All / To Do / In Progress / In Review / Done.
- Added `eui-toggle-group` for type filter: All / Story / Bug / Task / Epic.
- All filters reset page to 1 on change.
- Added `searchSubject` with `debounceTime(300)` + `distinctUntilChanged()`.
- Added `onFilterChange()`, `onStatusFilterChange()`, `onTypeFilterChange()` handlers.
- Toggle group width overridden to `auto` via `::ng-deep`.
- 3 i18n keys (EN + FR). 8 new tests (38 total).

Files: `src/app/features/projects/backlog/backlog.component.ts`, `src/app/features/projects/backlog/backlog.component.html`, `src/app/features/projects/backlog/backlog.component.scss`, `src/app/features/projects/backlog/backlog.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 5. Frontend — Contextual Empty States & Polish (STORY-005)

- Updated `emptyStateMessage` getter with contextual messages: search-specific ("No tickets match your search"), filter-specific ("No tickets match the selected filters"), default ("No backlog items yet"), and error state.
- Added growl notification on backlog load error.
- Error state with retry button in `noData` template.
- 4 i18n keys (EN + FR): `backlog.no-match-search`, `backlog.no-match-filter`, `backlog.growl.load-failed-summary`, `backlog.growl.load-failed-detail`.
- 6 new tests (44 total for backlog component).

Files: `src/app/features/projects/backlog/backlog.component.ts`, `src/app/features/projects/backlog/backlog.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/13-Ticket_discovery_filtering/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

- **Envelope response pattern**: Backend returns `{ data, total, page, limit }` matching the `ProjectListResponse` pattern from the Portfolio page. Enables the frontend paginator to know total count without a separate request.
- **Server-side filtering over client-side**: All search, status, type, and priority filters are applied server-side. This scales to large backlogs and keeps the frontend stateless regarding data filtering.
- **Combined AND logic for filters**: All filters are combinable — searching for "login" with status "TO_DO" and type "STORY" returns only matching items. Consistent with how the Portfolio and Users pages work.
- **Debounced search (300ms)**: `searchSubject` with `debounceTime(300)` + `distinctUntilChanged()` prevents excessive API calls during typing. Same pattern as Portfolio and Users pages.
- **paginatorReady guard**: `eui-paginator` fires `pageChange` during initialization. The `AfterViewInit` + `paginatorReady` flag pattern prevents spurious API calls on page load.
- **Toggle groups for status and type**: `eui-toggle-group` provides a compact, accessible filter UI. Width overridden to `auto` (default is 100%). Status has 5 options (All + 4 statuses), type has 5 options (All + 4 types).
- **Contextual empty states**: Empty message adapts based on what's active — search term, filter, or nothing. Helps users understand why no results are shown and what to change.
- **getEpics() unwraps envelope**: Since `getEpics()` is used for the Create Ticket dialog dropdown, it passes `{ type: 'EPIC', _limit: 100 }` and unwraps `.data` via `map()` to return a flat array.
- **DashboardComponent updated for envelope**: The dashboard's backlog summary call now unwraps `.data` from the new response shape.

## Git history

```
5b2df1e docs: add FEATURE-013 stories breakdown and individual story files
9cc8a99 feat(013): STORY-001 — paginated & filterable backlog endpoint
7d2283b feat(013): STORY-002 — frontend backlog list params + service
66e2d26 feat(013): STORY-003 — async table with sorting & pagination
63fdfbf feat(013): STORY-004 — search & filter bar
f9132cc feat(backlog): STORY-005 contextual empty states & polish
```

## Test summary

- Frontend: 377 unit tests (vitest) — all passing
- Backend: 190 integration tests (Jest + supertest) — all passing (5 pre-existing ordering-sensitive failures unrelated to this branch)
- Build: `npx ng build --configuration=development` — passes


---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full Ticket Discovery & Filtering feature on a fresh eUI Angular project that already has authentication, RBAC, admin user management, project navigation, project creation with key management, an enhanced portfolio, project membership management, agile bootstrap, and ticket creation with taxonomy. Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> I have an eUI Angular 21 application with authentication, RBAC, admin user management, project navigation (shell with sidebar: Dashboard, Members, Backlog, Board, Settings), project creation with key management, an enhanced portfolio, project membership, agile bootstrap, and ticket creation with taxonomy (STORY/BUG/TASK/EPIC types, priority, assignee, epic parent, ticket numbers). The Backlog page currently loads all items at once with a static `eui-table`, no search, no filters, no pagination. The mock backend `GET /api/projects/:projectId/backlog` returns all items with optional `?type=` and `?_sort=&_order=` params. I need full ticket discovery and filtering. Work story by story, in order. For each story, first create an analysis `.md` file, wait for my approval, then implement with tests.
>
> **STORY-001: Backend — Paginated & Filterable Backlog Endpoint**
>
> Extend `GET /api/projects/:projectId/backlog` with:
> - Pagination: `_page` (1-indexed), `_limit` (default 10, max 100). Return envelope `{ data, total, page, limit }`.
> - Text search: `q` param — case-insensitive match on `title` or `description`.
> - Status filter: `status` param — exact match (TO_DO, IN_PROGRESS, IN_REVIEW, DONE).
> - Priority filter: `priority` param — exact match (CRITICAL, HIGH, MEDIUM, LOW). Null-priority items excluded when filter active.
> - Existing `type` filter preserved. All filters combinable (AND logic).
> - ~18 integration tests.
>
> **STORY-002: Frontend — Backlog List Params + Service**
>
> - Add `BacklogListParams` interface: `_page`, `_limit`, `_sort`, `_order`, `q`, `type`, `status`, `priority`.
> - Add `BacklogListResponse` interface: `{ data: BacklogItem[], total, page, limit }`.
> - Update `ProjectService.getBacklog()` to accept params and return `Observable<BacklogListResponse>`.
> - Update `getEpics()` to pass `{ type: 'EPIC', _limit: 100 }` and unwrap `.data`.
> - Update `DashboardComponent` to unwrap `.data` from new response.
> - Update existing tests.
>
> **STORY-003: Frontend — Async Table with Sorting & Pagination**
>
> Refactor `BacklogComponent` from static `eui-table` to async mode:
> - `ng-template euiTemplate="header"/"body"/"noData"`.
> - `params: BacklogListParams` tracking `_page`, `_limit`, `_sort`, `_order`.
> - `eui-paginator` with `[pageSizeOptions]=[10, 25, 50]`, `paginatorReady` flag (AfterViewInit).
> - Sortable columns: ticket_number, type, title, priority, status.
> - `onSortChange()`, `onPageChange()`, `loadBacklog()` handlers.
> - "Showing X of Y" with `aria-live="polite"`.
> - Rewrite unit tests.
>
> **STORY-004: Frontend — Search & Filter Bar**
>
> - `eui-table-filter` with debounced 300ms search.
> - `eui-toggle-group` for status: All / To Do / In Progress / In Review / Done.
> - `eui-toggle-group` for type: All / Story / Bug / Task / Epic.
> - All filters reset page to 1. Toggle group width overridden to `auto`.
> - `onFilterChange()`, `onStatusFilterChange()`, `onTypeFilterChange()` handlers.
> - i18n keys. Unit tests.
>
> **STORY-005: Frontend — Contextual Empty States & Polish**
>
> - Contextual `emptyStateMessage` getter: search-specific, filter-specific, default, error.
> - Growl notification on load error.
> - Retry button in `noData` template.
> - 4 i18n keys (EN + FR). 6 unit tests.
>
> **Important constraints:**
> - eUI-first component policy.
> - `eui-table` strips `<caption>` — use `aria-label`.
> - `eui-paginator` fires `pageChange` on init — guard with `AfterViewInit` + `paginatorReady` flag.
> - `eui-toggle-group` has `width: 100%` default — override with `::ng-deep { width: auto }`.
> - Place action buttons in `eui-page-header-action-items`.
> - OnPush change detection + `cdr.markForCheck()` in async callbacks.
> - Frontend tests: vitest via `npm run test:ci`. Backend tests: Jest+supertest via `npm run test:mock`.
> - Build: `npx ng build --configuration=development`.
> - WCAG 2.2 AA: semantic HTML, `aria-label`, `aria-live="polite"`, `scope="col"`, `data-col-label`.
