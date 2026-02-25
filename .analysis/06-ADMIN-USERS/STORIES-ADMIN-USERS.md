# FEATURE-006 Admin Users — Story Breakdown

## Context

This feature adds a full user administration module to the TaskForge-eUI-v2 app, accessible only to SUPER_ADMIN users. The goal is to provide user lifecycle management: listing, searching, creating, resetting passwords, and toggling activation status.

The app currently has a placeholder `UsersComponent` at `screen/admin/users` (from STORY-007 of the RBAC branch), protected by `authGuard` + `roleGuard` with `data: { roles: ['SUPER_ADMIN'] }`. This branch replaces the placeholder with a fully functional admin page.

## Current State

- `UsersComponent` exists at `src/app/features/admin/users/users.component.ts` — placeholder with "User Administration" heading
- Route `screen/admin/users` is wired with `authGuard` + `roleGuard` (SUPER_ADMIN only)
- Sidebar entry "Users" is filtered by SUPER_ADMIN role
- Mock backend has `GET /api/users`, `GET /api/users/:userId`, `POST /api/users`, `PUT /api/users/:userId`, `DELETE /api/users/:userId` — but these are basic CRUD without authorization, pagination, search, or business logic
- `mock/db/db.json` has 20+ seed users with fields: `id`, `username`, `password`, `email`, `role`, `global_role`, `firstName`, `lastName`, `is_active`, `created_at`, `updated_at`
- `requireGlobalRole('SUPER_ADMIN')` middleware exists in `mock/app/middleware/authorize.js`

## eUI Components Used

| Component | Import | Purpose |
|-----------|--------|---------|
| `eui-table` / `table[euiTable]` | `EUI_TABLE` from `@eui/components/eui-table` | User list table with sorting, filtering |
| `eui-table-filter` | `EUI_TABLE` | Search/filter input for the table |
| `eui-paginator` | `EuiPaginatorComponent` from `@eui/components/eui-paginator` | Pagination below the table |
| `th[isSortable]` | `EUI_TABLE` | Sortable column headers |
| `eui-dialog` / `EuiDialogService` | `EuiDialogComponent` from `@eui/components/eui-dialog` | Confirmation dialogs (deactivate, reset password) |
| `euiInputText` | `EuiInputTextComponent` from `@eui/components/eui-input-text` | Form inputs in create user dialog |
| `euiLabel` | from `@eui/components/eui-label` | Form labels |
| `euiButton` | from `@eui/components/eui-button` | Action buttons |
| `EuiGrowlService` | from `@eui/core` | Success/error notifications |
| `eui-page` / `eui-page-header` / `eui-page-content` | `EUI_PAGE` from `@eui/components/eui-page` | Page structure |
| `EuiTemplateDirective` | from `@eui/components/directives` | Table templates (header, body, noData) |
| `eui-icon-svg` | `EUI_ICON` from `@eui/components/eui-icon` | Action icons in table rows |

---

## Execution Order

Stories must be implemented in this exact order. Each story depends on the previous one.

---

## STORY-001: Mock Backend — Admin User Management Endpoints

### Goal
Replace the basic CRUD user routes with proper admin endpoints that enforce SUPER_ADMIN authorization, support server-side pagination, search, filtering, and provide user lifecycle operations (create, reset password, deactivate, reactivate).

### Backend (mock server)

