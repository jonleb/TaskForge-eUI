# FEATURE-003 RBAC — Story Breakdown

## Context

This feature adds Role-Based Access Control (RBAC) infrastructure to the TaskForge-eUI-v2 app. The goal is to establish the permission model, backend enforcement, and frontend gating so that future features (user admin, project pages, tickets, etc.) can declare their access rules and have them enforced consistently.

The app currently has authentication (branch `04-AUTH-LOGIN`) with a single `role` field per user. This branch introduces a dual-role model and the plumbing to use it.

## Role Model

### Global roles (app-wide)
| Role | Description |
|------|-------------|
| `SUPER_ADMIN` | Full platform access. Can manage users, see all projects, bypass project membership checks where policy allows. |
| `USER` | Standard authenticated user. Access is scoped to projects they belong to. |

### Project roles (per-project membership)
| Role | Description |
|------|-------------|
| `PROJECT_ADMIN` | Full control within a project. Can manage members, settings, workflows. |
| `PRODUCT_OWNER` | Manages backlog, priorities, releases within a project. |
| `DEVELOPER` | Works on tickets, sprints, code within a project. |
| `REPORTER` | Creates and tracks tickets within a project. |
| `VIEWER` | Read-only access within a project. |

### Mapping to current data

The `users` collection currently has both `role` and `global_role` fields. Going forward:
- `global_role` determines app-wide access: `SUPER_ADMIN` or `USER`
- Users with `global_role` values other than `SUPER_ADMIN` are treated as `USER`
- Project-specific roles come from a new `project-members` collection

---

## Execution Order

Stories must be implemented in this exact order. Each story depends on the previous one.

---

## STORY-001: Mock Backend — Projects & Project Members Seed Data

### Goal
Create the project and project-members collections in the mock DB so that project-scoped RBAC has data to work with.

### Backend (mock server)

1. Add a `projects` collection to `mock/db/db.json` with 3 seed projects:
   - Fields: `id`, `key` (short code, e.g. `TF`, `DEMO`, `INFRA`), `name`, `description`, `created_by` (userId), `created_at`, `updated_at`, `is_active`
   - At least one inactive project for testing

2. Add a `project-members` collection to `mock/db/db.json`:
   - Fields: `id`, `projectId`, `userId`, `role` (project role), `joined_at`
   - Seed memberships so that:
     - Each project has at least one member per project role
     - Some users are members of multiple projects with different roles
     - SUPER_ADMIN users do NOT need explicit membership (they bypass via global role)
   - Use existing user IDs from the `users` collection

3. Create `mock/app/models/project.js` and `mock/app/models/project-member.js` with field schemas.

### Acceptance Criteria
- [ ] `mock/db/db.json` contains 3+ projects with varied states
- [ ] `mock/db/db.json` contains project-members mapping users to projects with project roles
- [ ] Each project has members covering all 5 project roles
- [ ] Some users appear in multiple projects with different roles
- [ ] SUPER_ADMIN users have no explicit project membership entries (bypass by design)

---

## STORY-002: Mock Backend — Authorization Middleware

### Goal
Create a reusable authorization middleware that checks global role and/or project membership before allowing access to protected endpoints.

### Backend (mock server)

1. Create `mock/app/middleware/authorize.js`:
   - `requireGlobalRole(...roles)` — returns middleware that checks `req.user.role` against allowed global roles. Returns `403 { message: "Forbidden" }` if not authorized.
   - `requireProjectRole(...roles)` — returns middleware that:
     - Reads `projectId` from `req.params.projectId` or `req.body.projectId`
     - If user's `global_role` is `SUPER_ADMIN`, allows access (bypass)
     - Otherwise, looks up `project-members` for `{ projectId, userId }` and checks if the member's role is in the allowed list
     - Returns `403 { message: "Forbidden" }` if not a member or role not allowed
   - Both middlewares assume `authMiddleware` has already run (i.e. `req.user` exists)

2. Create `mock/app/routes/project_routes.js`:
   - `GET /api/projects` — (protected) returns all active projects the user is a member of. SUPER_ADMIN sees all projects.
   - `GET /api/projects/:projectId` — (protected) returns project details if user is a member or SUPER_ADMIN.
   - `GET /api/projects/:projectId/members` — (protected, requires project membership) returns members of the project.
   - Register routes in `mock/app/routes/index.js`

