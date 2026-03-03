# 08-PROJECT-KEY-MGMT — Project Key Management Feature

## What this branch does

This branch adds project creation with stable key management to the TaskForge-eUI-v2 app. Only SUPER_ADMIN users can create projects via a dialog on the portfolio page. Each project gets a unique key (auto-generated or manually entered) that is immutable after creation. The branch also includes bugfixes for post-login state (username display, role display, sidebar permissions) and Playwright e2e test setup.

## Step-by-step walkthrough

### Bugfix: Superadmin Users menu missing after login

Root cause: `APP_INITIALIZER` runs before login, so `PermissionService` had default `'USER'` role. `AuthService.login()` stored the token but never re-initialized the app state. Fix: `LoginComponent.onSubmit()` now calls `appStarter.start()` after successful login, which re-runs the full init pipeline (fetch user profile, set permissions, update UserService, restore project context). Navigation happens only after `start()` completes.

Files: `src/app/features/login/login.component.ts`, `src/app/features/login/login.component.spec.ts`

### Bugfix: "Guest / USER" display after login

Same root cause as above. `AppStarterService.start()` runs during `APP_INITIALIZER` before login, so eUI `UserService` had "Guest" data. The `appStarter.start()` call after login fixes this too.

Files: `src/app/features/login/login.component.ts`

### Bugfix: Original role not displayed (showed mapped "USER" instead)

`PermissionService.setUser()` mapped all non-SUPER_ADMIN roles to `'USER'` for the global role, so Charlie Williams showed "USER" instead of "PRODUCT_OWNER". Added `originalRole` field and `getOriginalRole()` to `PermissionService`. Layout now uses `getOriginalRole()` for display.

Files: `src/app/core/auth/permission.service.ts`, `src/app/layout/layout.component.ts`

### STORY-001: Backend — Create Project Endpoint

Added `POST /api/projects` to the mock server:
- Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`.
- Request body: `{ name, description?, key? }`.
- Validates name (required, min 2 chars, unique case-insensitive).
- If key provided: validates format (2–10 uppercase alphanumeric, unique).
- If key omitted: auto-generates from name initials (first letter of each word, uppercase, max 5 chars, appends digit on collision).
- Returns 201 with created project, 400 for validation, 409 for conflicts, 403 for non-SUPER_ADMIN.
- `generateProjectKey()` helper function with collision handling.
- 12 integration tests (Jest + supertest).

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`

### STORY-002: Frontend — Project Service Create Method

Added `createProject(payload: CreateProjectPayload): Observable<Project>` to `ProjectService`:
- Calls `POST /api/projects` with the payload.
- `CreateProjectPayload` interface: `{ name: string, description?: string, key?: string }`.
- Exported from `src/app/core/project/index.ts`.
- Unit tests.

Files: `src/app/core/project/project.models.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/index.ts`, `src/app/core/project/project.service.spec.ts`

### STORY-003: Frontend — Create Project Dialog

Implemented the create project dialog inline in `PortfolioComponent` using the `eui-dialog` template-ref pattern (same as admin users):
- Reactive form with: name (required, min 2), key (optional, auto-uppercase, 2–10 alphanumeric via `keyFormatValidator`), description (optional).
- `onKeyInput()` handler auto-uppercases and strips non-alphanumeric characters.
- `onCreateProject()`: calls `projectService.createProject()`, on success closes dialog + growl + navigate to new project, on 409 shows inline error, on other errors shows growl.
- `resetCreateForm()` clears form and error on dismiss.
- `[isHandleCloseOnAccept]="true"` prevents auto-close — dialog closes manually after API success.
- Accessibility: `aria-haspopup="dialog"`, `aria-required`, `aria-describedby` for errors, `aria-live="polite"` on feedback messages, `euiLabel` with `for`/`id` pairs, `eui-helper-text` for key hint.
- 22 unit tests covering visibility, validation, create flow, error handling, form reset, key auto-uppercase.

Files: `src/app/features/projects/portfolio/portfolio.component.ts`, `src/app/features/projects/portfolio/portfolio.component.html`, `src/app/features/projects/portfolio/portfolio.component.spec.ts`

### STORY-004: Frontend — Portfolio Create Button & Navigation

Merged into STORY-003 since they're tightly coupled. The "Create Project" button is placed inside `<eui-page-header-action-items>` (matching the Users screen pattern), visible only to SUPER_ADMIN via `isSuperAdmin` flag from `PermissionService`. After successful creation, navigates to `screen/projects/:newProjectId`.

### STORY-005: Backend — Key Immutability on Update