1. **Rewrite `mock/app/routes/user_routes.js`** with SUPER_ADMIN-only admin endpoints:

   #### `GET /api/admin/users`
   - Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`
   - Query params: `_page` (default 1), `_limit` (default 10), `_sort` (field name), `_order` (asc/desc), `q` (search term), `is_active` (true/false filter)
   - Search (`q`): case-insensitive match against `username`, `firstName`, `lastName`, `email`
   - Returns: `{ data: [...users without password], total: number, page: number, limit: number }`
   - Sorting: by any field, default `created_at` desc

   #### `GET /api/admin/users/:userId`
   - Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`
   - Returns user without password, or 404

   #### `POST /api/admin/users`
   - Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`
   - Body: `{ username, firstName, lastName, email, role }`
   - Validation: all fields required, email must be unique (case-insensitive), username must be unique
   - Email normalization: lowercase and trim
   - Generates a temporary password (random 12-char alphanumeric)
   - Stores user with `is_active: true`, `global_role` derived from `role`, timestamps
   - Returns: `{ user: {...without password}, temporaryPassword: "..." }` with status 201
   - Returns 409 if email or username already exists

   #### `POST /api/admin/users/:userId/reset-password`
   - Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`
   - Generates a new temporary password
   - Updates the user's password in DB
   - Returns: `{ temporaryPassword: "..." }` with status 200
   - Returns 404 if user not found

   #### `PATCH /api/admin/users/:userId/deactivate`
   - Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`
   - Sets `is_active: false`, updates `updated_at`
   - Blocks deactivation of the last active SUPER_ADMIN (returns 409 with message)
   - Blocks self-deactivation (returns 409 with message)
   - Returns updated user without password
   - Returns 404 if user not found

   #### `PATCH /api/admin/users/:userId/reactivate`
   - Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`
   - Sets `is_active: true`, updates `updated_at`
   - Returns updated user without password
   - Returns 404 if user not found

2. **Keep existing non-admin user routes** (`GET /api/users`, `GET /api/users/:userId`) for non-admin use cases (e.g. user profile lookup). These remain protected by `authMiddleware` only.

3. **Add Jest + supertest tests** for all admin endpoints.

### Acceptance Criteria
- [ ] All `/api/admin/users*` endpoints require SUPER_ADMIN role (403 for others)
- [ ] `GET /api/admin/users` supports pagination, search, sort, and status filter
- [ ] `POST /api/admin/users` validates uniqueness (email, username) and returns temporary password
- [ ] `POST /api/admin/users/:userId/reset-password` returns new temporary password
- [ ] `PATCH /api/admin/users/:userId/deactivate` blocks last-SUPER_ADMIN and self-deactivation
- [ ] `PATCH /api/admin/users/:userId/reactivate` sets user active
- [ ] All existing tests still pass: `npm run test:mock`

---

## STORY-002: Frontend — Admin User Service

### Goal
Create an Angular service that encapsulates all HTTP calls to the admin user management endpoints. This service is the single point of contact between the frontend components and the backend admin API.

### Frontend

1. Create `src/app/features/admin/users/admin-user.service.ts`:
   - `providedIn: 'root'`
   - Interfaces: `AdminUser`, `AdminUserListParams`, `AdminUserListResponse`, `CreateUserRequest`, `CreateUserResponse`, `ResetPasswordResponse`
   - Methods:
     - `getUsers(params: AdminUserListParams): Observable<AdminUserListResponse>` — calls `GET /api/admin/users` with query params
     - `getUser(userId: string): Observable<AdminUser>` — calls `GET /api/admin/users/:userId`
     - `createUser(data: CreateUserRequest): Observable<CreateUserResponse>` — calls `POST /api/admin/users`
     - `resetPassword(userId: string): Observable<ResetPasswordResponse>` — calls `POST /api/admin/users/:userId/reset-password`
     - `deactivateUser(userId: string): Observable<AdminUser>` — calls `PATCH /api/admin/users/:userId/deactivate`
     - `reactivateUser(userId: string): Observable<AdminUser>` — calls `PATCH /api/admin/users/:userId/reactivate`

2. Add unit tests with `HttpClientTestingModule`.

### Acceptance Criteria
- [ ] Service methods map correctly to backend endpoints
- [ ] Query params are properly serialized for `getUsers()`
- [ ] All methods return typed Observables
- [ ] Unit tests cover all methods
- [ ] Build passes

---

## STORY-003: Frontend — User List Table with Pagination, Search & Sort

### Goal
Replace the placeholder `UsersComponent` with a fully functional user list table using `eui-table`, `eui-table-filter`, `eui-paginator`, and sortable columns. The table displays users with server-side pagination, search, and sorting.

### Frontend

