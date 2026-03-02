# 19 — Kanban Board

## What this branch does

Adds a project-level Kanban board to TaskForge. Board columns are derived dynamically from the project's workflow statuses (union of all ticket-type workflows), so they always reflect the actual workflow configuration. Tickets are displayed as cards within their status column, with a sprint filter dropdown to scope the view. Authorized users (PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER) can drag & drop cards between columns to change ticket status, constrained by server-side workflow transition rules. Also includes a minor housekeeping commit renaming the app to TaskForge in `index.html` and the layout header.

## Step-by-step walkthrough

### 1. Feature description and stories (docs)

- Created feature analysis file `FEATURE-019-Board.md` describing business objectives, reusable services, and role coverage.
- Created `STORIES-019-BOARD.md` with 2-story breakdown and technical notes.
- Created individual story files `STORY-001-board-page-dynamic-columns.md` and `STORY-002-dnd-status-transitions.md` with acceptance criteria, a11y requirements, and eUI component choices.

Files: `.analysis/19-Board/`

### 2. Board page with dynamic columns, sprint filter, ticket cards (STORY-001)

- Created `BoardComponent` (standalone, lazy-loaded at `:projectId/board`) using `eui-page` > `eui-page-header` > `eui-page-content` structure.
- On init, loads workflows, backlog (limit 1000), sprints, and project members via `forkJoin`. Derives unique ordered columns from the union of all workflow statuses (first-occurrence-wins via `Set`).
- Each column is a `<section>` with `aria-label`, containing ticket cards showing `#number`, type badge (`eui-status-badge`), title, priority chip (`eui-chip` with severity binding), and assignee name.
- Sprint filter in `eui-page-header-action-items` using `select[euiSelect]` — shows non-CLOSED sprints. Filtering re-groups tickets by status. `aria-live="polite"` `<output>` announces ticket count on filter change.
- Added board route to `projects.routes.ts` and "Board" sidebar link in `LayoutComponent`.
- Added i18n keys for EN and FR under `board.*` namespace.
- 12 unit tests covering data loading, column derivation, ticket grouping, sprint filtering, status formatting, assignee resolution, error/retry, and screen reader announcements.

