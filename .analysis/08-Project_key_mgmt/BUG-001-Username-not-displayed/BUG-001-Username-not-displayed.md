# BUG-001: Username Not Displayed After Login — Shows "Guest / USER"

## Related to
FEATURE-008-Project_key_mgmt.md (discovered during feature development)

## Summary

After logging in with any user, the top-right user profile area in the layout header displayed "Welcome Guest" with role "USER" instead of the actual user's name and role. The sidebar menu also failed to show role-gated items (e.g., "Users" for SUPER_ADMIN).

## Symptoms

- Header shows "Welcome Guest" with avatar "G" and role "USER" for all users after login.
- SUPER_ADMIN users do not see the "Users" menu item in the sidebar.
- Refreshing the page (F5) after login fixes both issues.

## Root Cause

The `AppStarterService.start()` runs during Angular's `APP_INITIALIZER` phase — before the user has logged in. At that point, `AuthService.isAuthenticated()` returns `false`, so `fetchUserDetails()` returns an anonymous "Guest" user and passes it to eUI's `UserService.init()`. The `PermissionService` also keeps its default `globalRole = 'USER'`.

After a successful login:
1. `AuthService.login()` stored the JWT token but did NOT call `permissionService.setUser()` or update `UserService`.
2. `LoginComponent` navigated to `/screen/home`.
3. The `APP_INITIALIZER` does NOT re-run after navigation, so both `UserService` and `PermissionService` retained stale "Guest / USER" state.
4. `LayoutComponent.ngOnInit()` read `permissionService.getGlobalRole()` → got `'USER'` → filtered out the "Users" menu item.

A page refresh worked because the `APP_INITIALIZER` re-ran with a valid token, fetching the real user profile.

## Fix

Updated `LoginComponent.onSubmit()` to call `AppStarterService.start()` after a successful login, before navigating. This re-runs the full initialization chain:

1. Fetches user profile via `GET /api/auth/me`
2. Calls `permissionService.setUser(profile)` — sets correct global role
3. Updates eUI `UserService` with real user details — fixes header display
4. Restores project context from session storage

Navigation to `/screen/home` now happens only after `appStarter.start()` completes.

```typescript
// Before (broken)
this.authService.login(username, password).subscribe({
    next: () => {
        this.router.navigate(['/screen/home']);
    },
});

// After (fixed)
this.authService.login(username, password).subscribe({
    next: () => {
        this.appStarter.start().subscribe(() => {
            this.router.navigate(['/screen/home']);
        });
    },
});
```

## Files Changed

- `src/app/features/login/login.component.ts` — replaced `PermissionService` injection with `AppStarterService`; call `appStarter.start()` after login before navigating
- `src/app/features/login/login.component.spec.ts` — replaced `PermissionService` mock with `AppStarterService` mock; updated test to verify `appStarter.start()` is called

## Verification

- 210 frontend tests pass (`npm run test:ci`)
- Build passes (`npx ng build --configuration=development`)
- Manual test: login with `superadmin` → header shows "Super Admin" with role "SUPER_ADMIN", sidebar shows "Users" menu
- Manual test: login with `olivia.anderson` → header shows "Olivia Anderson" with role "PRODUCT_OWNER"
