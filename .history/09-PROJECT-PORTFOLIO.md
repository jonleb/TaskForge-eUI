# 09-PROJECT-PORTFOLIO — Project Portfolio Enhancement

## What this branch does

This branch upgrades the project portfolio page from a basic client-side table to a full server-side (async) experience with pagination, search, sorting, status filtering, and inline project editing. It also enhances the project dashboard with status chips, creator name resolution, updated date, and a full members table. Seed data is expanded to 15 projects and 46 project-member records for realistic testing. A cross-cutting fix aligns the Users table status column to use the same `eui-chip` styling as the portfolio.

## Step-by-step walkthrough

### 1. Backend — Enhanced Project List Endpoint + Frontend Async Portfolio Table (STORY-001 + STORY-002)

These two stories were implemented together since the frontend depends on the new backend response shape.

Backend (`GET /api/projects`):
- Added server-side pagination (`_page`, `_limit`), search (`q` — case-insensitive on name/key/description), sorting (`_sort`, `_order`), and status filtering (`is_active`).
- SUPER_ADMIN sees all projects (active + inactive). Regular users see only their active memberships.
- Response shape changed to `{ data, total, page, limit }`.
- 13 new integration tests covering pagination, search, sort, status filter, and role-based visibility.

Frontend:
- Switched `eui-table` from client-side to async mode with `isAsync`, `isLoading`, manual `eui-paginator` and `eui-table-filter`.
- Added `ProjectListParams` and `ProjectListResponse` interfaces.
- Debounced search (300ms), sortable Key and Name columns, paginator with `[10, 25, 50]` page sizes.
- Guarded paginator init event with `AfterViewInit` + `paginatorReady` flag.
- `aria-live="polite"` result count, loading/error states, empty state with retry button.
- 39 new frontend unit tests.

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`, `src/app/core/project/project.models.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/project.service.spec.ts`, `src/app/core/project/index.ts`, `src/app/features/projects/portfolio/portfolio.component.ts`, `src/app/features/projects/portfolio/portfolio.component.html`, `src/app/features/projects/portfolio/portfolio.component.spec.ts`

### 2. Status Filter & Status Column (STORY-003)

- Added `eui-toggle-group` (All/Active/Inactive) visible only to SUPER_ADMIN.
- Added Status column with `eui-chip` (`euiSuccess` for Active, `euiDanger` for Inactive) — text + color, not color-only.
- Override `eui-toggle-group` default `width: 100%` with `::ng-deep { width: auto }`.
- 12 new unit tests.

Files: `src/app/features/projects/portfolio/portfolio.component.ts`, `src/app/features/projects/portfolio/portfolio.component.html`, `src/app/features/projects/portfolio/portfolio.component.scss`, `src/app/features/projects/portfolio/portfolio.component.spec.ts`

### 3. Edit Project Settings Dialog (STORY-004) + BUG-001 Edit Icon Missing

- Added `UpdateProjectPayload` interface and `updateProject()` method to `ProjectService`.
- Implemented inline `eui-dialog #editDialog` in `PortfolioComponent` with reactive form: Key (read-only text), Name (required, min 2), Description (optional).
- Edit `eui-icon-button` visible only to SUPER_ADMIN, with `aria-label="Edit {project.name}"`.
- On success: close dialog, growl, reload list. On 409: inline error. On other errors: growl.
- BUG-001: Fixed `icon="edit"` → `icon="eui-edit"` (bare icon names render empty). Added steering rule to `eui-pitfalls.md`.
- 10 new unit tests.

Files: `src/app/core/project/project.models.ts`, `src/app/core/project/index.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/project.service.spec.ts`, `src/app/features/projects/portfolio/portfolio.component.ts`, `src/app/features/projects/portfolio/portfolio.component.html`, `src/app/features/projects/portfolio/portfolio.component.spec.ts`

### 4. Seed Data Expansion (STORY-005)

- Added 12 new projects (IDs 4–15, total 15: 11 active + 4 inactive) with diverse names, keys, and descriptions.
- Added 30 new project-member records (IDs 17–46, total 46) linking existing users to new projects with varied roles.
- Fixed one mock test that assumed all projects fit on default page size (added `_limit=100`).
- Data-only change — no code modifications.

Files: `mock/db/db.json`, `mock/app/routes/project_routes.test.js`

### 5. Enhanced Project Dashboard (STORY-006)

- Added `UserInfo` interface and `getUser(userId)` method to `ProjectService`.
- Dashboard now shows: status chip (Active/Inactive via `eui-chip`), creator name (resolved via `getUser()` with "Unknown" fallback on error), created date, last updated date.
- Replaced member count with full members `eui-table` (Name, Email, Role columns) with loading state.
- Accessible: `aria-label` on table, `scope="col"` on headers, `data-col-label` on cells, `aria-live="polite"` on member count heading.
- 20 unit tests (up from 9).

