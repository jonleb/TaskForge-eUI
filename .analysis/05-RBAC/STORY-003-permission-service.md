# STORY-003: Frontend — Permission Service & Role Model

## Goal

Create a frontend `PermissionService` that holds the current user's roles and provides methods to check permissions. This service becomes the single source of truth for all frontend access decisions — components and guards should never check roles directly from `AuthService`.

## Prerequisites

- STORY-002 (authorization middleware & project routes) — done
- `AuthService.getCurrentUser()` calls `GET /api/auth/me` which returns the full user profile including `role` and `global_role`
- `UserProfile` interface in `auth.models.ts` currently has: `userId`, `firstName`, `lastName`, `email`, `role`
- `AppStarterService` calls `AuthService.getCurrentUser()` at startup to populate eUI's `UserService`
- `LayoutComponent.ngOnInit()` also calls `AuthService.getCurrentUser()` to get the user role for the toolbar profile

## Current State

- The `UserProfile` interface has a `role` field but no `globalRole` concept
- The `/api/auth/me` endpoint returns both `role` and `global_role` from the DB (they currently hold the same value)
- No centralized permission checking exists — `LayoutComponent` reads `profile.role` directly
- No project membership awareness on the frontend

## Implementation Plan

### 1. Update `src/app/core/auth/auth.models.ts`

- Add `globalRole` field to `UserProfile` — derived from the backend: if `role === 'SUPER_ADMIN'` then `SUPER_ADMIN`, else `USER`
- Add `ProjectMembership` interface:
  ```typescript
  export interface ProjectMembership {
      projectId: string;
      projectKey: string;
      role: string;
  }
  ```
- Add global role and project role constants:
  ```typescript
  export type GlobalRole = 'SUPER_ADMIN' | 'USER';
  export type ProjectRole = 'PROJECT_ADMIN' | 'PRODUCT_OWNER' | 'DEVELOPER' | 'REPORTER' | 'VIEWER';
  ```

### 2. Create `src/app/core/auth/permission.service.ts`

Injectable as `providedIn: 'root'`.

#### State
- `private globalRole: GlobalRole = 'USER'` — current user's computed global role
- `private userId: string = ''` — current user's ID

#### Methods
- `setUser(profile: UserProfile): void` — called after login/init. Computes `globalRole` from `profile.role`: if `profile.role === 'SUPER_ADMIN'` → `'SUPER_ADMIN'`, else `'USER'`. Stores `userId`.
- `isSuperAdmin(): boolean` — returns `this.globalRole === 'SUPER_ADMIN'`
- `hasGlobalRole(...roles: GlobalRole[]): boolean` — returns `roles.includes(this.globalRole)`
- `hasProjectRole(projectId: string, ...roles: ProjectRole[]): Observable<boolean>` — calls `GET /api/projects/:projectId/members`, finds the current user in the list, checks if their role is in the allowed list. SUPER_ADMIN always returns `true` (short-circuit, no API call).
- `clear(): void` — resets `globalRole` to `'USER'`, clears `userId`. Called on logout.
- `getGlobalRole(): GlobalRole` — getter for the current global role
- `getUserId(): string` — getter for the current user ID

#### Design decisions
- `hasProjectRole()` returns `Observable<boolean>` because it needs an HTTP call for non-SUPER_ADMIN users
- No caching of project memberships in this story — caching can be added later if needed
- The service does NOT subscribe to `AuthService` events — it is explicitly called by `AppStarterService` and cleared by the logout flow

### 3. Update `src/app/app-starter.service.ts`

- Inject `PermissionService`
- In `fetchUserDetails()`, after getting the profile from `AuthService.getCurrentUser()`, call `permissionService.setUser(profile)` before returning the `UserDetails`

### 4. Update `src/app/layout/layout.component.ts`

- Inject `PermissionService`
- In `ngOnInit()`, after fetching the user profile, call `permissionService.setUser(profile)` (defensive — in case `AppStarterService` hasn't run yet, e.g. during hot reload)
- The `logout()` method should call `permissionService.clear()` before navigating to `/login`

### 5. Update `src/app/core/auth/index.ts`

- Export `PermissionService`
- Export new types: `GlobalRole`, `ProjectRole`, `ProjectMembership`

### 6. Tests

#### `permission.service.spec.ts`
- `setUser()` with SUPER_ADMIN role → `isSuperAdmin()` returns `true`
- `setUser()` with non-SUPER_ADMIN role (e.g. DEVELOPER) → `isSuperAdmin()` returns `false`, `getGlobalRole()` returns `'USER'`
- `hasGlobalRole('SUPER_ADMIN')` returns `true` for SUPER_ADMIN user
- `hasGlobalRole('SUPER_ADMIN')` returns `false` for regular user
- `hasGlobalRole('USER')` returns `true` for regular user
- `hasProjectRole()` returns `true` immediately for SUPER_ADMIN (no HTTP call)
- `hasProjectRole()` calls API and returns `true` when user has matching project role
- `hasProjectRole()` calls API and returns `false` when user is not a member
- `hasProjectRole()` calls API and returns `false` when user has wrong project role
- `clear()` resets state to defaults

#### `app-starter.service.spec.ts`
- Verify `permissionService.setUser()` is called with the user profile during init

#### `layout.component.spec.ts`
- Verify `permissionService.clear()` is called during logout

## Files to Create
- `src/app/core/auth/permission.service.ts`
- `src/app/core/auth/permission.service.spec.ts`

## Files to Modify
- `src/app/core/auth/auth.models.ts` — add `GlobalRole`, `ProjectRole`, `ProjectMembership` types
- `src/app/core/auth/index.ts` — export new service and types
- `src/app/app-starter.service.ts` — inject and call `PermissionService.setUser()`
- `src/app/app-starter.service.spec.ts` — update tests
- `src/app/layout/layout.component.ts` — inject `PermissionService`, call `setUser()` and `clear()`
- `src/app/layout/layout.component.spec.ts` — update tests

## Acceptance Criteria

- [ ] `PermissionService.isSuperAdmin()` returns `true` for SUPER_ADMIN users
- [ ] `PermissionService.hasGlobalRole('SUPER_ADMIN')` works correctly for both user types
- [ ] `PermissionService.hasGlobalRole('USER')` returns `true` for non-SUPER_ADMIN users
- [ ] `PermissionService.hasProjectRole()` returns `true` for SUPER_ADMIN without HTTP call
- [ ] `PermissionService.hasProjectRole()` checks actual membership via API for regular users
- [ ] `PermissionService.clear()` resets all state on logout
- [ ] `AppStarterService` calls `permissionService.setUser()` during initialization
- [ ] `LayoutComponent` calls `permissionService.clear()` during logout
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
