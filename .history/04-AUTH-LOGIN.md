# 04-AUTH-LOGIN — Authentication & Login Feature

## What this branch does

This branch adds a complete authentication system to the TaskForge-eUI-v2 application. When finished, the app has a login page, protected routes, session management, and user profile display in the toolbar. Everything runs against a local mock server — no external backend needed.

## Step-by-step walkthrough

### 1. Project scaffolding (pre-existing)

The app was scaffolded using `eui-cli` in headless mode, producing a standard eUI Angular 21 desktop application with toolbar, sidebar, and routing. Accessibility steering rules (WCAG 2.2 AA) were added as a project-wide standard.

### 2. Mock backend — login endpoint & seed users (STORY-001)

We created a mock Express backend with:
- A `users` collection in `mock/db/db.json` with 6 seed users (one per role: SUPER_ADMIN, PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER, VIEWER), plus one deactivated user for testing.
- A `POST /api/auth/login` endpoint that validates credentials, rejects inactive accounts (403) and bad credentials (401), and returns a base64-encoded token with `{ userId, role, exp }` on success.
- A Jest + supertest test infrastructure for the mock server.

### 3. Mock backend — auth middleware & session endpoints (STORY-002)

We added:
- An auth middleware (`mock/app/middleware/auth.js`) that reads the `Authorization: Bearer <token>` header, decodes the token, checks expiry, and attaches `req.user` to the request.
- `POST /api/auth/logout` (protected) — always returns 200.
- `GET /api/auth/me` (protected) — returns the current user's profile without the password field.
- Applied the middleware to all existing API routes except login.

### 4. Frontend auth service & interceptor (STORY-003)

We created the core auth infrastructure on the frontend:
- `AuthService` with `login()`, `logout()`, `getToken()`, `isAuthenticated()`, `getCurrentUser()`, and a reactive `isAuthenticated$` BehaviorSubject.
- A functional HTTP interceptor that attaches the Bearer token to all API requests (except login) and handles 401 responses by clearing the token and redirecting to `/login`.
- TypeScript interfaces for `LoginRequest`, `LoginResponse`, `UserProfile`, `TokenPayload`.

### 5. Login page (STORY-004)

We built a standalone login page at `/login` using eUI form components:
- Reactive form with username and password fields.
- eUI components: `euiInputText`, `euiLabel`, `euiButton`, `eui-feedback-message`.
- Accessibility: `for`/`id` pairs on labels, `aria-describedby` on inputs, `aria-live="polite"` on error container, keyboard navigation.
- On success → redirect to `/screen/home`. On failure → show generic error message. Already-authenticated users are redirected away.

### 6. Bug fixes — login page layout (BUG-001, BUG-002, BUG-003)

Three issues were discovered and fixed iteratively:

- **BUG-001**: The login page was rendering inside the app shell (toolbar + sidebar). Fix: extracted a `LayoutComponent` that wraps the eui-app shell, restructured routes so `/login` is standalone and `/screen/*` routes are children of `LayoutComponent`.
- **BUG-002**: The login page wasn't centered or styled properly. Fix: wrapped the form in `eui-page` / `eui-page-content` for proper eUI layout.
- **BUG-003**: The login page rendered blank after wrapping in `eui-app`. Root cause: `eui-app` uses named content projection slots and doesn't project arbitrary content. Fix: removed `eui-app` from login, added `class="eui-21"` to `<html>` for global theming, created custom SCSS with flexbox centering and card-like styling.

### 7. Auth guard & protected routes (STORY-005)

We added route protection:
- A functional `authGuard` using `CanActivateFn` that checks `AuthService.isAuthenticated()` and redirects to `/login` if not authenticated.
- Applied the guard at the `LayoutComponent` route level, protecting all `/screen/*` children in one place.
- Updated `AppStarterService` to use `AuthService.getCurrentUser()` when authenticated, falling back to an anonymous Guest user otherwise.

### 8. Logout & session expiry (STORY-006)

We wired up the logout flow and session expiry handling:
- Added `(click)="logout()"` on the Sign out menu item in the toolbar.
- `LayoutComponent.logout()` calls `AuthService.logout()` then navigates to `/login`.
- Added `EuiGrowlService` growl notification on 401 in the auth interceptor ("Your session has expired. Please sign in again.").
- The auth guard prevents back-button access to protected pages after logout.

### 9. User profile display (STORY-007)

We displayed the authenticated user's info in the toolbar:
- `LayoutComponent` fetches the user profile on init via `AuthService.getCurrentUser()`.
- The user's role is bound to `[subInfos]` on `eui-user-profile`, displaying it below the user name.
- The user's name and initials are displayed automatically by `eui-user-profile` via its built-in `UserService` integration (already initialized by `AppStarterService`).

## Working method