Files: `src/app/features/projects/board/board.component.ts`, `board.component.html`, `board.component.scss`, `board.component.spec.ts`, `src/app/features/projects/projects.routes.ts`, `src/app/layout/layout.component.ts`, `src/app/layout/layout.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 3. Drag & drop status transitions across board columns (STORY-002)

- Added Angular CDK `DragDropModule` — each column is a `cdkDropList` connected to all others, each card is `cdkDrag` with a `cdkDragHandle` button (`dots-six-vertical:regular` icon).
- On drop to a different column: optimistic UI via `transferArrayItem`, then `ProjectService.updateTicket()` to change status. On success: growl + full board reload for consistency. On error (400 invalid transition or 403 forbidden): error growl + reload to revert.
- Drag disabled for users without `canManage` permission — drag handle hidden (not just disabled) via `@if (canManage)`.
- `aria-live="assertive"` `<output>` announces DnD transition results for screen readers.
- CDK drag styles: dashed-border placeholder, shadow preview, smooth animation transitions.
- 8 additional unit tests covering drop to different column, same-column no-op, success growl + reload, error growl + reload, 403 message, DnD announcement, and drag handle visibility based on permissions.

Files: `src/app/features/projects/board/board.component.ts`, `board.component.html`, `board.component.scss`, `board.component.spec.ts`, `src/assets/i18n/en.json`, `src/assets/i18n/fr.json`

### 4. Rename app to TaskForge (chore)

- Updated `<title>` in `src/index.html` and app name in `layout.component.html` to "TaskForge".
- Removed stale `mock/db/.~db.json` lock file.

Files: `src/index.html`, `src/app/layout/layout.component.html`, `mock/db/db.json`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/19-Board/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

- **CDK DragDropModule over custom DnD**: eUI has no native drag & drop component. Angular CDK is the standard approach and was already used in sprint planning and backlog reorder features, keeping the pattern consistent.
- **Dynamic columns from workflow union**: Columns are computed at runtime from the union of all workflow statuses (insertion-order via `Set`), so the board automatically adapts when project admins customize workflows. No hardcoded status assumptions.
- **Server-side-only transition validation**: No client-side pre-check of allowed transitions before drop. The backend is authoritative — simpler code, no risk of client/server rule drift. Invalid drops get a clear error growl and the board reloads.
- **Optimistic UI + full reload**: On drop, the card moves immediately (optimistic), then the API call fires. On success or error, the entire board reloads from the server. This avoids complex manual rollback logic and guarantees consistency.
- **Sprint filter excludes CLOSED sprints**: Only ACTIVE and PLANNED sprints appear in the dropdown — CLOSED sprints are historical and not useful for daily board work.
- **Drag handle hidden vs disabled**: For non-authorized users, the drag handle `<button>` is removed from the DOM entirely (`@if (canManage)`) rather than rendered as disabled. This avoids a11y noise from non-functional interactive elements.
- **`<article>` for ticket cards**: Semantic HTML — each card is an `<article>` with `aria-label` containing ticket number and title, making screen reader navigation meaningful.
- **Two `<output>` regions for announcements**: Separate `aria-live="polite"` for filter changes and `aria-live="assertive"` for DnD transitions, so status changes are announced immediately while filter counts are non-intrusive.

## Git history

```
cbcae59 chore: rename app to TaskForge
943cbaa feat(019-Board): STORY-002 — Drag & drop status transitions across board columns
ab6481f feat(019-Board): STORY-001 — Board page with dynamic columns, sprint filter, ticket cards
c610ed5 docs(019-Board): add feature description and stories
```

## Test summary

- Frontend: 618 unit tests (vitest) — all passing (20 new for BoardComponent)
- Backend: no new endpoints — existing tests unaffected
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full Kanban Board feature on a fresh eUI Angular project that already has: project CRUD, project membership with roles, a mock Express/json-server backend with workflows and backlog endpoints, a `ProjectService` with `getWorkflows()`, `getBacklog()`, `getSprints()`, `getProjectMembers()`, `updateTicket()`, a `PermissionService` with `hasProjectRole()`, a `ProjectContextService` with `currentProject$`, and a sidebar with project-scoped navigation.

---

**Prompt:**

> Implement a project-level Kanban board that derives columns dynamically from workflow statuses and supports drag & drop status transitions.
>
> **No new backend endpoints needed.** Reuse:
> - `GET /api/projects/:projectId/workflows` — column definitions
> - `GET /api/projects/:projectId/backlog?_limit=1000` — ticket data
> - `GET /api/projects/:projectId/sprints` — sprint filter options
> - `GET /api/projects/:projectId/members` — assignee display names
> - `PATCH /api/projects/:projectId/backlog/:ticketNumber` with `{ status }` — status transitions (returns 400 on invalid transition, 403 on forbidden)
>
> **STORY-001: Board page with dynamic columns**
> 1. Create `BoardComponent` (standalone, lazy-loaded at `:projectId/board`). Use `eui-page` > `eui-page-header` > `eui-page-content`.
> 2. On init, `forkJoin` to load workflows, backlog, sprints, and members. Derive unique ordered columns from the union of all workflow statuses (iterate workflows, collect statuses via `Set`, first-occurrence-wins).
> 3. Each column is a `<section aria-label="status name">` with an `<h2>` header showing formatted status (`TO_DO` → `To Do`) and a ticket count `eui-chip`.
> 4. Ticket cards as `<article>` elements showing: `#ticket_number`, type badge (`eui-status-badge`), title, priority chip (`eui-chip` with `[euiDanger]`/`[euiWarning]`/`[euiInfo]` bindings), assignee name. Cards are clickable (navigate to ticket detail).
> 5. Sprint filter in `eui-page-header-action-items` using `select[euiSelect]` with `<label euiLabel>`. Options: "All sprints" (default) + non-CLOSED sprints. Filtering re-groups tickets by `sprint_id`.
> 6. `<output aria-live="polite">` announces ticket count on filter change.
> 7. Loading state: `eui-progress-bar` with `[isIndeterminate]="true"`. Error state: `eui-feedback-message` + retry button.
> 8. Add board route to project routes and "Board" link to sidebar.
> 9. Add i18n keys for EN and FR under `board.*` namespace.
> 10. Write ~12 unit tests: data loading, column derivation, ticket grouping, sprint filtering, status formatting, assignee resolution, error/retry, screen reader announcements.
>
> **STORY-002: Drag & drop status transitions**
> 1. Add Angular CDK `DragDropModule`. Each column is `cdkDropList` connected to all others via `[cdkDropListConnectedTo]`. Each card is `cdkDrag` with `[cdkDragData]="ticket"`.
> 2. Add drag handle `<button cdkDragHandle>` with `dots-six-vertical:regular` icon (`eui-icon-svg`), `aria-label="Drag to change status"`. Hide handle entirely (`@if (canManage)`) for non-authorized users.
> 3. `canManage` = `PermissionService.hasProjectRole(projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER')`. Also set `[cdkDropListDisabled]="!canManage"`.
> 4. On drop to different column: optimistic UI via `transferArrayItem`, then `updateTicket(projectId, ticketNumber, { status: targetStatus })`. On success: success growl + full board reload. On error: error growl (400 = "Transition from X to Y is not allowed", 403 = "You do not have permission") + full board reload to revert.
> 5. Same-column drop: no-op (early return).
> 6. `<output aria-live="assertive">` announces DnD transition results.
> 7. CDK styles: `.cdk-drag-preview` with border + shadow, `.cdk-drag-placeholder` with dashed border, smooth animation transitions.
> 8. Write ~8 unit tests: drop to different column calls API, same-column no-op, success growl + reload, error growl + reload, 403 message, DnD announcement, drag handle visibility.
>
> **eUI gotchas:**
> - Sprint filter in `eui-page-header-action-items`, not page content
> - Use `eui-icon-svg` with `dots-six-vertical:regular` (not bare `dots-six-vertical`)
> - eUI has no DnD component — CDK `DragDropModule` is the standard approach (add comment in code)
> - `eui-chip` uses `[isFilled]="true"` for count badges
> - All `<section>` columns need `aria-label`, all cards need `aria-label`
> - Separate `aria-live` regions: `polite` for filter, `assertive` for DnD
>
> **Test commands:**
> - `npm run test:ci` — all frontend tests pass
> - `npx ng build --configuration=development` — build passes