Files: `src/app/core/project/project.models.ts`, `src/app/core/project/index.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/project.service.spec.ts`, `src/app/features/projects/dashboard/dashboard.component.ts`, `src/app/features/projects/dashboard/dashboard.component.html`, `src/app/features/projects/dashboard/dashboard.component.scss`, `src/app/features/projects/dashboard/dashboard.component.spec.ts`

### 6. Cross-cutting fix: Users table status chips

- Replaced plain text `Active`/`Inactive` in the Users table with `eui-chip` (`euiSuccess`/`euiDanger`) to match the Portfolio table styling.
- Added `EUI_CHIP` import to `UsersComponent`.
- Updated test to verify chip rendering.

Files: `src/app/features/admin/users/users.component.ts`, `src/app/features/admin/users/users.component.html`, `src/app/features/admin/users/users.component.spec.ts`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/09-Project_Portfolio/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

- **Client-side → async table migration**: The portfolio table switched from client-side data binding to async mode (`isAsync`). Pagination, search, and sorting are handled via API params, not table-internal state. This matches the admin users pattern and scales to large datasets.
- **Paginator init guard**: `eui-paginator` fires `pageChange` during initialization. Guarded with `AfterViewInit` + `paginatorReady` flag to prevent a double API call on page load.
- **Toggle group width override**: `eui-toggle-group` defaults to `width: 100%`. Overridden with `::ng-deep { width: auto }` in component SCSS for compact inline layout next to the search filter.
- **eui-chip for status (not color-only)**: Status columns use `eui-chip` with `euiSuccess`/`euiDanger` directives plus text labels ("Active"/"Inactive"). This satisfies WCAG 2.2 AA — information is not conveyed by color alone. Applied consistently across Portfolio, Dashboard, and Users tables.
- **Icon naming convention**: Discovered that `eui-icon-button` silently renders empty when given bare names like `icon="edit"`. Must use `icon="eui-edit"` (eUI built-in) or `icon="name:set"` format (third-party). Added to `eui-pitfalls.md` steering rules.
- **Creator name resolution**: Dashboard resolves `created_by` user ID to a display name via `ProjectService.getUser()`. Falls back to "Unknown" on error rather than showing a raw ID.
- **Edit dialog key display**: Project key shown as read-only text (not a disabled input) since keys are immutable. Avoids user confusion about editability.
- **STORY-001 + STORY-002 merged**: Backend endpoint changes and frontend async table migration were implemented in a single commit since the frontend depends on the new `{ data, total, page, limit }` response shape.

## Git history

```
4239448 feat(portfolio): STORY-001 + STORY-002 — enhanced project list endpoint & async portfolio table
4cdbdcd feat(portfolio): STORY-003 — status filter toggle & status column
09eacd8 feat(portfolio): STORY-004 — edit project settings dialog + BUG-001 icon fix
58cc2a5 feat(STORY-005): expand seed data — 15 projects, 46 project-members
733a03f feat(dashboard): STORY-006 enhanced project dashboard
087ebed fix(users): use eui-chip for status column in Users table
```

## Test summary

