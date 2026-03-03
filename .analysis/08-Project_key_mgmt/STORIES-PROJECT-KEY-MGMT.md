# FEATURE-008 Project Key Management — Story Breakdown

## Context

This feature adds project creation with stable key management to the TaskForge-eUI-v2 app. Only `SUPER_ADMIN` users can create projects. Each project gets a unique key (auto-generated or manually entered) that is immutable after creation.

The app currently has:
- Backend: `GET /api/projects`, `GET /api/projects/:projectId`, `GET /api/projects/:projectId/members` — all protected by auth middleware. No create endpoint.
- Frontend: `ProjectService` with `getProjects()`, `getProject()`, `getProjectMembers()`. `PortfolioComponent` lists projects in a table. No create flow.
- Seed data: 3 projects (TF, DEMO, INFRA) with keys already assigned.
- `PermissionService` with `isSuperAdmin()`, `hasGlobalRole()`, `getGlobalRole()`.
- `EuiDialogComponent` pattern already used in admin users feature for create/edit dialogs.

## eUI Components Used

| Component | Import | Purpose |
|-----------|--------|---------|
| `eui-dialog` | `EUI_DIALOG` from `@eui/components/eui-dialog` | Create project dialog |
| `input[euiInputText]` | `EuiInputTextComponent` from `@eui/components/eui-input-text` | Name, key, description inputs |
| `textarea[euiTextArea]` | `EuiTextareaComponent` from `@eui/components/eui-textarea` | Description field |
| `label[euiLabel]` | `EuiLabelComponent` from `@eui/components/eui-label` | Form labels |
| `button[euiButton]` | `EUI_BUTTON` from `@eui/components/eui-button` | Create button on portfolio page |
| `eui-feedback-message` | from `@eui/components/eui-feedback-message` | Inline validation errors |
| `EuiGrowlService` | from `@eui/core` | Success/error notifications |

---

## Execution Order

Stories must be implemented in this exact order. Each story depends on the previous one.

---

## STORY-001: Backend — Create Project Endpoint

### Goal
Add a `POST /api/projects` endpoint to the mock server that creates a new project with key generation, uniqueness validation, and SUPER_ADMIN authorization.

### Backend

1. Update `mock/app/routes/project_routes.js`:
   - `POST /api/projects`
     - Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`
     - Request body: `{ name: string, description?: string, key?: string }`
     - Validation:
       - `name` is required, non-empty, trimmed
       - `name` must be unique (case-insensitive) among all projects
       - If `key` is provided: uppercase, 2–10 alphanumeric chars, must be unique (case-insensitive)
       - If `key` is omitted: auto-generate from name (first letters of words, uppercase, max 5 chars, append digit if collision)
     - On success: create project record with `id` (auto-increment), `key`, `name`, `description`, `created_by` (from `req.user.userId`), `created_at`, `updated_at`, `is_active: true`
     - Return `201` with the created project object
     - Return `400` for validation errors (missing name, invalid key format)
     - Return `409` for uniqueness conflicts (name or key already exists)
     - Return `403` if not SUPER_ADMIN

2. Key auto-generation algorithm:
   - Split name by spaces, take first letter of each word, uppercase
   - If result is < 2 chars, pad with first letters of the name
   - Truncate to 5 chars
   - If collision, append incrementing digit (e.g. `TF` → `TF1` → `TF2`)

3. Add integration tests in `mock/app/routes/project_routes.test.js`:
   - 201: create with manual key
   - 201: create with auto-generated key
   - 201: auto-key collision appends digit
   - 400: missing name
   - 400: invalid key format (too short, too long, special chars)
   - 409: duplicate name
   - 409: duplicate key
   - 403: non-SUPER_ADMIN user

### Acceptance Criteria
- [ ] SUPER_ADMIN can create a project with manual key
- [ ] SUPER_ADMIN can create a project with auto-generated key
- [ ] Non-SUPER_ADMIN gets 403
- [ ] Duplicate name returns 409
- [ ] Duplicate key returns 409
- [ ] Invalid key format returns 400
- [ ] Auto-generated key handles collisions
- [ ] Integration tests cover all branches

---

## STORY-002: Frontend — Project Service Create Method

### Goal
Add a `createProject()` method to the existing `ProjectService` to call the new backend endpoint.

### Frontend

1. Update `src/app/core/project/project.models.ts`:
   - Add `CreateProjectPayload` interface: `{ name: string, description?: string, key?: string }`

2. Update `src/app/core/project/project.service.ts`:
   - Add `createProject(payload: CreateProjectPayload): Observable<Project>`
     - Calls `POST /api/projects` with the payload

3. Export `CreateProjectPayload` from `src/app/core/project/index.ts`.

4. Add unit tests in `src/app/core/project/project.service.spec.ts`:
   - Sends POST to `/api/projects` with correct body
   - Returns typed `Project` observable

### Acceptance Criteria
- [ ] `createProject()` sends POST with correct payload
- [ ] Returns typed `Observable<Project>`
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-003: Frontend — Create Project Dialog

### Goal
Create a dialog component for the project creation form. The dialog is opened from the portfolio page and contains fields for name, description, and optional key.

### Frontend

1. Create `src/app/features/projects/create-project-dialog/create-project-dialog.component.ts`:
   - Template-driven or reactive form with fields:
     - Name (required, `input[euiInputText]`)
     - Key (optional, `input[euiInputText]`, uppercase, 2–10 alphanumeric, with helper text explaining auto-generation)
     - Description (optional, `textarea[euiTextArea]`)
   - Client-side validation:
     - Name: required, min 2 chars
     - Key: if provided, must match `^[A-Z0-9]{2,10}$` (auto-uppercase on input)
   - On submit: call `projectService.createProject(payload)`
   - On success: close dialog, emit created project, show growl success
   - On 409 error: show inline error ("Project name already exists" or "Project key already exists")
   - On other error: show growl error
   - Dialog uses `eui-dialog` with `#dialog` template ref pattern
   - Accept button label: "Create"
   - Dismiss button label: "Cancel"