3. Add Jest + supertest tests for the authorization middleware and project routes.

### Acceptance Criteria
- [ ] `requireGlobalRole('SUPER_ADMIN')` blocks non-SUPER_ADMIN users with 403
- [ ] `requireProjectRole(...)` allows SUPER_ADMIN without membership
- [ ] `requireProjectRole(...)` blocks users who are not project members with 403
- [ ] `requireProjectRole(...)` blocks members whose project role is not in the allowed list
- [ ] `GET /api/projects` returns only projects the user belongs to (or all for SUPER_ADMIN)
- [ ] `GET /api/projects/:projectId/members` returns members for authorized users
- [ ] All existing tests still pass

---

## STORY-003: Frontend — Permission Service & Role Model

### Goal
Create a frontend service that holds the current user's roles and provides methods to check permissions. This is the single source of truth for all frontend access decisions.

### Frontend

1. Update `src/app/core/auth/auth.models.ts`:
   - Add `globalRole` field to `UserProfile` (or derive it: if `role === 'SUPER_ADMIN'` then `SUPER_ADMIN`, else `USER`)
   - Add `ProjectMembership` interface: `{ projectId: string; projectKey: string; role: string }`

2. Create `src/app/core/auth/permission.service.ts`:
   - Injected as `providedIn: 'root'`
   - `globalRole$: BehaviorSubject<string>` — current user's global role
   - `setUser(profile: UserProfile): void` — called after login/init to set the global role
   - `isSuperAdmin(): boolean` — checks if global role is `SUPER_ADMIN`
   - `hasGlobalRole(...roles: string[]): boolean` — checks if global role is in the list
   - `hasProjectRole(projectId: string, ...roles: string[]): Observable<boolean>` — calls `GET /api/projects/:projectId/members` (or uses cached data) to check if user has one of the specified roles in that project. SUPER_ADMIN always returns true.
   - `clear(): void` — resets state on logout

3. Update `AppStarterService` to call `permissionService.setUser(profile)` after fetching user details.

4. Update `AuthService.logout()` flow to call `permissionService.clear()`.

5. Export from `src/app/core/auth/index.ts`.

### Acceptance Criteria
- [ ] `PermissionService.isSuperAdmin()` returns true for SUPER_ADMIN users
- [ ] `PermissionService.hasGlobalRole('SUPER_ADMIN')` works correctly
- [ ] `PermissionService.hasProjectRole()` returns true for SUPER_ADMIN without membership
- [ ] `PermissionService.hasProjectRole()` checks actual membership for regular users
- [ ] State is cleared on logout
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-004: Frontend — Role-Based Route Guard

### Goal
Create a configurable route guard that restricts access to routes based on global role or project role. This complements the existing `authGuard` (which only checks authentication).

### Frontend

1. Create `src/app/core/auth/role.guard.ts`:
   - Functional guard using `CanActivateFn`
   - Reads route data to determine required roles: `data: { roles: ['SUPER_ADMIN'] }`
   - Uses `PermissionService` to check access
   - If denied: redirects to `/screen/home` (or a future access-denied page) and shows a growl notification ("You do not have permission to access this page")
   - If allowed: returns `true`

2. Update `src/app/core/auth/index.ts` to export the new guard.

3. Add unit tests.

### Usage example (for future routes):
```typescript
{
    path: 'screen/admin/users',
    loadChildren: () => import('./features/admin/users/users.routes').then(m => m.USERS_ROUTES),
    data: { roles: ['SUPER_ADMIN'] },
    canActivate: [authGuard, roleGuard],
}
```

### Acceptance Criteria
- [ ] Route with `data: { roles: ['SUPER_ADMIN'] }` blocks non-SUPER_ADMIN users
- [ ] Route with `data: { roles: ['SUPER_ADMIN'] }` allows SUPER_ADMIN users
- [ ] Denied users are redirected to `/screen/home`
- [ ] Denied users see a growl notification
- [ ] Routes without `data.roles` are not affected (guard passes through)
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-005: Frontend — Role-Based Sidebar Filtering

### Goal
Filter sidebar navigation items based on the user's global role so that users only see menu entries they have access to.

### Frontend