- Frontend: 271 unit tests (vitest) — all passing
- Backend: 127 integration tests (Jest + supertest) — all passing
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full project portfolio enhancement feature on a fresh eUI Angular project that already has authentication, RBAC, admin user management, project navigation with shell/dashboard, and project creation with key management. Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> I have an eUI Angular 21 application with authentication, RBAC, admin user management, project navigation (shell, dashboard, sidebar), and project creation with key management already implemented. The mock backend has `GET /api/projects` (membership-filtered, active only for regular users), `GET /api/projects/:projectId`, `GET /api/projects/:projectId/members`, `POST /api/projects` (SUPER_ADMIN), and `PATCH /api/projects/:projectId` (SUPER_ADMIN, key immutable). There are 3 seed projects and 16 project-member records. `PermissionService` has `isSuperAdmin()`. The portfolio page has a basic `eui-table` (client-side) with Key, Name, Description columns and a Create button. The dashboard shows project name, key, description, created date, and member count. I need you to enhance the portfolio and dashboard to production quality. Work story by story, in order. For each story, first create an analysis `.md` file, wait for my approval, then implement with tests.
>
> **STORY-001 + STORY-002: Backend Enhanced List + Frontend Async Table**
>
> Backend: Upgrade `GET /api/projects` to support server-side pagination (`_page`, `_limit` default 10 max 100), search (`q` — case-insensitive on name/key/description), sorting (`_sort`, `_order`), and status filtering (`is_active`). SUPER_ADMIN sees all projects (active + inactive). Regular users see only active projects they are members of (ignore `is_active` filter). Response shape: `{ data: Project[], total: number, page: number, limit: number }`. Sort then paginate. Add 13+ integration tests (Jest + supertest).
>
> Frontend: Switch `eui-table` from client-side to async mode (`isAsync`, `[isLoading]`). Add `ProjectListParams` and `ProjectListResponse` interfaces. Add `eui-table-filter` with 300ms debounced search. Add `eui-paginator` with `[10, 25, 50]` page sizes — guard init event with `AfterViewInit` + `paginatorReady` flag. Add sortable Key and Name columns (`isSortable`, `sortOn`). Add `aria-live="polite"` result count. Loading/error states with retry button. `OnPush` + `cdr.markForCheck()`. 39+ unit tests.
>
> **STORY-003: Status Filter & Status Column**
>
> Add `eui-toggle-group` (All/Active/Inactive) visible only to SUPER_ADMIN via `@if (isSuperAdmin)`. On toggle change: update `is_active` param and reload. Override `eui-toggle-group` default `width: 100%` with `::ng-deep { width: auto }` in component SCSS. Add Status column with `eui-chip` (`euiSuccess` for Active, `euiDanger` for Inactive) — use `@if`/`@else` blocks since `euiSuccess`/`euiDanger` are static attribute directives. Text labels inside chips satisfy WCAG color-only rule. 12+ unit tests.
>
> **STORY-004: Edit Project Settings Dialog**
>
> Add `UpdateProjectPayload` interface and `updateProject(projectId, payload)` to `ProjectService`. Implement inline `eui-dialog #editDialog` in `PortfolioComponent` with reactive form: Key (read-only text, not input), Name (required, min 2), Description (optional). Add edit `eui-icon-button` with `icon="eui-edit"` (NOT `icon="edit"` — bare names render empty) in Actions column, visible only to SUPER_ADMIN, with `[ariaLabel]="'Edit ' + row.name"`. Use `[isHandleCloseOnAccept]="true"` — close manually after API success. On success: close dialog, growl, reload list. On 409: inline error. On other errors: growl. Reset form on dismiss. Accessibility: `aria-haspopup="dialog"`, `for`/`id` pairs, `aria-required`, `aria-describedby` for errors. 10+ unit tests.
>
> **STORY-005: Seed Data Expansion**
>
> Add 12+ new projects to `mock/db/db.json` (total 15: mix of active/inactive, diverse names and keys). Add 30+ project-member records (total 46) linking existing users to new projects with varied roles. Ensure at least 3–4 inactive projects for status filter testing. Data-only change. Verify all existing tests still pass. Note: mock tests may mutate `db.json` — restore with `git checkout mock/db/db.json` after running.
>
> **STORY-006: Enhanced Project Dashboard**
>
> Add `UserInfo` interface and `getUser(userId): Observable<UserInfo>` to `ProjectService` (calls `GET /api/users/:userId`). Dashboard enhancements: status chip (Active/Inactive via `eui-chip` with `@if`/`@else`), creator name (resolve `created_by` via `getUser()`, fallback "Unknown" on error), created date, last updated date (both via `DatePipe`). Replace member count with full members `eui-table` (Name, Email, Role columns) with `isAsync`, `[isLoading]`, loading/error states. Accessible: `aria-label` on table, `scope="col"` on headers, `data-col-label` on cells, `aria-live="polite"` on member count heading. 20+ unit tests.
>
> **Cross-cutting: Users table status chips**
>
> Replace plain text Active/Inactive in the admin Users table with `eui-chip` (`euiSuccess`/`euiDanger`) to match Portfolio table styling. Add `EUI_CHIP` import. Update test.
>
> **Important constraints:**
> - Use eUI components first — check the eUI component library before using alternatives.
> - `eui-chip` color directives (`euiSuccess`, `euiDanger`) are static attribute directives — use `@if`/`@else` blocks, not dynamic binding.
> - `eui-toggle-group` has `width: 100%` by default — override with `::ng-deep { width: auto }`.
> - `eui-paginator` fires `pageChange` during init — guard with `AfterViewInit` + `paginatorReady` flag.
> - `eui-table` strips `<caption>` — use `aria-label` on the table element instead.
> - `eui-icon-button` uses `[euiDisabled]` not `[disabled]`. Icon names must use `eui-edit` (not `edit`) or `name:set` format.
> - `eui-dialog` with `[isHandleCloseOnAccept]="true"` prevents auto-close — close manually via `dialog.closeDialog()`.
> - `EuiGrowlService` uses `growlService.growl({ severity, summary, detail })`.
> - Place action buttons in `<eui-page-header-action-items>` inside `<eui-page-header>` (not in `<eui-page-content>`).
> - Use `OnPush` change detection + `cdr.markForCheck()` in async callbacks.
> - Frontend tests use vitest. Run with `npm run test:ci` (single-run, not watch mode).
> - Mock server tests use Jest. Run with `npm run test:mock`. Restore DB after: `git checkout mock/db/db.json`.
> - Every story must pass build (`npx ng build --configuration=development`) and all tests before committing.
> - Follow WCAG 2.2 AA: semantic HTML, `aria-label` on icon buttons, `aria-live="polite"` on dynamic content, `for`/`id` on form labels, no color-only information, `scope="col"` on table headers, `data-col-label` on table cells.
