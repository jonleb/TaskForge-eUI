# STORY-003: Frontend — Status Filter & Status Column

## Goal

Add a status filter (All/Active/Inactive) for SUPER_ADMIN users and display project status in the table. Regular users always see active projects only, so the filter is hidden for them. Uses the `is_active` query param from STORY-001.

## Existing Code

- `src/app/features/projects/portfolio/portfolio.component.ts` — has `isSuperAdmin` flag, `params: ProjectListParams` (already includes `is_active` type), `loadProjects()`, search/sort/pagination handlers. No status filter or status column yet.
- `src/app/features/projects/portfolio/portfolio.component.html` — async table with Key, Name, Description, Actions columns. Search filter above table. No status column, no toggle group.
- No `portfolio.component.scss` file exists yet.
- `src/app/features/admin/users/users.component.ts` — reference pattern for `onStatusFilterChange()` using `EuiToggleGroupItemComponent`.
- `src/app/features/admin/users/users.component.html` — reference pattern for toggle group + status column layout.
- `src/app/features/admin/users/users.component.scss` — reference for `::ng-deep eui-toggle-group { width: auto }` override.

### eUI Components

| Component | Import | Purpose |
|-----------|--------|---------|
| `eui-toggle-group` | `EUI_TOGGLE_GROUP, EuiToggleGroupItemComponent` from `@eui/components/eui-toggle-group` | All/Active/Inactive filter |
| `eui-chip` | `EUI_CHIP` from `@eui/components/eui-chip` | Status badge in table rows |

## Implementation Plan

### 1. Create `src/app/features/projects/portfolio/portfolio.component.scss`

```scss
/* Override eui-toggle-group default width:100% to keep items compact */
:host ::ng-deep eui-toggle-group {
    width: auto;
    margin-left: 0.5rem;
}
```

### 2. Update `src/app/features/projects/portfolio/portfolio.component.ts`

#### New imports

```typescript
import { EUI_TOGGLE_GROUP, EuiToggleGroupItemComponent } from '@eui/components/eui-toggle-group';
import { EUI_CHIP } from '@eui/components/eui-chip';
```

Add to `@Component`:
- `styleUrls: ['./portfolio.component.scss']`
- Add `...EUI_TOGGLE_GROUP` and `...EUI_CHIP` to `imports` array.

#### New property

```typescript
activeStatusFilter: 'all' | 'active' | 'inactive' = 'all';
```

#### New handler (same pattern as admin users)

```typescript
onStatusFilterChange(item: EuiToggleGroupItemComponent): void {
    const filterMap: Record<string, 'all' | 'active' | 'inactive'> = {
        'status-all': 'all',
        'status-active': 'active',
        'status-inactive': 'inactive',
    };
    this.activeStatusFilter = filterMap[item.id] ?? 'all';

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
    this.loadProjects();
}
```

#### Update `emptyStateMessage` getter

Add status filter context:

```typescript
get emptyStateMessage(): string {
    if (this.hasError) {
        return 'Could not load projects. Please try again.';
    }
    if (this.params.q) {
        return 'No projects match your search criteria.';
    }
    if (this.activeStatusFilter === 'active') {
        return 'No active projects found.';
    }
    if (this.activeStatusFilter === 'inactive') {
        return 'No inactive projects found.';
    }
    return 'No projects available.';
}
```


### 3. Update `src/app/features/projects/portfolio/portfolio.component.html`

#### Add toggle group next to search filter (SUPER_ADMIN only)

Wrap search + toggle in a flex container:

```html
<div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-s">
    <eui-table-filter
        placeholder="Search projects..."
        (filterChange)="onFilterChange($event)">
    </eui-table-filter>

    @if (isSuperAdmin) {
        <eui-toggle-group aria-label="Filter projects by status"
                          (itemClick)="onStatusFilterChange($event)">
            <eui-toggle-group-item id="status-all" [isChecked]="true">All</eui-toggle-group-item>
            <eui-toggle-group-item id="status-active">Active</eui-toggle-group-item>
            <eui-toggle-group-item id="status-inactive">Inactive</eui-toggle-group-item>
        </eui-toggle-group>
    }
</div>
```

#### Add Status column to table

Between Description and Actions columns. Uses text ("Active"/"Inactive") per a11y rules, with `eui-chip` for visual enhancement:

```html
<!-- Header -->
<th scope="col">Status</th>

<!-- Body -->
<td data-col-label="Status">
    <eui-chip [isFilled]="true"
              [attr.euiSuccess]="row.is_active ? true : null"
              [attr.euiDanger]="!row.is_active ? true : null"
              [ariaLabel]="row.is_active ? 'Active' : 'Inactive'">
        {{ row.is_active ? 'Active' : 'Inactive' }}
    </eui-chip>
</td>
```

Note: `colspan` in noData template must be updated from 4 to 5.

### 4. Update `src/app/features/projects/portfolio/portfolio.component.spec.ts`

#### New tests

| # | Test | Expected |
|---|------|----------|
| 1 | Toggle group visible for SUPER_ADMIN | `eui-toggle-group` element exists in DOM |
| 2 | Toggle group hidden for regular user | `eui-toggle-group` element not in DOM |
| 3 | Status filter change calls loadProjects with `is_active` param | After `onStatusFilterChange({ id: 'status-active' })`, params include `is_active: 'true'` |
| 4 | Status filter resets page to 1 | `params._page === 1` after filter change |
| 5 | Status column displays "Active" text | Table cell contains "Active" text |
| 6 | Status column displays "Inactive" text | For inactive project, cell contains "Inactive" |
| 7 | Empty state message for active filter | Returns "No active projects found." |
| 8 | Empty state message for inactive filter | Returns "No inactive projects found." |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/portfolio/portfolio.component.ts` | Add toggle group imports, `activeStatusFilter`, `onStatusFilterChange()`, update `emptyStateMessage` |
| `src/app/features/projects/portfolio/portfolio.component.html` | Add toggle group (SUPER_ADMIN only), add Status column with `eui-chip`, update colspan |
| `src/app/features/projects/portfolio/portfolio.component.scss` | New file — toggle group width override |
| `src/app/features/projects/portfolio/portfolio.component.spec.ts` | Add ~8 new tests for toggle visibility, filter behavior, status column |

## Known Pitfalls

- `eui-toggle-group` has `width: 100%` by default — override with `::ng-deep { width: auto }` (see `eui-pitfalls.md`).
- Status column must use text ("Active"/"Inactive"), not color alone (a11y rule). `eui-chip` with `euiSuccess`/`euiDanger` provides visual enhancement alongside the text.
- `eui-chip` color directives (`euiSuccess`, `euiDanger`) are attribute directives — check if they need to be applied as attributes or via binding. The admin users component uses plain text for status; here we enhance with chips.

## Acceptance Criteria

- [ ] SUPER_ADMIN sees All/Active/Inactive toggle filter
- [ ] Regular users do not see the status filter
- [ ] Status column shows "Active"/"Inactive" as text (not color-only)
- [ ] `eui-chip` provides visual color distinction (green/red) alongside text
- [ ] Toggling filter reloads data with correct `is_active` param
- [ ] Filter resets page to 1
- [ ] Toggle group has compact width (not full-width)
- [ ] Empty state messages are contextual for active/inactive filters
- [ ] All existing tests still pass
- [ ] New unit tests cover toggle visibility, filter behavior, status column
- [ ] Build passes (`npx ng build --configuration=development`)