Added `PATCH /api/projects/:projectId` to the mock server:
- Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`.
- If `key` is present and differs from current key → 400 `"Project key cannot be changed"`.
- If `key` matches current key → silently accepted.
- Validates name uniqueness (case-insensitive, excluding self) on update.
- Updates allowed fields: `name`, `description`, `updated_at`.
- Returns 200 with updated project, 400/404/409/403 as appropriate.
- 8 integration tests.

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`

### E2E Tests (Playwright)

Set up Playwright with Chromium for end-to-end testing:
- 13 tests covering all stories:
  - Create project with manual key, auto-generated key, 409 duplicate handling (UI flow).
  - Button visibility per role, form validation, key auto-uppercase, dialog dismiss reset (UI flow).
  - Key immutability PATCH: 400 on change, 200 on same key, 403/404 guards (API tests).
- Login helper with session cleanup between browser tests.
- `npm run test:e2e` script added.
- eUI dialog renders in CDK overlay — selectors use `[role="dialog"]`, `.eui-dialog__footer-accept-button`, `.eui-dialog__footer-dismiss-button`.

Files: `playwright.config.ts`, `e2e/project-key-mgmt.spec.ts`, `e2e/helpers/auth.ts`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/08-Project_key_mgmt/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest), e2e tests (Playwright).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

- **Dialog inline in PortfolioComponent**: Used the `eui-dialog` template-ref pattern (`#createDialog`) co-located with the parent component, matching the admin users pattern. No separate dialog component needed.
- **Key validation on frontend and backend**: Frontend validates format client-side for immediate feedback. Backend validates format + uniqueness as the source of truth.
- **Key auto-generation on backend only**: The frontend either sends a user-provided key or omits the field. The backend generates keys from name initials with collision handling.
- **Key immutability at API level**: PATCH endpoint rejects key changes with 400. No edit UI for keys — they simply won't appear in any future edit form.
- **eui-page-header-action-items**: Create button placed in the page header actions slot (right side of header bar), matching the Users screen pattern. Part of `EUI_PAGE` spread import.
- **OnPush + markForCheck()**: All components use `OnPush` change detection with `cdr.markForCheck()` in async callbacks.
- **Playwright for e2e**: Chose Playwright over Cypress for speed and modern API. CDK overlay selectors required using `[role="dialog"]` and `.eui-dialog__footer-*` classes instead of `eui-dialog` element selectors.

## Git history

```
af86a2b fix(login): re-run AppStarterService after login to fix Guest/USER display
b3cf919 fix(permission): display original role instead of mapped global role
6206ad1 feat(STORY-003): create project dialog with form validation
76a15b7 feat(STORY-005): PATCH /api/projects/:projectId with key immutability
58ffc25 test(e2e): add Playwright e2e tests for project key management
```

## Test summary

