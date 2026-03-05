# STORY-002: Two-Column Layout & Collapsible Filter Sidebar

## Objective

Replace the flat `eui-page-content` layout with the `eui-page-columns` two-column pattern used on the Tickets page.

## Current state (Users page)

```
eui-page
  eui-page-header (with Create button — keep as-is)
  eui-page-content
    div.flex (eui-table-filter + eui-toggle-group)   ← REMOVE
    p (result count)                                   ← MOVE to right column header
    table (with [isLoading] on table)                  ← MOVE to right column body
    eui-paginator (flat, no hasDynamicLength)           ← MOVE to right column footer
```

## Target state (matching Tickets pattern)

```
eui-page
  eui-page-header (unchanged)
  eui-page-content
    eui-page-columns
      eui-page-column (left — collapsible filter sidebar)
        eui-page-column-body
          Search input (labelled, debounced)
          Status dropdown (All / Active / Inactive)
          Role dropdown (All / 6 roles)
      eui-page-column (right — results)
        eui-page-column-header-left-content (heading + count)
        eui-page-column-header-body (chips — STORY-003)
        eui-page-column-header-right-content (sort — STORY-004)
        eui-page-column-body (loading bar / empty / table)
        eui-page-column-footer (paginator — STORY-005)
```

## Detailed template changes

### Left column

Replicate the Tickets sidebar pattern exactly:

```html
<eui-page-column
    [label]="'users.filter.column-label' | translate"
    euiSize2XL
    [isCollapsible]="true"
    [isCollapsed]="isFilterCollapsed"
    [isAutocloseOnMobile]="true"
    [expandAriaLabel]="'users.filter.expand-label' | translate"
    [collapseAriaLabel]="'users.filter.collapse-label' | translate"
    (collapse)="onFilterColumnCollapse($event)">
```

Search input — same pattern as Tickets:
```html
<div class="eui-u-mb-m">
    <label euiLabel for="users-search">{{ 'users.filter.search-label' | translate }}</label>
    <input euiInputText id="users-search"
           [value]="searchValue"
           [placeholder]="'users.filter.search-placeholder' | translate"
           (input)="onFilterChange($any($event.target).value)" />
</div>
```

Status dropdown — replaces `eui-toggle-group`:
```html
<div class="eui-u-mb-m">
    <label euiLabel for="filter-status">{{ 'users.filter.status-label' | translate }}</label>
    <select euiSelect id="filter-status"
            [(ngModel)]="selectedStatusValue"
            (ngModelChange)="onStatusSelectChange()">
        <option [ngValue]="null">{{ 'users.filter.all-statuses' | translate }}</option>
        <option [ngValue]="'true'">{{ 'common.active' | translate }}</option>
        <option [ngValue]="'false'">{{ 'common.inactive' | translate }}</option>
    </select>
</div>
```

Role dropdown — new filter:
```html
<div class="eui-u-mb-m">
    <label euiLabel for="filter-role">{{ 'users.filter.role-label' | translate }}</label>
    <select euiSelect id="filter-role"
            [(ngModel)]="selectedRole"
            (ngModelChange)="onRoleSelectChange()">
        <option [ngValue]="null">{{ 'users.filter.all-roles' | translate }}</option>
        @for (role of availableRoles; track role) {
            <option [ngValue]="role">{{ role }}</option>
        }
    </select>
</div>
```

### Right column header

```html
<eui-page-column-header-left-content>
    <div class="eui-u-f-l eui-u-f-bold">{{ 'users.results.heading' | translate }}</div>
    <div aria-live="polite" class="eui-u-f-m">
        {{ 'users.results.count' | translate:{ total: total } }}
    </div>
</eui-page-column-header-left-content>
```

### Right column body

Remove `[isLoading]` from the table. Use `@if (isLoading)` / `@else` with `eui-progress-bar`:

```html
<eui-page-column-body>
    @if (loading) {
        <eui-progress-bar [isIndeterminate]="true"
                          [label]="'common.loading' | translate">
        </eui-progress-bar>
    } @else if (users.length === 0) {
        <output class="eui-u-d-flex eui-u-flex-direction-column eui-u-align-items-center eui-u-pv-xl">
            <p class="eui-u-f-l eui-u-mb-s">{{ emptyStateMessage }}</p>
            @if (hasLoadError) {
                <button euiButton euiSecondary euiSizeS type="button" class="eui-u-mt-m"
                        (click)="loadUsers()">
                    {{ 'common.retry' | translate }}
                </button>
            }
        </output>
    } @else {
        <table euiTable ...> (same columns, same row template) </table>
    }
</eui-page-column-body>
```

## Component class changes

### New properties

```typescript
// Filter sidebar
isFilterCollapsed = false;
searchValue = '';
selectedStatusValue: string | null = null;   // 'true' | 'false' | null
selectedRole: string | null = null;

// Sort (moved from table-only to explicit controls)
sortField = 'created_at';
sortOrder: 'asc' | 'desc' = 'desc';
```

### New methods

```typescript
onFilterColumnCollapse(collapsed: boolean): void
onStatusSelectChange(): void       // replaces onStatusFilterChange()
onRoleSelectChange(): void         // new
```

### Modified methods

- `onFilterChange(value: string)` — now sets `this.searchValue = value` before pushing to `searchSubject` (for chip display).

### Removed

- `onStatusFilterChange(item: EuiToggleGroupItemComponent)` — replaced by `onStatusSelectChange()`.
- `activeStatusFilter` property — replaced by `selectedStatusValue`.

### Import changes

- Remove: `EUI_TOGGLE_GROUP`, `EuiToggleGroupItemComponent` (no longer in template).
- Add: `EUI_PROGRESS_BAR`, `EUI_CHIP_LIST`, `EUI_ICON`, `FormsModule` (for `ngModel` on dropdowns).

## SCSS changes

Remove the `eui-toggle-group` width override. The file becomes:

```scss
:host {
    display: block;
}

#sort-field {
    min-width: 10rem;
}
```

## Acceptance criteria

- [ ] Page uses `eui-page-columns` with two `eui-page-column` elements.
- [ ] Left column is collapsible with proper aria labels.
- [ ] Search input in sidebar with debounced filtering (300ms).
- [ ] Status dropdown replaces toggle group (All / Active / Inactive).
- [ ] Role dropdown filters by role (All / 6 roles).
- [ ] Right column header shows "Results" heading and count with `aria-live="polite"`.
- [ ] Loading state uses `eui-progress-bar` (not `[isLoading]` on table).
- [ ] Empty/error states use `<output>` element matching Tickets pattern.
- [ ] All filter changes reset `_page` to 1.
- [ ] `eui-table-filter` and `eui-toggle-group` removed from template.

## Files to modify

- `src/app/features/admin/users/users.component.html`
- `src/app/features/admin/users/users.component.ts`
- `src/app/features/admin/users/users.component.scss`
