# 06-ADMIN-USERS — Admin User Management Feature

## What this branch does

This branch replaces the placeholder `UsersComponent` (from the RBAC branch) with a fully functional user administration module. When finished, SUPER_ADMIN users can list, search, filter, sort, create, reset passwords, deactivate, and reactivate user accounts — all through a polished eUI-based interface backed by the local mock server.

## Step-by-step walkthrough

### 1. Mock backend — admin user management endpoints (STORY-001)

We created a complete set of SUPER_ADMIN-only endpoints under `/api/admin/users`:
- `GET /api/admin/users` — server-side pagination (`_page`, `_limit`), sorting (`_sort`, `_order`), search (`q` — case-insensitive match on username, firstName, lastName, email), and status filter (`is_active`). Returns `{ data, total, page, limit }`.
- `GET /api/admin/users/:userId` — single user detail (without password).
- `POST /api/admin/users` — create user with validation (all fields required, unique email/username). Generates a 12-char temporary password. Returns `{ user, temporaryPassword }` with 201. Returns 409 on duplicates.
- `POST /api/admin/users/:userId/reset-password` — generates new temporary password, updates DB. Returns `{ temporaryPassword }`.
- `PATCH /api/admin/users/:userId/deactivate` — sets `is_active: false`. Blocks deactivation of the last active SUPER_ADMIN (409) and self-deactivation (409).
- `PATCH /api/admin/users/:userId/reactivate` — sets `is_active: true`.
- All endpoints protected by `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`.
- Existing non-admin routes (`GET /api/users`, `GET /api/users/:userId`) kept for profile lookups.
- Full Jest + supertest test coverage.

### 2. Frontend — admin user service & models (STORY-002)

Created `AdminUserService` (`providedIn: 'root'`) as the single HTTP client for all admin user operations:
- `getUsers(params)`, `getUser(userId)`, `createUser(data)`, `resetPassword(userId)`, `deactivateUser(userId)`, `reactivateUser(userId)`.
- TypeScript interfaces: `AdminUser`, `AdminUserListParams`, `AdminUserListResponse`, `CreateUserRequest`, `CreateUserResponse`, `ResetPasswordResponse`, `UserRole`.
- Unit tests with `HttpClientTestingModule`.

### 3. Frontend — user list table with pagination, search & sort (STORY-003)

Replaced the placeholder component with a full data table:
- `eui-table` in async mode (server-side data) with columns: Username, First Name, Last Name, Email, Role, Status, Actions.
- `eui-table-filter` for debounced search (300ms).
- `eui-paginator` with page size options [10, 25, 50].
- Sortable columns via `th[isSortable]` with `sortOn` attributes.
- Status column displays "Active"/"Inactive" as text (not color-only, per a11y rules).
- Actions column with `eui-icon-button` for Reset Password and Deactivate/Reactivate.
- `aria-label` on the table, `scope="col"` on headers, `data-col-label` on cells, `aria-live="polite"` result count.

### 4. Frontend — create user dialog (STORY-004)

Implemented user creation flow:
- "Create User" button in `eui-page-header-action-items`.
- `eui-dialog` with reactive form: username, firstName, lastName, email (with email validator), role (select dropdown with all 6 roles).
- On success: close dialog, show temporary password in a second `eui-dialog` with copy-to-clipboard button and "This password will not be shown again" warning.
- On 409: inline error message via `eui-feedback-message`.
- Full a11y: `for`/`id` pairs, `aria-required`, `aria-describedby` for validation errors, `aria-haspopup="dialog"` on trigger button.

### 5. Frontend — reset password action (STORY-005)

Added reset password flow:
- `eui-icon-button` (key icon) on each row with `aria-label="Reset password for {username}"`.
- Confirmation `eui-dialog`: "Are you sure you want to reset the password for {username}?"
- On confirm: calls API, shows temporary password dialog (same pattern as create).
- On error: growl notification via `EuiGrowlService`.

