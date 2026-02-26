# STORY-006: Frontend — Remove Member with Confirmation

## Objective

Allow managers (SUPER_ADMIN, PROJECT_ADMIN) to remove a member from the project via a confirmation dialog triggered from the trash icon button in the Members table.

## Dependencies

- STORY-003 (Members page with table and action buttons)
- STORY-002 (`ProjectService.removeMember()` method)

## Scope

- Update `MembersComponent` with remove dialog logic and template.
- Confirmation dialog showing the member's name and an explicit warning about access revocation.
- Success: close dialog, growl notification, reload members.
- Error 403 (SUPER_ADMIN protection): inline feedback message.
- Other errors: growl error notification.
- Form reset on dismiss.

## Implementation Details

### Component (`members.component.ts`)

- Add `@ViewChild('removeDialog') removeDialog: EuiDialogComponent`.
- Add properties: `memberToRemove: ProjectMember | null`, `removeError: string`.
- Replace `openRemoveDialog()` placeholder:
  - Store member in `memberToRemove`.
  - Clear `removeError`.
  - Force change detection (`cdr.detectChanges()`).
  - Open dialog.
- Implement `onRemoveMember()`:
  - Guard: return if `!memberToRemove || !project`.
  - Call `projectService.removeMember(projectId, memberToRemove.userId)`.
  - Success: close dialog, growl success with member name, reset form, reload members.
  - Error 403: set `removeError` to server message or default "Cannot remove a super administrator."
  - Other errors: growl error notification.
- Implement `resetRemoveForm()`: clear `memberToRemove` and `removeError`.

### Template (`members.component.html`)

- Add `<eui-dialog #removeDialog>` after the change role dialog:
  - `title="Remove Member"`
  - `acceptLabel="Remove"`
  - `[isHandleCloseOnAccept]="true"`
  - `(accept)="onRemoveMember()"`
  - `(dismiss)="resetRemoveForm()"`
- Dialog content:
  - Confirmation paragraph: "Are you sure you want to remove **{firstName} {lastName}** from this project?"
  - Warning paragraph: "This will revoke their access immediately."
  - Error `<eui-feedback-message euiDanger aria-live="assertive">` when `removeError` is set.

### Tests (`members.component.spec.ts`)

- `openRemoveDialog()` stores member and clears error.
- `onRemoveMember()` success: calls `removeMember`, growl success, resets form, reloads.
- `onRemoveMember()` 403 error: sets `removeError`.
- `onRemoveMember()` non-403 error: growl error, `removeError` stays empty.
- `resetRemoveForm()` clears state.

## Acceptance Criteria

- [ ] Confirmation dialog shows member name
- [ ] Explicit message about access revocation
- [ ] Successful removal: closes dialog, growl success, reloads members
- [ ] Error 403 (SUPER_ADMIN protection): inline error message in dialog
- [ ] Other errors: growl error notification
- [ ] Dismiss closes dialog without action
- [ ] Form reset on close/dismiss
- [ ] Accessibility: `aria-live="assertive"` on error feedback
- [ ] Unit tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
