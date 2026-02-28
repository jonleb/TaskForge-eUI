# 14-Ticket_detail_collab — Ticket Detail Page & Collaboration

## What this branch does

Adds a full ticket detail page accessible from the backlog card list. Users can view all ticket fields, edit them inline (with workflow-aware status transitions), post comments, and review an activity timeline. Role-based permissions control who can edit: SUPER_ADMIN, PROJECT_ADMIN, PRODUCT_OWNER, and DEVELOPER can edit any ticket; REPORTER can edit only their own; VIEWER gets read-only access with a banner. Backend endpoints for single-ticket GET/PATCH, comments CRUD, and activity retrieval are added to the mock server. A navigation bug in the backlog card routerLink is also fixed.

## Step-by-step walkthrough

### 1. Backend — Single Ticket GET & PATCH Endpoints (STORY-001)

- Added `GET /api/projects/:projectId/backlog/:ticketNumber` returning a single `BacklogItem`.
- Added `PATCH /api/projects/:projectId/backlog/:ticketNumber` with field validation: title (2–200 chars), description (max 2000), status (valid workflow transition), priority, assignee_id (active member), epic_id (EPIC in same project).
- REPORTER ownership check: can only PATCH tickets they created.
- Auto-generates activity entries in `ticket-activity` collection for each changed field.
- 18 integration tests (Jest + supertest).

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`, `mock/db/db.json`

### 2. Backend — Comments & Activity Endpoints (STORY-002)

- Added `GET /api/projects/:projectId/backlog/:ticketNumber/comments` (sorted by `created_at` desc).
- Added `POST /api/projects/:projectId/backlog/:ticketNumber/comments` with content validation (1–2000 chars), auto-populates `authorId`/`authorName` from token.
- Added `GET /api/projects/:projectId/backlog/:ticketNumber/activity` (sorted by `created_at` desc).
- VIEWER cannot post comments; all roles can read.
- 13 integration tests.

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`, `mock/db/db.json`

### 3. Frontend — Models, Service Methods & Route (STORY-003)

- Added `UpdateTicketPayload`, `TicketComment`, and `ActivityEntry` interfaces to `project.models.ts`.
- Added 5 service methods to `ProjectService`: `getTicket()`, `updateTicket()`, `getComments()`, `addComment()`, `getActivity()`.
- Added lazy-loaded route `backlog/:ticketNumber` → `TicketDetailComponent` under `:projectId` children in `projects.routes.ts`.
- Exported new types from barrel `index.ts`.
- 5 unit tests for the new HTTP calls.

Files: `src/app/core/project/project.models.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/project.service.spec.ts`, `src/app/core/project/index.ts`, `src/app/features/projects/projects.routes.ts`

### 4. Frontend — Ticket Detail Page Layout (STORY-004)

- Created `TicketDetailComponent` (standalone, OnPush) with `eui-page` > `eui-page-header` > `eui-page-content`.
- Back button in `eui-page-header-action-items` using `eui-icon-button` with `icon="arrow-left:regular"` and `(buttonClick)` handler (not `routerLink`, since `eui-icon-button` is a custom component).
- Loads ticket via `combineLatest([currentProject$, route.paramMap])` → `switchMap` → `getTicket()`.
- Loads support data in parallel: members, workflows, epics.
- Displays ticket key as page header label, title as `<h2>`, type/status/priority as `eui-chip` with color classes (`eui-chip--danger`, `eui-chip--warning`, `eui-chip--info`).
- Detail fields in a `<dl>` definition list: description, assignee, epic, created by, created at.
- Error/not-found/loading states with `eui-progress-bar[isIndeterminate]`.
- Added `routerLink` on backlog cards to navigate to ticket detail.
- 13 i18n keys (EN + FR).
- 10 unit tests.

Files: `src/app/features/projects/ticket-detail/ticket-detail.component.ts`, `src/app/features/projects/ticket-detail/ticket-detail.component.html`, `src/app/features/projects/ticket-detail/ticket-detail.component.scss`, `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts`, `src/app/features/projects/backlog/backlog.component.html`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 5. Frontend — Inline Edit & Save (STORY-005)

