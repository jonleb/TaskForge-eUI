# FEATURE-001 Auth Session — Story Breakdown

## Context

This feature implements authentication session management for the TaskForge-eUI-v2 app. All backend work uses the Express mock server (`mock/`). The frontend uses Angular route guards, eUI interceptors (`EuLoginSessionTimeoutHandlingInterceptor`, `CorsSecurityInterceptor`, `CsrfPreventionInterceptor`), and eUI services (`UserService`, `EuiPermissionService`).

Since this is a mock-based implementation (no real EU Login), we simulate the auth flow with JWT-like tokens stored in `localStorage` and validated by the mock server via a custom middleware.

## Roles

`SUPER_ADMIN`, `PROJECT_ADMIN`, `PRODUCT_OWNER`, `DEVELOPER`, `REPORTER`, `VIEWER`

All roles follow the same session lifecycle. Role-specific permissions (RBAC) are a separate feature — this feature only carries the role in the session payload.

---

## Execution Order

Stories must be implemented in this exact order. Each story depends on the previous one.

---

## STORY-001: Mock Auth Backend — User Seed Data & Login Endpoint

### Goal
Set up the mock server with auth-capable user data and a `POST /api/auth/login` endpoint.

### Backend (mock server)

1. Add an `auth-users` collection to `mock/db/db.json` with seed users (one per role):
   - Fields: `id`, `username`, `password`, `firstName`, `lastName`, `email`, `role`, `is_active`
   - Include at least one `is_active: false` user for rejection testing
   - Passwords are plain text in the mock (no hashing needed)

2. Create `mock/app/routes/auth_routes.js`:
   - `POST /api/auth/login` — accepts `{ username, password }`
     - Validates credentials against `auth-users` collection
     - Rejects inactive users (`is_active: false`) with `403` and generic message
     - Rejects invalid credentials with `401` and generic message: `"Invalid username or password"`
     - On success: returns `{ accessToken, user: { userId, firstName, lastName, email, role } }`
     - `accessToken` is a base64-encoded JSON string with `{ userId, role, exp }` (expires in 1h)
   - Register routes in `mock/app/routes/index.js`

3. Create `mock/app/models/auth-user.js` with the field schema.

### Acceptance Criteria
- [ ] `POST /api/auth/login` with valid active user returns `200` with token and user data
- [ ] `POST /api/auth/login` with valid credentials but inactive user returns `403`
- [ ] `POST /api/auth/login` with invalid credentials returns `401`
- [ ] Error messages are generic (no detail about which field is wrong)
- [ ] `mock/db/db.json` contains 6+ seed users covering all roles

---

## STORY-002: Mock Auth Backend — Session Validation Middleware & Logout

### Goal
Add token validation middleware to protect API routes, and a logout endpoint.

### Backend (mock server)

1. Create `mock/app/middleware/auth.js`:
   - Reads `Authorization: Bearer <token>` header
   - Decodes the base64 token, checks `exp` against current time
   - If valid: attaches `req.user = { userId, role }` and calls `next()`
   - If missing/invalid/expired: returns `401 { message: "Session expired or invalid" }`

2. Add to `mock/app/routes/auth_routes.js`:
   - `POST /api/auth/logout` — (protected) always returns `200 { message: "Logged out" }`
   - `GET /api/auth/me` — (protected) returns the current user profile from `auth-users` (without password)

3. Apply auth middleware to existing routes:
   - `/api/users`, `/api/users/:userId` — protected
   - `/api/user-details` — protected
   - `/api/auth/login` — NOT protected (public)

### Acceptance Criteria
- [ ] Requests without `Authorization` header to protected routes return `401`
- [ ] Requests with expired token return `401`
- [ ] Requests with valid token pass through to the route handler
- [ ] `GET /api/auth/me` returns current user profile (no password field)
- [ ] `POST /api/auth/logout` returns `200`
- [ ] `POST /api/auth/login` remains accessible without token

---

## STORY-003: Frontend Auth Service & Token Management

### Goal
Create an `AuthService` that handles login, logout, token storage, and session state.

### Frontend

1. Create `src/app/core/auth/auth.service.ts`:
   - `login(username, password): Observable<LoginResponse>` — calls `POST /api/auth/login`, stores token in `localStorage`
   - `logout(): Observable<void>` — calls `POST /api/auth/logout`, clears token from `localStorage` (clears even if API call fails)
   - `getToken(): string | null` — reads token from `localStorage`
   - `isAuthenticated(): boolean` — checks if token exists and is not expired
   - `getCurrentUser(): Observable<UserProfile>` — calls `GET /api/auth/me`
   - Exposes `isAuthenticated$: BehaviorSubject<boolean>` for reactive state

2. Create `src/app/core/auth/auth.interceptor.ts` (functional interceptor):
   - Attaches `Authorization: Bearer <token>` header to all `/api/` requests (except `/api/auth/login`)
   - On `401` response: clears token, redirects to `/login`

3. Create interfaces in `src/app/core/auth/auth.models.ts`:
   - `LoginRequest`, `LoginResponse`, `UserProfile`

4. Register the interceptor in `app.config.ts` using `withInterceptors()`.

### Acceptance Criteria
- [ ] `AuthService.login()` stores token and updates `isAuthenticated$`
- [ ] `AuthService.logout()` clears token even on network failure
- [ ] Auth interceptor attaches Bearer token to API requests
- [ ] Auth interceptor redirects to `/login` on `401` responses
- [ ] `isAuthenticated()` returns `false` for expired tokens

---

## STORY-004: Login Page

### Goal
Create a login page with username/password form using eUI components.

### Frontend

