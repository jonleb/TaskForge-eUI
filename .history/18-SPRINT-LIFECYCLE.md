# 18 — Sprint Lifecycle: Enhanced Views, Ordering & Drag-and-Drop

## What this branch does

Enhances the sprint ecosystem across three views (Sprints, Sprint Planning, Backlog) with inline issue lists, drag & drop reorder, quick-edit modals, and ordering consistency fixes. Work was split across two Change Requests and one bugfix:

- **CR-1801** (branch `CR-1801-SprintView`): Inline issue list per sprint, CDK drag & drop reorder in the Sprints view, quick-edit modal on issue click.
- **CR-1802** (branch `CR-1802-Issues-Ordering`): Fix ordering mismatch between Sprints and Sprint Planning views, add CDK drag & drop to Sprint Planning and Backlog.
- **BUG** (on `CR-1802`): Reorder payloads used 0-indexed positions, causing silent 400 errors from the API which requires `position >= 1`.

## Step-by-step walkthrough

### 1. Inline issue list per sprint (CR-1801 STORY-001)

- Replaced the ticket-count-only display in each sprint card with a full inline issue list showing ticket number, type badge, title, status badge, priority, and assignee.
- Loaded all `BacklogItem` records via `getBacklog(projectId, { _limit: 1000 })` and stored in `allBacklogItems`, filtered per sprint via `getSprintItems(sprintId)` sorted by `position ?? ticket_number`.
- Used semantic `<ul>/<li>` markup with `aria-label` on each item, `tabindex="0"` for keyboard focus, and "No issues" empty state for sprints without tickets.
- Closed sprints render items without `tabindex` (read-only).

Files: `sprints.component.html`, `sprints.component.ts`, `sprints.component.scss`, `sprints.component.spec.ts`, `en.json`, `fr.json`

### 2. Drag & drop reorder within sprint (CR-1801 STORY-002)

- Added Angular CDK `DragDropModule` (`cdkDropList` on `<ul>`, `cdkDrag` on `<li>`, `<button cdkDragHandle>` with `dots-six-vertical:regular` icon) — eUI has no native drag & drop component.
- `onIssueDrop()` calls `moveItemInArray`, builds a reorder payload, and persists via `PUT /api/projects/:projectId/backlog/reorder`.
- Drag disabled for users without `canManage` permission and for CLOSED sprints.
- `<output aria-live="assertive">` announces reorder result to screen readers.
- CDK drag preview/placeholder styles adapted from eUI table showcase pattern.

Files: `sprints.component.html`, `sprints.component.ts`, `sprints.component.scss`, `sprints.component.spec.ts`, `en.json`, `fr.json`

### 3. Quick-edit modal on issue click (CR-1801 STORY-003)

- Clicking an issue row opens an `eui-dialog` with editable fields: title, description, status, priority, assignee.
- Saves via `PATCH /api/projects/:projectId/backlog/:ticketNumber` using existing `updateTicket` service method.
- Dialog title includes ticket number (e.g. "Edit #3 — Fix login bug"). `cdr.detectChanges()` called before `openDialog()` per eUI dialog pitfall.
- Loaded project members for the assignee dropdown. Form uses `euiLabel`, `euiRequired`, `euiInputText`, `euiTextArea`, `euiSelect` directives.
- Success/error growl on save; data reloads after successful edit.

Files: `sprints.component.html`, `sprints.component.ts`, `sprints.component.scss`, `sprints.component.spec.ts`, `en.json`, `fr.json`

### 4. Fix sprint planning ordering consistency (CR-1802 STORY-001)

- Sprint Planning's `loadData()` assigned `sprintTickets` and `availableTickets` from API response without sorting, while the Sprints view sorted by `position ?? ticket_number`. This caused the same sprint's issues to appear in different orders.
- Added `.sort((a, b) => (a.position ?? a.ticket_number) - (b.position ?? b.ticket_number))` to both filtered arrays.
- 3 new ordering tests added.

Files: `sprint-planning.component.ts`, `sprint-planning.component.spec.ts`

### 5. Drag & drop reorder in Sprint Planning (CR-1802 STORY-002)

- Added CDK `DragDropModule` to the sprint tickets section with the same pattern: `cdkDropList`, `cdkDrag`, `<button cdkDragHandle>` with `dots-six-vertical:regular` icon.
- `onSprintTicketDrop()` auto-saves via `reorderBacklog()` (unlike Backlog which uses save/discard bar).
- Drag disabled when `isReadOnly` (no permission or CLOSED sprint).
- Screen reader announcements via `<output aria-live="assertive">`.
- 8 new tests added.

Files: `sprint-planning.component.html`, `sprint-planning.component.ts`, `sprint-planning.component.scss`, `sprint-planning.component.spec.ts`, `en.json`, `fr.json`

### 6. Drag & drop reorder in Backlog (CR-1802 STORY-003)

