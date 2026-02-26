# FEATURE-010 Project Membership — Story Breakdown

## Context

This feature allows authorized managers (SUPER_ADMIN and PROJECT_ADMIN) to manage project members: add, change role, and remove members. Non-manager users can view members (already implemented in the Dashboard) but cannot modify them.

The application currently has:
- Backend: `GET /api/projects/:projectId/members` (returns members enriched with user details), `requireProjectRole` middleware (SUPER_ADMIN bypass), `requireGlobalRole` middleware. No mutation endpoints (add/update/remove).
- Backend: `GET /api/users` (returns all users, basic, no pagination/search).
- Frontend: `DashboardComponent` displays a read-only members table (Name, Email, Role). `ProjectService` has `getProjectMembers()`, `getUser()`. Existing `ProjectMember` interface.
- Project routes: `projects.routes.ts` has `/:projectId` shell with Dashboard child. Sidebar shows Dashboard, Backlog, Board, Settings in project context.
- Managed project roles: `PROJECT_ADMIN`, `PRODUCT_OWNER`, `DEVELOPER`, `REPORTER`, `VIEWER`.
- Seed data: 14 projects, 46 project-member records.
- `PermissionService` with `isSuperAdmin()`, `hasGlobalRole()`, `getGlobalRole()`.

## eUI Components Used

| Component | Import | Usage |
|-----------|--------|-------|
| `eui-table` | `EUI_TABLE` from `@eui/components/eui-table` | Members table |
| `eui-dialog` | `EuiDialogComponent` from `@eui/components/eui-dialog` | Add/change/remove dialogs |
| `eui-chip` | `EUI_CHIP` from `@eui/components/eui-chip` | Role badge |
| `eui-icon-button` | from `@eui/components/eui-icon-button` | Per-row action buttons |
| `eui-page` | `EUI_PAGE` from `@eui/components/eui-page` | Members page structure |
| `input[euiInputText]` | `EuiInputTextComponent` from `@eui/components/eui-input-text` | Candidate search field |
| `select[euiSelect]` | from `@eui/components/eui-select` | Role selection |
| `label[euiLabel]` | from `@eui/components/eui-label` | Form labels |
| `eui-feedback-message` | from `@eui/components/eui-feedback-message` | Inline errors |
| `EuiGrowlService` | from `@eui/core` | Success/error notifications |

---

## Execution Order

Stories must be implemented in this exact order. Each story depends on the previous one unless stated otherwise.

---

## STORY-001: Backend — Membership Mutation Endpoints

### Objective
Create endpoints to add/change a member (upsert), remove a member, and search for candidates. Access restricted to managers (SUPER_ADMIN + PROJECT_ADMIN).

### Backend

1. Modify `mock/app/routes/project_routes.js` — add 3 endpoints:

   **PUT /api/projects/:projectId/members** (upsert)
   - Auth: `authMiddleware` + `requireProjectRole(db, 'PROJECT_ADMIN')` (SUPER_ADMIN bypass via middleware).
   - Body: `{ userId: string, role: string }`.
   - Validation: userId required (active user), role required (valid enum), cannot mutate SUPER_ADMIN membership unless requester is SUPER_ADMIN.
   - Upsert behavior: existing member → update role (200), new member → create with `joined_at = now()` (201).
   - Response: enriched member (same format as GET members).

   **DELETE /api/projects/:projectId/members/:userId**
   - Auth: `authMiddleware` + `requireProjectRole(db, 'PROJECT_ADMIN')`.
   - Validation: membership must exist (404 otherwise), cannot remove SUPER_ADMIN (unless requester is SUPER_ADMIN).
   - Returns 204 (no content).

   **GET /api/projects/:projectId/members/candidates?q=search**
   - Auth: `authMiddleware` + `requireProjectRole(db, 'PROJECT_ADMIN')`.
   - Returns active users matching search term (case-insensitive, min 2 chars), excluding existing members.
   - Response: `{ id, firstName, lastName, email, role }[]` (max 10 results).

2. Integration tests in `project_routes.test.js` (~27 tests).

