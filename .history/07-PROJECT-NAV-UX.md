# 07-PROJECT-NAV-UX — Project Navigation UX Feature

## What this branch does

This branch adds project-centered navigation to the TaskForge-eUI-v2 app. Users can browse their projects from a portfolio page, select one, and work within a project-scoped context with a dynamic sidebar, breadcrumb navigation, and session persistence across page refreshes. The branch also includes a codebase cleanup pass (dead code removal, test factory extraction, duplicate HTTP call elimination).

## Step-by-step walkthrough

### 1. Project Service — HTTP client for project endpoints (STORY-001)

Created `ProjectService` (`providedIn: 'root'`) as the single point of contact between frontend components and the project API:
- `getProjects(): Observable<Project[]>` — calls `GET /api/projects` (membership-filtered by backend).
- `getProject(projectId: string): Observable<Project>` — calls `GET /api/projects/:projectId`.
- `getProjectMembers(projectId: string): Observable<ProjectMember[]>` — calls `GET /api/projects/:projectId/members`.
- TypeScript interfaces in `project.models.ts`: `Project` (id, key, name, description, created_by, created_at, updated_at, is_active), `ProjectMember` (id, userId, role, joined_at, firstName, lastName, email).
- Barrel export at `src/app/core/project/index.ts`.
- Unit tests with `HttpClientTestingModule`.

### 2. Project Context Service (STORY-002)

Created `ProjectContextService` (`providedIn: 'root'`) to manage the currently selected project:
- `currentProject$: BehaviorSubject<Project | null>` — reactive stream of the active project.
- `setProject(project)` — sets active project, persists ID to `sessionStorage`.
- `clearProject()` — clears state and removes from `sessionStorage`.
- `getProjectId()` — synchronous accessor.
- `restoreProject(): Observable<Project | null>` — reads stored ID from `sessionStorage`, fetches from API. Returns `null` if no stored ID or fetch fails.
- Uses `sessionStorage` (tab-scoped, not cross-session).
- Unit tests covering all methods and edge cases.

### 3. Project Portfolio Page (STORY-003)

Created the "Projects" page as the entry point for project navigation:
- `PortfolioComponent` with `eui-page` > `eui-page-header` (label "Projects") > `eui-page-content`.
- `eui-table` displaying accessible projects: Key, Name, Description columns.
- Each row clickable → navigates to `screen/projects/:projectId`.
- Loading, empty, and error states with retry.
- Updated `app.routes.ts` with lazy-loaded `projects.routes.ts`.
- Updated `LayoutComponent` sidebar: replaced Module 1/Module 2 with "Projects" entry.
- Accessibility: `aria-label` on table, `scope="col"` on headers, `data-col-label` on cells.
- Unit tests.

### 4. Project Shell & Scoped Sidebar (STORY-004)

Created `ProjectShellComponent` wrapping all project-scoped pages:
- Resolves project from `:projectId` route param on init.
- Calls `projectContextService.setProject(project)` to set context.
- On destroy: calls `projectContextService.clearProject()`.
- Handles 404/403 with growl + redirect to portfolio.
- Contains `<router-outlet>` for child project pages.
- `LayoutComponent` reacts to `projectContextService.currentProject$`:
  - Project active → project-scoped sidebar: ← All Projects, Dashboard, Backlog, Board, Settings.
  - No project → global sidebar: Home, Projects, Users (SUPER_ADMIN).
- Unit tests.

### 5. Project Dashboard (STORY-005)

Created a placeholder dashboard as the landing page inside a project:
- `DashboardComponent` with `eui-page` > `eui-page-header` (project name) > `eui-page-content`.
- Displays project details: name, key, description, created date.
- Displays team member count from `projectService.getProjectMembers()`.
- Placeholder cards for future widgets.
- Wired as default child route of `ProjectShellComponent`.
- Unit tests.

### 6. Breadcrumb Navigation (STORY-006)

Added breadcrumb navigation to project pages using eUI's `EuiBreadcrumbService`:
- `LayoutComponent` template includes `eui-app-breadcrumb` with `eui-breadcrumb` / `eui-breadcrumb-item`.
- Subscribes to `breadcrumbService.breadcrumbs$` for reactive updates.
- Portfolio page sets: `Projects`.
- Dashboard page sets: `Projects > {Project Name}`.
- Home icon breadcrumb item with `ariaLabel="Home"`.
- Last item (current page) has no link.
- Unit tests.

### 7. Session Persistence & Restore (STORY-007)

Ensured project context survives page refreshes:
- Chained `projectContextService.restoreProject()` into `AppStarterService.start()` pipeline after user init and i18n init.
- If a project is restored, sidebar updates automatically via existing `currentProject$` subscription.
- If restore fails (project deleted, access revoked), clears `sessionStorage` silently.
- Unit tests covering restore success, restore failure, and no stored project.