### 6. Frontend — deactivate/reactivate actions (STORY-006)

Added status toggle flow:
- Active users show prohibit icon → "Deactivate" confirmation dialog.
- Inactive users show check-circle icon → "Reactivate" confirmation dialog.
- On confirm: calls API, refreshes list, shows success growl.
- On 409 (last SUPER_ADMIN / self-deactivation): error growl with backend message.
- Dialog accept button label set via component properties before `openDialog()` with `cdr.detectChanges()` to avoid stale label issue (BUG-004).

### 7. Frontend — status filter & polish (STORY-007)

Added final UX polish:
- `eui-toggle-group` with All/Active/Inactive items for status filtering.
- Error handling: `hasLoadError` flag with error growl and "Retry" button in noData template.
- `operationPending` flag disables Create User button and action icon buttons (`[euiDisabled]`) during API calls.
- Contextual empty state messages: search, active filter, inactive filter, error, default.

### 8. Bug fixes

Six issues were discovered and fixed during development:

- **BUG-001 — Slow loading & NG0100 errors**: `eui-paginator` fires `pageChange` during init, causing duplicate HTTP calls and `ExpressionChangedAfterItHasBeenCheckedError`. Fix: `AfterViewInit` + `paginatorReady` guard to ignore init event, `OnPush` change detection + `cdr.markForCheck()` for async updates, trimmed mock DB from 87 → 25 users.

- **BUG-002 — Create User button full width**: Button was a direct child of `eui-page-content` (flex column stretches children). Fix: moved into `eui-page-header-action-items` slot, following eUI page header anatomy pattern.

- **BUG-003 — CSS stylesheet parse noise in tests**: jsdom can't parse eUI's modern CSS (nesting, `:host`), flooding test output with "Could not parse CSS stylesheet". Fix: `src/test-setup.ts` intercepting `process.stderr.write` to filter the messages (jsdom uses virtual console → stderr, not `console.warn`).

- **BUG-004 — Dialog accept button label stale**: `eui-dialog` captures `acceptLabel` at overlay creation time. Inline ternary on `selectedUser?.is_active` showed stale value. Fix: dedicated component properties set before `openDialog()` with `cdr.detectChanges()`.

- **BUG-005 — Deactivated user login delayed error**: Auth interceptor's early `return next(req)` for login requests bypassed `catchError`, letting 403 flow through eUI's `EuLoginSessionTimeoutHandlingInterceptor` which introduces a delay. Fix: flag-based approach keeping login in `catchError` pipe + `cdr.detectChanges()` in login component error handler.

- **BUG-006 — Toggle group spacing inconsistent**: `eui-toggle-group` has `width: 100%` by default, causing items to spread apart in a flex layout. Fix: `::ng-deep` override setting `width: auto` and `margin-left: 0.5rem` in component SCSS. Also fixed `styleUrl` → `styleUrls` (Angular requires the array form).

## Working method

Each story followed the same pattern:
1. **Analysis first** — create a `.md` file in `.analysis/06-ADMIN-USERS/` describing the plan, eUI components to use, and acceptance criteria.
2. **Review** — the developer reviews and approves the plan before any code is written.
3. **Implementation** — code changes, following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component and service (vitest for frontend, Jest/supertest for mock server).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story or bug fix group.

## Key technical decisions