- Added CDK drag & drop to the backlog card list alongside existing arrow-button reorder.
- `onBacklogDrop()` calls `moveItemInArray` + `updateLocalPositions()` but does NOT auto-save — uses the existing save/discard bar pattern.
- Drag handle added inside `.reorder-controls` before the position badge and arrow buttons.
- Drag disabled when `isReorderMode` is false (filters active or non-position sort).
- 8 new tests added.

Files: `backlog.component.html`, `backlog.component.ts`, `backlog.component.scss`, `backlog.component.spec.ts`, `en.json`, `fr.json`

### 7. BUG FIX — Reorder not synced between views (CR-1802-BUG)

- Both `sprints.component.ts` (`onIssueDrop`) and `sprint-planning.component.ts` (`onSprintTicketDrop`) sent 0-indexed positions (`position: index` → 0, 1, 2) in reorder payloads.
- The mock server validates `position >= 1`, so every reorder silently returned 400 Bad Request. The error handler reloaded data, reverting the visual change.
- Fixed by changing `position: index` to `position: index + 1` in both components.

Files: `sprints.component.ts`, `sprint-planning.component.ts`

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/18-Sprint_lifecycle/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest).
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

- **CDK DragDropModule over eUI**: eUI has no drag & drop component (confirmed via MCP compodoc search). Angular CDK `DragDropModule` is the standard — `cdkDropList` on container, `cdkDrag` on items, `<button cdkDragHandle>` with `dots-six-vertical:regular` icon. This pattern was established in CR-1801 STORY-002 and reused consistently across all three views.
- **Drag handle as `<button>` not `<div>`**: Using a semantic `<button>` element for the drag handle ensures keyboard accessibility and proper focus management. The `all: unset` CSS reset removes default button styling while preserving semantics.
- **Auto-save vs save/discard bar**: Sprint Planning and Sprints view auto-save on drop (immediate API call). Backlog uses the existing save/discard bar pattern — drag reorder marks changes as dirty, user explicitly clicks "Save" to persist. This matches the pre-existing arrow-button reorder UX in the Backlog.
- **1-indexed positions**: The reorder API requires `position >= 1`. The original implementation used 0-indexed positions (`position: index`), causing silent 400 errors. Fixed to `position: index + 1`. This is a critical contract to remember for any future reorder code.
- **`cdr.detectChanges()` before `openDialog()`**: eUI dialog captures `[acceptLabel]` and `[title]` at overlay creation time. Without `detectChanges()`, dynamic labels show stale values. This pitfall is documented in `eui-pitfalls.md`.
- **Sorting consistency**: All views that display sprint tickets must sort by `(a.position ?? a.ticket_number) - (b.position ?? b.ticket_number)`. The `?? ticket_number` fallback handles items without a position (legacy data).
- **Screen reader announcements**: Every drag & drop implementation includes an `<output aria-live="assertive">` region that announces the new position after a drop (e.g. "Ticket #3 moved to position 2 of 5"). This is essential for WCAG 2.2 AA compliance.
- **Arrow buttons kept in Backlog**: Drag & drop was added alongside existing arrow-button reorder, not as a replacement. Arrow buttons provide a keyboard-friendly alternative that doesn't require CDK keyboard shortcuts (Enter → Arrow → Enter).

## Git history

```
c6ddacb docs(CR-1802): add BUG report for ordering sync issue
0d799cf fix(CR-1802): use 1-indexed positions in sprint reorder payloads
7442238 feat(CR-1802): STORY-003 — Drag & drop reorder in Backlog
a979a96 feat(CR-1802): STORY-002 — Drag & drop reorder in Sprint Planning
25d99c8 fix(CR-1802): STORY-001 — Fix sprint planning ordering consistency
af86561 docs(CR-1802): add Change Request and stories
8be1598 feat(CR-1801): STORY-003 — Quick-edit modal on issue click
7a191b3 feat(CR-1801): STORY-002 — Drag & drop reorder within sprint
95ab306 feat(CR-1801): STORY-001 — Inline issue list per sprint
ff5c50f docs(CR-1801): update STORY-002 with eUI showcase CDK drag & drop pattern
9b21ce7 docs(CR-1801): add stories breakdown
447b04d docs(CR-1801): add Change Request for enhanced sprint view
```

## Test summary

- Frontend: 598 unit tests (vitest) — all passing (up from 513 at branch 17)
- Backend: no new endpoints — existing mock tests unaffected
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full Sprint Lifecycle enhancement on a fresh eUI Angular project that already has: project management with sprints, a backlog with `BacklogItem` model (including `position`, `sprint_id`, `ticket_number`, `status`, `priority`, `assignee_id`, `type`, `title`, `description`), a `ProjectService` with `getBacklog()`, `getSprints()`, `updateTicket()`, `reorderBacklog()`, `getProjectMembers()`, `assignSprintItems()`, `removeSprintItem()` methods, a `PermissionService` with `hasProjectRole()`, and `@angular/cdk` installed.

---

**Prompt:**

