# 15 — Workflow Management

## What this branch does

Adds a full workflow management feature to the project settings page. Project admins and super admins can now select a ticket type (STORY, BUG, TASK, EPIC), view its workflow statuses and transitions, enter edit mode to add/remove statuses and toggle transitions via a checkbox matrix, and save changes with a confirmation dialog. Non-admin roles see a read-only view with an info banner. Also enables Angular `strictTemplates` and adds the backend PUT endpoint for workflow updates with comprehensive validation.

## Step-by-step walkthrough

### 1. Workflow management stories and strictTemplates (docs + config)

- Created 6 story analysis files and a stories overview under `.analysis/15-Workflow_mgmt/`.
- Enabled `strictTemplates`, `strictInjectionParameters`, and `strictInputAccessModifiers` in `tsconfig.json`.

Files: `.analysis/15-Workflow_mgmt/`, `tsconfig.json`

### 2. PUT workflow update endpoint (STORY-001)

- Added `PUT /api/projects/:projectId/workflows/:workflowId` in `mock/app/routes/project_routes.js`.
- Validates status format (uppercase, alphanumeric+underscore, max 30 chars), no duplicates, transition integrity (keys/targets match statuses, no self-transitions, all statuses have keys).
- Returns 409 when removing statuses used by existing tickets.
- 19 integration tests covering all validation paths.

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`

### 3. Frontend service & models (STORY-002)

- Added `UpdateWorkflowPayload` interface and `updated_at` field to `Workflow` model.
- Added `updateWorkflow()` method to `ProjectService`.
- 2 unit tests (PUT with payload, 409 conflict propagation).

Files: `src/app/core/project/project.models.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/project.service.spec.ts`, `src/app/core/project/index.ts`

### 4. Workflow editor page with toggle selector (STORY-003)

- Refactored `SettingsComponent` from flat read-only list to toggle-group-based workflow editor.
- `eui-toggle-group` for ticket type selection (with `width: auto` override per eUI pitfalls).
- Edit/Save/Cancel flow with `updateWorkflow()` API call, growl notifications, and 409 conflict handling.
- Auto-selects first workflow on load.

Files: `src/app/features/projects/settings/settings.component.ts`, `settings.component.html`, `settings.component.scss`

### 5. Add/remove status UI (STORY-004)

- In edit mode, statuses shown as badges with `eui-icon-button` remove buttons (`[euiDisabled]` when only 1 status).
- Add status input with `euiInputText` directive, inline validation (format regex, duplicate check, auto-uppercase).
- Removing a status cleans up its transitions automatically.

Files: `settings.component.ts`, `settings.component.html`

### 6. Transition editor matrix (STORY-005)

- Checkbox matrix using `euiInputCheckBox` — rows = source statuses, columns = targets.
- Self-transition cells show "—" dash (not a disabled checkbox, to avoid a11y issues).
- `hasTransition()` and `toggleTransition()` methods for state management.

Files: `settings.component.ts`, `settings.component.html`, `settings.component.scss`

### 7. Role gating & confirmation dialog (STORY-006)

- `determineCanManage()` checks SUPER_ADMIN or PROJECT_ADMIN role via `PermissionService`.
- Edit button hidden for non-managers; read-only `eui-feedback-message` banner shown instead.
- `eui-dialog` confirmation before save with explicit `closeDialog()` before async API call.

Files: `settings.component.ts`, `settings.component.html`

### 8. Bugfixes

- Added missing `euiInputText` directive on status input (was rendering as read-only).
- Replaced bare `<input type="checkbox">` with `euiInputCheckBox` in transition matrix.
- Changed `<div role="group">` to semantic `<fieldset>` for toggle group wrapper.
- Removed `aria-hidden` from focusable disabled checkbox (replaced with "—" text).
- Fixed confirmation dialog not closing on save (explicit `closeDialog()` before async call).

Files: `settings.component.ts`, `settings.component.html`, `settings.component.scss`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/15-Workflow_mgmt/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story (stories 003–006 combined since they modify the same files).

## Key technical decisions

- **Toggle group instead of tabs**: `eui-toggle-group` provides a compact selector for 4 ticket types without the overhead of a full tab component. Required `width: auto` override per eUI pitfalls.
- **Checkbox matrix for transitions**: More intuitive than per-row multi-select for small status counts (3–6). Uses `euiInputCheckBox` for consistent eUI styling.
- **Self-transition cells as "—" text**: A disabled checkbox with `aria-hidden="true"` on a focusable element triggers a11y warnings. A simple dash is cleaner and avoids the issue.
- **Explicit dialog close before save**: `eui-dialog` with `[isHandleCloseOnAccept]` didn't reliably close when the accept handler triggers an async HTTP call. Calling `closeDialog()` explicitly before the save is the safer pattern.
- **Combined commit for stories 003–006**: All four stories modify the same `SettingsComponent` files, making separate commits impractical without artificial intermediate states.
- **Client-side + server-side validation**: Status format and uniqueness validated on the client for instant feedback; backend validates again and adds 409 conflict check for statuses in use by tickets.

## Git history

```
afe3f45 fix(015): close confirmation dialog before saving workflow
463fec4 fix(015): use euiInputCheckBox for transition matrix, fieldset for toggle group, remove aria-hidden on focusable
a2b72ee fix(015): add euiInputText directive to status input field
8907f77 feat(015): STORY-003/004/005/006 — workflow editor with toggle selector, add/remove status, transition matrix, role gating & confirmation dialog
02390ff feat(015): STORY-002 — UpdateWorkflowPayload model, updateWorkflow() service method, and unit tests
7e8c604 feat(015): STORY-001 — PUT workflow update endpoint with validation and 19 integration tests
7714f80 docs(015): add workflow management stories and enable Angular strictTemplates
```

## Test summary

- Frontend: 468 unit tests (vitest) — all passing
- Backend: 19 new integration tests (Jest + supertest) for PUT workflow endpoint — all passing
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full workflow management feature on a fresh eUI Angular project that already has: project CRUD, project membership with roles (SUPER_ADMIN, PROJECT_ADMIN, DEVELOPER, etc.), a mock Express/json-server backend with workflows seeded per project, a `PermissionService` with `isSuperAdmin()` and `hasProjectRole()`, a `ProjectService` with `getWorkflows()`, and a `SettingsComponent` at `:projectId/settings` showing read-only workflows.

---

**Prompt:**

> Implement a workflow management feature that lets authorized users edit workflow statuses and transitions per ticket type.
>
> **Backend (mock server):**
> 1. Add `PUT /api/projects/:projectId/workflows/:workflowId` endpoint accepting `{ statuses: string[], transitions: Record<string, string[]> }`.
> 2. Validate: status format `/^[A-Z][A-Z0-9_]{0,29}$/`, no duplicates, transition keys match statuses, no self-transitions, all statuses have transition keys.
> 3. Return 409 if removing a status that existing tickets use.
> 4. Write 19+ integration tests (Jest + supertest).
>
> **Frontend service:**
> 1. Add `UpdateWorkflowPayload` interface and `updateWorkflow(projectId, workflowId, payload)` to `ProjectService`.
>
> **Frontend UI (refactor SettingsComponent):**
> 1. Replace flat workflow list with `eui-toggle-group` selector for ticket types (STORY/BUG/TASK/EPIC). Override `width: auto` on toggle group.
> 2. Auto-select first workflow on load. Show selected workflow's statuses and transitions.
> 3. Add Edit button in `eui-page-header-action-items` (never in page content). Gate with `canManage` (SUPER_ADMIN or PROJECT_ADMIN).
> 4. Edit mode: show editable status list with `eui-icon-button` remove buttons (`[euiDisabled]` when ≤1 status). Add status input with `euiInputText`, validate format/uniqueness, auto-uppercase.
> 5. Edit mode: checkbox matrix for transitions using `euiInputCheckBox`. Rows=source, columns=target. Self-transition cells show "—" text (not disabled checkbox). Each checkbox has `aria-label`.
> 6. Save flow: show `eui-dialog` confirmation, call `closeDialog()` explicitly before async save, then call `updateWorkflow()`. Show growl on success/error/409.
> 7. Cancel reverts to persisted state.
> 8. Non-managers see `eui-feedback-message` read-only banner, no Edit button.
> 9. Use `<fieldset>` with `<legend>` for toggle group wrapper (not `<div role="group">`).
> 10. Add i18n keys for EN and FR under `workflow-mgmt.*` namespace.
> 11. Write ~25 unit tests covering selection, edit mode, add/remove status, transitions, role gating, save/cancel, growl.
> 12. All tests pass (`npm run test:ci`), build passes (`npx ng build --configuration=development`).
>
> **eUI gotchas to follow:**
> - Action buttons in `eui-page-header-action-items`, not page content
> - `eui-toggle-group` needs `::ng-deep { width: auto }` override
> - `eui-icon-button` uses `[euiDisabled]` not `[disabled]`
> - Icon names: `eui-close`, `eui-arrow-right` (never bare names)
> - All form inputs must use eUI directives (`euiInputText`, `euiInputCheckBox`)
> - Dialog `closeDialog()` before async operations
> - Tables need `<caption>`, `scope="col"`, `data-col-label`
