# CR-1802 — Stories Breakdown

| # | Story | View | Complexity | Dependencies |
|---|-------|------|------------|--------------|
| 1 | Fix sprint planning ordering consistency | Sprint Planning | S | None |
| 2 | Drag & drop reorder in Sprint Planning | Sprint Planning | M | STORY-001 |
| 3 | Drag & drop reorder in Backlog | Backlog | M | None |

## STORY-001 — Fix Sprint Planning Ordering Consistency

**Objective**: Sort `sprintTickets` by `position ?? ticket_number` in the Sprint Planning view so the order matches the Sprints view.

**Problem**: `sprint-planning.component.ts` line 94 assigns `sprintTickets` from `backlog.data.filter(...)` without sorting. The Sprints view uses `getSprintItems()` which sorts by `(a.position ?? a.ticket_number) - (b.position ?? b.ticket_number)`. This causes the same sprint's issues to appear in different orders.

**Changes**:
- `sprint-planning.component.ts`: After filtering `sprintTickets`, sort by `position ?? ticket_number` ascending.
- Same sort for `availableTickets` (backlog items without sprint) for consistency.

**Tests**:
- `sprintTickets` are sorted by position ascending.
- `availableTickets` are sorted by position ascending.
- Ordering matches the sort logic in `sprints.component.getSprintItems()`.

**File**: `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.ts`

---

## STORY-002 — Drag & Drop Reorder in Sprint Planning

**Objective**: Add CDK drag & drop to the sprint tickets column in Sprint Planning, allowing users to reorder tickets within a sprint by dragging.

**Prerequisites**: STORY-001 (ordering fix) must be applied first.

**Changes**:

### Template (`sprint-planning.component.html`)
- Add `cdkDropList` on the sprint tickets container (the `@for` loop parent).
- Add `cdkDrag` on each sprint ticket `eui-card`.
- Add `<button cdkDragHandle>` with `dots-six-vertical:regular` icon inside each card (visible only when `!isReadOnly`).
- Add `[cdkDropListDisabled]="isReadOnly"` to disable drag in read-only mode.
- Add `(cdkDropListDropped)="onSprintTicketDrop($event)"` handler.
- Add `<output aria-live="assertive">` for screen reader reorder announcements.

### Component (`sprint-planning.component.ts`)
- Import `CdkDragDrop, DragDropModule, moveItemInArray` from `@angular/cdk/drag-drop`.
- Import `EUI_ICON`, `EuiTooltipDirective`.
- Add `reorderAnnouncement = ''` state.
- Add `onSprintTicketDrop(event: CdkDragDrop<BacklogItem[]>)` method:
  - Guard: `if (event.previousIndex === event.currentIndex || !project) return`.
  - `moveItemInArray(sprintTickets, previousIndex, currentIndex)`.
  - Build reorder payload from new positions.
  - Set `reorderAnnouncement` for screen reader.
  - Call `projectService.reorderBacklog(projectId, payload)`.
  - On success: update local positions, show success growl.
  - On error: show error growl, reload data.

### Styles (`sprint-planning.component.scss`)
- Add drag handle styles (reuse pattern from `sprints.component.scss`).
- Add CDK drag preview/placeholder styles.

### i18n
- Add `sprint.planning.drag-handle` and `sprint.planning.drag-handle-tooltip` keys (en/fr).
- Add `sprint.planning.reorder-announcement` key (en/fr).

**Tests**:
- Drag handle visible when `canManage` is true and sprint is not closed.
- Drag handle hidden when `isReadOnly`.
- `onSprintTicketDrop` calls `reorderBacklog` with correct payload.
- No-op when `previousIndex === currentIndex`.
- Success growl on reorder.
- Error growl on reorder failure.
- `reorderAnnouncement` updated after drop.
- `aria-live="assertive"` region present.

**Files**:
- `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.html`
- `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.ts`
- `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.scss`
- `src/assets/i18n/en.json`
- `src/assets/i18n/fr.json`

---

## STORY-003 — Drag & Drop Reorder in Backlog

**Objective**: Add CDK drag & drop to the backlog card list, allowing users to reorder tickets by dragging instead of (or in addition to) the existing arrow buttons.

**Changes**:

### Template (`backlog.component.html`)
- Wrap the card list `@for` loop in a container with `cdkDropList`.
- Add `cdkDrag` on each `.card-row` div.
- Add `<button cdkDragHandle>` with `dots-six-vertical:regular` icon inside each card row (visible only when `isReorderMode`).
- Add `[cdkDropListDisabled]="!isReorderMode"` to disable drag when not in reorder mode (filters active or wrong sort).
- Add `(cdkDropListDropped)="onBacklogDrop($event)"` handler.
- Add `<output aria-live="assertive">` for screen reader reorder announcements.
- Keep existing arrow buttons as keyboard-friendly alternative.

### Component (`backlog.component.ts`)
- Import `CdkDragDrop, DragDropModule, moveItemInArray` from `@angular/cdk/drag-drop`.
- Import `EUI_ICON`, `EuiTooltipDirective`.
- Add `reorderAnnouncement = ''` state.
- Add `onBacklogDrop(event: CdkDragDrop<BacklogItem[]>)` method:
  - Guard: `if (event.previousIndex === event.currentIndex) return`.
  - `moveItemInArray(items, previousIndex, currentIndex)`.
  - `updateLocalPositions()` (existing method).
  - Set `reorderAnnouncement` for screen reader.
  - Note: Does NOT auto-save — uses existing save/discard bar pattern (user clicks "Save" to persist).

### Styles (`backlog.component.scss`)
- Add drag handle styles (reuse pattern from `sprints.component.scss`).
- Add CDK drag preview/placeholder styles for content cards.

### i18n
- Add `backlog.reorder.drag-handle` and `backlog.reorder.drag-handle-tooltip` keys (en/fr).
- Add `backlog.reorder.announcement` key (en/fr).

**Tests**:
- Drag handle visible when `isReorderMode` is true.
- Drag handle hidden when `isReorderMode` is false (filters active or non-position sort).
- `onBacklogDrop` calls `moveItemInArray` and `updateLocalPositions`.
- No-op when `previousIndex === currentIndex`.
- `hasReorderChanges` becomes true after drag reorder.
- `reorderAnnouncement` updated after drop.
- `aria-live="assertive"` region present.
- Existing arrow buttons still work alongside drag & drop.

**Files**:
- `src/app/features/projects/backlog/backlog.component.html`
- `src/app/features/projects/backlog/backlog.component.ts`
- `src/app/features/projects/backlog/backlog.component.scss`
- `src/assets/i18n/en.json`
- `src/assets/i18n/fr.json`
