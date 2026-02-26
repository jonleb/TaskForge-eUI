# FEATURE-009 Project Portfolio — Story Breakdown

## Context

This feature enhances the existing portfolio page and project detail views to provide a production-quality project management experience. The current portfolio is a basic table with Key, Name, Description columns and a Create button. There is no search, filtering, pagination, sorting, or status visibility. The project dashboard is a read-only placeholder. There is no way to edit project settings after creation.

The app currently has:
- Backend: `GET /api/projects` (membership-filtered, active only), `GET /api/projects/:projectId`, `GET /api/projects/:projectId/members`, `POST /api/projects` (SUPER_ADMIN), `PATCH /api/projects/:projectId` (SUPER_ADMIN, key immutable).
- Frontend: `PortfolioComponent` with basic `eui-table` (client-side, no pagination/search/sort), create project dialog (SUPER_ADMIN only). `DashboardComponent` showing project name, key, description, created date, member count.
- Seed data: 3 projects (TF active, DEMO active, INFRA inactive). 16 project-member records.
- `PermissionService` with `isSuperAdmin()`, `hasGlobalRole()`, `getGlobalRole()`, `getOriginalRole()`.
- Admin users feature with server-side pagination/search/sort/filter pattern already implemented.

## eUI Components Used

| Component | Import | Purpose |
|-----------|--------|---------|
| `eui-table` | `EUI_TABLE` from `@eui/components/eui-table` | Portfolio table (async mode) |
| `eui-table-filter` | `EuiTableFilterComponent` from `@eui/components/eui-table` | Search input for portfolio |
| `eui-paginator` | `EuiPaginatorComponent` from `@eui/components/eui-paginator` | Portfolio pagination |
| `eui-toggle-group` | from `@eui/components/eui-toggle-group` | Active/Inactive/All status filter |
| `eui-chip` | from `@eui/components/eui-chip` | Status badge in table rows |
| `eui-dialog` | `EuiDialogComponent` from `@eui/components/eui-dialog` | Edit project settings dialog |
| `eui-feedback-message` | from `@eui/components/eui-feedback-message` | Inline validation errors |
| `eui-icon-button` | from `@eui/components/eui-icon-button` | Row action buttons (edit, open) |
| `input[euiInputText]` | `EuiInputTextComponent` from `@eui/components/eui-input-text` | Form inputs |
| `textarea[euiTextArea]` | `EuiTextareaComponent` from `@eui/components/eui-textarea` | Description field |
| `label[euiLabel]` | from `@eui/components/eui-label` | Form labels |
| `EuiGrowlService` | from `@eui/core` | Success/error notifications |

---

## Execution Order

Stories must be implemented in this exact order. Each story depends on the previous one.

---

## STORY-001: Backend — Enhanced Project List Endpoint

### Goal
Upgrade `GET /api/projects` to support server-side pagination, search, sorting, and status filtering. SUPER_ADMIN sees all projects (including inactive). Regular users see only active projects they are members of.

### Backend

1. Update `mock/app/routes/project_routes.js` — modify `GET /api/projects`:
   - Query params: `_page` (default 1), `_limit` (default 10, max 100), `_sort` (default `name`), `_order` (`asc`/`desc`, default `asc`), `q` (search term), `is_active` (`true`/`false`/omitted).
   - SUPER_ADMIN:
     - Sees all projects (active + inactive).
     - Can filter by `is_active`.
     - Search (`q`): case-insensitive match on `name`, `key`, `description`.
   - Regular users:
     - See only active projects they are members of (current behavior).
     - `is_active` filter ignored (always active).
     - Search (`q`): case-insensitive match on `name`, `key`, `description` within their visible projects.
   - Response shape: `{ data: Project[], total: number, page: number, limit: number }`.
   - Sort, then paginate.

2. Add integration tests in `mock/app/routes/project_routes.test.js`:
   - Pagination: returns correct page/limit/total.
   - Search: filters by name, key, description.
   - Sort: by name asc/desc, by key.
   - Status filter (SUPER_ADMIN): `is_active=true`, `is_active=false`, omitted.
   - Regular user: only sees own active projects, ignores `is_active` filter.
   - Empty result set returns `{ data: [], total: 0, page: 1, limit: 10 }`.

### Acceptance Criteria
- [ ] SUPER_ADMIN sees all projects (active + inactive) by default
- [ ] Regular users see only their active projects
- [ ] Pagination returns correct `total`, `page`, `limit`
- [ ] Search filters by name, key, description (case-insensitive)
- [ ] Sort works on name and key columns
- [ ] Status filter works for SUPER_ADMIN
- [ ] Response shape is `{ data, total, page, limit }`
- [ ] Integration tests cover all branches

---

## STORY-002: Frontend — Portfolio Table with Server-Side Pagination, Search & Sort

### Goal
Upgrade the portfolio table from client-side to server-side (async) mode with pagination, search, and sortable columns. Match the pattern used in the admin users table.