- `canEdit` flag determined by role via `PermissionService`: SUPER_ADMIN, PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER can edit any ticket; REPORTER can edit only own tickets (ownership check via `created_by === userId`); VIEWER gets read-only access with `eui-feedback-message[euiInfo]` banner.
- Each field has an `eui-icon-button` (icon `eui-edit`, size `s`) that toggles edit mode via `editingFields: Set<EditableField>`.
- Edit mode renders inline inputs: `input[euiInputText]` for title, `textarea[euiTextArea]` for description, `select[euiSelect]` for status/priority/assignee/epic.
- Status dropdown shows only valid workflow transitions from current status (loaded from `WorkflowService`).
- Global save bar appears when `hasUnsavedChanges` is true — builds `UpdateTicketPayload` from dirty fields only, calls `updateTicket()`.
- Success/error growl notifications via `EuiGrowlService`.
- `syncEditFields()` resets edit values from ticket on cancel or after save.
- 7 i18n keys (EN + FR).
- 10 unit tests.

Files: `src/app/features/projects/ticket-detail/ticket-detail.component.ts`, `src/app/features/projects/ticket-detail/ticket-detail.component.html`, `src/app/features/projects/ticket-detail/ticket-detail.component.scss`, `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 6. Frontend — Comments Section (STORY-006)

- Comments section below ticket fields with `<section aria-label="Comments">`.
- Loads comments via `ProjectService.getComments()` on ticket load, sorted newest first.
- Each comment rendered in a `<ul>` / `<li>` list with author name, date (`date:'medium'` pipe), and content.
- Add-comment form (visible only when `canEdit`): `textarea[euiTextArea]` + submit button. Calls `addComment()`, reloads comments, clears textarea.
- Empty state message when no comments.
- Success/error growl notifications.
- 6 i18n keys (EN + FR).
- 8 unit tests.

Files: `src/app/features/projects/ticket-detail/ticket-detail.component.ts`, `src/app/features/projects/ticket-detail/ticket-detail.component.html`, `src/app/features/projects/ticket-detail/ticket-detail.component.scss`, `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 7. Frontend — Activity Timeline & Role Permissions (STORY-007)

- Activity section below comments with `<section aria-label="Activity">`.
- Loads activity via `ProjectService.getActivity()` on ticket load.
- Each entry shows: field name, old → new value, changer name (resolved from members list via `getChangerName()`), date.
- Uses `translate` pipe with interpolation params for the "changed X from Y to Z" pattern.
- Empty state message when no activity.
- 3 i18n keys (EN + FR).
- 6 unit tests.

Files: `src/app/features/projects/ticket-detail/ticket-detail.component.ts`, `src/app/features/projects/ticket-detail/ticket-detail.component.html`, `src/app/features/projects/ticket-detail/ticket-detail.component.scss`, `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 8. Bugfix — Backlog Card routerLink Navigation (BUG)

- Backlog cards used `routerLink="['backlog', item.ticket_number]"` which resolved to `backlog/backlog/5` since the backlog component is already at the `backlog` route.
- Fixed to `['../', 'backlog', item.ticket_number]` — navigates relative to the parent `:projectId` route, since `backlog` and `backlog/:ticketNumber` are sibling routes.

Files: `src/app/features/projects/backlog/backlog.component.html`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/14-Ticket_detail_collab/` describing the plan, eUI components, endpoints, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