### Acceptance Criteria
- [ ] PUT upsert creates new member (201) or updates role (200)
- [ ] PUT validates userId (active existing user) and role (valid enum)
- [ ] PUT prevents PROJECT_ADMIN from mutating SUPER_ADMIN membership
- [ ] DELETE removes membership (204), returns 404 if not found
- [ ] DELETE prevents PROJECT_ADMIN from removing SUPER_ADMIN membership
- [ ] GET candidates returns active non-member users matching search
- [ ] GET candidates excludes existing project members
- [ ] GET candidates returns max 10 results
- [ ] Only SUPER_ADMIN and PROJECT_ADMIN have access to all 3 endpoints
- [ ] Integration tests cover all cases

---

## STORY-002: Frontend — MembershipService and Models

### Objective
Create the frontend service to communicate with the new membership mutation endpoints.

### Frontend

1. Update `src/app/core/project/project.models.ts`:
   - Add `UpsertMemberPayload`: `{ userId: string, role: string }`.
   - Add `MemberCandidate`: `{ id: string, firstName: string, lastName: string, email: string, role: string }`.
   - Add `PROJECT_ROLES` constant and `ProjectRole` type.

2. Update `src/app/core/project/project.service.ts` — add 3 methods:
   - `upsertMember(projectId, payload): Observable<ProjectMember>`.
   - `removeMember(projectId, userId): Observable<void>`.
   - `searchCandidates(projectId, query): Observable<MemberCandidate[]>`.

3. Update barrel export (`index.ts`).
4. Unit tests (~9 tests).

### Acceptance Criteria
- [ ] `UpsertMemberPayload` and `MemberCandidate` interfaces created
- [ ] `PROJECT_ROLES` constant exported
- [ ] `upsertMember()` calls `PUT /api/projects/:projectId/members`
- [ ] `removeMember()` calls `DELETE /api/projects/:projectId/members/:userId`
- [ ] `searchCandidates()` calls `GET /api/projects/:projectId/members/candidates?q=...`
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-003: Frontend — Members Page (table + route)

### Objective
Create a dedicated Members page under the project shell, with a table listing members and their roles. Managers (SUPER_ADMIN, PROJECT_ADMIN) see action buttons. This page replaces the members section from the Dashboard.

### Frontend

1. Create `MembersComponent` (standalone, OnPush) with eui-table displaying Name, Email, Role (chip).
2. Add edit/remove icon buttons visible only to managers.
3. Add "Add Member" button in page header action items for managers.
4. Register `/members` child route under project shell.
5. Add "Members" entry in project-scoped sidebar between Dashboard and Backlog.
6. Strip members section from DashboardComponent.
7. Unit tests (~15 tests).

### Acceptance Criteria
- [ ] Page accessible via `/screen/projects/:projectId/members`
- [ ] Sidebar shows "Members" link
- [ ] Table displays Name, Email, Role for each member
- [ ] Actions column visible only for SUPER_ADMIN and PROJECT_ADMIN
- [ ] "Add Member" button in header for managers
- [ ] Members section removed from Dashboard
- [ ] Loading and error states functional
- [ ] Accessible markup (aria-label, scope, data-col-label)
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-004: Frontend — Add Member Dialog

### Objective
Allow managers to search for a candidate user and add them to the project with a selected role, via a dialog.

### Frontend

1. Update `MembersComponent`:
   - Add `@ViewChild('addDialog')`, candidate search properties, `onCandidateSearch()` with debounce 300ms, `selectCandidate()`, `openAddDialog()`, `onAddMember()`, `resetAddForm()`.
2. Add dialog template with candidate search input, results listbox, selected candidate display, role select, and error feedback.
3. Add imports: `FormsModule`, `EuiDialogComponent`, `EuiSelectComponent`, `EuiFeedbackMessageComponent`.
4. Unit tests.

### Acceptance Criteria
- [ ] Candidate search works (min 2 characters, debounce 300ms)
- [ ] Existing members excluded from results
- [ ] Selecting a candidate displays their name
- [ ] Role selection among 5 project roles
- [ ] Successful add: closes dialog, growl success, reloads members
- [ ] Error: inline message in dialog
- [ ] Form reset on close/dismiss
- [ ] Accessibility: labels, aria-required, listbox, keyboard navigation
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-005: Frontend — Change Role Dialog

### Objective
Allow managers to change an existing member's role via a confirmation dialog.

### Frontend

