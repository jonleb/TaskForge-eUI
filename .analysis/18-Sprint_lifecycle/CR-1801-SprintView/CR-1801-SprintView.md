# CR-1801: Enhanced Sprint View — Inline Issue List, Drag & Drop Reorder, Quick-Edit Modal

## Context

On the sprint list page (`/screen/projects/:projectId/sprints`), each sprint card currently displays only a ticket count (e.g. "2 ticket(s)"). Users need to see the actual issues inside each sprint, reorder them via drag & drop, and open any item in an edit modal directly from the sprint view — without navigating away.

## Current Behaviour

- Each sprint item (`.sprint-item`) shows: name, status badge, goal, ticket count, date range.
- Ticket count is computed from `BacklogItem[]` filtered by `sprint_id`.
- Clicking a sprint item navigates to the sprint planning page (`sprints/:sprintId`).
- No inline issue list is rendered on the sprint list page itself.

## Requested Changes

### 1. Inline Issue List per Sprint

Display the list of `BacklogItem` records assigned to each sprint directly inside the sprint item, below the existing metadata (goal, ticket count, dates).

Each issue row should display:
- Ticket number (e.g. `#3`)
- Type icon (STORY / BUG / TASK) — use `eui-icon-svg` with appropriate icon, `aria-hidden="true"` since type is also conveyed as text
- Title
- Status badge (`eui-status-badge`)
- Priority badge
- Assignee name (or "Unassigned" placeholder)

The list should be rendered as a semantic `<ul>` with `role="listbox"` to support reordering semantics, or as an `aria-label`-ed container. Each item should be a focusable element.

If a sprint has no issues, display a muted "No issues" message.

### 2. Drag & Drop Reorder

Allow users with `canManage` permission to reorder issues within a sprint via drag & drop.

Implementation approach:
- Use Angular CDK `DragDropModule` (`cdkDropList` / `cdkDrag`) — no eUI drag & drop component exists for this use case.
- On drop, compute new `position` values and call the existing `PUT /api/projects/:projectId/backlog/reorder` endpoint (already used by the backlog page) with the updated positions.
- Show a success growl on reorder completion; error growl on failure.
- Disable drag & drop for users without `canManage` (read-only view).
- Disable drag & drop for CLOSED sprints.

### 3. Quick-Edit Modal on Item Click

When a user clicks an issue row, open an `eui-dialog` modal containing the ticket edit form in edit mode.

Behaviour:
- The dialog should load the full ticket data (`BacklogItem` fields) and present editable fields: title, description, status, priority, assignee.
- Use existing `UpdateTicketPayload` for the save action (`PATCH /api/projects/:projectId/backlog/:ticketNumber`).
- On successful save, close the dialog, show a success growl, and refresh the sprint's issue list.
- On dismiss/cancel, close without saving.
- The dialog title should include the ticket number (e.g. "Edit #3 — Fix login bug").
- `acceptLabel`: i18n key `common.save`, `dismissLabel`: i18n key `common.cancel`.

## Accessibility Requirements

### Inline Issue List
- Use semantic list markup (`<ul>` / `<li>`) for the issue list.
- Each list item must be keyboard-focusable (`tabindex="0"`).
- Status and priority must not rely on colour alone — text labels are required alongside badges.
- `aria-live="polite"` on the list container to announce changes after reorder or edit.

### Drag & Drop
- CDK drag & drop provides built-in keyboard support (arrow keys to move, Space/Enter to pick up/drop).
- Each draggable item needs `aria-roledescription="sortable item"` and an `aria-label` describing the ticket (e.g. "#3 — Fix login bug, priority HIGH").
- Announce reorder result to screen readers via `aria-live="assertive"` region (e.g. "Ticket #3 moved to position 2 of 5").
- When drag & drop is disabled (no permission or CLOSED sprint), remove `cdkDrag` directive entirely — do not just visually hide the handle.

### Quick-Edit Modal
- Dialog must trap focus while open (handled by `eui-dialog`).
- All form inputs must have associated `<label>` elements with `euiLabel` directive and matching `for`/`id` pairs.
- Required fields must use `euiRequired` / `aria-required="true"`.
- Validation errors announced via `aria-describedby`.
- On close, return focus to the issue row that triggered the dialog.

## Files Likely Affected

### Frontend
- `src/app/features/projects/sprints/sprints.component.html` — add inline issue list, drag & drop, click handler for modal
- `src/app/features/projects/sprints/sprints.component.ts` — load full backlog items per sprint, reorder logic, edit dialog state
- `src/app/features/projects/sprints/sprints.component.scss` — styles for issue rows, drag placeholder, drag preview
- `src/app/features/projects/sprints/sprints.component.spec.ts` — tests for new features

### i18n
- `src/assets/i18n/en.json` — new keys for reorder announcements, edit dialog labels, empty state
- `src/assets/i18n/fr.json` — French translations

### Backend
- No new endpoints required. Existing endpoints cover all needs:
  - `GET /api/projects/:projectId/backlog?sprint_id=:sprintId` — load sprint items
  - `PUT /api/projects/:projectId/backlog/reorder` — persist reorder
  - `PATCH /api/projects/:projectId/backlog/:ticketNumber` — update ticket

## Dependencies

- `@angular/cdk` — `DragDropModule` for drag & drop (already available in the project)
- Existing `ProjectService` methods: `getBacklog`, `updateTicket`, `reorderBacklog`
- Existing `PermissionService.hasProjectRole` for `canManage` gating

## Out of Scope

- Cross-sprint drag & drop (moving items between sprints)
- Bulk edit of multiple items
- Inline creation of new tickets from the sprint view
