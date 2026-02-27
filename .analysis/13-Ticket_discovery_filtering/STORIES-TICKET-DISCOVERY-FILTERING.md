# FEATURE-013: Ticket Discovery & Filtering — Stories Breakdown

## Overview

Transform the Backlog page from a simple "load all items" list into a full discovery surface with server-side search, multi-dimension filtering, column sorting, and pagination. This follows the established patterns from the Portfolio and Users pages (async `eui-table`, `eui-table-filter`, `eui-toggle-group`, `eui-paginator`, debounced search, `paginatorReady` guard).

## Current State

### Backend (`GET /api/projects/:projectId/backlog`)
- Returns all items for a project (no pagination)
- Supports `?type=` filter (single ticket type)
- Supports `?_sort=field&_order=asc|desc` (default: `created_at desc`)
- Auth + project membership required

### Frontend (`BacklogComponent`)
- Loads all items at once via `ProjectService.getBacklog(projectId)`
- Client-side sort by `ticket_number` descending
- No search, no filters, no pagination
- Static `<table eui-table>` (not async mode)
- Create Ticket dialog (STORY-005 from FEATURE-012)

### Reference Patterns (Portfolio / Users)
- Async `eui-table` with `isAsync`, `[isLoading]`, `[data]`, `(sortChange)`
- `eui-table-filter` with debounced `filterChange` (300ms)
- `eui-toggle-group` for status filter (All / Active / Inactive)
- `eui-paginator` with `[length]`, `[pageSize]`, `[pageSizeOptions]`, `(pageChange)`
- `paginatorReady` flag (AfterViewInit) to prevent spurious init calls
- Params object tracking `_page`, `_limit`, `_sort`, `_order`, `q`, plus domain filters
- `loadItems()` method called on every filter/sort/page change
- Result count with `aria-live="polite"`: "Showing X of Y"
- Contextual empty state messages based on active filters
- `ng-template euiTemplate="header"` / `euiTemplate="body"` / `euiTemplate="noData"` for async table

## Stories

| # | Story | Scope | Depends on |
|---|-------|-------|------------|
| 1 | Backend — Paginated & Filterable Backlog Endpoint | Backend | — |
| 2 | Frontend — Backlog List Params + Service | Frontend | STORY-001 |
| 3 | Frontend — Async Table with Sorting & Pagination | Frontend | STORY-002 |
| 4 | Frontend — Search & Filter Bar | Frontend | STORY-003 |
| 5 | Frontend — Contextual Empty States & Polish | Frontend | STORY-004 |

## STORY-001: Backend — Paginated & Filterable Backlog Endpoint

Extend `GET /api/projects/:projectId/backlog` with:
- Pagination: `_page` (1-indexed), `_limit` (default 10, max 100). Return `{ data, total, page, limit }` envelope (matching `ProjectListResponse` pattern).
- Text search: `q` param — case-insensitive match on `title` or `description`.
- Status filter: `status` param — exact match on workflow status (TO_DO, IN_PROGRESS, IN_REVIEW, DONE).
- Priority filter: `priority` param — exact match (CRITICAL, HIGH, MEDIUM, LOW). Items with `null` priority excluded when filter is active.
- Existing `type` filter preserved.
- All filters combinable (AND logic).
- Integration tests: ~12 tests covering pagination, search, status/priority/type filters, combined filters, edge cases.

## STORY-002: Frontend — Backlog List Params + Service

- Add `BacklogListParams` interface to `project.models.ts` (mirrors `ProjectListParams` pattern): `_page`, `_limit`, `_sort`, `_order`, `q`, `type`, `status`, `priority`.
- Add `BacklogListResponse` interface: `{ data: BacklogItem[], total: number, page: number, limit: number }`.
- Update `ProjectService.getBacklog()` to accept `BacklogListParams` and return `Observable<BacklogListResponse>`.
- Update `getEpics()` to work with new response shape.
- Update existing tests.

## STORY-003: Frontend — Async Table with Sorting & Pagination

Refactor `BacklogComponent` from static table to async `eui-table` with server-side sorting and pagination:
- Switch to `euiTable` async mode with `ng-template euiTemplate="header"/"body"/"noData"`.
- Add `params: BacklogListParams` object tracking query state.
- Add `total` property for paginator.
- Add `eui-paginator` with `[length]`, `[pageSize]`, `[pageSizeOptions]=[10, 25, 50]`, `(pageChange)`.
- Add `paginatorReady` flag (AfterViewInit) to guard against init event.
- Add sortable columns: ticket_number, type, title, priority, status.
- Add `onSortChange()`, `onPageChange()` handlers.
- Replace `loadItems()` with `loadBacklog()` using params.
- Update result count to "Showing X of Y" format.
- Update unit tests.

## STORY-004: Frontend — Search & Filter Bar

Add search and filter controls above the table:
- `eui-table-filter` for text search (debounced 300ms, searches title/description).
- `eui-toggle-group` for status filter: All / To Do / In Progress / In Review / Done.
- `eui-toggle-group` for type filter: All / Story / Bug / Task / Epic.
- All filters reset page to 1 on change.
- Add `onFilterChange()`, `onStatusFilterChange()`, `onTypeFilterChange()` handlers.
- Add i18n keys for filter labels and placeholders.
- Update unit tests.

## STORY-005: Frontend — Contextual Empty States & Polish

- Contextual empty state messages based on active filters/search (e.g., "No tickets match your filters" vs "No backlog items yet").
- Error state with retry button (preserved from current implementation).
- Growl notification on load error.
- Priority filter dropdown (optional, if toggle group is too wide for 4+1 options — evaluate UX).
- Add i18n keys for contextual empty states.
- Final unit tests for empty states and error handling.

## Files Changed (estimated)

| File | Stories |
|------|---------|
| `mock/app/routes/project_routes.js` | 1 |
| `mock/app/routes/project_routes.test.js` | 1 |
| `src/app/core/project/project.models.ts` | 2 |
| `src/app/core/project/project.service.ts` | 2 |
| `src/app/core/project/project.service.spec.ts` | 2 |
| `src/app/core/project/index.ts` | 2 |
| `src/app/features/projects/backlog/backlog.component.ts` | 3, 4, 5 |
| `src/app/features/projects/backlog/backlog.component.html` | 3, 4, 5 |
| `src/app/features/projects/backlog/backlog.component.scss` | 4, 5 |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | 3, 4, 5 |
| `src/assets/i18n/en.json` | 4, 5 |
| `src/assets/i18n/fr.json` | 4, 5 |
