# CR-23: User Search & Layout Alignment

## Status: Stories Ready

## Branch: `CR-23-User-Search-Alignment`

## Objective

Align the Admin Users page (`/screen/admin/users`) layout and search/filter UX with the pattern established on the Tickets page (`/screen/tickets`). The goal is visual and interaction consistency across the application's list pages.

## Current State — Admin Users Page

The page uses a flat `eui-page-content` layout with:

- A horizontal filter bar (`eui-table-filter` + `eui-toggle-group`) placed directly inside `eui-page-content`.
- A single `<p>` tag for result count.
- A table in async mode with `[isLoading]` bound directly on the table.
- A paginator placed directly after the table, without `[hasDynamicLength]` or `[page]` binding.
- No collapsible filter sidebar, no filter chips, no sort controls outside the table headers.

## Target State — Aligned with Tickets Pattern

Adopt the `eui-page-columns` two-column layout:

### Left column (collapsible filter sidebar)

| Element | Details |
|---|---|
| Search input | Labelled `<input euiInputText>` with debounced `(input)` event (replaces `eui-table-filter`) |
| Status filter | Dropdown `<select euiSelect>` with options: All / Active / Inactive (replaces `eui-toggle-group`) |
| Role filter | New — dropdown `<select euiSelect>` with all available roles |
| Collapsible | `[isCollapsible]="true"`, `[isAutocloseOnMobile]="true"` |

### Right column (results)

| Element | Details |
|---|---|
| Header left | Results heading + result count with `aria-live="polite"` |
| Header body | Active filter chips (`eui-chip-list`) with removable chips and "Clear all" link |
| Header right | Sort field dropdown + sort direction toggle (same pattern as Tickets) |
| Body | Table (async, responsive) — same columns as today |
| Footer | `eui-paginator` with `[hasDynamicLength]="true"` and explicit `[page]` binding |

### What stays the same

- Create User button in `eui-page-header-action-items` (already correct).
- All four dialogs (create, temp password, reset password, toggle status) — unchanged.
- Backend API and `AdminUserService` — no changes needed.
- Table columns and row actions (reset password, deactivate/reactivate) — unchanged.

## Detailed Changes

### 1. Template (`users.component.html`)

- Wrap content in `<eui-page-columns>` with two `<eui-page-column>` elements.
- Left column: collapsible filter panel with search input, status dropdown, role dropdown.
- Right column: `eui-page-column-header-left-content` (heading + count), `eui-page-column-header-body` (filter chips), `eui-page-column-header-right-content` (sort controls), `eui-page-column-body` (table + loading/empty states), `eui-page-column-footer` (paginator).
- Remove `eui-table-filter` component (replaced by labelled input in sidebar).
- Remove `eui-toggle-group` for status (replaced by dropdown in sidebar).
- Remove `[isLoading]` from table; use `@if (isLoading)` / `@else` pattern with `eui-progress-bar` like Tickets.
- Move paginator into `<eui-page-column-footer>`, add `[hasDynamicLength]="true"` and `[page]` binding.

### 2. Component class (`users.component.ts`)

- Add filter state properties: `searchValue`, `selectedStatusValue`, `selectedRole`, `visibleChips`, `sortField`, `sortOrder`, `isFilterCollapsed`.
- Add chip management: `activeFilterChips` getter, `onChipRemove()`, `clearAllFilters()`.
- Add sort controls: `onSortFieldChange()`, `onToggleSortOrder()`.
- Replace `eui-table-filter` search with `searchSubject` + debounced input (already exists, just wire differently).
- Replace `onStatusFilterChange(item)` with `onStatusSelectChange()` dropdown handler.
- Add `onRoleSelectChange()` for the new role filter.
- Add `paginatorReady` guard in `onPageChange()` (already exists).
- Remove `EUI_TABLE_FILTER` and `EUI_TOGGLE_GROUP` imports (no longer needed in template).
- Add `EUI_CHIP_LIST`, `EUI_PROGRESS_BAR`, `EUI_ICON`, `EUI_INPUT_RADIO`, `FormsModule` imports.

### 3. Styles (`users.component.scss`)

- Remove `eui-toggle-group` width override (no longer used).
- Add `#sort-field { min-width: 10rem; }` for sort dropdown.
- Keep `:host { display: block; }`.

### 4. Translations

Add new i18n keys under `users.filter.*` and `users.results.*` in `en.json` and `fr.json`:

- `users.filter.column-label` — "Filters"
- `users.filter.search-label` — "Search"
- `users.filter.search-placeholder` — "Search by name, email…"
- `users.filter.status-label` — "Status"
- `users.filter.all-statuses` — "All statuses"
- `users.filter.role-label` — "Role"
- `users.filter.all-roles` — "All roles"
- `users.filter.expand-label` / `users.filter.collapse-label`
- `users.results.heading` — "Results"
- `users.results.count` — "{{total}} user(s)"
- `users.results.sort-by` — "Sort by"
- `users.results.sort-creation-date` / `sort-username` / `sort-role` / `sort-status`
- `users.results.sort-direction` — "Toggle sort direction"
- `users.results.selected-criteria` / `clear-all` / `more`
- `users.chip.search` / `users.chip.status` / `users.chip.role`

### 5. Tests (`users.component.spec.ts`)

Update existing tests and add new ones to cover:

- Two-column layout rendering.
- Collapsible filter sidebar.
- Search input in sidebar with debounce.
- Status dropdown filter.
- Role dropdown filter.
- Filter chip display and removal.
- Sort controls (field dropdown + direction toggle).
- Paginator in column footer with `hasDynamicLength`.
- Loading state with `eui-progress-bar`.
- Empty/error states in column body.

### 6. No backend changes

The existing `AdminUserService.getUsers()` already supports `q`, `is_active`, `_sort`, `_order`, `_page`, `_limit`. A new `role` query param may need to be added to the mock server if not already supported.

## Acceptance Criteria

- [ ] Users page uses `eui-page-columns` two-column layout matching Tickets page.
- [ ] Left column has collapsible filter sidebar with search, status dropdown, and role dropdown.
- [ ] Right column has results heading, count, filter chips, sort controls, table, and paginator.
- [ ] Filter chips appear for active search, status, and role filters; each is removable.
- [ ] "Clear all" link resets all filters.
- [ ] Sort dropdown and direction toggle control table ordering.
- [ ] Paginator uses `[hasDynamicLength]="true"` and does not reset on data reload.
- [ ] All existing functionality preserved (create, reset password, deactivate/reactivate).
- [ ] All interactive elements keyboard-navigable.
- [ ] `aria-live="polite"` on result count.
- [ ] All tests pass (`npm run test:ci`).
- [ ] Build passes (`npx ng build --configuration=development`).
- [ ] FR and EN translations complete.

## Out of Scope

- Card/table view toggle (Users page is table-only — no card view needed).
- Advanced filters section (no project/sprint context for users).
- Changes to dialogs or backend endpoints (beyond optional `role` filter param).