- **OnPush + `cdr.markForCheck()`**: the ticket detail component uses `ChangeDetectionStrategy.OnPush` for performance. Every async callback (HTTP subscribe, permission check) calls `cdr.markForCheck()` to trigger re-render.
- **`combineLatest` + `switchMap` for ticket loading**: combines `currentProject$` and `route.paramMap` so the ticket reloads if either the project context or the route param changes. `switchMap` cancels in-flight requests on navigation.
- **`eui-icon-button` with `(buttonClick)` not `routerLink`**: `eui-icon-button` is a custom eUI component that doesn't support `routerLink` directive. The back button uses `(buttonClick)="goBack()"` with `Router.navigate()`.
- **Icon naming**: all icons use proper naming — `icon="eui-edit"` for eUI built-in, `icon="arrow-left:regular"` for third-party set. Never bare names like `icon="edit"`.
- **`[euiDisabled]` not `[disabled]`**: `eui-icon-button` uses the `[euiDisabled]` input, not the standard `disabled` attribute.
- **No `eui-spinner`**: eUI has no spinner component. Loading states use `eui-progress-bar[isIndeterminate]`.
- **Workflow-aware status transitions**: the status dropdown only shows valid next statuses from the `workflows` collection, preventing invalid transitions at the UI level.
- **REPORTER ownership check**: `determineCanEdit()` first checks for admin/developer roles, then falls back to REPORTER ownership check (`created_by === userId`). This avoids unnecessary permission calls.
- **Relative routerLink for backlog cards**: `['../', 'backlog', item.ticket_number]` navigates from the `backlog` route up to `:projectId` then back down to `backlog/:ticketNumber`, since both are sibling routes.
- **Activity auto-generation on PATCH**: the backend generates `ticket-activity` entries for each changed field during PATCH, so the activity timeline is populated automatically without a separate API call from the frontend.
- **Page-level buttons in `eui-page-header-action-items`**: following the eUI pitfall rule — never place action buttons inside `eui-page-content` (they stretch full width due to flex column layout).

## Git history

```
c567056 feat(014): STORY-001 — single ticket GET & PATCH endpoints with activity logging
fdccc24 feat(014): STORY-002 — comments CRUD & activity retrieval endpoints
fab6490 feat(014): STORY-003 — frontend models, service methods & ticket detail route
63a1679 feat(014): STORY-004 — ticket detail page layout with read-only fields and backlog card navigation
006f178 feat(014): STORY-005 — inline edit & save with workflow transitions and role-based permissions
e3a0a2c feat(014): STORY-006 — comments section with load, display, add, and role-based visibility
a2f3944 feat(014): STORY-007 — activity timeline with changer name resolution and role permissions
731ed57 fix(014): fix backlog card routerLink — use relative parent path for ticket detail navigation
```

## Test summary

- Frontend: 441 unit tests (vitest) — all passing
- Backend: 31 integration tests (Jest + supertest) — passing (8 pre-existing failures unrelated to this feature)
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full Ticket Detail & Collaboration feature on a fresh eUI Angular project that already has authentication, RBAC, project navigation, backlog with card list, and workflow management.

---

**Prompt:**

