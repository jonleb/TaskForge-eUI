# 10-PROJECT-MEMBERSHIP — Project Membership Management

## What this branch does

This branch adds full project membership management: adding, changing roles, and removing members from projects. Authorized managers (SUPER_ADMIN and PROJECT_ADMIN) get a dedicated Members page with action buttons, while other users can view the member list read-only. Three backend mutation endpoints (upsert, remove, candidate search) are added alongside a new Members page with three dialogs (add, change role, remove). Two cross-cutting bugs were fixed: PROJECT_ADMIN not being recognized as a manager (wrong field name in `/api/auth/me`), and "Created by" showing "Loading…" on all dashboards (wrong field query in `GET /api/users/:userId`). End-to-end Playwright tests cover the full membership workflow.

## Step-by-step walkthrough

### 1. Backend — Membership Mutation Endpoints (STORY-001)

- Added three endpoints to `mock/app/routes/project_routes.js`:
  - `PUT /api/projects/:projectId/members` — upsert (create 201 or update 200) with role validation and SUPER_ADMIN protection.
  - `DELETE /api/projects/:projectId/members/:userId` — remove membership (204), 404 if not found, SUPER_ADMIN protection.
  - `GET /api/projects/:projectId/members/candidates?q=search` — returns active non-member users matching search (max 10, min 2 chars).
