# 11-AGILE-BOOTSTRAP — Agile Bootstrap

## What this branch does

This branch automatically provisions a usable agile baseline when a new project is created, so teams can start delivery work immediately without manual setup. Every project gets 4 default workflows (STORY, BUG, TASK, EPIC) with deterministic status flows and transitions, plus a Maintenance epic in the backlog. A new Settings page displays workflows per ticket type, and the Dashboard gains a backlog summary section. The bootstrap runs idempotently inside `POST /api/projects` — if it fails, the project is still created (201) with a `bootstrapWarning` field. Seed data was added for all 16 existing projects. A minor i18n bugfix corrected the French translation for EPIC ("Epic" not "Épique").

## Step-by-step walkthrough

### 1. Backend — Workflow and Backlog Seed Data (STORY-001)

- Added two new collections to `mock/db/db.json`: `workflows` (64 records — 4 per project × 16 projects) and `backlog-items` (16 records — 1 maintenance epic per project).
- STORY/BUG/TASK share a 4-status workflow: TO_DO → IN_PROGRESS → IN_REVIEW → DONE.
- EPIC uses a 3-status workflow: TO_DO → IN_PROGRESS → DONE.
- Each backlog item is a Maintenance epic with `type: "EPIC"`, `status: "TO_DO"`, `created_by: "system"`.

Files: `mock/db/db.json`

### 2. Backend — Bootstrap Service (STORY-002)

- Created `mock/app/services/bootstrap.js` with `bootstrapProject(db, projectId)` — provisions 4 workflows + 1 maintenance epic.
- Idempotent: skips if workflows already exist for the project. Returns `{ workflows, backlogItems, skipped }`.
- Integrated into `POST /api/projects` in `project_routes.js` — runs after project creation, wraps in try/catch so project creation succeeds even if bootstrap fails (adds `bootstrapWarning` to response).
- 6 unit tests for the bootstrap function + 3 integration tests for the endpoint.

Files: `mock/app/services/bootstrap.js`, `mock/app/services/bootstrap.test.js`, `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`

### 3. Backend — Workflow and Backlog Read Endpoints (STORY-003)

- Added `GET /api/projects/:projectId/workflows` — returns workflows filtered by projectId, requires auth + project membership.
- Added `GET /api/projects/:projectId/backlog` — returns backlog items filtered by projectId, optional `?type=` filter, requires auth + project membership.
- Both endpoints return 404 if project doesn't exist, 403 if user is not a member (SUPER_ADMIN bypasses).
- 11 integration tests covering auth, membership, filtering, and error cases.

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`

### 4. Frontend — Workflow and Backlog Models + Service (STORY-004)

- Added `TicketType`, `WorkflowStatus` type aliases, `Workflow` and `BacklogItem` interfaces, `TICKET_TYPES` and `WORKFLOW_STATUSES` constants to `project.models.ts`.
- Added `getWorkflows(projectId)` and `getBacklog(projectId, type?)` methods to `ProjectService`.
- Updated barrel export in `index.ts`.
- Added 8 i18n keys for ticket types and workflow statuses (EN + FR).
- 3 unit tests for the new service methods.

Files: `src/app/core/project/project.models.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/index.ts`, `src/app/core/project/project.service.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 5. Fix — French Translation for EPIC

- Changed `"workflow.ticket-type.EPIC": "Épique"` → `"Epic"` in `fr.json`. The French term for EPIC in agile context is the English loanword "Epic".

Files: `src/assets/i18n/fr.json`

### 6. Frontend — Project Settings Page (STORY-005)

- Created `SettingsComponent` (standalone, OnPush) at `src/app/features/projects/settings/`.
- Uses `eui-page` > `eui-page-header` > `eui-page-content` structure.
- Displays workflows grouped by ticket type: status flow as `<ul>/<li>` with `eui-status-badge` chips and `eui-arrow-right` icons, plus a transitions table per workflow.
- Loading state with `<output aria-live="polite">`, error state with `eui-feedback-message` + retry button, empty state with info message.
- Lazy-loaded route registered in `projects.routes.ts`.
- 7 i18n keys (EN + FR) for settings labels.
- 11 unit tests covering all states and interactions.

Files: `src/app/features/projects/settings/settings.component.ts`, `src/app/features/projects/settings/settings.component.html`, `src/app/features/projects/settings/settings.component.scss`, `src/app/features/projects/settings/settings.component.spec.ts`, `src/app/features/projects/projects.routes.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 7. Frontend — Dashboard Backlog Summary (STORY-006)

- Updated `DashboardComponent` with `backlogItems` and `backlogLoading` properties.
- Added `loadBacklog()` method called from the project subscription.
- Template shows a backlog summary section with item count (`aria-live="polite"`), ticket type chips (`eui-chip`), titles, and statuses. Loading and empty states included.
- SCSS for `.backlog-summary` and `.backlog-list`.
- 3 i18n keys (EN + FR) for backlog labels.
- 6 new unit tests.

Files: `src/app/features/projects/dashboard/dashboard.component.ts`, `src/app/features/projects/dashboard/dashboard.component.html`, `src/app/features/projects/dashboard/dashboard.component.scss`, `src/app/features/projects/dashboard/dashboard.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/11-Agile_bootstrap/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