> I have an eUI Angular 21 application with a backlog page showing tickets as `eui-content-card` in a two-column layout. The backend has `GET /api/projects/:projectId/backlog` (paginated list) and `POST /api/projects/:projectId/backlog` (create ticket). DB collections: `backlog-items`, `workflows`, `project-members`, `users`, `projects`. I want to add a ticket detail page with inline editing, comments, and activity timeline. Work story by story, in order.
>
> **STORY-001: Backend — Single Ticket GET & PATCH**
> - `GET /api/projects/:projectId/backlog/:ticketNumber` — returns single `BacklogItem` by `projectId` + `ticket_number`. Auth + any project role. 404 if not found.
> - `PATCH /api/projects/:projectId/backlog/:ticketNumber` — updates `title` (2–200 chars), `description` (max 2000), `status` (valid workflow transition from `workflows` collection), `priority` (CRITICAL/HIGH/MEDIUM/LOW), `assignee_id` (active project member), `epic_id` (EPIC in same project). Auth + non-VIEWER role. REPORTER can only PATCH own tickets (`created_by === userId`). Returns updated item.
> - Auto-generate activity entries in `ticket-activity` collection for each changed field: `{ id, projectId, ticketId, ticketNumber, field, oldValue, newValue, changedBy, created_at }`.
> - ~18 integration tests (Jest + supertest).
>
> **STORY-002: Backend — Comments & Activity Endpoints**
> - `GET /api/projects/:projectId/backlog/:ticketNumber/comments` — sorted by `created_at` desc. Auth + any role.
> - `POST /api/projects/:projectId/backlog/:ticketNumber/comments` — body `{ content }` (1–2000 chars). Auto-populates `authorId`/`authorName` from token. Auth + non-VIEWER. Returns 201.
> - `GET /api/projects/:projectId/backlog/:ticketNumber/activity` — sorted by `created_at` desc. Auth + any role.
> - Add `ticket-comments` collection to db.json.
> - ~13 integration tests.
>
> **STORY-003: Frontend — Models, Service & Route**
> - Add `UpdateTicketPayload`, `TicketComment`, `ActivityEntry` interfaces.
> - Add 5 service methods: `getTicket()`, `updateTicket()`, `getComments()`, `addComment()`, `getActivity()`.
> - Add lazy-loaded route `backlog/:ticketNumber` → `TicketDetailComponent` as sibling to `backlog`.
> - 5 unit tests for HTTP calls.
>
> **STORY-004: Frontend — Ticket Detail Page Layout**
> - `eui-page` > `eui-page-header` (ticket key as label) > `eui-page-content`.
> - Back button in `eui-page-header-action-items` using `eui-icon-button` with `icon="arrow-left:regular"` and `(buttonClick)` handler (NOT `routerLink` — `eui-icon-button` doesn't support it).
> - Load ticket via `combineLatest([currentProject$, route.paramMap])` → `switchMap`.
> - Display: title as `<h2>`, type/status/priority as `eui-chip` (with `eui-chip--danger` for CRITICAL, `eui-chip--warning` for HIGH, `eui-chip--info` for MEDIUM), detail fields in `<dl>`.
> - Loading: `eui-progress-bar[isIndeterminate]`. Error/not-found states.
> - Add `routerLink` on backlog cards: `['../', 'backlog', item.ticket_number]` (relative to parent since `backlog` and `backlog/:ticketNumber` are siblings).
> - OnPush change detection + `cdr.markForCheck()` in all async callbacks.
> - ~13 i18n keys EN+FR. ~10 unit tests.
>
> **STORY-005: Frontend — Inline Edit & Save**
> - `canEdit` flag: SUPER_ADMIN/PROJECT_ADMIN/PRODUCT_OWNER/DEVELOPER can edit any; REPORTER only own tickets; VIEWER read-only with `eui-feedback-message[euiInfo]` banner.
> - Edit toggle per field via `eui-icon-button` (`icon="eui-edit"`, size `s`). `editingFields: Set<EditableField>`.
> - Inline inputs: `input[euiInputText]` for title, `textarea[euiTextArea]` for description, `select[euiSelect]` for status/priority/assignee/epic.
> - Status dropdown: only valid transitions from `workflows` collection.
> - Global save bar when `hasUnsavedChanges`: builds `UpdateTicketPayload` from dirty fields, calls `updateTicket()`.
> - Growl notifications via `EuiGrowlService`.
> - ~7 i18n keys EN+FR. ~10 unit tests.
>
> **STORY-006: Frontend — Comments Section**
> - `<section aria-label="Comments">` below ticket fields.
> - Load comments on ticket load. Display as `<ul>/<li>` with author, date, content.
> - Add-comment form (visible when `canEdit`): `textarea[euiTextArea]` + submit button.
> - Empty state, growl notifications.
> - ~6 i18n keys EN+FR. ~8 unit tests.
>
> **STORY-007: Frontend — Activity Timeline**
> - `<section aria-label="Activity">` below comments.
> - Load activity on ticket load. Display field changes with old→new values, changer name (resolved from members), date.
> - Empty state.
> - ~3 i18n keys EN+FR. ~6 unit tests.
>
> **Important constraints:**
> - eUI-first, no ECL (`@eui/ecl`). Only `@eui/components` and `@eui/core`.
> - `eui-icon-button` uses `[euiDisabled]` not `[disabled]`, and `(buttonClick)` not `(click)`.
> - Icon naming: `icon="eui-edit"` or `icon="arrow-left:regular"`, never bare names.
> - No `eui-spinner` — use `eui-progress-bar[isIndeterminate]`.
> - Page-level buttons in `eui-page-header-action-items`, never in `eui-page-content`.
> - OnPush change detection + `cdr.markForCheck()` in async callbacks.
> - `routerLink` on backlog cards: `['../', 'backlog', item.ticket_number]` (relative parent path).
> - WCAG 2.2 AA: `aria-label` on sections and icon buttons, `aria-live="polite"` on dynamic content, `<label>` for all form inputs, semantic HTML (`<dl>`, `<section>`, `<ul>`).
> - Tests: `npm run test:ci` (frontend vitest), `npm run test:mock` (backend Jest+supertest).
> - Build: `npx ng build --configuration=development`.