Each story followed the same pattern:
1. **Analysis first** — create a `.md` file in `.analysis/04-Auth/` describing the current state, what's missing, the implementation plan, and acceptance criteria.
2. **Review** — the developer reviews and approves the plan before any code is written.
3. **Implementation** — code changes, following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component, service, guard, and interceptor (Jasmine/vitest for frontend, Jest/supertest for mock server).
5. **Verification** — build passes (`npx ng build --configuration=development`), all tests pass.
6. **Commit** — one commit per story or bug fix group.

## Key technical decisions

- **Token format**: base64-encoded JSON `{ userId, role, exp }` — not a real JWT, just enough for mock simulation.
- **Token storage**: `localStorage` (acceptable for mock; a real app would use httpOnly cookies via BFF).
- **Route structure**: `/login` is a top-level route (no app shell). All protected routes are children of `LayoutComponent` under the root path, guarded at the parent level.
- **eUI theming outside app shell**: `class="eui-21"` on `<html>` in `index.html` ensures eUI design tokens work on the standalone login page.
- **User profile display**: `eui-user-profile` reads name/initials from `UserService` automatically. Role is passed via the `subInfos` input since `UserDetails` doesn't have a role field.

## Git history

```
f48bd01 feat: scaffold TaskForge-eUI-v2 desktop app with eUI CLI 21.x
dbe769e chore: add a11y steering rules targeting WCAG 2.2 Level AA conformance
517059b feat: STORY-001 mock auth login endpoint with seed data, Jest test infra
32ac021 feat: STORY-003 frontend AuthService, interceptor & token management
df4c263 feat: STORY-004 login page with eUI components, reactive form, a11y
62482e1 fix: BUG-001/002/003 login page outside app shell with proper eUI styling
e502c9f feat: STORY-005 auth guard & protected routes
ca1dfd1 feat: STORY-006 logout UI wiring & session expiry growl notification
d789255 feat: STORY-007 display user role in toolbar profile via subInfos
```

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full authentication feature on a fresh eUI Angular project. Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> I have an eUI Angular 21 application scaffolded with `eui-cli`. It has a toolbar, sidebar, and routing with lazy-loaded feature modules. I need you to implement a complete authentication system with the following requirements. Work story by story, in order. For each story, first create an analysis `.md` file describing the plan, wait for my approval, then implement with tests.
>
> **Backend (mock server using Express + json-server in `mock/` folder):**
>
> 1. **Seed users & login endpoint** — Add a users collection to `mock/db/db.json` with seed users (one per role). Create `POST /api/auth/login` that validates credentials, rejects inactive users (403), rejects bad credentials (401), and returns a base64-encoded token `{ userId, role, exp }` with user profile on success. Add Jest + supertest tests.
>
> 2. **Auth middleware & session endpoints** — Create auth middleware that reads `Authorization: Bearer <token>`, decodes it, checks expiry, attaches `req.user`. Add `POST /api/auth/logout` (protected, returns 200) and `GET /api/auth/me` (protected, returns user profile without password). Apply middleware to all existing routes except login. Add tests.
>
> **Frontend:**
>
> 3. **Auth service & interceptor** — Create `AuthService` with `login()`, `logout()`, `getToken()`, `isAuthenticated()`, `getCurrentUser()`, and `isAuthenticated$` BehaviorSubject. Create a functional HTTP interceptor that attaches Bearer token to API requests (except login) and handles 401 by clearing token and redirecting to `/login`. Register in `app.config.ts`. Add tests.
>
> 4. **Login page** — Create a standalone login page at `/login` using eUI form components (`euiInputText`, `euiLabel`, `euiButton`, `eui-feedback-message`). Reactive form, redirect on success, show error on failure, redirect if already authenticated. Follow WCAG 2.2 AA: `for`/`id` pairs, `aria-describedby`, `aria-live="polite"`, keyboard navigation. The login page must NOT render inside the app shell (toolbar/sidebar). Add tests.
>
> 5. **Auth guard & protected routes** — Create a functional `authGuard` using `CanActivateFn`. Apply it at the layout route level to protect all app routes. Update `AppStarterService` to use `AuthService.getCurrentUser()` when authenticated, fall back to anonymous user otherwise. Add tests.
>
> 6. **Logout & session expiry** — Wire the Sign out menu item to call `AuthService.logout()` and navigate to `/login`. Add a growl notification (using `EuiGrowlService`) on 401 in the interceptor. Add tests.
>
> 7. **User profile display** — Fetch the user profile on layout init and display the role via `[subInfos]` on `eui-user-profile`. The user name/initials are already handled by eUI's `UserService` integration. Add tests.
>
> **Important constraints:**
> - Use eUI components first — check the eUI component library before using alternatives.
> - All passwords in the mock are plain text: `SecurePassword!123`.
> - Token is base64-encoded JSON, not a real JWT.
> - The login page needs `class="eui-21"` on `<html>` for eUI theming outside the app shell.
> - `eui-app` uses named content projection slots — you cannot nest arbitrary content inside it.
> - Frontend tests use vitest (vi.fn(), vi.mocked()). Mock server tests use Jest + supertest.
> - Every story must pass build (`npx ng build --configuration=development`) and all tests before committing.
