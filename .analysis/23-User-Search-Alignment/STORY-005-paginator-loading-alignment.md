# STORY-005: Paginator & Loading State Alignment

## Objective

Move the paginator into `eui-page-column-footer`, add `[hasDynamicLength]="true"` and explicit `[page]` binding to prevent the reset bug. Align loading/empty/error states with the Tickets pattern.

## Current state

```html
<!-- Paginator sits directly in eui-page-content -->
<eui-paginator
    [length]="total"
    [pageSize]="params._limit ?? 10"
    [pageSizeOptions]="[10, 25, 50]"
    (pageChange)="onPageChange($event)">
</eui-paginator>
```

Issues:
- No `[hasDynamicLength]="true"` — paginator resets to page 0 when `[length]` changes (same bug we fixed on Tickets).
- No `[page]` binding — paginator doesn't reflect current page after filter resets.
- Loading state uses `[isLoading]` on the table instead of `eui-progress-bar`.
- Empty/error state is inside `<ng-template euiTemplate="noData">` (table-managed) instead of component-managed `<output>`.

## Target state

### Paginator (in `eui-page-column-footer`)

```html
<eui-page-column-footer>
    <eui-paginator
        [length]="total"
        [page]="(params._page ?? 1) - 1"
        [pageSize]="params._limit ?? 10"
        [pageSizeOptions]="[10, 25, 50]"
        [hasDynamicLength]="true"
        (pageChange)="onPageChange($event)">
    </eui-paginator>
</eui-page-column-footer>
```

Key additions:
- `[hasDynamicLength]="true"` — prevents internal page reset when length changes.
- `[page]="(params._page ?? 1) - 1"` — keeps paginator in sync (0-indexed) with API params (1-indexed).

### Loading state (in `eui-page-column-body`)

Replace `[isLoading]` on table with explicit `@if` block:

```html
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
    <table euiTable [data]="users" isAsync isTableResponsive ...>
        <!-- header + body templates unchanged -->
    </table>
}
```

### Table changes

- Remove `[isLoading]="loading"` from `<table>`.
- Remove `<ng-template euiTemplate="noData">` — empty state is now handled outside the table.

## Component class changes

The `paginatorReady` guard in `onPageChange()` already exists and works correctly. No TS changes needed beyond what STORY-002 already covers.

## Acceptance criteria

- [ ] Paginator is inside `eui-page-column-footer`.
- [ ] `[hasDynamicLength]="true"` prevents page reset on data reload.
- [ ] `[page]` binding keeps paginator in sync after filter changes.
- [ ] `paginatorReady` flag prevents spurious init event.
- [ ] Loading state shows `eui-progress-bar` (indeterminate).
- [ ] Empty state shows `<output>` with contextual message.
- [ ] Error state shows retry button.
- [ ] Paginator is always rendered (not inside `@if (loading)` block).

## Files to modify

- `src/app/features/admin/users/users.component.html`
- `src/app/features/admin/users/users.component.ts` (minor — remove `[isLoading]` usage, add `EUI_PROGRESS_BAR` import)
