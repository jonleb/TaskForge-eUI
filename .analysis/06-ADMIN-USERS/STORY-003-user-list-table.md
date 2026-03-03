# STORY-003: Frontend — User List Table with Pagination, Search & Sort

## Goal

Replace the placeholder `UsersComponent` with a fully functional user list table using `eui-table` (async mode), `eui-table-filter`, `eui-paginator`, and sortable columns. The table displays users with server-side pagination, search, and sorting via `AdminUserService`.

## Prerequisites

- STORY-001 complete — backend endpoints ready
- STORY-002 complete — `AdminUserService` and `AdminUser` models available
- `UsersComponent` exists at `src/app/features/admin/users/users.component.ts` — placeholder
- Route `screen/admin/users` wired with `authGuard` + `roleGuard` (SUPER_ADMIN only)

## eUI Components & Imports

| Component / Directive | Import | Purpose |
|----------------------|--------|---------|
| `table[euiTable]` | `EUI_TABLE` from `@eui/components/eui-table` | Main table (async mode) |
| `eui-table-filter` | `EUI_TABLE` | Search input |
| `th[isSortable]` | `EUI_TABLE` | Sortable column headers |
| `euiTemplate` | `EuiTemplateDirective` from `@eui/components/directives` | Table templates (header, body, noData) |
| `eui-paginator` | `EuiPaginatorComponent` from `@eui/components/eui-paginator` | Pagination |
| `eui-page` / `eui-page-header` / `eui-page-content` | `EUI_PAGE` from `@eui/components/eui-page` | Page structure |
| `eui-icon-svg` | `EUI_ICON` from `@eui/components/eui-icon` | Action icons in table rows |
| `euiButton` | `EUI_BUTTON` from `@eui/components/eui-button` | "Create User" button (placeholder for STORY-004) |

## Key Design Decision: Async Table Mode

Since we use server-side pagination, sorting, and filtering, the table must use `isAsync` mode:

```html
<table euiTable [data]="users" isAsync [isLoading]="loading" (sortChange)="onSortChange($event)">
```

In async mode:
- Do NOT bind `[paginator]` or `[filter]` to the table — they are managed externally
- The `(sortChange)` event still fires from `th[isSortable]` directives
- The `(filterChange)` event from `eui-table-filter` is handled by the component
- The `(pageChange)` event from `eui-paginator` is handled by the component
- The component calls `adminUserService.getUsers(params)` on every change


## Implementation Plan

### 1. Rewrite `src/app/features/admin/users/users.component.ts`

#### Component class

```typescript
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { AdminUserService } from './admin-user.service';
import { AdminUser, AdminUserListParams } from './admin-user.models';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    imports: [
        ...EUI_PAGE,
        ...EUI_TABLE,
        ...EUI_ICON,
        ...EUI_BUTTON,
        EuiTemplateDirective,
        EuiPaginatorComponent,
    ],
})
export class UsersComponent implements OnInit, OnDestroy {
    private readonly adminUserService = inject(AdminUserService);
    private readonly destroy$ = new Subject<void>();
    private readonly searchSubject = new Subject<string>();

    users: AdminUser[] = [];
    total = 0;
    loading = false;

    // Query params state
    params: AdminUserListParams = {
        _page: 1,
        _limit: 10,
        _sort: 'created_at',
        _order: 'desc',
    };

    ngOnInit(): void {
        // Debounce search input
        this.searchSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            takeUntil(this.destroy$),
        ).subscribe(q => {
            this.params = { ...this.params, q: q || undefined, _page: 1 };
            this.loadUsers();
        });

        this.loadUsers();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadUsers(): void {
        this.loading = true;
        this.adminUserService.getUsers(this.params).subscribe({
            next: res => {
                this.users = res.data;
                this.total = res.total;
                this.loading = false;
            },
            error: () => {
                this.users = [];
                this.total = 0;
                this.loading = false;
            },
        });
    }

    onFilterChange(searchTerm: string): void {
        this.searchSubject.next(searchTerm);
    }

    onSortChange(sort: { prop: string; order: string }[]): void {
        if (sort.length > 0) {
            this.params = {
                ...this.params,
                _sort: sort[0].prop,
                _order: sort[0].order.toLowerCase() as 'asc' | 'desc',
                _page: 1,
            };
        }
        this.loadUsers();
    }

    onPageChange(event: { page: number; pageSize: number }): void {
        this.params = {
            ...this.params,
            _page: event.page + 1,  // eui-paginator is 0-indexed, API is 1-indexed
            _limit: event.pageSize,
        };
        this.loadUsers();
    }
}
```