### Frontend

1. Update `src/app/core/project/project.models.ts`:
   - Add `ProjectListParams` interface: `{ page?: number, limit?: number, sort?: string, order?: string, q?: string, is_active?: string }`.
   - Add `ProjectListResponse` interface: `{ data: Project[], total: number, page: number, limit: number }`.

2. Update `src/app/core/project/project.service.ts`:
   - Change `getProjects()` to `getProjects(params?: ProjectListParams): Observable<ProjectListResponse>`.
   - Build query params from `ProjectListParams` and pass to `GET /api/projects`.

3. Update `src/app/core/project/index.ts` — export new interfaces.

4. Update `src/app/features/projects/portfolio/portfolio.component.ts`:
   - Switch to async table mode (`isAsync`).
   - Add `eui-table-filter` for debounced search (300ms).
   - Add `eui-paginator` with page size options `[10, 25, 50]`.
   - Add sortable columns: Key (`isSortable`, `sortOn="key"`), Name (`isSortable`, `sortOn="name"`).
   - Guard paginator init event with `AfterViewInit` + `paginatorReady` flag.
   - Use `OnPush` + `cdr.markForCheck()` in async callbacks.
   - Add `aria-live="polite"` result count.
   - Update `loadProjects()` to pass current params to service.

5. Update `src/app/features/projects/portfolio/portfolio.component.html`:
   - Add `eui-table-filter` above table.
   - Add `eui-paginator` below table.
   - Add `isSortable` + `sortOn` on Key and Name `<th>` elements.
   - Keep `scope="col"` on headers, `data-col-label` on cells.

6. Update unit tests.

### Acceptance Criteria
- [ ] Table loads data from server with pagination
- [ ] Search filters projects by name/key/description with 300ms debounce
- [ ] Key and Name columns are sortable
- [ ] Paginator shows correct total and page size options
- [ ] Paginator init event does not trigger spurious API call
- [ ] Result count announced via `aria-live="polite"`
- [ ] Loading and error states work correctly
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-003: Frontend — Status Filter & Status Column

### Goal
Add a status filter (All/Active/Inactive) for SUPER_ADMIN users and display project status in the table. Regular users always see active projects only, so the filter is hidden for them.

### Frontend

1. Update `src/app/features/projects/portfolio/portfolio.component.ts`:
   - Add `eui-toggle-group` with items: All, Active, Inactive.
   - Only visible when `isSuperAdmin` is true.
   - On toggle change: update `is_active` param and reload.
   - Override `eui-toggle-group` default `width: 100%` with `::ng-deep { width: auto }` in component SCSS.

2. Update `src/app/features/projects/portfolio/portfolio.component.html`:
   - Add Status column to table showing "Active"/"Inactive" as text (not color-only, per a11y rules).
   - Optionally use `eui-chip` with `euiSuccess`/`euiDanger` variant + text label for visual distinction.
   - Add `eui-toggle-group` above table (next to search filter), guarded by `@if (isSuperAdmin)`.

3. Create `src/app/features/projects/portfolio/portfolio.component.scss` if not exists:
   - `::ng-deep eui-toggle-group { width: auto; }` and `margin-left: 0.5rem`.

4. Update unit tests:
   - Toggle group visible for SUPER_ADMIN, hidden for regular users.
   - Status filter changes reload data with correct `is_active` param.
   - Status column displays "Active"/"Inactive" text.

### Acceptance Criteria
- [ ] SUPER_ADMIN sees All/Active/Inactive toggle filter
- [ ] Regular users do not see the status filter
- [ ] Status column shows "Active"/"Inactive" as text
- [ ] Toggling filter reloads data with correct `is_active` param
- [ ] Toggle group has compact width (not full-width)
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-004: Frontend — Edit Project Settings Dialog

### Goal
Allow authorized users (SUPER_ADMIN) to edit project name and description via a dialog. The project key is displayed as read-only (immutable). Uses the existing `PATCH /api/projects/:projectId` endpoint.

### Frontend

1. Update `src/app/core/project/project.service.ts`:
   - Add `updateProject(projectId: string, payload: UpdateProjectPayload): Observable<Project>`.
   - `UpdateProjectPayload`: `{ name?: string, description?: string }`.

2. Update `src/app/core/project/project.models.ts` — add `UpdateProjectPayload`.

3. Update `src/app/core/project/index.ts` — export `UpdateProjectPayload`.

4. Update `src/app/features/projects/portfolio/portfolio.component.ts`:
   - Add `editForm: FormGroup` with `name` (required, min 2), `description` (optional).
   - Add `selectedProject: Project | null` for the project being edited.
   - Add `editError: string` for inline 409 errors.
   - Add `openEditDialog(project: Project)` — populates form, opens dialog.
   - Add `onUpdateProject()` — calls `projectService.updateProject()`, on success: close dialog, growl, reload list. On 409: inline error. On other error: growl.
   - Add `resetEditForm()` — clears form and error on dismiss.
   - Only SUPER_ADMIN sees the edit action button.

