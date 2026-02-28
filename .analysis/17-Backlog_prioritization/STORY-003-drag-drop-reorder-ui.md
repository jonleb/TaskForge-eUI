# STORY-003: Frontend — Drag-and-Drop Reorder UI

## Objective

Add a "Priority order" sort option (default when no filters active) and implement keyboard-accessible move-up/move-down buttons for reordering backlog items. No third-party drag-and-drop library — use simple move-up/move-down icon buttons per card for accessibility and simplicity.

## UI Design

### Sort option
- Add "Priority order" as the first sort option (sort by `position` asc)
- Make it the default sort when the page loads
- When "Priority order" is selected and user `canReorder`, show move buttons on each card

### Move buttons (instead of drag-and-drop)
- Two `eui-icon-button` per card: move-up (`eui-arrow-up` or `arrow-up:regular`) and move-down (`eui-arrow-down` or `arrow-down:regular`)
- First item: move-up disabled; last item: move-down disabled
- Clicking move-up/move-down swaps the item with its neighbor in the local array
- This approach is fully keyboard-accessible without needing CDK DragDrop

### Reorder mode
- `isReorderMode` flag: true when sort is "Priority order" AND `canReorder` is true AND no filters are active
- When not in reorder mode, move buttons are hidden
- Position numbers displayed as a badge/chip on each card when in reorder mode

## Implementation Notes

- eUI does not have a built-in drag-and-drop component, so move-up/move-down buttons are the accessible alternative
- Angular CDK DragDrop could be used but adds complexity; simple button-based reorder is sufficient for MVP
- The local `items` array is mutated on move; dirty state tracked by comparing to original positions

## i18n Keys (~6)

- `backlog.sort.position`: "Priority order"
- `backlog.reorder.move-up`: "Move up"
- `backlog.reorder.move-down`: "Move down"
- `backlog.reorder.position-label`: "Position"
- `backlog.reorder.mode-hint`: "Reorder mode: use move buttons to change priority order."
- `backlog.reorder.filters-hint`: "Clear filters and sort by priority order to enable reordering."

## Unit Tests (~8)

| # | Test |
|---|------|
| 1 | Default sort is position asc |
| 2 | Move-up swaps item with previous |
| 3 | Move-down swaps item with next |
| 4 | Move-up disabled on first item |
| 5 | Move-down disabled on last item |
| 6 | Move buttons hidden when not in reorder mode |
| 7 | Move buttons hidden when filters active |
| 8 | Position badge shown in reorder mode |

## Files Modified

| File | Modification |
|------|-------------|
| `src/app/features/projects/backlog/backlog.component.ts` | Add reorder logic, move methods, isReorderMode |
| `src/app/features/projects/backlog/backlog.component.html` | Add move buttons, position badge |
| `src/app/features/projects/backlog/backlog.component.scss` | Minimal styling for move buttons |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Add ~8 tests |
| `src/assets/i18n/en.json` | Add i18n keys |
| `src/assets/i18n/fr.json` | Add i18n keys |
