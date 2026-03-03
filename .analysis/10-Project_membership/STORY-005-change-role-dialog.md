# STORY-005: Frontend — Change Role Dialog

## Objective

Allow managers to change an existing member's role via a confirmation dialog with a role select dropdown. Uses `projectService.upsertMember()` (PUT) to update the role. Handles 403 errors (SUPER_ADMIN protection) with an inline error message.

## Existing Code

- `src/app/features/projects/members/members.component.ts` — `MembersComponent` with `openChangeRoleDialog()` placeholder, `isManager`, `members`, `project`, `loadMembers()`. Imports: `EUI_PAGE`, `EUI_TABLE`, `EUI_CHIP`, `EUI_BUTTON`, `EuiTemplateDirective`, `EuiIconButtonComponent`.
- `src/app/features/projects/members/members.component.html` — table with edit icon button calling `openChangeRoleDialog(row)`.
- `src/app/core/project/project.service.ts` — `upsertMember(projectId, payload)` sends PUT.
- `src/app/core/project/project.models.ts` — `PROJECT_ROLES`, `ProjectRole`, `UpsertMemberPayload`, `ProjectMember`.

## Implementation Plan

### 1. Update `members.component.ts`

- Add imports: `ViewChild`, `FormsModule`, `EuiDialogComponent`, `EUI_SELECT`, `EUI_LABEL`, `EUI_FEEDBACK_MESSAGE`, `EuiGrowlService`, `PROJECT_ROLES`.
- Add `@ViewChild('changeRoleDialog') changeRoleDialog!: EuiDialogComponent`.
- Add properties: `selectedMember: ProjectMember | null`, `newRole: string`, `changeRoleError: string`, `projectRoles = PROJECT_ROLES`.
- Implement `openChangeRoleDialog(member)`: store member, set `newRole` to current role, clear error, open dialog.
- Implement `onChangeRole()`: call `upsertMember()` with `selectedMember.userId` and `newRole`. On success: close dialog, growl, reload members. On 403: set `changeRoleError`. On other error: growl error.
- Implement `resetChangeRoleForm()`: clear `selectedMember`, `newRole`, `changeRoleError`.

### 2. Update `members.component.html`

Add dialog after the table:
```html
<eui-dialog #changeRoleDialog
    title="Change Role"
    acceptLabel="Save"
    [isHandleCloseOnAccept]="true"
    (accept)="onChangeRole()"
    (dismiss)="resetChangeRoleForm()">
    @if (selectedMember) {
        <p>Change role for {{ selectedMember.firstName }} {{ selectedMember.lastName }}:</p>
        <label euiLabel for="newRoleSelect">New role</label>
        <select euiSelect id="newRoleSelect" [(ngModel)]="newRole" aria-required="true">
            @for (r of projectRoles; track r) {
                <option [value]="r">{{ r }}</option>
            }
        </select>
        @if (changeRoleError) {
            <eui-feedback-message euiDanger aria-live="assertive">
                {{ changeRoleError }}
            </eui-feedback-message>
        }
    }
</eui-dialog>
```

### 3. Update `members.component.spec.ts`

Add tests:
- `openChangeRoleDialog` stores member and pre-fills role
- `onChangeRole` success: reloads members, shows growl
- `onChangeRole` 403 error: sets `changeRoleError`
- `resetChangeRoleForm` clears state

## Files Modified

| File | Modification |
|------|----|
| `src/app/features/projects/members/members.component.ts` | Add dialog logic, imports |
| `src/app/features/projects/members/members.component.html` | Add change role dialog |
| `src/app/features/projects/members/members.component.spec.ts` | Add ~6 tests |

## Acceptance Criteria

- [ ] Dialog shows member name and current role pre-selected
- [ ] Selection among 5 project roles
- [ ] Successful change: closes dialog, growl success, reloads members
- [ ] Error 403 (SUPER_ADMIN protection): inline error message
- [ ] Form reset on close/dismiss
- [ ] Accessibility: labels, aria-required, aria-live for errors
- [ ] Unit tests pass
- [ ] Build passes