1. **Rewrite `UsersComponent`** with:
   - `eui-page` > `eui-page-header` (label "User Administration") > `eui-page-content`
   - A "Create User" button in the page header area
   - `eui-table-filter` for search input
   - `table[euiTable]` with columns: Username, First Name, Last Name, Email, Role, Status, Actions
   - `th[isSortable]` on Username, First Name, Last Name, Email, Role columns
   - `eui-paginator` with `[pageSizeOptions]="[10, 25, 50]"` and `[pageSize]="10"`
   - Status column: display "Active" / "Inactive" as text (not color-only, per a11y rules)
   - Actions column: icon buttons for Reset Password, Deactivate/Reactivate (depending on status)
   - `noData` template: "No users found"
   - Loading state while fetching

2. **Server-side data flow**:
   - On init, search change, sort change, or page change → call `adminUserService.getUsers(params)`
   - Map `eui-paginator` `pageChange` event to update `_page` and `_limit`
   - Map `eui-table-filter` `filterChange` event to update `q` param (debounced)
   - Map `sortChange` event to update `_sort` and `_order` params

3. **Accessibility**:
   - `<caption>` on the table: "List of platform users"
   - `scope="col"` on all `<th>` elements
   - `data-col-label` on all `<td>` elements (eUI responsive table requirement)
   - `aria-label` on icon-only action buttons
   - `aria-live="polite"` region showing result count (e.g. "Showing 10 of 45 users")

4. **Unit tests** for the component.

### Acceptance Criteria
- [ ] Table displays users with all specified columns
- [ ] Search filters users (server-side)
- [ ] Sorting works on sortable columns (server-side)
- [ ] Pagination works with page size options
- [ ] Status shows "Active"/"Inactive" as text
- [ ] Action buttons have `aria-label`
- [ ] Table has `<caption>` and `scope="col"` on headers
- [ ] `data-col-label` on all `<td>` elements
- [ ] Result count announced via `aria-live="polite"`
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-004: Frontend — Create User Dialog

### Goal
Implement a "Create User" dialog that allows SUPER_ADMIN to create new users. On success, display the one-time temporary password in a confirmation dialog.

### Frontend

1. **Create `src/app/features/admin/users/create-user-dialog.component.ts`**:
   - Standalone component used inside an `eui-dialog`
   - Reactive form with fields: `username`, `firstName`, `lastName`, `email`, `role` (dropdown/select)
   - Role options: `SUPER_ADMIN`, `PROJECT_ADMIN`, `PRODUCT_OWNER`, `DEVELOPER`, `REPORTER`, `VIEWER`
   - All fields required
   - Email validation (format)
   - On submit: call `adminUserService.createUser()`, handle 409 (duplicate) with inline error
   - On success: close dialog, show a second dialog with the temporary password (copyable, one-time display warning)
   - On cancel: close dialog

2. **Wire "Create User" button** in `UsersComponent` to open the dialog via `EuiDialogService` or template ref.

3. **Temporary password display dialog**:
   - Show the generated password in a read-only input with a "Copy" button
   - Warning text: "This password will not be shown again. Please copy it now."
   - On close: refresh the user list

4. **Accessibility**:
   - All form inputs have `<label>` with `for`/`id` pairs
   - Required fields use `aria-required="true"`
   - Validation errors use `aria-describedby`
   - Dialog has proper focus trap (built into `eui-dialog`)
   - `aria-haspopup="dialog"` on the "Create User" button

5. **Unit tests** for the dialog component.

### Acceptance Criteria
- [ ] "Create User" button opens a dialog with the form
- [ ] All fields are required with proper validation
- [ ] Email format is validated
- [ ] Duplicate email/username shows inline error (409 handling)
- [ ] On success, temporary password is displayed in a confirmation dialog
- [ ] Password can be copied
- [ ] User list refreshes after creation
- [ ] Form inputs have associated labels and `aria-required`
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-005: Frontend — Reset Password Action

### Goal
Add a "Reset Password" action to each user row in the table. On click, show a confirmation dialog, then call the API and display the new temporary password.

### Frontend

1. **Confirmation dialog**: "Are you sure you want to reset the password for {username}?"
   - Accept button: "Reset Password"
   - Dismiss button: "Cancel"

2. **On confirm**: call `adminUserService.resetPassword(userId)`
   - On success: show temporary password dialog (same pattern as STORY-004)
   - On error: show growl notification

3. **Accessibility**:
   - Confirmation dialog uses `eui-dialog` (focus trap, Escape to close)
   - `aria-haspopup="dialog"` on the reset password icon button

