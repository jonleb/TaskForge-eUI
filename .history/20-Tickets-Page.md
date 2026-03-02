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
31b2841 feat(STORY-004): add filter panel with project, assigned-to-me, sprints, and advanced filters
099c0bc feat(STORY-003): add Tickets page with route, sidebar, card list, filters, and i18n
ba6fcbb feat(STORY-002): add TicketsService, TicketsListParams model, and barrel export
3c28534 feat(STORY-001): add GET /api/tickets and GET /api/user/projects endpoints
bfd2379 docs: align filter panel layout with eUI Search filter template pattern
d200a56 docs: add FEATURE-020 Tickets Page analysis — feature doc, 6 stories, story breakdown
```

## Test summary

- Frontend: 674 unit tests (vitest) — all passing
- Backend: 20 integration tests (Jest + supertest) — all passing
- Build: `npx ng build --configuration=development` — passes