**Notes:**
- `searchSubject` with `debounceTime(300)` prevents excessive API calls while typing
- `distinctUntilChanged()` avoids duplicate calls for the same search term
- `_page` resets to 1 on search or sort change
- `onPageChange` converts 0-indexed paginator page to 1-indexed API page
- `sortChange` event emits `{ prop: string, order: 'ASC' | 'DESC' }[]` — we take the first element and lowercase the order
- No `[paginator]` or `[filter]` binding on the table since we use `isAsync`

### 2. Create `src/app/features/admin/users/users.component.html`

```html
<eui-page>
    <eui-page-header label="User Administration" />
    <eui-page-content>

        <!-- Search filter (not bound to table — async mode) -->
        <eui-table-filter
            placeholder="Search users..."
            (filterChange)="onFilterChange($event)">
        </eui-table-filter>

        <!-- Result count (a11y: aria-live for dynamic updates) -->
        <p aria-live="polite" class="eui-u-mt-s eui-u-mb-s">
            Showing {{ users.length }} of {{ total }} users
        </p>

        <!-- Table (async mode — no [paginator] or [filter] binding) -->
        <table euiTable
               [data]="users"
               isAsync
               [isLoading]="loading"
               isTableResponsive
               (sortChange)="onSortChange($event)">

            <caption class="eui-u-sr-only">List of platform users</caption>

            <ng-template euiTemplate="header">
                <tr>
                    <th scope="col" isSortable sortOn="username">Username</th>
                    <th scope="col" isSortable sortOn="firstName">First Name</th>
                    <th scope="col" isSortable sortOn="lastName">Last Name</th>
                    <th scope="col" isSortable sortOn="email">Email</th>
                    <th scope="col" isSortable sortOn="role">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </ng-template>

            <ng-template let-row euiTemplate="body">
                <tr>
                    <td data-col-label="Username">{{ row.username }}</td>
                    <td data-col-label="First Name">{{ row.firstName }}</td>
                    <td data-col-label="Last Name">{{ row.lastName }}</td>
                    <td data-col-label="Email">{{ row.email }}</td>
                    <td data-col-label="Role">{{ row.role }}</td>
                    <td data-col-label="Status">{{ row.is_active ? 'Active' : 'Inactive' }}</td>
                    <td data-col-label="Actions">
                        <button euiButton type="button" icon="key"
                                aria-label="Reset password for {{ row.username }}"
                                isIconOnly isSmall>
                        </button>
                        @if (row.is_active) {
                            <button euiButton type="button" icon="block"
                                    aria-label="Deactivate {{ row.username }}"
                                    isIconOnly isSmall>
                            </button>
                        } @else {
                            <button euiButton type="button" icon="check"
                                    aria-label="Reactivate {{ row.username }}"
                                    isIconOnly isSmall>
                            </button>
                        }
                    </td>
                </tr>
            </ng-template>

            <ng-template euiTemplate="noData">
                <tr>
                    <td class="eui-u-text-center" colspan="7">No users found</td>
                </tr>
            </ng-template>
        </table>

        <!-- Paginator (not bound to table — async mode) -->
        <eui-paginator
            [length]="total"
            [pageSize]="params._limit ?? 10"
            [pageSizeOptions]="[10, 25, 50]"
            (pageChange)="onPageChange($event)">
        </eui-paginator>

    </eui-page-content>
</eui-page>
```

