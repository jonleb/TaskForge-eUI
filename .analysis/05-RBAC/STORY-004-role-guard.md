# STORY-004: Frontend — Role-Based Route Guard

## Goal

Create a configurable route guard (`roleGuard`) that restricts access to routes based on global role. This complements the existing `authGuard` (which only checks authentication). Together they form the two-layer protection: `authGuard` ensures the user is logged in, `roleGuard` ensures they have the right role.

## Prerequisites

- STORY-003 (PermissionService) — done
- Existing `authGuard` in `src/app/core/auth/auth.guard.ts` — functional guard using `CanActivateFn`
- `PermissionService.hasGlobalRole()` available for synchronous global role checks
- `EuiGrowlService` available for user feedback (used in auth interceptor already)

## Current State

- `authGuard` checks `AuthService.isAuthenticated()` and redirects to `/login` if not authenticated
- No role-based route protection exists
- Routes are defined in `src/app/app.routes.ts` with `canActivate: [authGuard]` on the layout shell
- `PermissionService` holds the current user's global role after init

## Implementation Plan

### 1. Create `src/app/core/auth/role.guard.ts`

Functional guard using `CanActivateFn`:

```typescript
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const permissionService = inject(PermissionService);
    const router = inject(Router);
    const growlService = inject(EuiGrowlService);

    const requiredRoles: GlobalRole[] = route.data['roles'];

    // If no roles defined on the route, allow access (pass-through)
    if (!requiredRoles || requiredRoles.length === 0) {
        return true;
    }

    if (permissionService.hasGlobalRole(...requiredRoles)) {
        return true;
    }

    // Denied — show growl and redirect to home
    growlService.growl({
        severity: 'warning',
        summary: 'Access denied',
        detail: 'You do not have permission to access this page.',
    });

    return router.createUrlTree(['/screen/home']);
};
```

#### Design decisions
- The guard reads `route.data['roles']` — an array of `GlobalRole` values (e.g. `['SUPER_ADMIN']`)
- If no `roles` data is present on the route, the guard passes through (returns `true`) — this means it's safe to add `roleGuard` to routes that don't need role gating
- Denied users are redirected to `/screen/home` (not `/login` — they are authenticated, just not authorized)
- A growl notification with severity `'warning'` informs the user why they were redirected
- The guard is synchronous because `hasGlobalRole()` is synchronous (global role is already loaded by `AppStarterService` at init time)
- This guard is meant to be used alongside `authGuard`, not as a replacement: `canActivate: [authGuard, roleGuard]`

### 2. Update `src/app/core/auth/index.ts`

Export `roleGuard`.

### 3. Tests — `src/app/core/auth/role.guard.spec.ts`

Using the same pattern as `auth.guard.spec.ts` (`TestBed.runInInjectionContext`):

- Route with `data: { roles: ['SUPER_ADMIN'] }` + SUPER_ADMIN user → returns `true`
- Route with `data: { roles: ['SUPER_ADMIN'] }` + regular USER → returns `UrlTree` to `/screen/home`
- Route with `data: { roles: ['SUPER_ADMIN'] }` + regular USER → calls `growlService.growl()` with warning
- Route with no `data.roles` → returns `true` (pass-through)
- Route with `data: { roles: [] }` (empty array) → returns `true` (pass-through)
- Route with `data: { roles: ['SUPER_ADMIN', 'USER'] }` + USER → returns `true` (multiple roles accepted)

#### Test setup
- Mock `PermissionService` with `hasGlobalRole` spy
- Mock `EuiGrowlService` with `growl` spy
- Use `ActivatedRouteSnapshot` with `data` property set per test
- Use `TestBed.runInInjectionContext()` to run the functional guard

### Usage example (for STORY-007)

```typescript
{
    path: 'screen/admin/users',
    loadChildren: () => import('./features/admin/users/users.routes').then(m => m.USERS_ROUTES),
    data: { roles: ['SUPER_ADMIN'] },
    canActivate: [authGuard, roleGuard],
}
```

## Files to Create
- `src/app/core/auth/role.guard.ts`
- `src/app/core/auth/role.guard.spec.ts`

## Files to Modify
- `src/app/core/auth/index.ts` — export `roleGuard`

## No routes are modified in this story
The guard is created and tested in isolation. Wiring it into actual routes happens in STORY-007 (demo admin route).

## Acceptance Criteria

- [ ] Route with `data: { roles: ['SUPER_ADMIN'] }` blocks non-SUPER_ADMIN users
- [ ] Route with `data: { roles: ['SUPER_ADMIN'] }` allows SUPER_ADMIN users
- [ ] Denied users are redirected to `/screen/home`
- [ ] Denied users see a growl notification with severity `'warning'`
- [ ] Routes without `data.roles` are not affected (guard passes through)
- [ ] Guard is exported from `src/app/core/auth/index.ts`
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
