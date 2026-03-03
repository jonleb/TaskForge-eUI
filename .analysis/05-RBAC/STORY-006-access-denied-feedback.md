# STORY-006: Frontend — Access Denied Feedback

## Goal

Provide clear, consistent feedback when a user attempts an action or navigation they are not authorized for. This story adds a reusable `showAccessDenied()` method to `PermissionService` and extends the auth interceptor to handle `403` responses with a growl notification — without clearing the session or redirecting.

## Prerequisites

- STORY-003 (PermissionService) — done
- STORY-004 (roleGuard with growl on denied navigation) — done
- STORY-005 (sidebar filtering) — done
- `EuiGrowlService` from `@eui/core` — already used in `roleGuard` and `authInterceptor`
- `authInterceptor` already handles `401` responses (clear session, redirect to `/login`, growl)

## Current State

- `roleGuard` shows a growl notification when navigation is denied (severity `'warning'`, summary `'Access denied'`)
- `authInterceptor` handles `401` errors: clears token, sets `isAuthenticated$` to `false`, shows growl, redirects to `/login`
- `authInterceptor` does NOT handle `403` errors — they pass through silently
- `PermissionService` has no method for showing access-denied feedback
- No centralized way for components to show a permission-denied notification

## Implementation Plan

### 1. Add `showAccessDenied()` to `PermissionService`

Inject `EuiGrowlService` and add a convenience method:

```typescript
private readonly growlService = inject(EuiGrowlService);

showAccessDenied(message?: string): void {
    this.growlService.growl({
        severity: 'warning',
        summary: 'Access denied',
        detail: message || 'You do not have permission to perform this action.',
    });
}
```

#### Design decisions
- Severity `'warning'` — consistent with the `roleGuard` growl (not `'error'`, since this is an authorization issue, not a system failure)
- Default message covers the generic case; callers can override with a specific message
- Placed on `PermissionService` because it is the single source of truth for access decisions — keeping feedback co-located with the decision logic
- `EuiGrowlComponent` already uses `aria-live="polite"` internally, so screen readers will announce the notification without extra work

### 2. Update `authInterceptor` to handle `403` responses

Add a `403` branch in the `catchError` block, after the existing `401` handling:

```typescript
catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
        localStorage.removeItem('auth_token');
        authService.isAuthenticated$.next(false);
        growlService.growl({
            severity: 'warning',
            summary: 'Session expired',
            detail: 'Your session has expired. Please sign in again.',
        });
        router.navigate(['/login']);
    }

    if (error.status === 403) {
        const permissionService = inject(PermissionService);
        permissionService.showAccessDenied(
            error.error?.message || 'You do not have permission to perform this action.',
        );
    }

    return throwError(() => error);
})
```

#### Design decisions
- `403` does NOT clear the session — the user is authenticated, just not authorized for this specific action
- `403` does NOT redirect — the user stays on the current page; only the growl informs them
- `403` does NOT modify `isAuthenticated$` — the session remains valid
- Uses `error.error?.message` if the backend provides a specific reason (e.g. `"Forbidden"`), otherwise falls back to the default message
- `PermissionService` is injected inside the handler (lazy) to avoid circular dependency issues — the interceptor runs in the HTTP pipeline, and `PermissionService` itself uses `HttpClient` for `hasProjectRole()`
- The error is still re-thrown so calling code can handle it (e.g. show inline error states)

### 3. Tests

#### `permission.service.spec.ts` — add tests for `showAccessDenied()`

- `showAccessDenied()` calls `growlService.growl()` with severity `'warning'` and default message
- `showAccessDenied('Custom message')` calls `growlService.growl()` with the custom message
- `showAccessDenied()` uses summary `'Access denied'`

Test setup addition:
```typescript
const growlServiceMock = { growl: vi.fn() };

// In providers:
{ provide: EuiGrowlService, useValue: growlServiceMock }
```

#### `auth.interceptor.spec.ts` — add tests for `403` handling

- `403` response triggers a growl notification with severity `'warning'`
- `403` response does NOT clear `localStorage` token
- `403` response does NOT update `isAuthenticated$`
- `403` response does NOT redirect (router.navigate not called)
- `403` response uses backend error message when available
- `403` response uses default message when backend provides no message
- `403` error is still propagated to the subscriber

Test setup addition:
```typescript
// Add PermissionService mock
const permissionServiceMock = { showAccessDenied: vi.fn() };

// In providers:
{ provide: PermissionService, useValue: permissionServiceMock }
```

## Files to Modify

- `src/app/core/auth/permission.service.ts` — add `EuiGrowlService` injection and `showAccessDenied()` method
- `src/app/core/auth/permission.service.spec.ts` — add tests for `showAccessDenied()`
- `src/app/core/auth/auth.interceptor.ts` — add `403` handling branch, import `PermissionService`
- `src/app/core/auth/auth.interceptor.spec.ts` — add `403` tests

## Files NOT Modified

- `src/app/core/auth/role.guard.ts` — already shows growl on denied navigation, no changes needed
- `src/app/core/auth/index.ts` — `PermissionService` is already exported
- No new files created
- No backend changes

## Accessibility

- `EuiGrowlComponent` uses `aria-live="polite"` internally — screen readers announce the notification without interrupting the user's current workflow
- Growl notifications are keyboard-dismissible (built into eUI)
- Severity `'warning'` renders with both a warning icon and text label — not color-only

## Acceptance Criteria

- [ ] `PermissionService.showAccessDenied()` shows a growl notification with severity `'warning'` and default message
- [ ] `PermissionService.showAccessDenied('Custom')` shows a growl with the custom message
- [ ] `403` API responses trigger a growl notification automatically via the interceptor
- [ ] `403` does NOT clear the session (token remains, `isAuthenticated$` unchanged)
- [ ] `403` does NOT redirect to `/login` or any other route
- [ ] `403` error is still propagated to the calling code
- [ ] Growl uses `aria-live="polite"` (built into `eui-growl`)
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
