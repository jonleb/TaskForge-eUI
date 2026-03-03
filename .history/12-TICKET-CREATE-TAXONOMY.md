# 12-TICKET-CREATE-TAXONOMY — Ticket Create Taxonomy

## What this branch does

This branch adds a complete ticket creation flow with structured taxonomy to the project backlog. Backlog items are extended with `priority`, `assignee_id`, `epic_id`, and `ticket_number` fields. A new POST endpoint creates tickets with full validation (type, title, priority, assignee membership, epic existence, archived project guard, workflow lookup). The frontend gains a Backlog page with a sortable ticket table showing ticket numbers (KEY-N format), type/priority chips, status, and assignee names. A role-gated "Create Ticket" dialog lets non-VIEWER members create STORY/BUG/TASK tickets with type, title, description, priority, assignee, and epic fields. The dashboard backlog summary is enhanced with ticket numbers, priority chips, and a "View Backlog" navigation link.

## Step-by-step walkthrough

### 1. Backend — Backlog Data Model Extension + Seed Data Backfill (STORY-001)

- Extended all 16 `backlog-items` records in `mock/db/db.json` with four new fields: `priority: null`, `assignee_id: null`, `epic_id: null`, `ticket_number: 1`.
- Updated `mock/app/services/bootstrap.js` to include the new fields when creating maintenance epics for new projects.
- Updated bootstrap unit tests to verify the new fields are present.

Files: `mock/db/db.json`, `mock/app/services/bootstrap.js`, `mock/app/services/bootstrap.test.js`

### 2. Backend — Create Ticket Endpoint (STORY-002)

- Added `POST /api/projects/:projectId/backlog` with full validation:
  - Required fields: `type` (STORY/BUG/TASK/EPIC), `title` (2–200 chars), `priority` (CRITICAL/HIGH/MEDIUM/LOW, required for non-EPIC).
  - Optional fields: `description` (max 2000 chars), `assignee_id` (must be a project member), `epic_id` (must exist in project backlog as EPIC type).
  - Guards: project must exist and not be archived, user must be authenticated and a project member (SUPER_ADMIN bypasses).
  - Auto-increments `ticket_number` per project. Looks up initial status from project workflow.
- Extended `GET /api/projects/:projectId/backlog` with `_sort` and `_order` query params.
- 18 integration tests covering all validation rules, auth, membership, and edge cases.

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`

### 3. Frontend — Ticket Models + Service Extension (STORY-003)

- Extended `BacklogItem` interface with `priority`, `assignee_id`, `epic_id`, `ticket_number`.
- Added `TicketPriority` type, `TICKET_PRIORITIES` and `CREATABLE_TICKET_TYPES` constants, `CreateTicketPayload` interface.
- Added `createTicket(projectId, payload)` and `getEpics(projectId)` methods to `ProjectService`.
- Added 11 i18n keys (EN + FR) for priority labels, ticket field labels, and backlog page strings.
- 2 new unit tests for the service methods.

Files: `src/app/core/project/project.models.ts`, `src/app/core/project/project.service.ts`, `src/app/core/project/index.ts`, `src/app/core/project/project.service.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 4. Frontend — Backlog Page with Ticket Table (STORY-004)

- Created `BacklogComponent` (standalone, OnPush) at `src/app/features/projects/backlog/`.
- `eui-table` displaying: ticket number (KEY-N format), type chip, title, priority chip (with severity color mapping: CRITICAL=danger, HIGH=warning, MEDIUM=info), status, assignee name.
- Assignee names resolved from project members via `ProjectService.getProjectMembers()`.
- Items sorted by ticket_number descending (newest first).
- Loading, error (with retry), and empty states with `aria-live="polite"`.
- Lazy-loaded route registered at `/projects/:projectId/backlog`.
- 12 unit tests.

Files: `src/app/features/projects/backlog/backlog.component.ts`, `src/app/features/projects/backlog/backlog.component.html`, `src/app/features/projects/backlog/backlog.component.scss`, `src/app/features/projects/backlog/backlog.component.spec.ts`, `src/app/features/projects/projects.routes.ts`