- **Server-side pagination/sort/filter**: The `eui-table` supports client-side operations natively, but we use async mode (`isAsync`) with server-side data because the dataset can grow. Do NOT bind `[paginator]` or `[filter]` to the table in async mode.
- **eui-table strips `<caption>`**: The eUI table component removes `<caption>` elements from the DOM. Use `aria-label` on the table instead for accessibility.
- **eui-icon-button uses `[euiDisabled]`**: Not `[disabled]`. The standard `disabled` attribute causes build errors on `eui-icon-button`.
- **eui-dialog `[acceptLabel]` timing**: The dialog captures input values at overlay creation time. Set properties explicitly before calling `openDialog()` and use `cdr.detectChanges()` to force binding updates.
- **eui-toggle-group `width: 100%`**: The component stretches to fill its container by default. Override with `width: auto` via `::ng-deep` for compact layouts.
- **Paginator init event**: `eui-paginator` fires `pageChange` during initialization. Guard with `AfterViewInit` + a `paginatorReady` flag to prevent spurious API calls.
- **OnPush change detection**: Essential for avoiding NG0100 errors when async responses arrive within the same CD cycle. Always call `cdr.markForCheck()` in subscribe callbacks.
- **Auth interceptor login handling**: Never use early `return next(req)` for login requests — it bypasses `catchError` and lets errors flow through eUI's DI interceptors which may introduce delays. Use a flag-based approach instead.
- **jsdom CSS parse noise**: jsdom emits CSS parse errors through its virtual console → `process.stderr`, not through `console.warn`. Intercept `process.stderr.write` in test setup to filter them.

## Git history

```
eefb9a2 feat(admin): STORY-001 — Admin User Management Endpoints
4e3c7eb docs(admin): add analysis docs — FEATURE-006, STORIES breakdown, STORY-001, STORY-002
a3eae4a feat(admin): STORY-002 — AdminUserService + models
d1ce7d3 fix(admin-users): resolve NG0100 errors and trim mock data
e25ce3d feat(admin-users): STORY-004 create user dialog + BUG-002/BUG-003 fixes
365ced8 feat(admin-users): STORY-005 reset password action
2195828 feat(admin-users): STORY-006 deactivate/reactivate + BUG-004 dialog label fix
0fd27a1 fix(BUG-005): deactivated user login shows delayed error message
1907635 feat(admin-users): STORY-007 status filter & polish + BUG-006 toggle spacing fix
```

## Test summary

