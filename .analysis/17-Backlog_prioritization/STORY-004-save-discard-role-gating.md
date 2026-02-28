# STORY-004: Frontend — Save/Discard Bar & Role Gating

## Objective

Add dirty-state tracking for reorder operations, a save/discard bar, and role-based access control for reorder actions.

## UI Design

### Dirty state
- Track original positions on load (`originalPositions: Map<number, number>` mapping ticket_number → position)
- After any move operation, compare current order to original
- `hasReorderChanges` getter: true when any item's position differs from original

### Save/Discard bar
- Shown when `hasReorderChanges` is true
- "Save order" button: calls `reorderBacklog()` with current positions, shows growl on success/error, reloads backlog
- "Discard" button: restores original order from `originalPositions`
- Bar uses `aria-live="polite"` for screen reader announcement

### Role gating
- `canReorder`: SUPER_ADMIN or PROJECT_ADMIN (per feature spec — backend also allows PRODUCT_OWNER but UI restricts to admin roles)
- Move buttons only visible when `canReorder` is true
- Save/discard bar only visible when `canReorder` is true

## i18n Keys (~5)

- `backlog.reorder.save`: "Save order"
- `backlog.reorder.discard`: "Discard changes"
- `backlog.reorder.growl.saved`: "Backlog order saved"
- `backlog.reorder.growl.save-failed`: "Failed to save backlog order."
- `backlog.reorder.unsaved-hint`: "You have unsaved changes to the backlog order."

## Unit Tests (~8)

| # | Test |
|---|------|
| 1 | hasReorderChanges false initially |
| 2 | hasReorderChanges true after move |
| 3 | Discard restores original order |
| 4 | Save calls reorderBacklog with correct payload |
| 5 | Save shows success growl |
| 6 | Save shows error growl on failure |
| 7 | canReorder true for SUPER_ADMIN |
| 8 | canReorder false for DEVELOPER |

## Files Modified

| File | Modification |
|------|-------------|
| `src/app/features/projects/backlog/backlog.component.ts` | Add save/discard logic, canReorder, originalPositions |
| `src/app/features/projects/backlog/backlog.component.html` | Add save/discard bar |
| `src/app/features/projects/backlog/backlog.component.scss` | Save bar styling |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Add ~8 tests |
| `src/assets/i18n/en.json` | Add i18n keys |
| `src/assets/i18n/fr.json` | Add i18n keys |
