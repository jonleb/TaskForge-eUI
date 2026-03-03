# STORY-007: Frontend — Status Filter & Polish

## Goal

Add a status filter (All / Active / Inactive) above the user table and polish the overall UX with improved loading states, contextual empty states, error handling with retry, and disabled action buttons during pending operations.

## Dependencies

- STORY-006 (Deactivate / Reactivate) — completed
- Backend `GET /api/admin/users` already supports `is_active` query param (STORY-001)
- `AdminUserListParams.is_active` already typed as `'true' | 'false' | undefined` (STORY-002)

## eUI Components

| Component | Import | Purpose |
|-----------|--------|---------|
| `eui-toggle-group` | `EUI_TOGGLE_GROUP` from `@eui/components/eui-toggle-group` | Status filter segmented control |
| `eui-toggle-group-item` | (included in `EUI_TOGGLE_GROUP`) | Individual filter options |
| `EuiGrowlService` | from `@eui/core` | Error notifications |

All other components (`eui-table`, `eui-paginator`, `eui-page`, etc.) are already imported.

## Frontend Changes

### 1. Status Filter — `eui-toggle-group` (single-select / radio mode)

Add a status filter bar between the search filter and the result count, using `eui-toggle-group` in default single-select mode:

```html
<div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-m eui-u-mt-s">
    <eui-table-filter
        placeholder="Search users..."
        (filterChange)="onFilterChange($event)">
    </eui-table-filter>

    <eui-toggle-group aria-label="Filter users by status"
                      (itemClick)="onStatusFilterChange($event)">
        <eui-toggle-group-item id="status-all" [isChecked]="true">All</eui-toggle-group-item>
        <eui-toggle-group-item id="status-active">Active</eui-toggle-group-item>
        <eui-toggle-group-item id="status-inactive">Inactive</eui-toggle-group-item>
    </eui-toggle-group>
</div>
```

Component logic:

```typescript
activeStatusFilter: 'all' | 'active' | 'inactive' = 'all';

onStatusFilterChange(item: EuiToggleGroupItemComponent): void {
    const filterMap: Record<string, 'all' | 'active' | 'inactive'> = {
        'status-all': 'all',
        'status-active': 'active',
        'status-inactive': 'inactive',
    };
    this.activeStatusFilter = filterMap[item.id] ?? 'all';

    // Map to API param
    const isActiveMap: Record<string, 'true' | 'false' | undefined> = {
        'all': undefined,
        'active': 'true',
        'inactive': 'false',
    };
    this.params = {
        ...this.params,
        is_active: isActiveMap[this.activeStatusFilter],
        _page: 1,
    };
    this.loadUsers();
}
```

### 2. Loading State Polish

- The table already uses `[isLoading]="loading"` — this is sufficient for the table spinner.
- Disable action buttons (Create User, Reset Password, Deactivate/Reactivate) while an operation is pending:

```typescript
operationPending = false;
```

Set `operationPending = true` before API calls in `onCreateUser()`, `onConfirmResetPassword()`, `onConfirmToggleStatus()`, and reset to `false` in both `next` and `error` callbacks.

In the template, add `[euiDisabled]="operationPending"` to the Create User button and conditionally disable icon buttons via `[disabled]="operationPending"`.

### 3. Error Handling with Retry

Update `loadUsers()` error handler:

```typescript
hasLoadError = false;

loadUsers(): void {
    this.loading = true;
    this.hasLoadError = false;
    this.adminUserService.getUsers(this.params).subscribe({
        next: res => {
            this.users = res.data;
            this.total = res.total;
            this.loading = false;
            this.hasLoadError = false;
            this.cdr.markForCheck();
        },
        error: () => {
            this.users = [];
            this.total = 0;
            this.loading = false;
            this.hasLoadError = true;
            this.growlService.growl({
                severity: 'error',
                summary: 'Load failed',
                detail: 'Could not load users. Please try again.',
            });
            this.cdr.markForCheck();
        },
    });
}
```

### 4. Contextual Empty State Messages

Replace the static "No users found" `noData` template with contextual messages:

```typescript
get emptyStateMessage(): string {
    if (this.hasLoadError) {
        return 'An error occurred while loading users.';
    }
    if (this.params.q) {
        return 'No users match your search criteria.';
    }
    if (this.activeStatusFilter === 'active') {
        return 'No active users found.';
    }
    if (this.activeStatusFilter === 'inactive') {
        return 'No inactive users found.';
    }
    return 'No users found.';
}
```

Template:

```html
<ng-template euiTemplate="noData">
    <tr>
        <td class="eui-u-text-center" colspan="7">
            {{ emptyStateMessage }}
            @if (hasLoadError) {
                <button euiButton euiSecondary type="button"
                        class="eui-u-ml-m"
                        (click)="loadUsers()">
                    Retry
                </button>
            }
        </td>
    </tr>
</ng-template>
```

### 5. Imports Update

Add to the component imports array:

```typescript
import { EUI_TOGGLE_GROUP, EuiToggleGroupItemComponent } from '@eui/components/eui-toggle-group';

// In @Component.imports:
...EUI_TOGGLE_GROUP,
```

## Accessibility

- `eui-toggle-group` gets `aria-label="Filter users by status"` to describe the group purpose
- Each `eui-toggle-group-item` has descriptive text content (All, Active, Inactive)
- Keyboard navigation: Tab to focus the group, Arrow keys to move between items, Space/Enter to select
- Status filter change updates the `aria-live="polite"` result count region automatically
- Retry button is keyboard-accessible (`<button>` element)
- Disabled action buttons remain in the tab order but are non-interactive (standard `[euiDisabled]` / `[disabled]` behavior)

## Unit Tests

New tests to add:

1. `should render the status filter toggle group with three options`
2. `should filter by active users when Active toggle is clicked`
3. `should filter by inactive users when Inactive toggle is clicked`
4. `should reset to all users when All toggle is clicked`
5. `should reset page to 1 when status filter changes`
6. `should show error growl and retry button when loadUsers fails`
7. `should reload users when retry button is clicked`
8. `should show contextual empty message for search with no results`
9. `should show contextual empty message for active filter with no results`
10. `should show contextual empty message for inactive filter with no results`
11. `should disable action buttons while operation is pending`

## Files Changed

- `src/app/features/admin/users/users.component.ts` — add status filter logic, error/retry state, operation pending flag, contextual empty messages
- `src/app/features/admin/users/users.component.html` — add toggle group, update empty state template, add disabled bindings
- `src/app/features/admin/users/users.component.spec.ts` — new tests

## Acceptance Criteria

- [ ] Status filter toggle group displays All / Active / Inactive options
- [ ] Default selection is "All"
- [ ] Selecting Active/Inactive updates `is_active` param and reloads table
- [ ] Selecting a filter resets pagination to page 1
- [ ] Filter state is reflected in the API call (`is_active=true`, `is_active=false`, or omitted)
- [ ] Error growl shown when `getUsers()` fails
- [ ] Retry button appears in empty state on error
- [ ] Retry button reloads the user list
- [ ] Empty state messages are contextual (search, active filter, inactive filter, error)
- [ ] Action buttons disabled during pending operations
- [ ] Toggle group has `aria-label` for screen readers
- [ ] All interactive elements keyboard-navigable
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
