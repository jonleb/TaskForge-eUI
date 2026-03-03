# STORY-003: Frontend Auth Service & Token Management

## Goal
Create an `AuthService` that handles login, logout, token storage, and session state. Add a functional HTTP interceptor that attaches the Bearer token to API requests and handles 401 responses.

## Branch
Work on `INIT-BACKEND` (continues from STORY-002).

## Dependencies
- STORY-001 (mock login endpoint)
- STORY-002 (auth middleware, logout, /me endpoints)

## Context from Existing Code

### Current interceptor setup (`app.config.ts`)
The app already uses class-based interceptors via `withInterceptorsFromDi()`:
- `CorsSecurityInterceptor` — sets `withCredentials: true`
- `EuLoginSessionTimeoutHandlingInterceptor` — detects EU Login session timeout
- `CsrfPreventionInterceptor` — adds `X-Requested-With` header
- `CachePreventionInterceptor` — sets `Cache-Control: No-cache`

Our auth interceptor will be a **functional interceptor** registered via `withInterceptors()`. Since the app currently uses `withInterceptorsFromDi()` for the eUI class-based interceptors, we need to use **both** — Angular supports combining them in `provideHttpClient()`.

### API base URL
All API calls go to `/api/*` (proxied to `http://127.0.0.1:3000` via `proxy-mock.conf.json`). The config module has `core.base = '/api'`.

### Test setup
Tests use `@angular/build:unit-test` with Jasmine-style syntax but running on vitest. Use `vi.fn()`, `vi.mocked()`, `provideHttpClientTesting()`, `HttpTestingController`. See `app-starter.service.spec.ts` for the pattern.

## Implementation

### 1. Create `src/app/core/auth/auth.models.ts`

```typescript
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    user: UserProfile;
}

export interface UserProfile {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface TokenPayload {
    userId: string;
    role: string;
    exp: number;
}
```

### 2. Create `src/app/core/auth/auth.service.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { LoginRequest, LoginResponse, UserProfile, TokenPayload } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private static readonly TOKEN_KEY = 'auth_token';
    private static readonly LOGIN_URL = '/api/auth/login';
    private static readonly LOGOUT_URL = '/api/auth/logout';
    private static readonly ME_URL = '/api/auth/me';

    private http = inject(HttpClient);
    private router = inject(Router);

    isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());

    login(username: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(AuthService.LOGIN_URL, { username, password }).pipe(
            tap(response => {
                localStorage.setItem(AuthService.TOKEN_KEY, response.accessToken);
                this.isAuthenticated$.next(true);
            }),
        );
    }

    logout(): Observable<void> {
        return this.http.post<void>(AuthService.LOGOUT_URL, {}).pipe(
            catchError(() => of(undefined)),
            finalize(() => {
                localStorage.removeItem(AuthService.TOKEN_KEY);
                this.isAuthenticated$.next(false);
            }),
        );
    }

    getToken(): string | null {
        return localStorage.getItem(AuthService.TOKEN_KEY);
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payload: TokenPayload = JSON.parse(atob(token));
            return payload.exp > Date.now();
        } catch {
            return false;
        }
    }

    getCurrentUser(): Observable<UserProfile> {
        return this.http.get<UserProfile>(AuthService.ME_URL);
    }
}
```

Key decisions:
- `isAuthenticated$` is initialized from `isAuthenticated()` on service creation (checks localStorage on app start)
- `logout()` clears token in `finalize()` — runs even if the API call fails (network error, 401, etc.)
- `isAuthenticated()` decodes the token client-side to check expiration — no API call needed
- Token is stored/read from `localStorage` using `atob()`/`btoa()` (browser-native base64)

### 3. Create `src/app/core/auth/auth.interceptor.ts`

Functional interceptor (Angular 17+ pattern):

```typescript
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Don't attach token to login requests
    if (req.url.includes('/api/auth/login')) {
        return next(req);
    }

    // Attach Bearer token if available
    const token = authService.getToken();
    if (token) {
        req = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        });
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                localStorage.removeItem('auth_token');
                authService.isAuthenticated$.next(false);
                router.navigate(['/login']);
            }
            return throwError(() => error);
        }),
    );
};
```

Key decisions:
- Skips `/api/auth/login` — login must work without a token
- On 401: clears token, updates `isAuthenticated$`, redirects to `/login`
- Uses `req.clone()` to avoid mutating the original request (Angular best practice)
- Does NOT skip `/api/auth/logout` — logout needs the token to authenticate

### 4. Create `src/app/core/auth/index.ts` (barrel export)

```typescript
export { AuthService } from './auth.service';
export { authInterceptor } from './auth.interceptor';
export { LoginRequest, LoginResponse, UserProfile, TokenPayload } from './auth.models';
```

### 5. Update `src/app/app.config.ts`

Add the functional interceptor alongside the existing class-based ones:

```typescript
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './core/auth';

