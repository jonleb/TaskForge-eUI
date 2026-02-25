# STORY-006: Logout & Session Expiry Handling

## Goal

Wire up the logout action in the UI and handle session expiry gracefully with user notification.

## Prerequisites

- STORY-003 (AuthService with `logout()`) — done
- STORY-005 (Auth guard, protected routes) — done
- LayoutComponent with eui-user-profile menu — done (BUG-001)

## Current State Analysis

### What already exists:
- "Sign out" menu item in `layout.component.html` — **exists but has NO `(click)` handler**
- `AuthService.logout()` — **done** (calls API, clears token, updates `isAuthenticated$`)
- Auth interceptor catches 401 → clears token, redirects to `/login` — **done but no growl notification**
- `AppStarterService.fetchUserDetails()` — **done** (falls back to anonymous on error)

### What's missing:
1. `(click)="logout()"` binding on the Sign out menu item
2. `logout()` method in `LayoutComponent`
3. Growl notification on session expiry (401 in interceptor)
4. Prevent back-button access to protected pages after logout (guard already handles this)

## Implementation Plan

### 1. Update `src/app/layout/layout.component.html`

Add `(click)="logout()"` to the Sign out menu item:

```html
<eui-user-profile-menu-item (click)="logout()">
    <eui-icon-svg icon="sign-out:regular"/>{{ 'eui.sign-out' | translate }}
</eui-user-profile-menu-item>
```

### 2. Update `src/app/layout/layout.component.ts`

- Inject `AuthService` and `Router`
- Add `logout()` method: calls `AuthService.logout()`, subscribes, then navigates to `/login`

### 3. Update `src/app/core/auth/auth.interceptor.ts`

- Inject `EuiGrowlService`
- On 401 response (session expiry), show a growl notification before redirecting:
  ```typescript
  growlService.showMessage({
      severity: 'warning',
      summary: 'Session expired',
      detail: 'Your session has expired. Please sign in again.',
  });
  ```
- The growl uses `aria-live="polite"` by default (built into `eui-growl` component)

### 4. No changes needed for back-button protection

The `authGuard` (STORY-005) already checks `isAuthenticated()` on every navigation. After logout clears the token, any attempt to navigate back to `/screen/*` will be caught by the guard and redirected to `/login`.

## Unit Tests

### `layout.component.spec.ts` (new file)
- Should create the component
- Should call `AuthService.logout()` when `logout()` is called
- Should navigate to `/login` after logout completes

### `auth.interceptor.spec.ts` (update)
- Should show growl notification on 401 response (new test)

## Files to Modify
- `src/app/layout/layout.component.html` — add `(click)="logout()"`
- `src/app/layout/layout.component.ts` — add `AuthService`, `Router`, `logout()` method
- `src/app/core/auth/auth.interceptor.ts` — add `EuiGrowlService` growl on 401
- `src/app/core/auth/auth.interceptor.spec.ts` — add growl test

## Files to Create
- `src/app/layout/layout.component.spec.ts`

## Acceptance Criteria

- [ ] Clicking "Sign out" calls logout API, clears token, redirects to `/login`
- [ ] Logout clears local state even if API call fails
- [ ] Expired token triggers redirect to `/login` with growl notification
- [ ] Growl notification uses `aria-live="polite"` (built into eui-growl, a11y)
- [ ] After logout, back button does not return to protected pages (guard handles this)
- [ ] All existing tests still pass
- [ ] Build passes: `npx ng build --configuration=development`
