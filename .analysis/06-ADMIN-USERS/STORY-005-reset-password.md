# STORY-005: Frontend — Reset Password Action

## Goal

Wire the existing "Reset Password" icon button in each user row to show a confirmation dialog, call the API, and display the new temporary password. Reuse the existing `#tempPasswordDialog` from STORY-004.

## Prerequisites

- STORY-004 complete — `UsersComponent` has `#tempPasswordDialog`, `temporaryPassword` property, `copyPassword()` method
- STORY-002 complete — `AdminUserService.resetPassword(userId)` available
- Model: `ResetPasswordResponse` with `temporaryPassword: string` defined in `admin-user.models.ts`
- Backend: `POST /api/admin/users/:userId/reset-password` returns `{ temporaryPassword: "..." }` (200) or 404

## Current State

The reset password icon button already exists in the table template:

```html
<eui-icon-button
    icon="key:regular"
    size="s"
    [ariaLabel]="'Reset password for ' + row.username">
</eui-icon-button>
```

It has no `(click)` handler yet. The `#tempPasswordDialog` and `copyPassword()` method already exist from STORY-004.

## eUI Components & Imports

No new imports needed. All required components are already in `UsersComponent`:

| Component | Already Imported | Purpose |
|-----------|-----------------|---------|
| `eui-dialog` | ✅ `EuiDialogComponent` | Confirmation dialog |
| `EuiGrowlService` | ✅ from `@eui/core` | Error notification |
| `eui-icon-button` | ✅ `EUI_ICON_BUTTON` | Reset password trigger (existing) |

## Implementation Plan

### 1. Add confirmation dialog to template (`users.component.html`)

Add a new `<eui-dialog>` for the reset password confirmation:

```html
<eui-dialog #resetPasswordDialog
    [title]="'Reset Password'"
    [acceptLabel]="'Reset Password'"
    [dismissLabel]="'Cancel'"
    [width]="'450px'"
    (accept)="onConfirmResetPassword()">

    <p>Are you sure you want to reset the password for <strong>{{ selectedUser?.username }}</strong>?</p>
    <p>A new temporary password will be generated.</p>
</eui-dialog>
```

### 2. Wire the icon button click handler (`users.component.html`)

Update the existing reset password icon button to add a click handler and `aria-haspopup`:

```html
<eui-icon-button
    icon="key:regular"
    size="s"
    [ariaLabel]="'Reset password for ' + row.username"
    aria-haspopup="dialog"
    (click)="onResetPassword(row)">
</eui-icon-button>
```

### 3. Add component logic (`users.component.ts`)

```typescript
// Add ViewChild ref:
@ViewChild('resetPasswordDialog') resetPasswordDialog!: EuiDialogComponent;

// Add property:
selectedUser: AdminUser | null = null;

// Add methods:
onResetPassword(user: AdminUser): void {
    this.selectedUser = user;
    this.resetPasswordDialog.openDialog();
}

onConfirmResetPassword(): void {
    if (!this.selectedUser) return;

    this.adminUserService.resetPassword(this.selectedUser.id).subscribe({
        next: res => {
            this.temporaryPassword = res.temporaryPassword;
            this.tempPasswordDialog.openDialog();
            this.cdr.markForCheck();
        },
        error: err => {
            this.growlService.growl({
                severity: 'error',
                summary: 'Reset failed',
                detail: err.error?.message || 'Could not reset password. Please try again.',
            });
        },
    });
}
```

### 4. Update temp password dialog title

The `#tempPasswordDialog` currently has `[title]="'User Created Successfully'"`. It needs to work for both create and reset flows. Two options:

**Option A (recommended):** Make the title dynamic:

```typescript
// Add property:
tempPasswordTitle = 'User Created Successfully';
```

```html
<eui-dialog #tempPasswordDialog
    [title]="tempPasswordTitle"
    ...>
```

Then set `tempPasswordTitle = 'User Created Successfully'` in `onCreateUser()` success and `tempPasswordTitle = 'Password Reset Successfully'` in `onConfirmResetPassword()` success.

**Option B:** Keep the generic title "Temporary Password" for both flows. Simpler but less descriptive.

### 5. Key Behaviors

- Clicking the key icon opens a confirmation dialog with the user's name
- On confirm: calls `POST /api/admin/users/:userId/reset-password`
- On success: closes confirmation dialog (auto-close on accept), sets `temporaryPassword`, opens `#tempPasswordDialog`
- On error: shows growl notification with error message
- On cancel: confirmation dialog closes, no action taken
- The temp password dialog reuse means `copyPassword()` works without changes
- No table refresh needed after reset (password change doesn't affect displayed data)

---

## Test Plan — `users.component.spec.ts`

Add the following test cases to the existing spec file.

### New test cases

#### Reset password button
- `should have a reset password icon button for each user row`
- `should have aria-haspopup="dialog" on reset password buttons`

#### Confirmation dialog
- `should set selectedUser when onResetPassword is called`
- `should open reset password confirmation dialog when onResetPassword is called`

#### API call and success flow
- `should call resetPassword API on confirm`
- `should set temporaryPassword and open temp password dialog on success`

#### Error handling
- `should show error growl when reset password API fails`
- `should not open temp password dialog on error`

#### Cancel flow
- `should clear selectedUser state appropriately`

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/app/features/admin/users/users.component.ts` | Add `selectedUser`, `tempPasswordTitle`, `resetPasswordDialog` ViewChild, `onResetPassword()`, `onConfirmResetPassword()` |
| `src/app/features/admin/users/users.component.html` | Add `(click)` + `aria-haspopup` on reset icon button, add `#resetPasswordDialog`, make temp password dialog title dynamic |
| `src/app/features/admin/users/users.component.spec.ts` | Add tests for reset password flow |

## Files NOT Modified

- No backend changes (endpoint already exists from STORY-001)
- No model changes (`ResetPasswordResponse` already defined in STORY-002)
- No service changes (`resetPassword()` already exists in STORY-002)
- No routing changes

## Accessibility Compliance

- [x] Reset password icon button already has `[ariaLabel]="'Reset password for ' + row.username"`
- [x] `aria-haspopup="dialog"` added to the icon button
- [x] Confirmation dialog uses `eui-dialog` (built-in focus trap, Escape to close, `role="dialog"`, `aria-modal="true"`)
- [x] Confirmation dialog text identifies the target user by name
- [x] Error feedback via growl (`aria-live="polite"` built into `EuiGrowlService`)
- [x] Temp password dialog reuse inherits all a11y from STORY-004 (warning text, readonly input, copy button)
- [x] All interactive elements are keyboard-navigable

## Acceptance Criteria

- [ ] Reset password icon button opens a confirmation dialog naming the target user
- [ ] On confirm, `POST /api/admin/users/:userId/reset-password` is called
- [ ] On success, new temporary password is displayed in the temp password dialog
- [ ] Temp password dialog warns about one-time visibility
- [ ] Password can be copied to clipboard
- [ ] On API error, growl notification shows error message
- [ ] On cancel, no API call is made
- [ ] `aria-haspopup="dialog"` on the reset password icon button
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
