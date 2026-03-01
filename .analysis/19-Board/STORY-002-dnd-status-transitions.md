# STORY-002 — Drag & Drop Status Transitions

## Goal
Enable drag & drop of ticket cards between board columns to change ticket status, constrained by workflow transition rules.

## Acceptance Criteria
- [ ] Each column is a `cdkDropList` connected to all other columns via `[cdkDropListConnectedTo]`.
- [ ] Each ticket card is `cdkDrag` with a drag handle (`dots-six-vertical:regular` icon button).
- [ ] On drop, calls `ProjectService.updateTicket(projectId, ticketNumber, { status: targetStatus })`.
- [ ] On success: card moves to target column, success growl shown, `aria-live` announces the transition.
- [ ] On error (400 invalid transition): card snaps back to original column, error growl with message "Transition from X to Y is not allowed".
- [ ] On error (403 forbidden): card snaps back, error growl with permission message.
- [ ] Drag is disabled for users without `canManage` permission (drag handle hidden, `[cdkDragDisabled]="true"`).
- [ ] Visual feedback: drop placeholder with dashed border, drag preview with shadow.
- [ ] After successful drop, full board data reloads to ensure consistency.

## Technical Notes
- CDK `DragDropModule`: `cdkDropList` on each column `<section>`, `cdkDrag` on each card.
- `[cdkDropListData]` = array of tickets in that column.
- `cdkDragMoved` not needed — use `cdkDropListDropped` event.
- On drop: `transferArrayItem` from CDK to move between arrays, then API call. On error, reload all data (simpler than manual rollback).
- Transition validation is server-side only (no client-side pre-check needed — keeps it simple and authoritative).
- `<button cdkDragHandle>` with `aria-label="Drag to change status"`.

## a11y
- [ ] Drag handle is a `<button>` with `aria-label`.
- [ ] `<output aria-live="assertive">` announces transition result.
- [ ] Keyboard alternative: user can click card to navigate to ticket detail and change status there (existing functionality).
- [ ] Drag handle hidden (not just disabled) when user lacks permission.

## eUI Components
- `eui-icon-button` or plain `<button>` for drag handle with `dots-six-vertical:regular` icon
- `EuiGrowlService` for success/error feedback

## Files
- `src/app/features/projects/board/board.component.ts` (update)
- `src/app/features/projects/board/board.component.html` (update)
- `src/app/features/projects/board/board.component.scss` (update)
- `src/app/features/projects/board/board.component.spec.ts` (update)
- `src/assets/i18n/en.json` (DnD i18n keys)
- `src/assets/i18n/fr.json` (DnD i18n keys)
