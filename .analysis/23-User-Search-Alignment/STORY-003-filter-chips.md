# STORY-003: Filter Chips & Clear All

## Objective

Display active filters as removable chips in the right column header, with a "Clear all" link. Matches the Tickets page chip pattern exactly.

## Reference pattern (Tickets)

The Tickets component defines:

```typescript
export interface FilterChip {
    key: string;
    dimension: 'search' | 'status' | 'type' | 'priority' | 'project' | 'sprint';
    value: string;
    label: string;
}
```

And exposes:
- `activeFilterChips` getter — builds chip array from current filter state
- `visibleChips` getter — first N chips (MAX_VISIBLE_CHIPS = 5)
- `hasOverflowChips` / `overflowChipCount` — overflow handling
- `hasActiveFilters` getter — controls chip bar visibility
- `onChipRemove(chip)` — clears the corresponding filter and reloads
- `clearAllFilters()` — resets everything

## Users implementation

### FilterChip interface

Reuse the same shape, scoped to Users dimensions:

```typescript
export interface UserFilterChip {
    key: string;
    dimension: 'search' | 'status' | 'role';
    value: string;
    label: string;
}
```

### Properties

```typescript
readonly MAX_VISIBLE_CHIPS = 5;
```

### Getters

```typescript
get activeFilterChips(): UserFilterChip[] {
    const chips: UserFilterChip[] = [];
    if (this.searchValue) {
        chips.push({ key: 'search', dimension: 'search', value: this.searchValue,
            label: this.translate.instant('users.chip.search', { term: this.searchValue }) });
    }
    if (this.selectedStatusValue) {
        const statusLabel = this.selectedStatusValue === 'true'
            ? this.translate.instant('common.active')
            : this.translate.instant('common.inactive');
        chips.push({ key: 'status', dimension: 'status', value: this.selectedStatusValue,
            label: this.translate.instant('users.chip.status', { value: statusLabel }) });
    }
    if (this.selectedRole) {
        chips.push({ key: 'role', dimension: 'role', value: this.selectedRole,
            label: this.translate.instant('users.chip.role', { value: this.selectedRole }) });
    }
    return chips;
}

get visibleChips(): UserFilterChip[] {
    return this.activeFilterChips.slice(0, this.MAX_VISIBLE_CHIPS);
}

get hasOverflowChips(): boolean {
    return this.activeFilterChips.length > this.MAX_VISIBLE_CHIPS;
}

get overflowChipCount(): number {
    return this.activeFilterChips.length - this.MAX_VISIBLE_CHIPS;
}

get hasActiveFilters(): boolean {
    return this.activeFilterChips.length > 0;
}
```

### Methods

```typescript
onChipRemove(chip: UserFilterChip): void {
    switch (chip.dimension) {
        case 'search':
            this.searchValue = '';
            this.params = { ...this.params, q: undefined, _page: 1 };
            break;
        case 'status':
            this.selectedStatusValue = null;
            this.params = { ...this.params, is_active: undefined, _page: 1 };
            break;
        case 'role':
            this.selectedRole = null;
            this.params = { ...this.params, role: undefined, _page: 1 };
            break;
    }
    this.loadUsers();
}

clearAllFilters(): void {
    this.searchValue = '';
    this.selectedStatusValue = null;
    this.selectedRole = null;
    this.params = { _page: 1, _limit: this.params._limit, _sort: this.params._sort, _order: this.params._order };
    this.loadUsers();
}
```

### Template (right column header body)

Exact same structure as Tickets:

```html
<eui-page-column-header-body>
    @if (hasActiveFilters) {
        <div class="eui-u-flex eui-u-flex-gap-m">
            <div class="eui-u-f-s">
                {{ 'users.results.selected-criteria' | translate }}:<br>
                <a class="eui-u-text-link" (click)="clearAllFilters()"
                   (keydown.enter)="clearAllFilters()" tabindex="0">
                    {{ 'users.results.clear-all' | translate }}
                </a>
            </div>
            <eui-chip-list euiSizeS>
                @for (chip of visibleChips; track chip.key) {
                    <eui-chip [isChipRemovable]="true"
                              [ariaLabel]="chip.label"
                              (remove)="onChipRemove(chip)">
                        {{ chip.label }}
                    </eui-chip>
                }
            </eui-chip-list>
            @if (hasOverflowChips) {
                <span class="eui-u-f-s">{{ 'users.results.more' | translate:{ count: overflowChipCount } }}</span>
            }
        </div>
    }
</eui-page-column-header-body>
```

## Acceptance criteria

- [ ] Search chip appears when `searchValue` is non-empty, shows "Search: {term}".
- [ ] Status chip appears when status filter is active, shows "Status: Active" or "Status: Inactive".
- [ ] Role chip appears when role filter is active, shows "Role: DEVELOPER" etc.
- [ ] Removing a chip clears the corresponding filter and reloads data.
- [ ] "Clear all" link resets all filters and reloads.
- [ ] Chip overflow handled (unlikely with 3 max dimensions, but pattern is consistent).
- [ ] "Clear all" link is keyboard-accessible (`tabindex="0"`, `keydown.enter`).

## Files to modify

- `src/app/features/admin/users/users.component.ts`
- `src/app/features/admin/users/users.component.html`
