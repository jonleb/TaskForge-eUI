# 05-RBAC — Role-Based Access Control Feature

## What this branch does

This branch adds a complete RBAC (Role-Based Access Control) system to the TaskForge-eUI-v2 application. When finished, the app has a dual-role model (global roles + project roles), backend authorization middleware, a frontend permission service, role-gated route guards, sidebar filtering, access-denied feedback, and a demo admin page. Everything runs against the local mock server — no external backend needed.

## Step-by-step walkthrough

### 1. Mock backend — projects & project members seed data (STORY-001)

We created the data foundation for project-scoped RBAC:
- A `projects` collection in `mock/db/db.json` with 3 seed projects (2 active, 1 inactive for testing).
- A `project-members` collection with 16 entries mapping users to projects with project roles (PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER, VIEWER).
- Each active project has at least one member per project role. Some users appear in multiple projects with different roles (e.g. user `developer` is DEVELOPER in TaskForge Core but REPORTER in Demo Project).
- SUPER_ADMIN users have no project-member entries — they bypass membership checks by design.
- Model files `mock/app/models/project.js` and `mock/app/models/project-member.js` following existing patterns.

### 2. Mock backend — authorization middleware & project routes (STORY-002)

We added backend authorization enforcement:
- `mock/app/middleware/authorize.js` with two factory functions:
  - `requireGlobalRole(...roles)` — checks `req.user.role` against allowed global roles, returns 403 if denied.
  - `requireProjectRole(db, ...roles)` — reads `projectId` from params/body/query, allows SUPER_ADMIN immediately (bypass), otherwise looks up `project-members` for matching membership and role. Returns 403 if not authorized.
- `mock/app/routes/project_routes.js` with three endpoints:
  - `GET /api/projects` — returns active projects the user is a member of (SUPER_ADMIN sees all).
  - `GET /api/projects/:projectId` — returns project details if user is a member or SUPER_ADMIN.
  - `GET /api/projects/:projectId/members` — returns members of the project for authorized users.
- Jest + supertest tests covering all authorization scenarios.

### 3. Frontend — permission service & role model (STORY-003)

We created the frontend permission infrastructure:
- Updated `auth.models.ts` with `GlobalRole` (`'SUPER_ADMIN' | 'USER'`), `ProjectRole` (5 project roles), and `ProjectMembership` interface.
- Created `PermissionService` (`providedIn: 'root'`) as the single source of truth for all frontend access decisions:
  - `setUser(profile)` — computes global role from the user profile.
  - `isSuperAdmin()`, `hasGlobalRole(...roles)` — synchronous global role checks.
  - `hasProjectRole(projectId, ...roles)` — async check via `GET /api/projects/:projectId/members`. SUPER_ADMIN returns `true` immediately without an HTTP call.
  - `clear()` — resets state on logout.
- Updated `LayoutComponent` to call `permissionService.setUser()` on init and `permissionService.clear()` on logout.
- Exported everything from `src/app/core/auth/index.ts`.

### 4. Frontend — role-based route guard (STORY-004)

We created a configurable route guard:
- Functional `roleGuard` using `CanActivateFn` that reads `route.data['roles']` (an array of `GlobalRole` values).
- If the user has a matching global role → allows access.
- If denied → redirects to `/screen/home` and shows a growl notification ("Access denied — You do not have permission to access this page.") via `EuiGrowlService`.
- Routes without `data.roles` pass through (safe to add the guard everywhere).
- Designed to be used alongside `authGuard`: `canActivate: [authGuard, roleGuard]`.

### 5. Frontend — role-based sidebar filtering (STORY-005)

