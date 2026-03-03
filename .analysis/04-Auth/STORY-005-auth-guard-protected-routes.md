# STORY-005: Auth Guard & Protected Routes

## Goal

Protect all `/screen/*` routes with an auth guard that redirects unauthenticated users to `/login`.

## Prerequisites

- STORY-003 (AuthService with `isAuthenticated()`) — done
- STORY-004 (Login page at `/login`) — done
- BUG-001/002/003 (Layout restructuring with `LayoutComponent`) — done

## Current State

- `app.routes.ts` has `/login` at top level and `/screen/*` routes under `LayoutComponent`
- `AuthService.isAuthenticated()` checks token existence and expiry
- No guard exists yet — all `/screen/*` routes are accessible without authentication
- Default redirect `''` goes to `screen/home` (should go to `/login` for unauthenticated users)

## Implementation Plan

### 1. Create `src/app/core/auth/auth.guard.ts`

Functional guard using `CanActivateFn`:

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    }

    return router.createUrlTree(['/login']);
};
```

- Uses `inject()` for DI (functional guard pattern)
- Returns `UrlTree` for redirect (preferred over `router.navigate()` in guards)
- No async needed — `isAuthenticated()` is synchronous (checks localStorage + expiry)

### 2. Update `src/app/core/auth/index.ts`

Export the guard from the barrel:

```typescript
export { authGuard } from './auth.guard';
```

### 3. Update `src/app/app.routes.ts`

Apply `canActivate: [authGuard]` to the `LayoutComponent` wrapper route (protects all children):

```typescript
import { authGuard } from './core/auth';

export const routes: Routes = [
    { path: 'login', loadChildren: () => import('./features/login/login.routes').then(m => m.LOGIN_ROUTES) },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'screen/home', pathMatch: 'full' },
            // ... existing child routes
        ],
    },
];
```

Key decision: guard is on the `LayoutComponent` route, not on each child individually. This means:
- One guard check for all `/screen/*` routes
- If unauthenticated, user never sees the shell (toolbar/sidebar)
- Simpler to maintain

### 4. Update `AppStarterService`

`fetchUserDetails()` currently calls a dummy URL. Update to:
- Use `AuthService.getCurrentUser()` when authenticated
- Fall back to anonymous user when not authenticated (login page scenario)

```typescript
private fetchUserDetails(): Observable<UserDetails> {
    const authService = inject(AuthService);

    if (!authService.isAuthenticated()) {
        return of({ userId: 'anonymous', firstName: 'Guest', lastName: '', fullName: 'Guest' });
    }

    return authService.getCurrentUser().pipe(
        map(profile => ({
            userId: profile.userId,
            firstName: profile.firstName,
            lastName: profile.lastName,
            fullName: `${profile.firstName} ${profile.lastName}`,
        })),
        catchError(() => of({ userId: 'anonymous', firstName: 'Guest', lastName: '', fullName: 'Guest' })),
    );
}
```

### 5. Unit Tests

#### `auth.guard.spec.ts` (new file)
- Should return `true` when user is authenticated
- Should return `UrlTree` to `/login` when user is not authenticated
- Should return `UrlTree` to `/login` when token is expired

#### `app-starter.service.spec.ts` (update)
- Should use `AuthService.getCurrentUser()` when authenticated
- Should return anonymous user when not authenticated
- Should return anonymous user when `getCurrentUser()` fails

## Files to Create
- `src/app/core/auth/auth.guard.ts`
- `src/app/core/auth/auth.guard.spec.ts`

## Files to Modify
- `src/app/core/auth/index.ts` — add `authGuard` export
- `src/app/app.routes.ts` — add `canActivate: [authGuard]` to layout route
- `src/app/app-starter.service.ts` — use `AuthService` for user details
- `src/app/app-starter.service.spec.ts` — update tests for new behavior

## Acceptance Criteria

- [ ] Navigating to `/screen/home` without auth redirects to `/login`
- [ ] Navigating to `/screen/home` with valid token loads the page
- [ ] After login, user can access all `/screen/*` routes
- [ ] Direct URL access to protected routes redirects to `/login` if not authenticated
- [ ] `AppStarterService` uses `AuthService.getCurrentUser()` when authenticated
- [ ] `AppStarterService` falls back to anonymous user when not authenticated
- [ ] Guard unit tests pass
- [ ] AppStarterService updated tests pass
- [ ] All existing tests still pass
- [ ] Build passes: `npx ng build --configuration=development`