### 8. Codebase cleanup (refactor commit)

Performed a code audit and cleanup:
- **Dead code removal**: Deleted `module1/`, `module2/` (eui-cli scaffolding placeholders), `dashboard-placeholder/` (empty dir), `shared/testing/router.mock.ts` (unused). Removed module1/module2 routes from `app.routes.ts`.
- **Test factory extraction**: Created `src/app/testing/test-providers.ts` with shared factories: `provideEuiCoreMocks()`, `createI18nServiceMock()`, `createGrowlServiceMock()`, `createBreadcrumbServiceMock()`, `TEST_CONFIG`. Refactored 6 spec files to use them. Updated `tsconfig.app.json` to exclude `app/testing/**` from production build.
- **Duplicate getCurrentUser() elimination**: `LayoutComponent.ngOnInit()` was calling `authService.getCurrentUser()` redundantly (already done by `AppStarterService`). Replaced with synchronous `permissionService.getGlobalRole()` read. Removed one wasted HTTP call per layout render.

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/007-Project_nav_ux/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component and service (vitest).
5. **Verification** — all tests pass (`npm run test:ci`), build passes (`npx ng build --configuration=development`).
6. **Commit** — one commit per story.

## Key technical decisions

- **sessionStorage over localStorage**: Project context is tab-scoped — different tabs can have different projects, and context should not persist across browser sessions.
- **BehaviorSubject for project context**: Allows synchronous reads via `.value` and reactive subscriptions via `.pipe()`. Components subscribe to `currentProject$` for sidebar/breadcrumb updates.
- **EuiBreadcrumbService**: Used the eUI-provided service (`setBreadcrumb()`, `breadcrumbs$`) rather than a custom breadcrumb service. Each page component explicitly sets its breadcrumbs on init — simple and predictable.
- **Sidebar switching pattern**: `LayoutComponent` subscribes to `projectContextService.currentProject$` and rebuilds the sidebar items array reactively. Global items vs project-scoped items are two separate arrays.
- **Restore in AppStarterService**: Session restore happens during app initialization (after user profile load, after i18n init) so the sidebar and breadcrumbs are correct before the first render.
- **OnPush + markForCheck()**: All new components use `OnPush` change detection with `cdr.markForCheck()` in async callbacks.
- **Shared test providers**: Extracted common TestBed boilerplate into `test-providers.ts` to reduce duplication across 14+ spec files. Excluded from production build via `tsconfig.app.json`.

## Git history

```
8a692a2 feat(project-nav): STORY-001 — ProjectService, models & barrel export
eadada1 feat(project-nav): STORY-002 & STORY-003 — ProjectContextService + Portfolio page
584234d feat(STORY-004): project shell & scoped sidebar
190e891 feat(STORY-005): project dashboard with details and member count
4c3975e feat(STORY-006): breadcrumb navigation with EuiBreadcrumbService
f0217e1 chore: add test:ci script and update steering for faster test runs
f2ff1d6 feat(STORY-007): session persistence & restore on app startup
1e47ffe refactor: remove dead code, extract test factories, eliminate duplicate getCurrentUser
```

## Test summary