1. Create `src/app/features/login/`:
   - `login.component.ts` — Standalone component with reactive form (`FormGroup` with `username` and `password` controls)
   - `login.component.html` — Uses eUI form components:
     - `eui-page` layout (no sidebar, no toolbar — standalone page)
     - `euiInputText` for username, `euiInputText` type="password" for password
     - `euiLabel` with `for`/`id` pairs (a11y)
     - `euiButton euiPrimary` for submit
     - `eui-feedback-message euiDanger` for error display
     - `aria-describedby` on inputs pointing to error messages (a11y)
     - `aria-live="polite"` on error container (a11y)
   - `login.routes.ts` — Export `LOGIN_ROUTES`

2. Add route in `app.routes.ts`:
   - `{ path: 'login', loadChildren: () => import('./features/login/login.routes').then(m => m.LOGIN_ROUTES) }`

3. Behavior:
   - On submit: call `AuthService.login()`, on success redirect to `/screen/home`
   - On failure: display generic error message from API response
   - If already authenticated: redirect to `/screen/home` (check in `OnInit`)
   - Disable submit button while request is in flight

### Acceptance Criteria
- [ ] Login page renders at `/login` with username and password fields
- [ ] Successful login redirects to `/screen/home`
- [ ] Failed login shows generic error message
- [ ] Already-authenticated users are redirected away from login page
- [ ] Submit button is disabled during request
- [ ] Form inputs have associated labels with `for`/`id` (a11y)
- [ ] Error messages use `aria-live="polite"` (a11y)
- [ ] All interactive elements are keyboard-navigable (a11y)
- [ ] Build passes: `npx ng build --configuration=development`

---

## STORY-005: Auth Guard & Protected Routes

### Goal
Protect all `/screen/*` routes with an auth guard that redirects unauthenticated users to `/login`.

### Frontend

1. Create `src/app/core/auth/auth.guard.ts`:
   - Functional guard using `CanActivateFn`
   - Checks `AuthService.isAuthenticated()`
   - If not authenticated: redirects to `/login` and returns `false`
   - If authenticated: returns `true`

2. Update `app.routes.ts`:
   - Apply `canActivate: [authGuard]` to all `screen/*` routes
   - Keep `/login` route unguarded
   - Update default redirect: `''` → `/login` (instead of `/screen/home`)

3. Update `AppStarterService`:
   - `fetchUserDetails()` should use `AuthService.getCurrentUser()` when authenticated
   - Fall back to anonymous user when not authenticated (login page scenario)

### Acceptance Criteria
- [ ] Navigating to `/screen/home` without auth redirects to `/login`
- [ ] Navigating to `/screen/home` with valid token loads the page
- [ ] After login, user can access all `/screen/*` routes
- [ ] Direct URL access to protected routes redirects to `/login` if not authenticated
- [ ] Build passes: `npx ng build --configuration=development`

---

## STORY-006: Logout & Session Expiry Handling

### Goal
Wire up the logout action in the UI and handle session expiry gracefully.

### Frontend

1. Update `app.component.html`:
   - The "Sign out" menu item in `eui-user-profile-menu` triggers `logout()`

2. Update `app.component.ts`:
   - Add `logout()` method: calls `AuthService.logout()`, then navigates to `/login`

3. Session expiry handling:
   - The auth interceptor (STORY-003) already handles `401` → redirect to `/login`
   - Add `EuiGrowlService` notification on session expiry: "Your session has expired. Please sign in again."
   - Use `ariaLive: 'polite'` on the growl notification (a11y)

4. Update `AppStarterService`:
   - On session expiry (401 during init), gracefully degrade to login redirect instead of showing error

### Acceptance Criteria
- [ ] Clicking "Sign out" calls logout API, clears token, redirects to `/login`
- [ ] Logout clears local state even if API call fails
- [ ] Expired token triggers redirect to `/login` with growl notification
- [ ] Growl notification uses `ariaLive: 'polite'` (a11y)
- [ ] After logout, back button does not return to protected pages
- [ ] Build passes: `npx ng build --configuration=development`

---

## STORY-007: User Profile Display with Session Data

### Goal
Display the authenticated user's name and role in the toolbar user profile.

### Frontend

1. Update `app.component.ts`:
   - Inject `AuthService`, call `getCurrentUser()` on init
   - Bind user data to the `eui-user-profile` component

2. Update `app.component.html`:
   - Display user's full name in the user profile area
   - Display role as subtitle using `eui-user-profile` inputs

3. Update `eui-toolbar-app`:
   - Keep `appName` as-is

### Acceptance Criteria
- [ ] Toolbar shows authenticated user's name
- [ ] User profile menu shows "You are logged in as [name]"
- [ ] User role is visible in the profile area
- [ ] Anonymous/unauthenticated state shows no user profile (login page)
- [ ] Build passes: `npx ng build --configuration=development`

---

## Dependency Graph

```
STORY-001 (Mock login endpoint + seed data)
    └── STORY-002 (Auth middleware + logout + /me endpoint)
            └── STORY-003 (Frontend AuthService + interceptor + token mgmt)
                    ├── STORY-004 (Login page UI)
                    └── STORY-005 (Auth guard + protected routes)
                            └── STORY-006 (Logout UI + session expiry)
                                    └── STORY-007 (User profile display)
```

## Technical Notes

- Token format: base64-encoded JSON `{ userId, role, exp }` — not a real JWT, just enough for mock simulation
- Token storage: `localStorage` (acceptable for mock; real app would use httpOnly cookies via BFF)
- The mock server does NOT use real JWT libraries — just `Buffer.from(JSON.stringify(...)).toString('base64')`
- eUI's `EuLoginSessionTimeoutHandlingInterceptor` is already registered in `app.config.ts` but won't trigger in mock mode — our custom auth interceptor handles 401s instead
- All error messages are intentionally generic per the feature requirements (no "user not found" vs "wrong password" distinction)
