# BUG-005 — Deactivated User Login Shows Delayed Error Message

## Summary

When a deactivated user attempts to log in, the backend correctly returns `403 Forbidden` with `{ message: "Account is deactivated" }`. The login component's error handler eventually displays the message, but there is a significant delay (several seconds) before it appears. The user sees "Signing in..." for an extended period with no feedback.

## Steps to Reproduce

1. Deactivate a user (e.g. `olivia.anderson`) via the Admin > Users panel.
2. Log out.
3. Attempt to log in with the deactivated user's credentials.
4. Observe the "Signing in..." state persists for several seconds before the error message "Account is deactivated" appears.

## Expected Behavior

The error message "Account is deactivated" should appear immediately (< 500ms) after the login request fails.

## Actual Behavior

The "Signing in..." button text remains for several seconds. The error message eventually appears but with a noticeable delay.

## Root Cause

The `authInterceptor` had an early return for login requests:

```typescript
if (req.url.includes('/api/auth/login')) {
    return next(req);
}
```

This bypassed the interceptor's `catchError` pipe entirely. The 403 response then flowed through the DI-based `EuLoginSessionTimeoutHandlingInterceptor` (from eUI core), which introduces a delay before re-throwing errors — it's designed for session timeout handling, not login errors.

## Fix

Two changes were needed:

### 1. Auth Interceptor — flag-based approach instead of early return

The interceptor previously did `return next(req)` for login requests, bypassing the `catchError` pipe. This meant login errors flowed through the full DI interceptor chain unhandled. Replaced with a flag-based approach that keeps login requests in the `catchError` pipe and immediately re-throws:

```typescript
const isLoginRequest = req.url.includes('/api/auth/login');

// Don't attach token to login requests
if (!isLoginRequest) {
    const token = authService.getToken();
    if (token) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
}

return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
        if (isLoginRequest) {
            return throwError(() => error);
        }
        // ... normal 401/403 handling
    }),
);
```

### 2. Login Component — explicit change detection

Added `ChangeDetectorRef.detectChanges()` in the error handler to ensure the UI updates immediately when the error response arrives, regardless of zone timing:

```typescript
error: (err) => {
    this.isLoading = false;
    this.errorMessage = err.error?.message || 'An unexpected error occurred';
    this.cdr.detectChanges();
},
```

## Files Changed

- `src/app/core/auth/auth.interceptor.ts` — flag-based approach instead of early return
- `src/app/core/auth/auth.interceptor.spec.ts` — added test for login 403 scenario
- `src/app/features/login/login.component.ts` — explicit `cdr.detectChanges()` on error

## Tests

- 15 interceptor tests pass (including new "login 403 should not trigger interceptor error handling" test)
- 13 login component tests pass
- 148 total tests pass
- Build passes
