# STORY-006: Frontend — Deactivate / Reactivate User Actions

## Goal

Wire the existing deactivate/reactivate icon buttons in each user row to show a confirmation dialog, call the appropriate API, refresh the table, and provide success/error feedback via growl. Active users see a "Deactivate" button; inactive users see a "Reactivate" button (already rendered conditionally from STORY-003).

## Prerequisites

- STORY-005 complete — `UsersComponent` has `selectedUser` property and the pattern for confirmation dialogs
- STORY-002 complete — `AdminUserService.deactivateUser(userId)` and `reactivateUser(userId)` available
- Backend:
  - `PATCH /api/admin/users/:userId/deactivate` → returns updated user (200) or 409 (last SUPER_ADMIN / self-deactivation) or 404
  - `PATCH /api/admin/users/:userId/reactivate` → returns updated user (200) or 404

## Current State

The deactivate/reactivate icon buttons already exist in the table template but have no click handlers:

```html
@if (row.is_active) {
    <eui-icon-button
        icon="prohibit:regular"
        size="s"
        [ariaLabel]="'Deactivate ' + row.username">
    </eui-icon-button>
} @else {
    <eui-icon-button
        icon="check-circle:regular"
        size="s"
        [ariaLabel]="'Reactivate ' + row.username">
    </eui-icon-button>
}
```

The `selectedUser` property and `EuiGrowlService` are already available from STORY-005.

## eUI Components & Imports

No new imports needed. All required components are already in `UsersComponent`:

| Component | Already Imported | Purpose |
|-----------|-----------------|---------|
| `eui-dialog` | ✅ `EuiDialogComponent` | Confirmation dialog |
| `EuiGrowlService` | ✅ from `@eui/core` | Success/error notifications |
| `eui-icon-button` | ✅ `EUI_ICON_BUTTON` | Deactivate/reactivate triggers (existing) |

## Implementation Plan

### 1. Add confirmation dialog to template (`users.component.html`)

A single dialog can serve both deactivate and reactivate since the content is dynamic based on `selectedUser.is_active`:

```html
<eui-dialog #toggleStatusDialog
    [title]="selectedUser?.is_active ? 'Deactivate User' : 'Reactivate User'"
    [acceptLabel]="selectedUser?.is_active ? 'Deactivate' : 'Reactivate'"
    [dismissLabel]="'Cancel'"
    [width]="'450px'"
    (accept)="onConfirmToggleStatus()">

    @if (selectedUser?.is_active) {
        <p>Are you sure you want to deactivate <strong>{{ selectedUser?.username }}</strong>?</p>
        <p>They will no longer be able to log in.</p>
    } @else {
        <p>Are you sure you want to reactivate <strong>{{ selectedUser?.username }}</strong>?</p>
    }
</eui-dialog>
```

### 2. Wire the icon button click handlers (`users.component.html`)

Update the existing deactivate/reactivate icon buttons:

```html
@if (row.is_active) {
    <eui-icon-button
        icon="prohibit:regular"
        size="s"
        aria-haspopup="dialog"
        [ariaLabel]="'Deactivate ' + row.username"
        (click)="onToggleStatus(row)">
    </eui-icon-button>
} @else {
    <eui-icon-button
        icon="check-circle:regular"
        size="s"
        aria-haspopup="dialog"
        [ariaLabel]="'Reactivate ' + row.username"
        (click)="onToggleStatus(row)">
    </eui-icon-button>
}
```

### 3. Add component logic (`users.component.ts`)

```typescript
// Add ViewChild ref:
@ViewChild('toggleStatusDialog') toggleStatusDialog!: EuiDialogComponent;

// Add methods:
onToggleStatus(user: AdminUser): void {
    this.selectedUser = user;
    this.toggleStatusDialog.openDialog();
}

onConfirmToggleStatus(): void {
    if (!this.selectedUser) return;

    const action$ = this.selectedUser.is_active
        ? this.adminUserService.deactivateUser(this.selectedUser.id)
        : this.adminUserService.reactivateUser(this.selectedUser.id);

    const actionLabel = this.selectedUser.is_active ? 'deactivated' : 'reactivated';
    const username = this.selectedUser.username;

    action$.subscribe({
        next: () => {
            this.loadUsers();
            this.growlService.growl({
                severity: 'success',
                summary: `User ${actionLabel}`,
                detail: `${username} has been ${actionLabel}.`,
            });
        },
        error: err => {
            this.growlService.growl({
                severity: 'error',
                summary: `Action failed`,
                detail: err.error?.message || `Could not ${actionLabel.replace('d', '')} user. Please try again.`,
            });
        },
    });
}
```

