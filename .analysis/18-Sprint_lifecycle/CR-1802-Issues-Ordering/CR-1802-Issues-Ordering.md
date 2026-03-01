# CR-1802 — Issues Ordering Consistency & Drag-and-Drop

## Problem

1. **Ordering out of sync**: The Sprints view (`sprints.component`) sorts inline issues by `position ?? ticket_number`, but the Sprint Planning view (`sprint-planning.component`) displays `sprintTickets` in the raw order returned by the API (no explicit sort). This causes the same sprint's issues to appear in different orders depending on which page the user is viewing.

2. **No drag & drop in Sprint Planning**: The Sprints view already supports CDK drag & drop reorder (CR-1801 STORY-002), but Sprint Planning — where users actively manage sprint content — has no reorder capability at all.

3. **No drag & drop in Backlog**: The Backlog view has arrow-button reorder (move up/down) but no drag & drop. This is inconsistent with the Sprints view and less efficient for large reorder operations.

## Goals

- Ensure issue ordering is consistent across all views that display the same data (Sprints view, Sprint Planning, Backlog).
- Add CDK drag & drop reorder to Sprint Planning (sprint tickets column).
- Replace the arrow-button reorder in Backlog with CDK drag & drop (or add drag & drop alongside existing arrows).
- All reorder operations persist via the existing `PUT /api/projects/:projectId/backlog/reorder` endpoint.
- All drag & drop implementations follow the same CDK `DragDropModule` pattern already established in the Sprints view (CR-1801 STORY-002): `cdkDropList`, `cdkDrag`, `<button cdkDragHandle>` with `dots-six-vertical:regular` icon, `<output aria-live="assertive">` for screen reader announcements.

## Technical Context

- **eUI has no drag & drop component** — confirmed via MCP search. CDK `DragDropModule` is the project standard (already installed as `@angular/cdk` dependency).
- **Reorder API**: `PUT /api/projects/:projectId/backlog/reorder` accepts `{ items: [{ ticket_number, position }] }`. Requires `PROJECT_ADMIN` or `PRODUCT_OWNER` role.
- **Sprints view pattern** (reference): `cdkDropList` on `<ul>`, `cdkDrag` on `<li>`, `cdkDragHandle` on a `<button>` with `dots-six-vertical:regular` icon, `moveItemInArray` from `@angular/cdk/drag-drop`, screen reader `<output aria-live="assertive">` for reorder announcements.

## Scope

| # | Change | View | Type |
|---|--------|------|------|
| 1 | Fix ordering consistency — sort `sprintTickets` by `position ?? ticket_number` | Sprint Planning | Bug fix |
| 2 | Add CDK drag & drop reorder to sprint tickets column | Sprint Planning | Feature |
| 3 | Add CDK drag & drop reorder to backlog card list | Backlog | Feature |

## Out of Scope

- Cross-list drag & drop (dragging tickets between sprints or between backlog and sprint).
- Drag & drop in the Sprints view (already implemented in CR-1801 STORY-002).
- Changes to the reorder API endpoint.

## Accessibility

- Drag handle `<button cdkDragHandle>` with `aria-label` and `euiTooltip`.
- `<output aria-live="assertive">` for screen reader reorder announcements.
- Keyboard alternative: CDK drag & drop supports keyboard reorder natively (Enter to pick up, Arrow keys to move, Enter to drop).
- Existing arrow-button reorder in Backlog can be kept as a keyboard-friendly alternative alongside drag & drop.