1. Update `MembersComponent`:
   - Add `@ViewChild('changeRoleDialog')`, `selectedMember`, `newRole`, `changeRoleError` properties.
   - `openChangeRoleDialog(member)`: store member, pre-fill `newRole` with current role, open dialog.
   - `onChangeRole()`: call `projectService.upsertMember()`. Success: close dialog, growl, reload. Error 403: inline message. Other error: growl error.
   - `resetChangeRoleForm()`: clear selection and error.
2. Add dialog template with member name, role select, error feedback.
3. Unit tests.

### Acceptance Criteria
- [ ] Dialog shows member name and current role pre-selected
- [ ] Selection among 5 project roles
- [ ] Successful change: closes dialog, growl success, reloads members
- [ ] Error 403 (SUPER_ADMIN protection): inline message
- [ ] Form reset on close/dismiss
- [ ] Accessibility: labels, aria-required
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-006: Frontend — Remove Member with Confirmation

### Objective
Allow managers to remove a member from the project with an explicit confirmation dialog.

### Frontend

1. Update `MembersComponent`:
   - Add `@ViewChild('removeDialog')`, `memberToRemove`, `removeError` properties.
   - `openRemoveDialog(member)`: store member, open dialog.
   - `onRemoveMember()`: call `projectService.removeMember()`. Success: close dialog, growl, reload. Error 403: inline message. Other error: growl error.
   - `resetRemoveForm()`: clear selection and error.
2. Add dialog template with confirmation message and error feedback.
3. Unit tests.

### Acceptance Criteria
- [ ] Confirmation dialog shows member name
- [ ] Explicit message about access revocation
- [ ] Successful removal: closes dialog, growl success, reloads members
- [ ] Error 403 (SUPER_ADMIN protection): inline message
- [ ] Dismiss closes dialog without action
- [ ] Accessibility: aria-live for errors
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-007: Frontend — Current Project Role Determination

### Objective
Allow the frontend to determine whether the current user is a project manager (PROJECT_ADMIN or SUPER_ADMIN) to conditionally display mutation actions.

### Note
This story was integrated directly into STORY-003 since the logic is simple (local check in the component using `PermissionService.isSuperAdmin()` and member list lookup).

### Acceptance Criteria
- [ ] `isManager` correctly determined based on global role and project role
- [ ] SUPER_ADMIN is always a manager
- [ ] PROJECT_ADMIN of the project is a manager
- [ ] Other roles are not managers
- [ ] Unit tests pass

---

## Dependency Graph

```
STORY-001 (Backend — Mutation endpoints)
    └── STORY-002 (Frontend — Service + models)
            └── STORY-003 (Frontend — Members page + route + sidebar)
                    ├── STORY-004 (Frontend — Add member dialog)
                    ├── STORY-005 (Frontend — Change role dialog)
                    └── STORY-006 (Frontend — Remove member dialog)

STORY-007 (Project role determination) — integrated into STORY-003
```

## Technical Notes

- The upsert pattern (PUT) simplifies logic: one endpoint for both add and update. The frontend visually distinguishes the two cases (Add dialog vs Change Role dialog) but the backend handles both the same way.
- Candidate search (`GET .../candidates?q=`) excludes existing members server-side to avoid duplicates in the UI.
- SUPER_ADMIN protection is dual: backend (403 if PROJECT_ADMIN tries to mutate a SUPER_ADMIN) and UI (buttons disabled via `[euiDisabled]`).
- `eui-dialog` captures `[acceptLabel]` at overlay creation time. For dialogs with dynamic labels, set the property before `openDialog()` and force `cdr.detectChanges()`.
- `eui-icon-button` uses `[euiDisabled]` not `[disabled]`.
- Icons use eUI format: `icon="eui-edit"`, `icon="eui-trash"`.
- "Add Member" button is placed in `<eui-page-header-action-items>` (not in `<eui-page-content>`).
- `eui-table` strips `<caption>` — use `aria-label` on the table element instead.
- Members section is removed from Dashboard in STORY-003 and replaced by a "Members" link in the sidebar.
- `FormsModule` is needed for `ngModel` in dialogs (candidate search, role selection).
- The Members component uses `OnPush` + `cdr.markForCheck()` in async callbacks.