We added sidebar menu filtering based on the user's role:
- Defined a `SidebarItemMetadata` interface with optional `roles?: GlobalRole[]`.
- Changed `sidebarItems` from a static array to a filtered result of `allSidebarItems`.
- Used `EuiMenuItem<SidebarItemMetadata>` (eUI's built-in `metadata` generic) to attach role requirements to menu items.
- `filterSidebarItems()` runs after user profile is loaded — items with `metadata.roles` are only shown if the user has a matching global role. Items without `metadata.roles` are visible to everyone.

### 6. Frontend — access denied feedback (STORY-006)

We added consistent access-denied feedback:
- Added `showAccessDenied(message?)` method to `PermissionService` — shows a growl notification via `EuiGrowlService` with severity `'warning'` and a default or custom message.
- Extended `authInterceptor` to handle `403` responses: shows the access-denied growl but does NOT clear the session, does NOT redirect (unlike 401 handling). The error is still propagated to calling code.
- `PermissionService` is injected at the top of the interceptor function (not inside `catchError`) to stay within Angular's injection context.

### 7. Demo admin route with full RBAC stack (STORY-007)

We wired up an end-to-end example:
- Created `UsersComponent` — minimal standalone component using `eui-page` / `eui-page-header` / `eui-page-content` with "User Administration" heading.
- Created `users.routes.ts` with `USERS_ROUTES`.
- Added `screen/admin/users` route in `app.routes.ts` with `canActivate: [authGuard, roleGuard]` and `data: { roles: ['SUPER_ADMIN'] }`.
- Added `{ label: 'Users', url: 'screen/admin/users', metadata: { roles: ['SUPER_ADMIN'] } }` to `allSidebarItems` in `LayoutComponent`.

### 8. Bug fixes

Two issues were discovered and fixed:

- **BUG-001-NO-USER-MENU**: SUPER_ADMIN user didn't see the "Users" menu item. Root cause: STORY-007 had only been documented, not implemented. Resolved by implementing STORY-007.
- **BUG-001-MENU-SLOW-REFRESH**: On page refresh, the sidebar menu was empty until the user clicked somewhere. Root cause: `sidebarItems` was reassigned inside an async `subscribe` callback, and the eUI sidebar component uses `OnPush` change detection internally, so it didn't detect the change. Fix: injected `ChangeDetectorRef` and called `cdr.markForCheck()` after `filterSidebarItems()` in both success and error paths.

## Working method

Each story followed the same pattern:
1. **Analysis first** — create a `.md` file in `.analysis/05-RBAC/` describing the current state, what's missing, the implementation plan, and acceptance criteria.
2. **Review** — the developer reviews and approves the plan before any code is written.
3. **Implementation** — code changes, following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component, service, guard, and interceptor (vitest for frontend, Jest/supertest for mock server).
5. **Verification** — all tests pass (`npm run ng test` for frontend, `npm run test:mock` for backend), build passes.
6. **Commit** — one commit per story or bug fix group.

## Key technical decisions

- **Dual-role model**: Global roles (`SUPER_ADMIN`, `USER`) for app-wide access + project roles (`PROJECT_ADMIN`, `PRODUCT_OWNER`, `DEVELOPER`, `REPORTER`, `VIEWER`) for project-scoped access. Global role is derived from the existing `role` field on the user profile.
- **SUPER_ADMIN bypass**: SUPER_ADMIN users have no entries in `project-members` — they bypass membership checks at both the backend middleware and frontend service level.
- **PermissionService as single source of truth**: Components and guards never check roles directly from `AuthService`. All access decisions go through `PermissionService`.
- **EuiMenuItem metadata generic**: Used `EuiMenuItem<SidebarItemMetadata>` to attach role requirements to sidebar items — this is the official eUI pattern for custom menu item data.
- **ChangeDetectorRef for async sidebar updates**: eUI's sidebar component uses `OnPush` change detection, so `cdr.markForCheck()` is needed after async data updates.
- **403 vs 401 handling**: 401 clears session and redirects to login. 403 shows a growl but keeps the session intact and does not redirect.
- **inject() at top level**: In functional interceptors/guards, `inject()` must be called at the top of the function, not inside `catchError` or other callbacks (outside Angular's injection context).

## Git history

```
cad4d20 feat: STORY-001 projects & project-members seed data for RBAC
2f6efa8 feat: STORY-002 authorization middleware & project routes with RBAC enforcement
18447b6 feat: STORY-003 PermissionService with global/project role checking and logout cleanup
7c880cc feat: STORY-004 role-based route guard with growl notification on access denied
cd5e8eb feat: STORY-005 role-based sidebar filtering using EuiMenuItem metadata
d74a06e feat(rbac): STORY-006 — access denied feedback
e2fcbca feat(rbac): STORY-007 — demo admin route + BUG-001 menu fixes
```

## Test summary

- Frontend: 92 unit tests (vitest) — all passing
- Mock server: Jest + supertest integration tests — all passing
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full RBAC feature on a fresh eUI Angular project that already has authentication implemented (login, auth guard, auth interceptor, session management). Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> I have an eUI Angular 21 application with authentication already implemented (login page, AuthService, auth guard, auth interceptor with 401 handling, session management). I need you to implement a complete Role-Based Access Control (RBAC) system. Work story by story, in order. For each story, first create an analysis `.md` file describing the plan, wait for my approval, then implement with tests.
>
> **Role model:**
> - Global roles: `SUPER_ADMIN` (full platform access) and `USER` (standard user, scoped to project membership).
> - Project roles: `PROJECT_ADMIN`, `PRODUCT_OWNER`, `DEVELOPER`, `REPORTER`, `VIEWER` — assigned per project via a `project-members` collection.
> - Global role is derived from the user's existing `role` field: if `role === 'SUPER_ADMIN'` → `SUPER_ADMIN`, else → `USER`.
> - SUPER_ADMIN bypasses project membership checks everywhere (backend and frontend).
>
> **Backend (mock server using Express + json-server in `mock/` folder):**
>
> 1. **Projects & project members seed data** — Add `projects` collection (3 projects, one inactive) and `project-members` collection (16+ entries) to `mock/db/db.json`. Each active project must have at least one member per project role. Some users should appear in multiple projects with different roles. SUPER_ADMIN users must NOT have project-member entries (they bypass). Create model files in `mock/app/models/`. Add Jest + supertest tests.
>
> 2. **Authorization middleware & project routes** — Create `mock/app/middleware/authorize.js` with `requireGlobalRole(...roles)` and `requireProjectRole(db, ...roles)`. `requireGlobalRole` checks `req.user.role` against allowed roles, returns 403 if denied. `requireProjectRole` reads `projectId` from params/body/query, allows SUPER_ADMIN immediately, otherwise looks up project-members. Create project routes: `GET /api/projects` (filtered by membership, SUPER_ADMIN sees all active), `GET /api/projects/:projectId` (member or SUPER_ADMIN), `GET /api/projects/:projectId/members` (requires project membership). Register in route index. Add tests.
>
> **Frontend:**
>
> 3. **Permission service & role model** — Add `GlobalRole`, `ProjectRole`, `ProjectMembership` types to `auth.models.ts`. Create `PermissionService` (providedIn root) with: `setUser(profile)` to compute global role, `isSuperAdmin()`, `hasGlobalRole(...roles)` (synchronous), `hasProjectRole(projectId, ...roles)` (async Observable, calls members API, SUPER_ADMIN short-circuits to true), `clear()` for logout. Call `setUser()` from the layout component's `ngOnInit()` after fetching user profile. Call `clear()` on logout. Export from auth barrel. Add tests.
>
> 4. **Role-based route guard** — Create functional `roleGuard` using `CanActivateFn`. Read `route.data['roles']` (array of GlobalRole). If user has matching role → allow. If denied → redirect to `/screen/home` and show growl notification ("Access denied") via `EuiGrowlService`. Routes without `data.roles` pass through. Use alongside `authGuard`: `canActivate: [authGuard, roleGuard]`. Add tests.
>
> 5. **Role-based sidebar filtering** — In `LayoutComponent`, use `EuiMenuItem<SidebarItemMetadata>` with `metadata: { roles?: GlobalRole[] }` on items that need role gating. Split items into `allSidebarItems` (static) and `sidebarItems` (filtered). Filter after user profile is loaded using `permissionService.hasGlobalRole()`. Items without `metadata.roles` are visible to everyone. Add tests.
>
> 6. **Access denied feedback** — Add `showAccessDenied(message?)` to `PermissionService` using `EuiGrowlService` (severity `'warning'`). Update auth interceptor to handle 403 responses: show access-denied growl but do NOT clear session, do NOT redirect (unlike 401). Inject `PermissionService` at the top of the interceptor function, not inside `catchError` (injection context). Re-throw the error. Add tests.
>
> 7. **Demo admin route** — Create minimal `UsersComponent` using `eui-page`/`eui-page-header`/`eui-page-content`. Add `screen/admin/users` route with `canActivate: [authGuard, roleGuard]` and `data: { roles: ['SUPER_ADMIN'] }`. Add `{ label: 'Users', url: 'screen/admin/users', metadata: { roles: ['SUPER_ADMIN'] } }` to sidebar items. Add tests.
>
> **Important constraints:**
> - Use eUI components first — check the eUI component library before using alternatives.
> - `PermissionService` is the single source of truth for all frontend access decisions. Components and guards must never check roles directly from `AuthService`.
> - `EuiMenuItem` has a `metadata` generic — use `EuiMenuItem<{ roles?: GlobalRole[] }>` to attach role data to sidebar items.
> - eUI sidebar uses `OnPush` change detection internally — inject `ChangeDetectorRef` and call `cdr.markForCheck()` after async sidebar filtering to avoid stale empty menus on page refresh.
> - In functional interceptors/guards, `inject()` must be called at the top level of the function, NOT inside `catchError` or other RxJS callbacks (outside Angular injection context).
> - 403 handling must NOT clear the session or redirect — only show a growl. 401 handling remains unchanged (clear session, redirect to login).
> - Frontend tests use vitest (`vi.fn()`, `vi.mocked()`). Mock server tests use Jest + supertest.
> - Every story must pass build (`npx ng build --configuration=development`) and all tests before committing.
> - Follow WCAG 2.2 AA: `eui-page` structure for landmark regions, `aria-live="polite"` on dynamic content (built into eui-growl), no color-only information.