1. Update `LayoutComponent`:
   - Add a `roles` property to sidebar items that require role gating (e.g. `{ label: 'Users', url: 'screen/admin/users', roles: ['SUPER_ADMIN'] }`)
   - Filter `sidebarItems` based on `PermissionService` after user profile is loaded
   - Items without a `roles` property are visible to everyone

2. Extend `EuiMenuItem` type (or use a wrapper interface) to support the optional `roles` field.

3. Add unit tests for sidebar filtering logic.

### Acceptance Criteria
- [ ] SUPER_ADMIN sees all sidebar items including admin entries
- [ ] Regular users do not see admin-only sidebar items
- [ ] Items without `roles` are visible to all authenticated users
- [ ] Sidebar updates after login (not stale from previous session)
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-006: Frontend — Access Denied Feedback

### Goal
Provide clear, consistent feedback when a user attempts an action or navigation they are not authorized for.

### Frontend

1. The `roleGuard` (STORY-004) already shows a growl notification on denied navigation.

2. Create a reusable approach for action-level denial:
   - Add a method to `PermissionService`: `showAccessDenied(message?: string): void` — shows a growl notification via `EuiGrowlService` with severity `'warning'` and a default message ("You do not have permission to perform this action").
   - This can be called from components when an action button is clicked but the user lacks permission (defensive, in case the UI filtering missed something or a direct API call returns 403).

3. Update the auth interceptor to detect `403` responses and show the access-denied growl (similar to the existing 401 handling, but without redirecting or clearing the session).

4. Add unit tests.

### Acceptance Criteria
- [ ] `PermissionService.showAccessDenied()` shows a growl notification
- [ ] 403 API responses trigger a growl notification automatically
- [ ] 403 does NOT clear the session or redirect (unlike 401)
- [ ] Growl uses `aria-live="polite"` (built into eui-growl, a11y)
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-007: Integration — Demo Admin Route with Full RBAC Stack

### Goal
Wire up a concrete example route that exercises the full RBAC stack end-to-end: a "Users" admin page accessible only to SUPER_ADMIN.

### Frontend

1. Create a minimal `src/app/features/admin/users/` module:
   - `users.component.ts` — simple page with `eui-page` / `eui-page-header` showing "User Administration"
   - `users.routes.ts` — export `USERS_ROUTES`

2. Add the route in `app.routes.ts`:
   ```typescript
   {
       path: 'screen/admin/users',
       loadChildren: () => import('./features/admin/users/users.routes').then(m => m.USERS_ROUTES),
       data: { roles: ['SUPER_ADMIN'] },
       canActivate: [authGuard, roleGuard],
   }
   ```

3. Add a sidebar entry in `LayoutComponent`:
   ```typescript
   { label: 'Users', url: 'screen/admin/users', roles: ['SUPER_ADMIN'] }
   ```

4. Add unit tests for the component.

### Backend
- No new endpoints needed — the page is a placeholder for now.

### Acceptance Criteria
- [ ] SUPER_ADMIN can navigate to `/screen/admin/users` and sees the page
- [ ] Non-SUPER_ADMIN users do not see "Users" in the sidebar
- [ ] Non-SUPER_ADMIN users navigating directly to `/screen/admin/users` are redirected with a growl notification
- [ ] All existing tests still pass
- [ ] Build passes: `npx ng build --configuration=development`

---

## Dependency Graph

```
STORY-001 (Projects & members seed data)
    └── STORY-002 (Authorization middleware + project routes)
            └── STORY-003 (Frontend PermissionService)
                    ├── STORY-004 (Role-based route guard)
                    ├── STORY-005 (Sidebar filtering)
                    └── STORY-006 (Access denied feedback)
                            └── STORY-007 (Demo admin route — full stack integration)
```

## Technical Notes

- The `global_role` field already exists in `mock/db/db.json` on all users. Users with `global_role: 'SUPER_ADMIN'` are super admins; all others are treated as `USER`.
- The token payload already contains `role` (which maps to `global_role`). No token format change needed.
- Project roles are resolved at runtime via the `project-members` collection, not baked into the token.
- The `PermissionService` is the single source of truth for all frontend access decisions. Components and guards should never check roles directly from `AuthService`.
- Future features (tickets, sprints, etc.) will use `requireProjectRole()` on the backend and `hasProjectRole()` on the frontend to enforce project-scoped access.