- **Idempotent bootstrap**: `bootstrapProject()` checks for existing workflows before creating. Safe for retries and partial failures. If bootstrap throws, the project is still returned (201) with a `bootstrapWarning` field — core availability is never compromised.
- **Synchronous bootstrap in POST**: Runs inside the request handler after project write, not as a background job. Keeps the mock server simple and deterministic.
- **Seed data for all 16 projects**: Ensures DB consistency — every existing project has workflows and a maintenance epic, not just newly created ones.
- **EPIC 3-status vs 4-status**: EPICs skip IN_REVIEW since they represent large work containers, not reviewable deliverables. STORY/BUG/TASK share the same 4-status flow.
- **Settings page uses semantic HTML tables**: Transitions are displayed in `<table>` with `<caption>`, `scope="col"`, and `data-col-label` for a11y. Status flow uses `<ul>/<li>` with `eui-status-badge` and arrow icons.
- **Dashboard backlog as summary, not full table**: Shows a simple list with chips and status text. Full backlog management is deferred to a future feature.
- **`eui-status-badge` for status flow**: Chosen over `eui-chip` for visual distinction between the status flow display (badges) and the backlog item type display (chips).

## Git history

```
670374d feat(agile): add workflows and backlog-items seed data (STORY-001)
7c1c728 feat(agile): add bootstrap service + integrate into POST /api/projects (STORY-002)
ca37589 feat(agile): add GET workflows and backlog read endpoints (STORY-003)
8644cae feat(agile): add Workflow/BacklogItem models + service methods (STORY-004)
a4d54d1 fix(i18n): correct French translation for EPIC ticket type
f678092 feat(agile): add Project Settings page with workflow display (STORY-005)
ef76b88 feat(agile): add backlog summary to project dashboard (STORY-006)
```

## Test summary

