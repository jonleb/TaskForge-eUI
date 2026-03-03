# BUG-004: Deactivate/Reactivate dialog accept button label inconsistency

## Description

When clicking the reactivate icon button on an inactive user, the toggle status confirmation dialog shows:
- Title: "Reactivate User" (correct)
- Body: "Are you sure you want to reactivate olivia.anderson?" (correct)
- Accept button: "Deactivate" (wrong — should say "Reactivate")

The same issue can occur in reverse: after reactivating, clicking deactivate on an active user could show "Reactivate" on the accept button.

## Root Cause

The `eui-dialog` component renders its content (including the accept button label) inside a CDK overlay portal. The `[acceptLabel]` binding uses an inline ternary expression on the template:

```html
[acceptLabel]="selectedUser?.is_active ? 'Deactivate' : 'Reactivate'"
```

The problem is a timing issue: `eui-dialog` captures the `acceptLabel` value at the moment the overlay is created/rendered, but `selectedUser` may not yet be updated when the CDK overlay evaluates the binding. The `[title]` input is documented to "update dynamically when changed after dialog is opened", but `acceptLabel` does not have this guarantee — it appears to be read once at overlay creation time.

Since the dialog element exists in the DOM from component init (with `selectedUser` being `null` initially, then set to the previously clicked user), the accept label reflects the stale `selectedUser.is_active` value from the prior interaction rather than the current one.

## Solution

Replace the inline ternary expressions with dedicated component properties (`toggleDialogTitle`, `toggleDialogAcceptLabel`, `toggleDialogIsDeactivate`) that are set explicitly in `onToggleStatus()` before calling `openDialog()`. This ensures the values are correct at the moment the dialog opens.

```typescript
// Before (broken):
// Template: [acceptLabel]="selectedUser?.is_active ? 'Deactivate' : 'Reactivate'"

// After (fixed):
toggleDialogTitle = '';
toggleDialogAcceptLabel = '';
toggleDialogIsDeactivate = false;

onToggleStatus(user: AdminUser): void {
    this.selectedUser = user;
    this.toggleDialogIsDeactivate = user.is_active;
    this.toggleDialogTitle = user.is_active ? 'Deactivate User' : 'Reactivate User';
    this.toggleDialogAcceptLabel = user.is_active ? 'Deactivate' : 'Reactivate';
    this.cdr.detectChanges(); // force binding update before dialog opens
    this.toggleStatusDialog.openDialog();
}
```

## Files Modified

| File | Changes |
|------|---------|
| `src/app/features/admin/users/users.component.ts` | Add `toggleDialogTitle`, `toggleDialogAcceptLabel`, `toggleDialogIsDeactivate` properties; update `onToggleStatus()` to set them before opening; use `toggleDialogIsDeactivate` in `onConfirmToggleStatus()` |
| `src/app/features/admin/users/users.component.html` | Replace inline ternaries with property bindings on `#toggleStatusDialog` |