### 4. Key Behaviors

- Both deactivate and reactivate share a single `#toggleStatusDialog` — the title, accept label, and body text are dynamic based on `selectedUser.is_active`
- `selectedUser` is reused from STORY-005 (already exists)
- On confirm:
  - Active user → calls `PATCH /api/admin/users/:userId/deactivate`
  - Inactive user → calls `PATCH /api/admin/users/:userId/reactivate`
- On success: refreshes the table via `loadUsers()` and shows a success growl
- On 409 error (deactivate only): backend returns a message like "Cannot deactivate the last active SUPER_ADMIN" or "Cannot deactivate your own account" — displayed in error growl
- On other errors: generic error growl
- On cancel: dialog closes, no action taken

### 5. Error Scenarios (from backend STORY-001)

| Scenario | HTTP Status | Backend Message | Growl |
|----------|-------------|-----------------|-------|
| Last active SUPER_ADMIN | 409 | "Cannot deactivate the last active SUPER_ADMIN user" | error growl with backend message |
| Self-deactivation | 409 | "Cannot deactivate your own account" | error growl with backend message |
| User not found | 404 | "User not found" | error growl with backend message |
| Reactivate not found | 404 | "User not found" | error growl with backend message |

---

## Test Plan — `users.component.spec.ts`

Add the following test cases to the existing spec file.

### New test cases

#### Toggle status button
- `should set selectedUser and open toggle status dialog when onToggleStatus is called`

#### Deactivate flow
- `should call deactivateUser API when confirming for an active user`
- `should refresh user list and show success growl on deactivate success`
- `should show error growl with backend message on 409 deactivate error`

#### Reactivate flow
- `should call reactivateUser API when confirming for an inactive user`
- `should refresh user list and show success growl on reactivate success`
- `should show error growl on reactivate error`

#### Guard
- `should not call API if selectedUser is null on confirmToggleStatus`

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/app/features/admin/users/users.component.ts` | Add `toggleStatusDialog` ViewChild, `onToggleStatus()`, `onConfirmToggleStatus()` |
| `src/app/features/admin/users/users.component.html` | Add `(click)` + `aria-haspopup` on deactivate/reactivate buttons, add `#toggleStatusDialog` |
| `src/app/features/admin/users/users.component.spec.ts` | Add tests for deactivate/reactivate flows |

## Files NOT Modified

- No backend changes (endpoints already exist from STORY-001)
- No model changes (service methods already return `Observable<AdminUser>`)
- No service changes (`deactivateUser()` and `reactivateUser()` already exist in STORY-002)
- No routing changes

## Accessibility Compliance

- [x] Deactivate/reactivate icon buttons already have `[ariaLabel]` with username context
- [x] `aria-haspopup="dialog"` added to both icon buttons
- [x] Confirmation dialog uses `eui-dialog` (built-in focus trap, Escape to close, `role="dialog"`, `aria-modal="true"`)
- [x] Confirmation dialog text identifies the target user by name
- [x] Deactivate dialog includes consequence text ("They will no longer be able to log in")
- [x] Success/error feedback via growl (`aria-live="polite"` built into `EuiGrowlService`)
- [x] Status column already displays "Active"/"Inactive" as text (not color-only)
- [x] All interactive elements are keyboard-navigable

## Acceptance Criteria

- [ ] Active users show "Deactivate" icon button, inactive users show "Reactivate" icon button (already from STORY-003)
- [ ] Clicking either button opens a confirmation dialog naming the target user
- [ ] Deactivate dialog warns about login impact
- [ ] On confirm deactivate, `PATCH /api/admin/users/:userId/deactivate` is called
- [ ] On confirm reactivate, `PATCH /api/admin/users/:userId/reactivate` is called
- [ ] On success, user list refreshes and success growl is shown
- [ ] On 409 (last SUPER_ADMIN / self-deactivation), error growl shows backend message
- [ ] On other errors, error growl shows generic message
- [ ] On cancel, no API call is made
- [ ] `aria-haspopup="dialog"` on both action icon buttons
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