- Frontend: 226 unit tests (vitest) — all passing
- Backend: 114 integration tests (Jest + supertest) — all passing
- E2E: 13 Playwright tests — all passing
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full project key management feature on a fresh eUI Angular project that already has authentication, RBAC, admin user management, and project navigation implemented. Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> I have an eUI Angular 21 application with authentication, RBAC, admin user management, and project navigation already implemented. The mock backend has `GET /api/projects`, `GET /api/projects/:projectId`, and `GET /api/projects/:projectId/members` endpoints. There are seed projects with keys (TF, DEMO, INFRA) and project-member relationships. `PermissionService` has `isSuperAdmin()`, `hasGlobalRole()`, `getGlobalRole()`, `getOriginalRole()`. The portfolio page lists projects in an `eui-table`. I need you to implement project creation with key management. Work story by story, in order. For each story, first create an analysis `.md` file, wait for my approval, then implement with tests.
>
> **Bugfixes (do first if not already done):**
>
> 1. **Post-login state refresh** — After successful login in `LoginComponent.onSubmit()`, call `appStarter.start()` to re-run the full init pipeline (fetch user profile, set permissions, update eUI UserService, restore project context). Navigate only after `start()` completes. This fixes "Guest / USER" display and missing sidebar items after login.
>
> 2. **Original role display** — Add `originalRole` field and `getOriginalRole()` to `PermissionService`. Store the raw role from the API before mapping to global role. Use `getOriginalRole()` in the layout for display instead of the mapped role. This fixes "USER" showing instead of "PRODUCT_OWNER" etc.
>
> **Backend stories:**
>
> 3. **Create Project Endpoint (STORY-001)** — Add `POST /api/projects` to the mock server. Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`. Request body: `{ name: string, description?: string, key?: string }`. Validate name (required, min 2 chars, unique case-insensitive). If key provided: validate format (2–10 uppercase alphanumeric, unique case-insensitive). If key omitted: auto-generate from name initials (first letter of each word, uppercase, max 5 chars, append incrementing digit on collision). Return 201 with created project. Return 400 for validation, 409 for conflicts, 403 for non-SUPER_ADMIN. Add integration tests (Jest + supertest) covering: manual key, auto-generated key, collision handling, missing name, invalid key format, duplicate name, duplicate key, non-SUPER_ADMIN.
>
> **Frontend stories:**
>
> 4. **Project Service Create Method (STORY-002)** — Add `createProject(payload: CreateProjectPayload): Observable<Project>` to `ProjectService`. Define `CreateProjectPayload` interface: `{ name: string, description?: string, key?: string }`. Export from barrel. Add unit tests.
>
> 5. **Create Project Dialog (STORY-003 + STORY-004 merged)** — Implement the create project dialog inline in `PortfolioComponent` using the `eui-dialog` template-ref pattern (`#createDialog`). Reactive form with: name (required, min 2, `input[euiInputText]`), key (optional, auto-uppercase on input, 2–10 alphanumeric via custom `keyFormatValidator`, `input[euiInputText]` with `eui-helper-text`), description (optional, `textarea[euiTextArea]`). Place "Create Project" button inside `<eui-page-header-action-items>` within `<eui-page-header>` (visible only to SUPER_ADMIN via `isSuperAdmin` flag). On submit: call `projectService.createProject()`. On success: close dialog manually (`createDialog.closeDialog()`), reset form, show success growl, navigate to `screen/projects/:newProjectId`. On 409: show inline `eui-feedback-message` error. On other errors: show growl error. Use `[isHandleCloseOnAccept]="true"` to prevent auto-close. Reset form on dismiss. Accessibility: `aria-haspopup="dialog"` on button, `aria-required="true"` on required inputs, `aria-describedby` pointing to error messages, `aria-live="polite"` on feedback messages, `euiLabel` with `for`/`id` pairs, `eui-helper-text` for key hint. Add unit tests covering: button visibility per role, form validation (name required, min length, key format, optional key), create flow (service call, navigation, growl), error handling (409 inline, 500 growl), form reset, key auto-uppercase/strip.
>
> **Backend story (can be parallel with frontend):**
>
> 6. **Key Immutability on Update (STORY-005)** — Add `PATCH /api/projects/:projectId` to the mock server. Protected: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`. If `key` is present in body and differs from current key (case-insensitive): return 400 `"Project key cannot be changed"`. If key matches current: silently accept. Validate name uniqueness (case-insensitive, excluding current project) on update. Update allowed fields: `name`, `description`, `updated_at`. Return 200 with updated project, 404 if not found, 409 for duplicate name, 403 for non-SUPER_ADMIN. Add integration tests.
>
> **E2E tests (after all stories):**
>
> 7. **Playwright e2e tests** — Set up Playwright with Chromium. Create e2e tests covering all stories: create project with manual key (UI flow), create with auto-generated key (UI flow), 409 duplicate handling (UI flow), button visibility per role, form validation, key auto-uppercase, dialog dismiss reset, PATCH key immutability (API tests), PATCH name update (API test), PATCH 403/404 guards (API tests). Note: eUI dialog renders in CDK overlay — use `[role="dialog"]` for dialog container, `.eui-dialog__footer-accept-button` for accept button, `.eui-dialog__footer-dismiss-button` for dismiss button. Use `page.waitForSelector('[role="dialog"]')` after clicking the create button. Clear browser session (`localStorage.clear()`, `sessionStorage.clear()`, `clearCookies()`) between browser tests to avoid stale auth state. Add `npm run test:e2e` script.
>
> **Important constraints:**
> - Use eUI components first — check the eUI component library before using alternatives.
> - `eui-dialog` with `[isHandleCloseOnAccept]="true"` prevents auto-close — close manually after API success via `createDialog.closeDialog()`.
> - `eui-dialog` `[acceptLabel]` is captured at overlay creation — set properties before `openDialog()` with `cdr.detectChanges()` if dynamic.
> - `EuiGrowlService` uses `growlService.growl({ severity, summary, detail })`.
> - Place action buttons in `<eui-page-header-action-items>` inside `<eui-page-header>` (part of `EUI_PAGE` spread import).
> - Use `OnPush` change detection + `cdr.markForCheck()` in async callbacks.
> - Frontend tests use vitest. Run with `npm run test:ci` (single-run).
> - Mock server tests use Jest. Run with `npm run test:mock`. Restore DB after: `git checkout mock/db/db.json`.
> - Every story must pass build (`npx ng build --configuration=development`) and all tests before committing.
> - Follow WCAG 2.2 AA: semantic HTML, `aria-label` on icon buttons, `aria-live="polite"` on dynamic content, `for`/`id` on form labels, no color-only information, `scope="col"` on table headers, `data-col-label` on table cells.