### 5. Frontend — Create Ticket Dialog (STORY-005)

- Added `eui-dialog` to `BacklogComponent` with fields: type (STORY/BUG/TASK — no EPIC), title (required, 2–200 chars), description (optional, 2000 max), priority (CRITICAL/HIGH/MEDIUM/LOW, default MEDIUM), assignee (optional, from project members), epic (optional, from project epics).
- Role-gated: "Create Ticket" button visible only for non-VIEWER members and SUPER_ADMIN, placed in `eui-page-header-action-items`.
- `cdr.detectChanges()` before `openDialog()` per eUI dialog pitfall.
- On success: dialog closes, growl notification, backlog reloads. On error: inline `eui-feedback-message`. Form resets on dismiss.
- All form inputs have `<label>` with `for`/`id` pairs, `euiRequired`/`aria-required` on required fields.
- 14 new unit tests (26 total for backlog component).
- 7 i18n keys (EN + FR).

Files: `src/app/features/projects/backlog/backlog.component.ts`, `src/app/features/projects/backlog/backlog.component.html`, `src/app/features/projects/backlog/backlog.component.scss`, `src/app/features/projects/backlog/backlog.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 6. Frontend — Dashboard Backlog Summary Enhancement (STORY-006)

- Updated `DashboardComponent` to show ticket numbers in KEY-N format and priority chips (same severity mapping as Backlog page) in the backlog summary list.
- Added "View full backlog →" link navigating to `/projects/:id/backlog` via `RouterLink`.
- Added `.ticket-number` (monospace, muted) and `.view-backlog-link` styles.
- 1 i18n key (EN + FR): `dashboard.view-backlog`.
- 5 new unit tests (24 total for dashboard component).

Files: `src/app/features/projects/dashboard/dashboard.component.ts`, `src/app/features/projects/dashboard/dashboard.component.html`, `src/app/features/projects/dashboard/dashboard.component.scss`, `src/app/features/projects/dashboard/dashboard.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/12-Ticket_create_Taxonomy/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

- **Backlog model extension over new table**: Added `priority`, `assignee_id`, `epic_id`, `ticket_number` directly to `backlog-items` rather than creating separate tables. Keeps the mock server simple and queries fast.
- **Auto-increment ticket_number per project**: Each project maintains its own sequence. The POST endpoint finds `max(ticket_number)` for the project and increments. Deterministic and gap-free within a project.
- **EPIC excluded from creatable types**: EPICs are structural containers, not day-to-day work items. `CREATABLE_TICKET_TYPES` = `['STORY', 'BUG', 'TASK']`. EPICs are created only by the bootstrap service.
- **Priority required for non-EPIC types**: EPICs have `priority: null` since they aggregate child items. STORY/BUG/TASK must specify a priority at creation time.
- **Assignee validation against project membership**: The POST endpoint verifies `assignee_id` is a member of the project. Prevents assigning tickets to users who don't have access.
- **Archived project guard**: Cannot create tickets in archived (inactive) projects. Returns 400 with clear error message.
- **Role-gated create button**: Uses `PermissionService.isSuperAdmin()` and `hasProjectRole()` to determine visibility. VIEWER role is excluded from ticket creation.
- **`EUI_TEXTAREA` spread import**: `EuiTextareaComponent` is not standalone — must be imported via `...EUI_TEXTAREA` spread array, not directly. The selector is `textarea[euiTextArea]` (attribute on `<textarea>` element), not `<eui-textarea>`.
- **Priority chip severity mapping**: CRITICAL → `eui-chip--danger`, HIGH → `eui-chip--warning`, MEDIUM → `eui-chip--info`, LOW → neutral (no modifier). Provides visual hierarchy without relying on color alone (text labels always present).
- **Dashboard "View Backlog" link**: Uses `RouterLink` with relative path `['backlog']` to navigate within the project shell context.

