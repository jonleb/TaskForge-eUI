# STORY-006 — Frontend: Close sprint confirmation dialog

## Objective
When closing a sprint that has unresolved tickets (status ≠ DONE), show a confirmation dialog before proceeding.

## Flow
1. User clicks "Close Sprint" on an ACTIVE sprint.
2. Component checks sprint tickets: filters those with `status !== 'DONE'`.
3. If all tickets are DONE → call `updateSprintStatus(projectId, sprintId, { status: 'CLOSED' })` directly. Show success growl.
4. If unresolved tickets exist → open confirmation dialog:
   - Title: "Close Sprint"
   - Message: "This sprint has N unresolved ticket(s). They will be moved back to the backlog."
   - List of unresolved tickets (ticket number + title + status chip)
   - Accept: "Close & move tickets"
   - Dismiss: "Cancel"
5. On accept → call `updateSprintStatus(projectId, sprintId, { status: 'CLOSED', move_open_tickets_to_backlog: true })`.
6. On success → growl, refresh sprint list.

## eUI components
- `eui-dialog` for confirmation
- `eui-chip` for status badges on unresolved tickets
- `eui-feedback-message` (euiWarning) for the warning message

## a11y
- Dialog has `aria-haspopup="dialog"` on trigger button.
- Unresolved ticket list uses semantic `<ul>` with `<li>` items.
- Warning message uses `eui-feedback-message` with `euiWarning` for proper semantics.

## Unit tests
- Close sprint with all DONE tickets: no dialog, direct close
- Close sprint with unresolved tickets: dialog shown
- Accept dialog: calls API with move flag
- Dismiss dialog: no API call
- Growl on success/error