> Implement the following sprint lifecycle enhancements across three views. All drag & drop uses Angular CDK `DragDropModule` (eUI has no native drag & drop component). All i18n keys must be added in both `en.json` and `fr.json`. All implementations must follow WCAG 2.2 AA: semantic HTML, `aria-label` on icon-only buttons, `aria-live` regions for dynamic updates, keyboard navigability.
>
> **CR-1801: Enhanced Sprint View**
>
> STORY-001 — Inline Issue List per Sprint:
> - In `sprints.component`, load all backlog items via `getBacklog(projectId, { _limit: 1000 })` into `allBacklogItems`.
> - Add `getSprintItems(sprintId)` method that filters by `sprint_id` and sorts by `(a.position ?? a.ticket_number) - (b.position ?? b.ticket_number)`.
> - Render a `<ul>` per sprint with `<li>` items showing: ticket number, type badge (`eui-chip`), title, status badge (`eui-status-badge`), priority, assignee name.
> - Each `<li>` has `tabindex="0"` and `aria-label` with ticket number and title. Show "No issues" for empty sprints. Closed sprint items have no tabindex.
>
> STORY-002 — Drag & Drop Reorder within Sprint:
> - Add `cdkDropList` on the `<ul>`, `cdkDrag` on each `<li>`, `<button cdkDragHandle>` with `dots-six-vertical:regular` icon.
> - `[cdkDropListDisabled]="!canManage || sprint.status === 'CLOSED'"`. Handle not rendered when disabled.
> - `onIssueDrop(event, sprint)`: guard same-index, `moveItemInArray`, build payload with `position: index + 1` (CRITICAL: API requires position >= 1), call `reorderBacklog()`. Update local `allBacklogItems` positions on success. Error handler reloads data.
> - `<output aria-live="assertive">` for screen reader announcements.
> - CDK styles: `.cdk-drag-preview` (white bg, primary border, shadow), `.cdk-drag-placeholder` (grey dashed border, 0.5 opacity), `.cdk-drop-list-dragging` transition.
>
> STORY-003 — Quick-Edit Modal on Issue Click:
> - `(click)="openEditDialog(item, sprint)"` and `(keydown.enter)` on each `<li>`.
> - `eui-dialog` with `#editDialog` ViewChild. Fields: title (`euiInputText`), description (`euiTextArea`), status (`select[euiSelect]`), priority (`select[euiSelect]`), assignee (`select[euiSelect]`).
> - Call `cdr.detectChanges()` before `editDialog.openDialog()` (eUI pitfall: dialog captures labels at creation time).
> - `onSaveEdit()` calls `updateTicket()`, closes dialog, shows success growl, reloads sprints. Error sets `editError` displayed via `eui-feedback-message`.
> - Load project members on init for assignee dropdown.
> - Dialog uses `[dismissLabel]` not `[cancelLabel]`.
>
> **CR-1802: Issues Ordering Consistency & Drag-and-Drop**
>
> STORY-001 — Fix Sprint Planning Ordering:
> - In `sprint-planning.component.ts` `loadData()`, sort both `availableTickets` and `sprintTickets` by `(a.position ?? a.ticket_number) - (b.position ?? b.ticket_number)` after filtering.
>
> STORY-002 — Drag & Drop in Sprint Planning:
> - Same CDK pattern as Sprints view. `cdkDropList` on sprint tickets container, `cdkDrag` on each card, `<button cdkDragHandle>` with `dots-six-vertical:regular`.
> - `onSprintTicketDrop()`: `moveItemInArray`, payload with `position: index + 1`, call `reorderBacklog()`. Auto-saves immediately.
> - Disabled when `isReadOnly` (no permission or CLOSED sprint).
>
> STORY-003 — Drag & Drop in Backlog:
> - Same CDK pattern. `cdkDropList` wrapping the card list `@for`, `cdkDrag` on each `.card-row`.
> - `onBacklogDrop()`: `moveItemInArray`, `updateLocalPositions()`, set `reorderAnnouncement`. Does NOT auto-save — uses existing save/discard bar.
> - Drag handle added inside `.reorder-controls` before position badge and arrow buttons. Arrow buttons kept as keyboard alternative.
> - `[cdkDropListDisabled]="!isReorderMode"` (disabled when filters active or non-position sort).
>
> **BUG FIX — 0-indexed positions:**
> - CRITICAL: The reorder API requires `position >= 1`. Always use `position: index + 1` in reorder payloads, never `position: index`.
>
> **Constraints:**
> - eUI has no drag & drop component — use CDK `DragDropModule` with comment explaining why.
> - Icon naming: `dots-six-vertical:regular` (Phosphor set), `arrow-up:regular`, `arrow-down:regular`. Never bare names.
> - `eui-icon-button` uses `[euiDisabled]` not `[disabled]`.
> - `eui-dialog` uses `[dismissLabel]` not `[cancelLabel]`.
> - `eui-page-header` must use open/close tags for content projection.
> - Frontend tests: `npm run test:ci`. Build: `npx ng build --configuration=development`.