- Frontend: 161 unit tests (vitest) — all passing
- Mock server: 94 integration tests (Jest + supertest) — all passing
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full admin user management feature on a fresh eUI Angular project that already has authentication and RBAC implemented. Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> I have an eUI Angular 21 application with authentication (login, auth guard, auth interceptor, session management) and RBAC (PermissionService, roleGuard, sidebar filtering) already implemented. There is a placeholder `UsersComponent` at `screen/admin/users` protected by `authGuard` + `roleGuard` with `data: { roles: ['SUPER_ADMIN'] }`. I need you to implement a complete admin user management module. Work story by story, in order. For each story, first create an analysis `.md` file describing the plan, wait for my approval, then implement with tests.
>
> **Backend (mock server using Express + json-server in `mock/` folder):**
>
> 1. **Admin user management endpoints** — Create SUPER_ADMIN-only endpoints under `/api/admin/users`:
>    - `GET /api/admin/users` with server-side pagination (`_page`, `_limit`), sorting (`_sort`, `_order`), search (`q` — case-insensitive on username, firstName, lastName, email), and status filter (`is_active`). Return `{ data, total, page, limit }`.
>    - `GET /api/admin/users/:userId` — single user without password.
>    - `POST /api/admin/users` — create user, validate uniqueness (email, username), generate 12-char temporary password. Return `{ user, temporaryPassword }` with 201. Return 409 on duplicates.
>    - `POST /api/admin/users/:userId/reset-password` — generate new temporary password. Return `{ temporaryPassword }`.
>    - `PATCH /api/admin/users/:userId/deactivate` — set `is_active: false`. Block last-SUPER_ADMIN deactivation (409) and self-deactivation (409).
>    - `PATCH /api/admin/users/:userId/reactivate` — set `is_active: true`.
>    - All protected by `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`.
>    - Keep existing non-admin user routes for profile lookups.
>    - Add Jest + supertest tests.
>
> **Frontend:**
>
> 2. **Admin user service** — Create `AdminUserService` (providedIn root) with methods: `getUsers(params)`, `getUser(userId)`, `createUser(data)`, `resetPassword(userId)`, `deactivateUser(userId)`, `reactivateUser(userId)`. Define TypeScript interfaces for all request/response types. Add tests.
>
> 3. **User list table** — Replace the placeholder with `eui-table` in async mode (`isAsync`). Columns: Username, First Name, Last Name, Email, Role, Status (text: "Active"/"Inactive"), Actions. Use `eui-table-filter` for debounced search (300ms). Use `eui-paginator` with [10, 25, 50] page sizes. Sortable columns via `th[isSortable]`. Actions column with `eui-icon-button` for Reset Password and Deactivate/Reactivate. Use `OnPush` change detection with `cdr.markForCheck()` in async callbacks. Guard paginator init event with `AfterViewInit` + `paginatorReady` flag. Add `aria-label` on table (not `<caption>` — eUI strips it), `scope="col"` on headers, `data-col-label` on cells, `aria-live="polite"` result count. Add tests.
>
> 4. **Create user dialog** — "Create User" button in `eui-page-header-action-items`. `eui-dialog` with reactive form: username, firstName, lastName, email (email validator), role (select with all roles). On success: close dialog, show temporary password in second `eui-dialog` with copy button and one-time warning. On 409: inline `eui-feedback-message`. Full a11y: `for`/`id` pairs, `aria-required`, `aria-describedby`, `aria-haspopup="dialog"`. Add tests.
>
> 5. **Reset password action** — `eui-icon-button` (key icon) per row. Confirmation `eui-dialog`. On confirm: call API, show temporary password dialog. On error: growl. Add tests.
>
> 6. **Deactivate/reactivate actions** — Active users: prohibit icon → deactivate confirmation. Inactive users: check-circle icon → reactivate confirmation. Set dialog title and acceptLabel as component properties before `openDialog()` with `cdr.detectChanges()` (eui-dialog captures acceptLabel at overlay creation). On 409: error growl with backend message. Add tests.
>
> 7. **Status filter & polish** — `eui-toggle-group` with All/Active/Inactive items. Override `eui-toggle-group` default `width: 100%` with `::ng-deep { width: auto }` in component SCSS. Error handling: `hasLoadError` flag with retry button. `operationPending` flag disables buttons (`[euiDisabled]` on `eui-icon-button`, not `[disabled]`). Contextual empty state messages. Add tests.
>
> **Important constraints:**
> - Use eUI components first — check the eUI component library before using alternatives.
> - `eui-table` async mode: do NOT bind `[paginator]` or `[filter]` to the table. Handle pagination/filtering manually via API params.
> - `eui-table` strips `<caption>` elements — use `aria-label` on the table instead.
> - `eui-icon-button` uses `[euiDisabled]` not `[disabled]` for disabling.
> - `eui-dialog` `[acceptLabel]` is captured at overlay creation time — set properties before `openDialog()` with `cdr.detectChanges()`.
> - `eui-toggle-group` has `width: 100%` by default — override with `::ng-deep` for compact layouts.
> - `eui-paginator` fires `pageChange` during init — guard with `AfterViewInit` + `paginatorReady` flag.
> - Use `OnPush` change detection + `cdr.markForCheck()` in async callbacks to avoid NG0100 errors.
> - Auth interceptor: never use early `return next(req)` for login requests — use a flag-based approach to keep login in the `catchError` pipe.
> - Frontend tests use vitest (`vi.fn()`, `vi.mocked()`). Mock server tests use Jest + supertest.
> - Every story must pass build (`npx ng build --configuration=development`) and all tests before committing.
> - Follow WCAG 2.2 AA: semantic HTML, `aria-label` on icon buttons, `aria-live="polite"` on dynamic content, `for`/`id` on form labels, no color-only information, `scope="col"` on table headers, `data-col-label` on table cells.