**Accessibility compliance:**
- `<caption class="eui-u-sr-only">` — visually hidden but announced by screen readers
- `scope="col"` on all `<th>` elements
- `data-col-label` on all `<td>` elements (eUI responsive table requirement)
- `aria-label` on all icon-only action buttons with dynamic username
- `aria-live="polite"` on result count paragraph
- Status column shows "Active"/"Inactive" as text (not color-only)
- Semantic `<table>`, `<th>`, `<td>` elements
- Action buttons are `<button>` elements (keyboard accessible)

### 3. Rewrite `src/app/features/admin/users/users.component.spec.ts`

Test setup pattern follows existing specs (TranslateModule, I18nService mock, CONFIG_TOKEN mock) plus `provideHttpClient` + `provideHttpClientTesting` for the service.

#### Test cases

##### Component creation
- `should create the component`

##### Page structure
- `should render eui-page-header with "User Administration"`
- `should render eui-table-filter`
- `should render eui-paginator`

##### Data loading
- `should call adminUserService.getUsers() on init`
- `should display users in the table when data is loaded`
- `should display "No users found" when data is empty`
- `should show result count with aria-live="polite"`

##### Search
- `should call loadUsers when filter changes (after debounce)`
- `should reset page to 1 on search`

##### Sorting
- `should call loadUsers with sort params on sortChange`
- `should reset page to 1 on sort change`

##### Pagination
- `should call loadUsers with updated page on pageChange`
- `should convert 0-indexed paginator page to 1-indexed API page`

##### Table structure (a11y)
- `should have a caption element`
- `should have scope="col" on all th elements`
- `should have data-col-label on all td elements`
- `should display status as "Active"/"Inactive" text`
- `should have aria-label on action buttons`

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/features/admin/users/users.component.html` | Template (extracted from inline) |

## Files to Modify

| File | Purpose |
|------|---------|
| `src/app/features/admin/users/users.component.ts` | Rewrite with table logic |
| `src/app/features/admin/users/users.component.spec.ts` | Rewrite tests |

## Files NOT Modified

- No backend changes
- No routing changes
- No service changes
- `admin-user.models.ts` unchanged
- `admin-user.service.ts` unchanged

## Design Decisions

- **Async table mode** — `isAsync` is required because pagination, sorting, and filtering are server-side. In async mode, the paginator and filter are NOT bound to the table via `[paginator]` and `[filter]` inputs. Instead, the component handles their events and calls the service directly.
- **External template file** — the template is large enough to warrant a separate `.html` file rather than inline template.
- **Debounced search** — 300ms debounce on the search input prevents excessive API calls while typing. `distinctUntilChanged()` avoids duplicate calls.
- **Page index conversion** — `eui-paginator` emits 0-indexed pages, but the backend API expects 1-indexed `_page`. The `onPageChange` handler adds 1.
- **Action buttons as placeholders** — the Reset Password, Deactivate, and Reactivate buttons are rendered but have no click handlers yet. They will be wired in STORY-004, STORY-005, and STORY-006 respectively.
- **Caption with `eui-u-sr-only`** — the table caption is visually hidden but accessible to screen readers, following the a11y steering rules.
- **Status as text** — "Active"/"Inactive" displayed as text, not color-only, per a11y rules.
- **No `[filter]` binding** — in async mode, the `eui-table-filter` is not bound to the table. The `(filterChange)` event is handled by the component to update the `q` param and reload.

## Acceptance Criteria

- [ ] Table displays users with columns: Username, First Name, Last Name, Email, Role, Status, Actions
- [ ] Search filters users (server-side, debounced 300ms)
- [ ] Sorting works on Username, First Name, Last Name, Email, Role columns (server-side)
- [ ] Pagination works with page size options [10, 25, 50]
- [ ] Status shows "Active"/"Inactive" as text
- [ ] Action buttons (Reset Password, Deactivate/Reactivate) have `aria-label`
- [ ] Table has `<caption>` and `scope="col"` on headers
- [ ] `data-col-label` on all `<td>` elements
- [ ] Result count announced via `aria-live="polite"`
- [ ] "No users found" displayed when data is empty
- [ ] Loading state shown while fetching (`isLoading`)
- [ ] Page resets to 1 on search or sort change
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