- All three endpoints require `authMiddleware` + `requireProjectRole(db, 'PROJECT_ADMIN')` (SUPER_ADMIN bypasses via middleware).
- ~27 integration tests added.

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`

### 2. Frontend — MembershipService and Models (STORY-002)

- Added `UpsertMemberPayload`, `MemberCandidate` interfaces and `PROJECT_ROLES` constant to `project.models.ts`.
- Added `upsertMember()`, `removeMember()`, `searchCandidates()` methods to `ProjectService`.
- Updated barrel export.
- ~9 unit tests.

Files: `src/app/core/project/project.models.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/project.service.spec.ts`, `src/app/core/project/index.ts`

### 3. Members Page with Table, Route & Sidebar (STORY-003 + STORY-007)

- Created `MembersComponent` (standalone, OnPush) with `eui-table` displaying Name, Email, Role (chip).
- Edit/remove `eui-icon-button` actions visible only to managers (SUPER_ADMIN or PROJECT_ADMIN of the project).
- "Add Member" button in `<eui-page-header-action-items>` for managers.
- Registered `/members` child route under project shell. Added "Members" sidebar entry between Dashboard and Backlog.
- Removed members section from `DashboardComponent`.
- Manager determination: `isSuperAdmin()` short-circuit, then member list lookup for PROJECT_ADMIN role. STORY-007 was integrated directly here.
- ~15 unit tests.

Files: `src/app/features/projects/members/members.component.ts`, `src/app/features/projects/members/members.component.html`, `src/app/features/projects/members/members.component.scss`, `src/app/features/projects/members/members.component.spec.ts`, `src/app/features/projects/projects.routes.ts`, `src/app/features/projects/shell/shell.component.ts`, `src/app/features/projects/dashboard/dashboard.component.ts`, `src/app/features/projects/dashboard/dashboard.component.html`

### 4. Add Member Dialog (STORY-004) + Change Role Dialog (STORY-005)

- Add dialog: candidate search input with 300ms debounce, results listbox, selected candidate display, role select among 5 project roles. On success: close, growl, reload. On error: inline feedback message.
- Change role dialog: shows member name, pre-selects current role, role select. On success: close, growl, reload. On 403 (SUPER_ADMIN protection): inline error.
- Both dialogs use `FormsModule` + `ngModel`, `eui-dialog`, `eui-select`, `eui-feedback-message`.
- Form reset on close/dismiss.
- Unit tests for both dialogs.

Files: `src/app/features/projects/members/members.component.ts`, `src/app/features/projects/members/members.component.html`, `src/app/features/projects/members/members.component.spec.ts`

### 5. Remove Member with Confirmation (STORY-006)

- Confirmation dialog showing member name and explicit access revocation message.
- On success: close, growl, reload. On 403: inline error. On dismiss: no action.
- `aria-live="polite"` on error feedback.
- Unit tests.

Files: `src/app/features/projects/members/members.component.ts`, `src/app/features/projects/members/members.component.html`, `src/app/features/projects/members/members.component.spec.ts`

### 6. BUG-001: PROJECT_ADMIN not recognized as manager

- `/api/auth/me` returned `id` but frontend expected `userId`. `PermissionService` stored `undefined` as userId, so member list lookup always failed for non-SUPER_ADMIN users.
- Fixed by mapping `id` → `userId` in the response.
- Added e2e Playwright tests (26 tests) covering the full membership workflow: page rendering, add/change/remove dialogs, API operations, role-based access.

Files: `mock/app/routes/auth_routes.js`, `mock/app/routes/auth_routes.test.js`, `e2e/project-membership.spec.ts`, `e2e/helpers/auth.ts`

### 7. BUG-002: "Created by" shows "Loading…" on project dashboard

- `GET /api/users/:userId` queried `find({ userId: ... })` but the DB uses `id`. Always returned `undefined`.
- Fixed to `find({ id: ... })`, added 404 handling, stripped password from response.

Files: `mock/app/routes/user_routes.js`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/10-Project_membership/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest), e2e tests (Playwright) for the full workflow.
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

- **Upsert pattern (PUT)**: One endpoint handles both add and update. The frontend distinguishes visually (Add dialog vs Change Role dialog) but the backend treats both the same. Simplifies API surface and avoids race conditions.
- **Candidate search server-side**: `GET .../candidates?q=` excludes existing members server-side to avoid duplicates in the UI. Min 2 chars, max 10 results, case-insensitive.
- **Dual SUPER_ADMIN protection**: Backend returns 403 if a PROJECT_ADMIN tries to mutate a SUPER_ADMIN membership. UI disables buttons via `[euiDisabled]` for the same case. Defense in depth.
- **Manager determination in component**: Rather than a separate service, `isManager` is computed locally in `MembersComponent` using `PermissionService.isSuperAdmin()` + member list lookup. STORY-007 was folded into STORY-003 since the logic is trivial.
- **Members page replaces dashboard section**: The members table was moved from the Dashboard to a dedicated Members page. Dashboard keeps project metadata only. Cleaner separation of concerns.
- **e2e test structure**: UI tests (page fixture) run before API-only tests (request fixture) to prevent browser session corruption. `apiLogin` helper includes retry logic (3 attempts, 300ms delay) for intermittent empty responses from the mock server. `beforeEach` delays prevent json-server write contention.
- **`eui-dialog` accept label timing**: Dialog captures `[acceptLabel]` at overlay creation time. Properties set before `openDialog()` with `cdr.detectChanges()` to ensure correct label.
- **`eui-icon-button` patterns**: Uses `[euiDisabled]` (not `[disabled]`), `[ariaLabel]` input, `(buttonClick)` output. Icons use `icon="eui-edit"` / `icon="eui-trash"` format.

## Git history

```
5cb7403 feat(membership): add PUT upsert, DELETE remove, GET candidates endpoints
9bc68e4 feat(membership): add frontend models, service methods, and tests
797e39b feat(membership): add Members page with table, route & sidebar entry (STORY-003)
c8d2ec5 feat(members): implement STORY-004 add member dialog & STORY-005 change role dialog
6303b9d feat(members): implement STORY-006 remove member with confirmation dialog
0759f63 fix(membership): BUG-001 PROJECT_ADMIN not recognized as manager + e2e tests
c7bd261 fix(api): GET /api/users/:userId was querying wrong field
5b9cb47 docs: add BUG-002 CreatedBy Loading documentation
```

## Test summary

- Frontend: 306 unit tests (vitest) — all passing
- Backend: 154 integration tests (Jest + supertest) — all passing
- E2E: 26 Playwright tests — all passing
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full project membership management feature on a fresh eUI Angular project that already has authentication, RBAC, admin user management, project navigation (shell, dashboard, sidebar), project creation with key management, and an enhanced portfolio with async table, status filter, and edit dialog. Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> I have an eUI Angular 21 application with authentication, RBAC, admin user management, project navigation (shell, dashboard, sidebar), project creation with key management, and an enhanced portfolio (async table, status filter, edit dialog). The mock backend has `GET /api/projects/:projectId/members` (returns members enriched with user details), `requireProjectRole` middleware (SUPER_ADMIN bypass), `GET /api/users` (all users). The frontend has `DashboardComponent` with a read-only members table, `ProjectService` with `getProjectMembers()` and `getUser()`, `PermissionService` with `isSuperAdmin()`. Project roles: PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER, VIEWER. Seed data: 15 projects, 46 project-member records. I need full project membership management: add, change role, and remove members. Work story by story, in order. For each story, first create an analysis `.md` file, wait for my approval, then implement with tests.
>
> **STORY-001: Backend — Membership Mutation Endpoints**
>
> Add three endpoints to `mock/app/routes/project_routes.js`, all protected by `authMiddleware` + `requireProjectRole(db, 'PROJECT_ADMIN')` (SUPER_ADMIN bypasses via middleware):
>
> 1. `PUT /api/projects/:projectId/members` — Upsert member. Body: `{ userId: string, role: string }`. Validate: userId must be an active existing user, role must be one of PROJECT_ADMIN/PRODUCT_OWNER/DEVELOPER/REPORTER/VIEWER. SUPER_ADMIN protection: PROJECT_ADMIN cannot mutate a SUPER_ADMIN's membership (403). Existing member → update role (200). New member → create with `joined_at = new Date().toISOString()` (201). Response: enriched member (same format as GET members — include firstName, lastName, email from user record).
>
> 2. `DELETE /api/projects/:projectId/members/:userId` — Remove member. Validate: membership must exist (404). SUPER_ADMIN protection: PROJECT_ADMIN cannot remove a SUPER_ADMIN (403). Returns 204 no content.
>
> 3. `GET /api/projects/:projectId/members/candidates?q=search` — Search candidates. Returns active users matching search term (case-insensitive on firstName, lastName, email, min 2 chars), excluding existing project members. Response: `{ id, firstName, lastName, email, role }[]` (max 10 results).
>
> Add ~27 integration tests (Jest + supertest) covering: upsert create/update, validation errors, SUPER_ADMIN protection, delete success/404/protection, candidate search filtering/exclusion/min-chars.
>
> **STORY-002: Frontend — MembershipService and Models**
>
> Update `src/app/core/project/project.models.ts`:
> - Add `UpsertMemberPayload`: `{ userId: string, role: string }`.
> - Add `MemberCandidate`: `{ id: string, firstName: string, lastName: string, email: string, role: string }`.
> - Add `PROJECT_ROLES` constant: `['PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER', 'VIEWER']` and `ProjectRole` type.
>
> Update `src/app/core/project/project.service.ts`:
> - `upsertMember(projectId: string, payload: UpsertMemberPayload): Observable<ProjectMember>` — PUT.
> - `removeMember(projectId: string, userId: string): Observable<void>` — DELETE.
> - `searchCandidates(projectId: string, query: string): Observable<MemberCandidate[]>` — GET.
>
> Update barrel export. ~9 unit tests.
>
> **STORY-003: Frontend — Members Page (table + route + sidebar)**
>
> Create `MembersComponent` (standalone, OnPush) at `src/app/features/projects/members/`. Use `eui-page` > `eui-page-header` > `eui-page-content` structure. `eui-table` displaying Name (firstName + lastName), Email, Role (`eui-chip`). Actions column with edit (`eui-icon-button icon="eui-edit"`) and remove (`eui-icon-button icon="eui-trash"`) buttons — visible only to managers. "Add Member" button in `<eui-page-header-action-items>` for managers.
>
> Manager determination: `isSuperAdmin()` → true, else check if current user has PROJECT_ADMIN role in the member list. This integrates STORY-007.
>
> Register `/members` child route under project shell in `projects.routes.ts`. Add "Members" sidebar entry between Dashboard and Backlog in `shell.component.ts`. Remove members section from `DashboardComponent`.
>
> Accessibility: `aria-label` on table (not `<caption>` — eui-table strips it), `scope="col"` on headers, `data-col-label` on cells, `[ariaLabel]` on icon buttons with member name.
>
> `eui-icon-button` uses `[euiDisabled]` not `[disabled]`, `[ariaLabel]` input, `(buttonClick)` output.
>
> ~15 unit tests. `OnPush` + `cdr.markForCheck()` in async callbacks.
>
> **STORY-004: Frontend — Add Member Dialog**
>
> Update `MembersComponent` with inline `eui-dialog #addDialog`:
> - Candidate search: `input[euiInputText]` with 300ms debounce (`Subject` + `debounceTime`). Min 2 chars triggers `searchCandidates()`. Results displayed as clickable listbox items.
> - `selectCandidate(candidate)`: stores selected candidate, clears search results.
> - Role selection: `select[euiSelect]` with `PROJECT_ROLES` options.
> - On accept: call `upsertMember()`. Success → close dialog, growl success, reload members. Error → inline `eui-feedback-message`.
> - Reset form on close/dismiss.
> - Accessibility: `label[euiLabel]` with `for`/`id` pairs, `aria-required`, listbox role, keyboard navigation.
>
> **STORY-005: Frontend — Change Role Dialog**
>
> Update `MembersComponent` with inline `eui-dialog #changeRoleDialog`:
> - `openChangeRoleDialog(member)`: store member, pre-fill `newRole` with current role, open dialog.
> - Dialog shows member name, `select[euiSelect]` with `PROJECT_ROLES`.
> - On accept: call `upsertMember()`. Success → close, growl, reload. Error 403 → inline message. Other error → growl.
> - Reset on close/dismiss.
> - `[euiDisabled]` on edit button when member is SUPER_ADMIN and current user is not SUPER_ADMIN.
>
> **STORY-006: Frontend — Remove Member with Confirmation**
>
> Update `MembersComponent` with inline `eui-dialog #removeDialog`:
> - `openRemoveDialog(member)`: store member, open dialog.
> - Confirmation message: "Are you sure you want to remove {name} from this project? They will lose all access."
> - On accept: call `removeMember()`. Success → close, growl, reload. Error 403 → inline message. Other error → growl.
> - Dismiss closes without action.
> - `[euiDisabled]` on remove button when member is SUPER_ADMIN and current user is not SUPER_ADMIN.
> - `aria-live="polite"` on error feedback.
>
> **Important constraints:**
> - Use eUI components first — check the eUI component library before using alternatives.
> - `eui-dialog` captures `[acceptLabel]` at overlay creation time. Set properties before `openDialog()` and force `cdr.detectChanges()`.
> - `eui-icon-button` uses `[euiDisabled]` not `[disabled]`. Icon names: `icon="eui-edit"`, `icon="eui-trash"` (NOT bare names).
> - `eui-table` strips `<caption>` — use `aria-label` on the table element instead.
> - Place action buttons in `<eui-page-header-action-items>` inside `<eui-page-header>` (not in `<eui-page-content>`).
> - `EuiGrowlService` uses `growlService.growl({ severity, summary, detail })`.
> - Use `OnPush` change detection + `cdr.markForCheck()` in async callbacks.
> - `FormsModule` needed for `ngModel` in dialogs.
> - Frontend tests use vitest. Run with `npm run test:ci`.
> - Mock server tests use Jest + supertest. Run with `npm run test:mock`. Restore DB: `git checkout mock/db/db.json`.
> - E2E tests use Playwright. Structure: UI tests (page fixture) before API-only tests (request fixture). Use retry logic in `apiLogin` helper for intermittent mock server issues. Add `beforeEach` delays in API test blocks to prevent json-server write contention.
> - Build: `npx ng build --configuration=development`.
> - Follow WCAG 2.2 AA: semantic HTML, `aria-label` on icon buttons, `aria-live="polite"` on dynamic content, `for`/`id` on form labels, no color-only information, `scope="col"` on table headers, `data-col-label` on table cells.