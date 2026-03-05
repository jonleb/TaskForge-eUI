# STORY-007: Test Updates

## Objective

Update `users.component.spec.ts` to cover the new layout, filter sidebar, chips, sort controls, and paginator changes. Follow the same test patterns used in `tickets.component.spec.ts`.

## Tests to remove or update

### Remove (no longer applicable)

- `should render eui-table-filter` — replaced by sidebar search input.
- `should render the status filter toggle group` — replaced by status dropdown.
- `should filter by active/inactive users when onStatusFilterChange is called` — method removed.
- `should reset to all users when onStatusFilterChange is called with status-all` — method removed.

### Update

- `should render eui-paginator` — assert it's inside `eui-page-column-footer`.
- `should show result count with aria-live="polite"` — assert it's inside `eui-page-column-header-left-content`.
- `should display "No users found" when data is empty` — assert `<output>` element (not table noData template).
- `should show retry button when hasLoadError is true` — assert inside `<output>`.
- Search tests — update to use `component.onFilterChange('admin')` + check `searchValue` property.
- Sort tests — update to also test `onSortFieldChange()` and `onToggleSortOrder()`.

## New tests to add

### Layout structure

```
should render eui-page-columns with two eui-page-column elements
should render collapsible filter column with proper aria labels
should render results heading in column header left content
```

### Filter sidebar

```
should render search input in filter sidebar
should render status dropdown with 3 options (All / Active / Inactive)
should render role dropdown with 7 options (All + 6 roles)
should filter by status via dropdown
should filter by role via dropdown
should reset page to 1 on status filter change
should reset page to 1 on role filter change
```

### Filter chips

```
should show search chip when searchValue is set
should show status chip when status filter is active
should show role chip when role filter is active
should remove search chip and clear search
should remove status chip and clear status filter
should remove role chip and clear role filter
should clear all filters on clearAllFilters()
should render "Clear all" link when filters are active
```

### Sort controls

```
should render sort field dropdown with 4 options
should change sort field and reload
should toggle sort direction and reload
should sync sort dropdown when table header sort is used
```

### Paginator

```
should render paginator in eui-page-column-footer
should have hasDynamicLength on paginator
should not destroy paginator during loading
should ignore paginator init event before paginatorReady is set
```

### Loading / empty / error states

```
should show eui-progress-bar during loading
should show output element for empty state
should show retry button in output on error
```

## Test approach

The existing spec uses `HttpTestingController` (real HTTP mocking). Keep this approach — it's more thorough than the Tickets spec which uses `vi.fn()` mocks. The `initWithData()` helper pattern stays.

For the new filter/chip tests, follow this pattern:

```typescript
it('should filter by role via dropdown', () => {
    initWithData();
    component.selectedRole = 'DEVELOPER';
    component.onRoleSelectChange();
    const req = httpMock.expectOne(r =>
        r.url === '/api/admin/users' && r.params.get('role') === 'DEVELOPER'
    );
    req.flush(mockListResponse);
    expect(component.params.role).toBe('DEVELOPER');
});
```

## Acceptance criteria

- [ ] All removed tests replaced with updated equivalents.
- [ ] New tests cover layout, sidebar, chips, sort, paginator, loading states.
- [ ] All tests pass: `npm run test:ci`.
- [ ] Test count increases (expect ~50+ tests for Users component, up from ~40).

## Files to modify

- `src/app/features/admin/users/users.component.spec.ts`