4. **Unit tests**.

### Acceptance Criteria
- [ ] Reset password button shows confirmation dialog
- [ ] On confirm, API is called and new temporary password is displayed
- [ ] Password display dialog warns about one-time visibility
- [ ] Error responses show growl notification
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-006: Frontend — Deactivate / Reactivate User Actions

### Goal
Add deactivate and reactivate actions to user rows. Active users show a "Deactivate" button, inactive users show a "Reactivate" button. Both require confirmation.

### Frontend

1. **Deactivate action** (visible for active users):
   - Confirmation dialog: "Are you sure you want to deactivate {username}? They will no longer be able to log in."
   - On confirm: call `adminUserService.deactivateUser(userId)`
   - On success: refresh user list, show success growl
   - On 409 (last SUPER_ADMIN or self-deactivation): show error growl with backend message
   - On other error: show generic error growl

2. **Reactivate action** (visible for inactive users):
   - Confirmation dialog: "Are you sure you want to reactivate {username}?"
   - On confirm: call `adminUserService.reactivateUser(userId)`
   - On success: refresh user list, show success growl
   - On error: show error growl

3. **Accessibility**:
   - Confirmation dialogs use `eui-dialog`
   - `aria-haspopup="dialog"` on action buttons
   - Status change announced via growl (`aria-live="polite"`)

4. **Unit tests**.

### Acceptance Criteria
- [ ] Active users show "Deactivate" button, inactive users show "Reactivate" button
- [ ] Both actions require confirmation dialog
- [ ] Last-SUPER_ADMIN deactivation blocked with clear error message
- [ ] Self-deactivation blocked with clear error message
- [ ] User list refreshes after status change
- [ ] Success/error feedback via growl notifications
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-007: Frontend — Status Filter & Polish

### Goal
Add a status filter (All / Active / Inactive) above the table and polish the overall UX: loading states, empty states, and error handling.

### Frontend

1. **Status filter**:
   - Button group or segmented control above the table (next to the search filter)
   - Options: "All", "Active", "Inactive"
   - Default: "All"
   - On change: update `is_active` query param and reload the table

2. **Loading state**:
   - Show a loading indicator while the table data is being fetched
   - Disable action buttons during pending operations

3. **Error handling**:
   - If `getUsers()` fails, show an error growl and display the `noData` template
   - Retry mechanism: a "Retry" button in the empty state

4. **Empty state refinement**:
   - When search returns no results: "No users match your search criteria"
   - When filter returns no results: "No {active/inactive} users found"
   - Default: "No users found"

5. **Unit tests**.

### Acceptance Criteria
- [ ] Status filter switches between All / Active / Inactive
- [ ] Filter state is reflected in the API call
- [ ] Loading indicator shown during data fetch
- [ ] Error state shows growl and retry option
- [ ] Empty state messages are contextual
- [ ] All existing tests still pass
- [ ] Build passes

---

## Dependency Graph

```
STORY-001 (Admin user management endpoints)
    └── STORY-002 (Admin user service)
            └── STORY-003 (User list table with pagination, search, sort)
                    ├── STORY-004 (Create user dialog)
                    ├── STORY-005 (Reset password action)
                    └── STORY-006 (Deactivate / reactivate actions)
                            └── STORY-007 (Status filter & polish)
```

## Technical Notes

- The existing `GET /api/users` and `GET /api/users/:userId` routes remain for non-admin use cases. The new admin routes live under `/api/admin/users`.
- Temporary password generation is mock-level only (random string). A real backend would use a secure random generator and hash before storing.
- The `eui-table` component handles client-side sorting/filtering natively, but we use server-side for this feature because the dataset can grow large. The table receives pre-sorted, pre-filtered data from the API.
- `EuiDialogService` or template-ref `eui-dialog` can be used for dialogs. Template-ref is simpler for inline dialogs; `EuiDialogService` is better for programmatic control.
- The temporary password display dialog is a separate concern from the create/reset dialogs — it's a read-only confirmation that appears after a successful operation.
- All action buttons in the table use icon buttons with `aria-label` for accessibility. No color-only status indicators.