2. Create corresponding HTML template and SCSS.

3. Accessibility:
   - All inputs have associated `label[euiLabel]` with `for`/`id` pairs
   - Required fields use `aria-required="true"`
   - Validation errors use `aria-describedby` pointing to error message elements
   - Key field has `eui-helper-text` explaining: "Leave empty to auto-generate from name"
   - Dialog has focus trap (built-in with `eui-dialog`)

4. Unit tests:
   - Form validation (required name, key format)
   - Successful creation closes dialog and emits project
   - 409 error shows inline message
   - Other errors show growl

### Acceptance Criteria
- [ ] Dialog opens with empty form
- [ ] Name is required, key is optional
- [ ] Key auto-uppercases on input
- [ ] Key validates format (2–10 alphanumeric)
- [ ] Successful create closes dialog and shows success growl
- [ ] 409 conflict shows inline error message
- [ ] Other errors show growl error
- [ ] All inputs have associated labels
- [ ] Required fields have `aria-required`
- [ ] Validation errors announced via `aria-describedby`
- [ ] Keyboard navigable (Tab, Enter, Escape)
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-004: Frontend — Portfolio Create Button & Navigation

### Goal
Add a "Create Project" button to the portfolio page (visible only to SUPER_ADMIN), wire it to the create dialog, and navigate into the new project after creation.

### Frontend

1. Update `src/app/features/projects/portfolio/portfolio.component.ts`:
   - Inject `PermissionService`
   - Expose `isSuperAdmin` flag for template
   - Add `openCreateDialog()` method that opens the create project dialog
   - On dialog success (project created):
     - Reload the project list
     - Navigate to the new project: `router.navigate(['screen/projects', newProject.id])`

2. Update `src/app/features/projects/portfolio/portfolio.component.html`:
   - Add "Create Project" button in the page header actions area (only if `isSuperAdmin`)
   - Include the `<app-create-project-dialog>` component

3. Import `CreateProjectDialogComponent` in portfolio component imports.

4. Unit tests:
   - Button visible when user is SUPER_ADMIN
   - Button hidden when user is not SUPER_ADMIN
   - Dialog opens on button click
   - After creation, navigates to new project

### Acceptance Criteria
- [ ] "Create Project" button visible only to SUPER_ADMIN
- [ ] Button opens the create project dialog
- [ ] After successful creation, project list reloads
- [ ] After successful creation, navigates to new project
- [ ] Non-SUPER_ADMIN users see no create button
- [ ] Unit tests pass
- [ ] Build passes

---

## STORY-005: Backend — Key Immutability on Update

### Goal
Add a `PATCH /api/projects/:projectId` endpoint that allows updating project name and description but rejects any attempt to change the key.

### Backend

1. Update `mock/app/routes/project_routes.js`:
   - `PATCH /api/projects/:projectId`
     - Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`
     - Request body: `{ name?: string, description?: string, key?: string }`
     - If `key` is present in body and differs from current key: return `400 { message: 'Project key cannot be changed' }`
     - If `name` is provided: validate uniqueness (case-insensitive, excluding current project)
     - Update allowed fields (`name`, `description`, `updated_at`)
     - Return `200` with updated project
     - Return `404` if project not found

2. Integration tests:
   - 200: update name and description
   - 400: attempt to change key
   - 409: duplicate name on update
   - 404: non-existent project
   - 403: non-SUPER_ADMIN

### Acceptance Criteria
- [ ] Name and description can be updated
- [ ] Key change attempt returns 400
- [ ] Duplicate name on update returns 409
- [ ] Non-existent project returns 404
- [ ] Non-SUPER_ADMIN gets 403
- [ ] Integration tests cover all branches

---

## Dependency Graph

```
STORY-001 (Backend — Create endpoint)
    └── STORY-002 (Frontend — Service method)
            └── STORY-003 (Frontend — Create dialog)
                    └── STORY-004 (Frontend — Portfolio button & navigation)

STORY-001 (Backend — Create endpoint)
    └── STORY-005 (Backend — Key immutability on update)
```

STORY-005 can be implemented in parallel with STORY-002–004 since it only depends on STORY-001.

## Technical Notes

- The key auto-generation algorithm lives entirely in the mock server. The frontend does not generate keys — it either sends a user-provided key or omits the field to let the backend generate one.
- Key format: uppercase alphanumeric, 2–10 characters. This matches the existing seed data pattern (TF, DEMO, INFRA).
- The `eui-dialog` template ref pattern (`#dialog`) is used rather than `EuiDialogService` to keep the dialog co-located with its parent component. This matches the pattern used in the admin users feature.
- The create button placement follows the eUI `eui-page-header` actions slot pattern.
- After project creation, the user is navigated into the new project. This triggers the existing `ProjectShellComponent` which calls `projectContextService.setProject()`, so the sidebar and breadcrumbs update automatically.
- Key immutability is enforced at the API level (STORY-005). The frontend create dialog does not need an edit mode for keys — the key field simply won't appear in any future edit form.