## Git history

```
7d09024 feat(ticket): extend backlog-items schema with priority, assignee, epic, ticket_number (STORY-001)
9333534 feat(STORY-002): POST /api/projects/:projectId/backlog endpoint + GET sorting
1634788 feat(STORY-003): extend BacklogItem model, add createTicket/getEpics service methods
b70c8a4 feat(STORY-004): backlog page with ticket table
103fa07 feat(backlog): STORY-005 — Create Ticket dialog with role-gated access
f0c4cd3 feat(dashboard): STORY-006 — Dashboard backlog summary enhancement
```

## Test summary

- Frontend: 359 unit tests (vitest) — all passing
- Backend: 172+ integration tests (Jest + supertest) — all passing (5 pre-existing ordering-sensitive failures unrelated to this branch)
- Build: `npx ng build --configuration=development` — passes


---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full Ticket Create Taxonomy feature on a fresh eUI Angular project that already has authentication, RBAC, admin user management, project navigation (shell, dashboard, sidebar, settings), project creation with key management, an enhanced portfolio, project membership management, and agile bootstrap (workflows + backlog seed data). Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> I have an eUI Angular 21 application with authentication, RBAC, admin user management, project navigation (shell with sidebar: Dashboard, Members, Backlog, Board, Settings), project creation with key management, an enhanced portfolio, project membership, and agile bootstrap (4 workflows per project + maintenance epic in backlog). The mock backend uses Express + json-server in `mock/`. The frontend has `ProjectService`, `ProjectContextService`, `DashboardComponent` (with backlog summary), `BacklogItem` model (id, projectId, type, title, description, status, created_by, created_at), and a Backlog route. Seed data: 16 projects with workflows and backlog-items. I need ticket creation with structured taxonomy. Work story by story, in order. For each story, first create an analysis `.md` file, wait for my approval, then implement with tests.
>
> **STORY-001: Backend — Backlog Data Model Extension + Seed Data Backfill**
>
> Extend all existing `backlog-items` in `mock/db/db.json` with four new fields:
> - `priority: null` — will be CRITICAL/HIGH/MEDIUM/LOW for non-EPIC items
> - `assignee_id: null` — references a user ID
> - `epic_id: null` — references a parent epic backlog item
> - `ticket_number: 1` — sequential per project, starts at 1
>
> Update the bootstrap service to include these fields when creating maintenance epics for new projects. Update bootstrap tests.
>
> **STORY-002: Backend — Create Ticket Endpoint**
>
> Add `POST /api/projects/:projectId/backlog` with validation:
> - Required: `type` (STORY/BUG/TASK/EPIC), `title` (2–200 chars), `priority` (CRITICAL/HIGH/MEDIUM/LOW, required for non-EPIC, null for EPIC).
> - Optional: `description` (max 2000 chars), `assignee_id` (must be project member), `epic_id` (must exist as EPIC in project).
> - Guards: project must exist and be active (not archived), auth required, project membership required (SUPER_ADMIN bypasses).
> - Auto-increment `ticket_number` per project (find max existing + 1).
> - Look up initial status from project workflow by ticket type.
> - Set `created_by` from authenticated user, `created_at` to ISO timestamp.
>
> Extend `GET /api/projects/:projectId/backlog` with `_sort` and `_order` query params.
> 18 integration tests covering all validation, auth, membership, archived project, and edge cases.
>
> **STORY-003: Frontend — Ticket Models + Service Extension**
>
> Extend `BacklogItem` interface with `priority: TicketPriority | null`, `assignee_id: string | null`, `epic_id: string | null`, `ticket_number: number`.
> Add types/constants:
> - `type TicketPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'`
> - `const TICKET_PRIORITIES: TicketPriority[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']`
> - `const CREATABLE_TICKET_TYPES: TicketType[] = ['STORY', 'BUG', 'TASK']` (no EPIC)
> - `interface CreateTicketPayload { type, title, description?, priority, assignee_id, epic_id }`
>
> Add to `ProjectService`:
> - `createTicket(projectId, payload): Observable<BacklogItem>` — POST
> - `getEpics(projectId): Observable<BacklogItem[]>` — GET with `?type=EPIC`
>
> Add i18n keys (EN + FR) for priority labels, ticket field labels, backlog page strings. 2 unit tests.
>
> **STORY-004: Frontend — Backlog Page with Ticket Table**
>
> Create `BacklogComponent` (standalone, OnPush) at `src/app/features/projects/backlog/`:
> - `eui-page` > `eui-page-header` > `eui-page-content` with `eui-table`.
> - Columns: ticket number (KEY-N format), type (eui-chip), title, priority (eui-chip with severity: CRITICAL=danger, HIGH=warning, MEDIUM=info, LOW=neutral), status, assignee name.
> - Resolve assignee names from project members.
> - Sort items by ticket_number descending.
> - Loading, error (with retry), and empty states with `aria-live="polite"`.
> - `aria-label` on table (eui-table strips `<caption>`), `scope="col"` on `<th>`, `data-col-label` on `<td>`.
> - Lazy-loaded route at `/projects/:projectId/backlog`.
> - 12 unit tests.
>
> **STORY-005: Frontend — Create Ticket Dialog**
>
> Add `eui-dialog` to `BacklogComponent`:
> - Fields: type (STORY/BUG/TASK dropdown, default STORY), title (required, 2–200 chars, inline validation), description (textarea, optional, 2000 max), priority (dropdown, default MEDIUM), assignee (optional, from project members), epic (optional, from project epics).
> - Role-gated: "Create Ticket" button in `eui-page-header-action-items`, visible only for non-VIEWER members and SUPER_ADMIN.
> - Use `cdr.detectChanges()` before `openDialog()` (eUI dialog captures labels at creation time).
> - On success: close dialog, growl notification, reload backlog. On error: inline `eui-feedback-message` with `aria-live="polite"`. Reset form on dismiss.
> - All form inputs with `<label>` + `for`/`id`, `euiRequired`/`aria-required` on required fields.
> - Import `EUI_TEXTAREA` spread (not `EuiTextareaComponent` directly — it's not standalone). Selector is `textarea[euiTextArea]`.
> - 14 unit tests. 7 i18n keys (EN + FR).
>
> **STORY-006: Frontend — Dashboard Backlog Summary Enhancement**
>
> Update `DashboardComponent`:
> - Show ticket number in KEY-N format in backlog list items.
> - Add priority chips with same severity mapping as Backlog page.
> - Add "View full backlog →" link with `RouterLink` navigating to `['backlog']` (relative).
> - Add `.ticket-number` (monospace) and `.view-backlog-link` styles.
> - 1 i18n key (EN + FR). 5 unit tests.
>
> **Important constraints:**
> - eUI-first component policy. Check eUI library before using alternatives.
> - `eui-table` strips `<caption>` — use `aria-label` on table element.
> - `eui-dialog` captures `[acceptLabel]` at overlay creation — set properties before `openDialog()` + `cdr.detectChanges()`.
> - `EUI_TEXTAREA` must be imported as spread array (`...EUI_TEXTAREA`), not `EuiTextareaComponent` directly. Selector: `textarea[euiTextArea]`.
> - Place action buttons in `eui-page-header-action-items`, not in `eui-page-content`.
> - OnPush change detection + `cdr.markForCheck()` in async callbacks.
> - EPIC excluded from creatable types. Priority required for non-EPIC, null for EPIC.
> - Assignee validated against project membership. Archived projects reject creation.
> - Frontend tests: vitest via `npm run test:ci`. Backend tests: Jest+supertest via `npm run test:mock`.
> - Build: `npx ng build --configuration=development`.
> - WCAG 2.2 AA: semantic HTML, `aria-label`, `aria-live="polite"`, `scope="col"`, `data-col-label`, no color-only info.