// In providers array, replace:
//   provideHttpClient(withInterceptorsFromDi()),
// With:
//   provideHttpClient(withInterceptorsFromDi(), withInterceptors([authInterceptor])),
```

**Important**: `withInterceptorsFromDi()` must come first so eUI's class-based interceptors (CORS, CSRF, etc.) run before our auth interceptor. This ensures `withCredentials` and `X-Requested-With` are set before we add the Bearer token.

### 6. Do NOT modify `app-starter.service.ts` yet

The `AppStarterService` currently fetches user details from `/api/user-details` on app init. This will break once routes are protected (STORY-005), because the request will get a 401 before the user logs in.

We'll update `AppStarterService` in STORY-005 when we add the auth guard. For now, the interceptor will handle 401s by redirecting to `/login`.

## File Structure

```
src/app/core/
  auth/
    auth.models.ts      — interfaces (LoginRequest, LoginResponse, UserProfile, TokenPayload)
    auth.service.ts     — AuthService (login, logout, token management, session state)
    auth.interceptor.ts — functional interceptor (Bearer token, 401 handling)
    index.ts            — barrel exports
```

## What NOT to do

- Do NOT create a login page (that's STORY-004)
- Do NOT add route guards (that's STORY-005)
- Do NOT modify `AppStarterService` (that's STORY-005)
- Do NOT add logout UI (that's STORY-006)
- Do NOT use real JWT libraries — just `atob()`/`btoa()` for base64
- Do NOT create a separate Angular module — everything is standalone

## Unit Tests

### `src/app/core/auth/auth.service.spec.ts`

```
Test suite: AuthService

Setup:
- provideHttpClient(withInterceptorsFromDi())
- provideHttpClientTesting()
- Mock localStorage (spyOn)

Tests:
1. should be created
2. login() — should POST to /api/auth/login and store token in localStorage
3. login() — should update isAuthenticated$ to true on success
4. login() — should return user data from response
5. logout() — should POST to /api/auth/logout
6. logout() — should remove token from localStorage
7. logout() — should update isAuthenticated$ to false
8. logout() — should clear token even when API call fails (network error)
9. getToken() — should return token from localStorage
10. getToken() — should return null when no token exists
11. isAuthenticated() — should return true for valid non-expired token
12. isAuthenticated() — should return false for expired token
13. isAuthenticated() — should return false when no token exists
14. isAuthenticated() — should return false for malformed token
15. getCurrentUser() — should GET /api/auth/me
```

### `src/app/core/auth/auth.interceptor.spec.ts`

```
Test suite: authInterceptor

Setup:
- provideHttpClient(withInterceptors([authInterceptor]))
- provideHttpClientTesting()
- Mock AuthService (getToken, isAuthenticated$)
- Mock Router (navigate)

Tests:
1. should add Authorization header when token exists
2. should NOT add Authorization header to /api/auth/login requests
3. should NOT add Authorization header when no token exists
4. should redirect to /login on 401 response
5. should clear token on 401 response
6. should update isAuthenticated$ to false on 401 response
7. should pass through non-401 errors without redirecting
```

Total: ~22 new frontend tests.

Run with:
```bash
npm run ng test -- --include src/app/core/auth/auth.service.spec.ts
npm run ng test -- --include src/app/core/auth/auth.interceptor.spec.ts
```

## Acceptance Criteria
- [ ] `AuthService.login()` calls `POST /api/auth/login`, stores token in `localStorage`, updates `isAuthenticated$`
- [ ] `AuthService.logout()` calls `POST /api/auth/logout`, clears token even on network failure
- [ ] `AuthService.isAuthenticated()` returns `false` for expired or missing tokens
- [ ] `AuthService.getToken()` reads from `localStorage`
- [ ] `AuthService.getCurrentUser()` calls `GET /api/auth/me`
- [ ] Auth interceptor attaches `Authorization: Bearer <token>` to all `/api/` requests except `/api/auth/login`
- [ ] Auth interceptor redirects to `/login` and clears token on `401` responses
- [ ] Functional interceptor is registered in `app.config.ts` via `withInterceptors()`
- [ ] Existing eUI interceptors (CORS, CSRF, session timeout, cache) remain functional
- [ ] All new unit tests pass: `npm run ng test`
- [ ] All existing tests still pass
- [ ] Build passes: `npx ng build --configuration=development`