5. Update `src/app/features/projects/portfolio/portfolio.component.html`:
   - Add edit `eui-icon-button` (pencil icon) in Actions column, guarded by `@if (isSuperAdmin)`.
   - Add `eui-dialog #editDialog` with form: Key (read-only text, not an input), Name (required), Description (optional).
   - `[isHandleCloseOnAccept]="true"` — close manually after API success.
   - Accessibility: `aria-label="Edit {project.name}"` on icon button, `for`/`id` pairs, `aria-required`, `aria-describedby` for errors.

6. Update unit tests:
   - Edit button visible for SUPER_ADMIN, hidden for regular users.
   - Dialog opens with pre-filled values.
   - Key displayed as read-only.
   - Successful update closes dialog, shows growl, reloads list.
   - 409 error shows inline message.
   - Form reset on dismiss.

### Acceptance Criteria
- [ ] SUPER_ADMIN sees edit button on each row
- [ ] Regular users do not see edit button
- [ ] Dialog shows key as read-only text
- [ ] Name and description are editable
- [ ] Successful update closes dialog, shows success growl, reloads list
- [ ] 409 conflict shows inline error
- [ ] Other errors show growl error
- [ ] Form resets on dismiss
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-005: Backend — Seed Data Expansion

### Goal
Add more seed projects and members to make the portfolio experience realistic for testing pagination, search, and filtering.

### Backend

1. Update `mock/db/db.json`:
   - Add 12–15 additional projects with varied statuses (mix of active/inactive), diverse names and keys.
   - Add project-member records linking existing users to new projects with varied roles.
   - Ensure at least 2–3 inactive projects for status filter testing.
   - Ensure regular users (e.g. `developer`, `olivia.anderson`) have memberships in several projects.

2. No code changes — data only.

3. Verify existing tests still pass after data expansion (`npm run test:mock`).

### Acceptance Criteria
- [ ] At least 15 total projects in seed data
- [ ] Mix of active and inactive projects
- [ ] Multiple users have memberships across several projects
- [ ] Existing mock server tests still pass
- [ ] Existing frontend tests still pass

---

## STORY-006: Frontend — Enhanced Project Dashboard

### Goal
Improve the project dashboard to show more useful project information: status, created by, last updated, and a member list table.

### Frontend

1. Update `src/app/features/projects/dashboard/dashboard.component.ts`:
   - Display project status (Active/Inactive) as text with `eui-chip`.
   - Display `created_by` — resolve to user name (requires a lookup or storing creator name in project).
   - Display `updated_at` formatted date.
   - Replace member count with a member list table: Name, Email, Role columns.
   - Loading and error states for members.

2. Update `src/app/features/projects/dashboard/dashboard.component.html`:
   - Add project metadata section: Status, Created by, Created at, Last updated.
   - Add members `eui-table` with columns: Name (firstName + lastName), Email, Role.
   - Accessibility: `aria-label` on members table, `scope="col"` on headers, `data-col-label` on cells.

3. Update unit tests.

### Acceptance Criteria
- [ ] Dashboard shows project status as text chip
- [ ] Dashboard shows created date and last updated date
- [ ] Members displayed in a table with Name, Email, Role
- [ ] Loading and error states for member data
- [ ] Accessible table markup
- [ ] Unit tests pass
- [ ] Build passes

---

## Dependency Graph

```
STORY-001 (Backend — Enhanced list endpoint)
    └── STORY-002 (Frontend — Pagination, search, sort)
            └── STORY-003 (Frontend — Status filter & column)
                    └── STORY-004 (Frontend — Edit dialog)

STORY-005 (Backend — Seed data) — can be done in parallel, ideally before STORY-002 for testing

STORY-006 (Frontend — Enhanced dashboard) — independent, can be done after STORY-002
```

## Technical Notes

- The portfolio table switches from client-side to async (server-side) mode. This means `[paginator]` and `[filter]` should NOT be bound to the table — pagination and filtering are handled manually via API params (same pattern as admin users).
- `eui-paginator` fires `pageChange` during init — guard with `AfterViewInit` + `paginatorReady` flag.
- `eui-toggle-group` has `width: 100%` by default — override with `::ng-deep { width: auto }`.
- Status column uses text ("Active"/"Inactive") not color-only, per a11y rules. `eui-chip` with color variant provides visual enhancement alongside the text.
- The edit dialog shows the project key as read-only text (not a disabled input) since keys are immutable. This avoids confusion about whether the key can be changed.
- `eui-icon-button` uses `[euiDisabled]` not `[disabled]`.
- The `PATCH /api/projects/:projectId` endpoint already exists from branch 08. The frontend just needs to wire up the service method and dialog.
- Seed data expansion (STORY-005) should ideally happen before frontend stories to make testing more realistic, but it's not a hard dependency.
