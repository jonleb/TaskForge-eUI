# STORY-004: Sort Controls in Results Header

## Objective

Add a sort field dropdown and sort direction toggle button in the right column header, matching the Tickets page pattern. The table header sort still works but the explicit controls provide a consistent UX.

## Reference pattern (Tickets)

```html
<eui-page-column-header-right-content>
    <div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-s">
        <div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-2xs">
            <label euiLabel for="sort-field" class="eui-u-sr-only">{{ sort-by label }}</label>
            <select euiSelect id="sort-field" [(ngModel)]="sortField" (ngModelChange)="onSortFieldChange()">
                <option value="...">...</option>
            </select>
            <eui-icon-button
                [icon]="sortOrder === 'asc' ? 'arrow-up:regular' : 'arrow-down:regular'"
                size="s"
                [ariaLabel]="sort-direction label"
                (buttonClick)="onToggleSortOrder()">
            </eui-icon-button>
        </div>
    </div>
</eui-page-column-header-right-content>
```

Note: No view toggle (card/table) for Users — table-only page.

## Users implementation

### Sort options

Relevant sortable fields for users:

| Option value | Label key | Notes |
|---|---|---|
| `created_at` | `users.results.sort-creation-date` | Default |
| `username` | `users.results.sort-username` | |
| `lastName` | `users.results.sort-last-name` | |
| `role` | `users.results.sort-role` | |

### Properties (already partially exist)

```typescript
sortField = 'created_at';
sortOrder: 'asc' | 'desc' = 'desc';
```

### Methods

```typescript
onSortFieldChange(): void {
    this.params = { ...this.params, _sort: this.sortField, _page: 1 };
    this.loadUsers();
}

onToggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.params = { ...this.params, _order: this.sortOrder, _page: 1 };
    this.loadUsers();
}
```

### Interaction with table header sort

The existing `onSortChange(sort: Sort[])` from table header clicks should also update `sortField` and `sortOrder` to keep the dropdown in sync:

```typescript
onSortChange(sort: Sort[]): void {
    if (sort.length > 0) {
        this.sortField = sort[0].sort;
        this.sortOrder = sort[0].order.toLowerCase() as 'asc' | 'desc';
        this.params = { ...this.params, _sort: this.sortField, _order: this.sortOrder, _page: 1 };
    }
    this.loadUsers();
}
```

### Template

```html
<eui-page-column-header-right-content>
    <div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-2xs">
        <label euiLabel for="sort-field" class="eui-u-sr-only">
            {{ 'users.results.sort-by' | translate }}
        </label>
        <select euiSelect id="sort-field"
                [(ngModel)]="sortField"
                (ngModelChange)="onSortFieldChange()">
            <option value="created_at">{{ 'users.results.sort-creation-date' | translate }}</option>
            <option value="username">{{ 'users.results.sort-username' | translate }}</option>
            <option value="lastName">{{ 'users.results.sort-last-name' | translate }}</option>
            <option value="role">{{ 'users.results.sort-role' | translate }}</option>
        </select>
        <eui-icon-button
            [icon]="sortOrder === 'asc' ? 'arrow-up:regular' : 'arrow-down:regular'"
            size="s"
            [ariaLabel]="'users.results.sort-direction' | translate"
            (buttonClick)="onToggleSortOrder()">
        </eui-icon-button>
    </div>
</eui-page-column-header-right-content>
```

## SCSS

Already handled in STORY-002:
```scss
#sort-field {
    min-width: 10rem;
}
```

## Acceptance criteria

- [ ] Sort dropdown with 4 options rendered in right column header.
- [ ] Changing sort field reloads data with `_sort` param and resets page to 1.
- [ ] Toggle button switches between asc/desc and reloads.
- [ ] Icon changes between `arrow-up:regular` and `arrow-down:regular`.
- [ ] Table header sort clicks update the dropdown value (bidirectional sync).
- [ ] Sort label is screen-reader-only (`eui-u-sr-only`).
- [ ] Sort direction button has `ariaLabel`.

## Files to modify

- `src/app/features/admin/users/users.component.html`
- `src/app/features/admin/users/users.component.ts`