- Frontend: 326 unit tests (vitest) — all passing
- Backend: 154+ integration tests (Jest + supertest) — all passing (5 pre-existing ordering-sensitive failures unrelated to this branch)
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full Agile Bootstrap feature on a fresh eUI Angular project that already has authentication, RBAC, admin user management, project navigation (shell, dashboard, sidebar, settings route), project creation with key management, an enhanced portfolio, and project membership management. Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> I have an eUI Angular 21 application with authentication, RBAC, admin user management, project navigation (shell with sidebar: Dashboard, Members, Backlog, Settings), project creation (`POST /api/projects` with key generation), an enhanced portfolio, and project membership management. The mock backend uses Express + json-server in `mock/`. The frontend has `ProjectService`, `ProjectContextService`, `DashboardComponent`, and a Settings route that currently has no implementation. Seed data: 16 projects, project-members. I need automatic agile bootstrapping when projects are created. Work story by story, in order. For each story, first create an analysis `.md` file, wait for my approval, then implement with tests.
>
> **STORY-001: Backend — Workflow and Backlog Seed Data**
>
> Add two new collections to `mock/db/db.json`:
> - `workflows`: 4 records per project (STORY, BUG, TASK, EPIC). STORY/BUG/TASK use 4 statuses: TO_DO → IN_PROGRESS → IN_REVIEW → DONE. EPIC uses 3 statuses: TO_DO → IN_PROGRESS → DONE. Each record: `{ id, projectId, ticketType, statuses: string[], transitions: Record<string, string[]>, created_at }`.
> - `backlog-items`: 1 maintenance epic per project. `{ id, projectId, type: "EPIC", title: "Maintenance", description: "Default epic for maintenance and operational tasks", status: "TO_DO", created_by: "system", created_at }`.
> Generate for all existing projects (16). IDs are sequential strings.
>
> **STORY-002: Backend — Bootstrap Service**
>
> Create `mock/app/services/bootstrap.js` with `bootstrapProject(db, projectId)`:
> - Idempotent: check if workflows exist for projectId, skip if yes.
> - Create 4 workflows from templates (STORY/BUG/TASK with 4-status, EPIC with 3-status). Auto-increment IDs from max existing.
> - Create 1 maintenance epic in backlog-items. Auto-increment ID.
> - Return `{ workflows: number, backlogItems: number, skipped: boolean }`.
>
> Integrate into `POST /api/projects`: after project creation, call `bootstrapProject()` in try/catch. If it fails, still return 201 but add `bootstrapWarning: "Bootstrap failed: <message>"` to response. On success, add `bootstrap: { workflows, backlogItems }` to response.
>
> Unit tests for bootstrap function (6 tests: creates workflows, creates backlog, idempotent skip, auto-increment IDs). Integration tests for endpoint (3 tests: bootstrap data in response, bootstrap warning on failure, idempotent).
>
> **STORY-003: Backend — Read Endpoints**
>
> Add to `mock/app/routes/project_routes.js`:
> - `GET /api/projects/:projectId/workflows` — filter `workflows` by projectId. Requires auth + project membership (SUPER_ADMIN bypasses). 404 if project not found.
> - `GET /api/projects/:projectId/backlog` — filter `backlog-items` by projectId, optional `?type=` filter. Same auth rules. 404 if project not found.
>
> 11 integration tests: auth required, membership required, SUPER_ADMIN bypass, successful retrieval, type filter, 404 for missing project.
>
> **STORY-004: Frontend — Models + Service**
>
> In `src/app/core/project/project.models.ts`:
> - `type TicketType = 'STORY' | 'BUG' | 'TASK' | 'EPIC'`
> - `type WorkflowStatus = 'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE'`
> - `interface Workflow { id, projectId, ticketType: TicketType, statuses: WorkflowStatus[], transitions: Record<WorkflowStatus, WorkflowStatus[]>, created_at }`
> - `interface BacklogItem { id, projectId, type: TicketType, title, description, status: WorkflowStatus, created_by, created_at }`
> - `const TICKET_TYPES: TicketType[]` and `const WORKFLOW_STATUSES: WorkflowStatus[]`
>
> In `ProjectService`:
> - `getWorkflows(projectId): Observable<Workflow[]>` — GET `/api/projects/:projectId/workflows`
> - `getBacklog(projectId, type?): Observable<BacklogItem[]>` — GET `/api/projects/:projectId/backlog` with optional `?type=` param
>
> Add i18n keys (EN + FR) for ticket types (`workflow.ticket-type.STORY/BUG/TASK/EPIC`) and statuses (`workflow.status.TO_DO/IN_PROGRESS/IN_REVIEW/DONE`). French EPIC = "Epic" (not "Épique"). 3 unit tests.
>
> **STORY-005: Frontend — Project Settings Page**
>
> Create `SettingsComponent` (standalone, OnPush) at `src/app/features/projects/settings/`:
> - `eui-page` > `eui-page-header` > `eui-page-content`.
> - Subscribe to `ProjectContextService.currentProject$`, load workflows via `ProjectService.getWorkflows()`.
> - Display workflows grouped by ticket type: status flow as `<ul>/<li>` with `eui-status-badge` chips and `eui-icon-svg icon="eui-arrow-right"` arrows, plus a transitions `<table>` per workflow (From/To columns).
> - Loading state: `<output aria-live="polite">`. Error state: `eui-feedback-message euiDanger` + retry button. Empty state: `eui-feedback-message euiInfo`.
> - Retry button calls `retry()` which re-fetches workflows.
> - `getTransitionTargets(workflow, fromStatus)` helper for template.
> - Lazy-loaded route in `projects.routes.ts`.
> - a11y: `aria-label` on sections and tables, `scope="col"` on `<th>`, `data-col-label` on `<td>`, `<caption class="eui-u-sr-only">` on tables, `aria-hidden="true"` on decorative arrows.
> - 7 i18n keys (EN + FR). 11 unit tests.
>
> **STORY-006: Frontend — Dashboard Backlog Summary**
>
> Update `DashboardComponent`:
> - Add `backlogItems: BacklogItem[]` and `backlogLoading: boolean` properties.
> - Add `loadBacklog(projectId)` called from project subscription.
> - Template: new `<section class="backlog-summary">` with `<h2>`, item count with `aria-live="polite"`, `<ul class="backlog-list">` with `<li>` per item showing `eui-chip` for ticket type, title text, and status text.
> - Loading and empty states.
> - SCSS for `.backlog-summary` and `.backlog-list`.
> - 3 i18n keys (EN + FR). 6 unit tests.
>
> **Important constraints:**
> - eUI-first component policy. Check eUI library before using alternatives.
> - `eui-table` strips `<caption>` — use `aria-label` on table + `<caption class="eui-u-sr-only">` for screen readers.
> - `eui-status-badge` for status flow display, `eui-chip` for ticket type badges.
> - `eui-icon-svg icon="eui-arrow-right"` with `aria-hidden="true"` for decorative flow arrows.
> - OnPush change detection + `cdr.markForCheck()` in async callbacks.
> - Bootstrap is idempotent and failure-safe (project creation never fails due to bootstrap).
> - Frontend tests: vitest via `npm run test:ci`. Backend tests: Jest+supertest via `npm run test:mock`.
> - Build: `npx ng build --configuration=development`.
> - WCAG 2.2 AA: semantic HTML, `aria-label`, `aria-live="polite"`, `scope="col"`, `data-col-label`, no color-only info.
