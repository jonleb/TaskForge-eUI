# BUG-001: User List — Slow Loading & NG0100 Error

## Summary

The User Administration page (`/screen/admin/users`) exhibited slow data loading and threw `ExpressionChangedAfterItHasBeenCheckedError` (NG0100) errors in the browser console on every navigation and interaction.

## Errors

### Error 1 — Paginator init

```
ERROR RuntimeError: NG0100: ExpressionChangedAfterItHasBeenCheckedError:
Expression has changed after it was checked.
Previous value: '10'. Current value: '25'.
Expression location: _UsersComponent component.
  at UsersComponent_Template (users.component.html:13:13)
```

### Error 2 — Loading state toggle

```
ERROR RuntimeError: NG0100: ExpressionChangedAfterItHasBeenCheckedError:
Expression has changed after it was checked.
Previous value: 'true'. Current value: 'false'.
Expression location: _UsersComponent component.
  at [isLoading]="loading"
```

This second error caused the loading spinner to stay visible when navigating pages (clicking "Next"), making the table appear stuck.

## Root Causes

### 1. Paginator init event mutating state during change detection

The `eui-paginator` component fires a `pageChange` event during its own initialization. The `onPageChange()` handler immediately mutated `params._limit` (from `10` to `25`) and triggered a new HTTP call — all within the same Angular change detection cycle. The template binding `[pageSize]="params._limit ?? 10"` then read the mutated value, causing the NG0100 error.

This also caused a duplicate HTTP request on every page load (the initial `loadUsers()` from `ngOnInit` plus the spurious one from the paginator init event), which contributed to the perceived slowness.

### 2. Loading flag toggling within the same change detection cycle

When `loadUsers()` was called from an event handler (e.g. `onPageChange`), it set `loading = true` synchronously. If the HTTP response arrived fast enough (common with a local mock server), the subscribe callback set `loading = false` within the same change detection cycle. Angular's default change detection saw the value change from `true` to `false` between its check passes, triggering NG0100 on the `[isLoading]="loading"` binding.

### 3. Oversized mock database

The `mock/db/db.json` contained 87 user records with heavily duplicated roles. The lowdb JSON file was unnecessarily large, adding overhead to every read operation on the mock server.

## Fix

### Fix 1 — Paginator init guard (`AfterViewInit` + `paginatorReady` flag)

Added an `AfterViewInit` lifecycle hook with a `paginatorReady` flag. The `onPageChange()` handler returns early if the paginator hasn't finished initializing, preventing the spurious state mutation and duplicate HTTP call.

```typescript
private paginatorReady = false;

ngAfterViewInit(): void {
    this.paginatorReady = true;
}

onPageChange(event: { page: number; pageSize: number }): void {
    if (!this.paginatorReady) {
        return;
    }
    // ... update params and loadUsers()
}
```

### Fix 2 — OnPush change detection + explicit `markForCheck()`

Switched the component to `ChangeDetectionStrategy.OnPush` so Angular no longer runs automatic change detection on every event. The `loadUsers()` method now calls `cdr.markForCheck()` explicitly in both the `next` and `error` callbacks, ensuring the view updates only when the async response arrives — outside the original CD cycle.

```typescript
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    // ...
})
export class UsersComponent {
    private readonly cdr = inject(ChangeDetectorRef);

    loadUsers(): void {
        this.loading = true;
        this.adminUserService.getUsers(this.params).subscribe({
            next: res => {
                this.users = res.data;
                this.total = res.total;
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.users = [];
                this.total = 0;
                this.loading = false;
                this.cdr.markForCheck();
            },
        });
    }
}
```

### Fix 3 — Trimmed mock database

Trimmed the users table from 87 → 25 records:
- 2 active SUPER_ADMINs + 1 inactive
- All 6 roles represented
- 5 inactive users (1 per role, except VIEWER)
- 20 active users
- All project-member references preserved (remapped userId 23→22)
- All test IDs remapped accordingly in `admin_user_routes.test.js`

## Files Changed

- `src/app/features/admin/users/users.component.ts` — `OnPush` + `ChangeDetectorRef.markForCheck()` + `AfterViewInit` paginator guard
- `src/app/features/admin/users/users.component.html` — no changes (template was already correct)
- `mock/db/db.json` — trimmed from 87 to 25 users
- `mock/app/routes/admin_user_routes.test.js` — remapped test user IDs

## Verification

- 121 frontend tests pass (`npm run ng test`)
- 94 mock server tests pass (`npm run test:mock`)
- Build passes (`npx ng build --configuration=development`)