- Frontend: 207 unit tests (vitest) — all passing
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full project navigation UX feature on a fresh eUI Angular project that already has authentication, RBAC, and admin user management implemented. Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> I have an eUI Angular 21 application with authentication (login, auth guard, auth interceptor), RBAC (PermissionService with hasGlobalRole/hasProjectRole/isSuperAdmin, roleGuard, sidebar filtering), and admin user management already implemented. The mock backend has `GET /api/projects` (membership-filtered), `GET /api/projects/:projectId`, and `GET /api/projects/:projectId/members` endpoints protected by auth middleware. There are seed projects with keys (e.g. TF, DEMO, INFRA) and project-member relationships with 5 project roles (PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER, VIEWER). I need you to implement project-centered navigation. Work story by story, in order. For each story, first create an analysis `.md` file, wait for my approval, then implement with tests.
>
> **Frontend stories (in order):**
>
> 1. **Project Service** — Create `ProjectService` (providedIn root) with methods: `getProjects()`, `getProject(projectId)`, `getProjectMembers(projectId)`. Define TypeScript interfaces: `Project` (id, key, name, description, created_by, created_at, updated_at, is_active), `ProjectMember` (id, userId, role, joined_at, firstName, lastName, email). Barrel export at `core/project/index.ts`. Add tests.
>
> 2. **Project Context Service** — Create `ProjectContextService` (providedIn root) managing the currently selected project. Use `BehaviorSubject<Project | null>` for `currentProject$`. Methods: `setProject(project)` (persists ID to sessionStorage), `clearProject()` (removes from sessionStorage), `getProjectId()` (synchronous), `restoreProject(): Observable<Project | null>` (reads stored ID, fetches from API, returns null on failure). Use `sessionStorage` for tab-scoped persistence. Add tests.
>
> 3. **Project Portfolio Page** — Create `PortfolioComponent` with `eui-page` > `eui-page-header` (label "Projects") > `eui-page-content`. Use `eui-table` to display projects: Key, Name, Description columns. Each row clickable → navigates to `screen/projects/:projectId`. Loading, empty, and error states with retry. Create `projects.routes.ts` with lazy loading from `app.routes.ts`. Update sidebar: replace any placeholder entries with "Projects". Accessibility: `aria-label` on table, `scope="col"` on headers, `data-col-label` on cells. Add tests.
>
> 4. **Project Shell & Scoped Sidebar** — Create `ProjectShellComponent` wrapping project-scoped pages. Resolves project from `:projectId` route param. Calls `projectContextService.setProject()` on init, `clearProject()` on destroy. Handles 404/403 with growl + redirect to portfolio. Contains `<router-outlet>`. Update `LayoutComponent` to subscribe to `projectContextService.currentProject$`: when project active → show project-scoped sidebar (← All Projects, Dashboard, Backlog, Board, Settings); when null → show global sidebar (Home, Projects, Users). Add tests.
>
> 5. **Project Dashboard** — Create `DashboardComponent` as default child route of ProjectShell. `eui-page` with project name as header. Display project details (name, key, description, created date) and team member count. Placeholder cards for future widgets. Add tests.
>
> 6. **Breadcrumb Navigation** — Use eUI's `EuiBreadcrumbService` (`setBreadcrumb()`, `breadcrumbs$`) from `@eui/components/eui-breadcrumb`. Add `eui-app-breadcrumb` to `LayoutComponent` template with `eui-breadcrumb` / `eui-breadcrumb-item`. Subscribe to `breadcrumbService.breadcrumbs$`. Portfolio sets: "Projects". Dashboard sets: "Projects > {Project Name}". Home icon with `ariaLabel="Home"`. Last item has no link. Provide `EuiBreadcrumbService` in `LayoutComponent` providers array. Add tests.
>
> 7. **Session Persistence & Restore** — Chain `projectContextService.restoreProject()` into `AppStarterService.start()` pipeline (after user init and i18n init) using `switchMap`. If restore succeeds, sidebar updates automatically via existing `currentProject$` subscription. If restore fails, clear sessionStorage silently. Add tests.
>
> **Codebase cleanup (after all stories):**
>
> 8. **Dead code removal** — Delete any unused scaffolding modules (e.g. module1, module2 from eui-cli), empty directories, unused mock files. Remove their routes from `app.routes.ts`.
>
> 9. **Test factory extraction** — Create `src/app/testing/test-providers.ts` with shared factories: `provideEuiCoreMocks()` (HttpClient, HttpClientTesting, Router, I18nService, CONFIG_TOKEN, UserService), `createI18nServiceMock()`, `createGrowlServiceMock()`, `createBreadcrumbServiceMock()`, `TEST_CONFIG`. Refactor spec files to use them. Exclude `app/testing/**` from production build in `tsconfig.app.json`.
>
> 10. **Eliminate duplicate HTTP calls** — If `AppStarterService` already calls `authService.getCurrentUser()` and `permissionService.setUser()` during app init, remove any duplicate call in `LayoutComponent.ngOnInit()`. Replace with synchronous `permissionService.getGlobalRole()` read.
>
> **Important constraints:**
> - Use eUI components first — check the eUI component library before using alternatives.
> - `EuiBreadcrumbService` is from `@eui/components/eui-breadcrumb` and has `setBreadcrumb()`, `addCrumb()`, `removeCrumb()`, `breadcrumbs$`.
> - `EUI_BREADCRUMB` from `@eui/components/eui-breadcrumb` provides component imports.
> - `EUI_LAYOUT` from `@eui/components/layout` includes `eui-app-breadcrumb`.
> - Provide `EuiBreadcrumbService` in the `LayoutComponent` providers array (not root — it's scoped to the layout).
> - `eui-table` strips `<caption>` — use `aria-label` instead.
> - Use `OnPush` change detection + `cdr.markForCheck()` in async callbacks.
> - Use `sessionStorage` (not `localStorage`) for project context — tab-scoped, not cross-session.
> - Frontend tests use vitest. Run with `npm run test:ci` (single-run, exits cleanly).
> - Every story must pass build (`npx ng build --configuration=development`) and all tests before committing.
> - Follow WCAG 2.2 AA: semantic HTML, `aria-label` on icon buttons, `aria-live="polite"` on dynamic content, `for`/`id` on form labels, no color-only information, `scope="col"` on table headers, `data-col-label` on table cells.
