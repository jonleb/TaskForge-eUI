# FEATURE-013.2: Ticket Discovery & Filtering — Search Improvement — Stories Breakdown

## Overview

Redesign the Backlog page from a flat `eui-table` layout to a "fluid layout" using the eUI page-column pattern. An outer `eui-page-columns` wraps the page header (inside `eui-page-column-header-body`) and a nested `eui-page-columns` providing a collapsible left filter column (`eui-page-column` with `[isCollapsible]="true"` and `[isAutocloseOnMobile]="true"`) and a results column with card-based results (`eui-content-card`). Multi-value filters replace single-value toggle groups. A list header shows result count, sort dropdown, and selected-criteria chips. All components are eUI-only (`@eui/components` / `@eui/core`).

## Current State

### Backend (`GET /api/projects/:projectId/backlog`)
- Paginated with `_page` / `_limit`, envelope response `{ data, total, page, limit }`
- Text search: `q` (case-insensitive on title/description)
- Single-value filters: `type`, `status`, `priority`
- Sort: `_sort` / `_order`
- Auth + project membership required

### Frontend (`BacklogComponent`)
- Single-column layout: `eui-table-filter` + two `eui-toggle-group` (status, type) above an async `eui-table`
- `eui-paginator` with `paginatorReady` guard
- `searchSubject` with `debounceTime(300)` + `distinctUntilChanged()`
- `BacklogListParams` interface: `_page`, `_limit`, `_sort`, `_order`, `q`, `type` (single), `status` (single), `priority` (single)
- Priority filter not exposed in UI
- No multi-value filter support, no criteria chips, no "Clear all"
- Create Ticket dialog preserved from FEATURE-012

### What needs to change
- Backend: accept comma-separated multi-value for `status`, `type`, `priority`
- Frontend models: `BacklogListParams` fields become `string` (comma-separated) instead of single enum values
- Frontend layout: adopt the eUI "fluid layout" pattern — `eui-page-columns` > `eui-page-column` with `hasSubColumns` wrapping the page header in `eui-page-column-header-body`, and a nested `eui-page-columns` with a collapsible filter column (`isCollapsible`, `isAutocloseOnMobile`) + results column
- Frontend cards: replace `eui-table` rows with `eui-content-card` per ticket
- Frontend filters: replace `eui-toggle-group` with `input[euiInputCheckBox]` groups in collapsible `eui-card` sections inside the filter column body
- Frontend list header: add result count, sort `<select euiSelect>`, criteria chips, "Clear all"

## Stories

| # | Story | Scope | Depends on |
|---|-------|-------|------------|
| 1 | Backend — Multi-Value Filter Support | Backend | — |
| 2 | Frontend — Models & Service Update for Multi-Value Filters | Frontend | STORY-001 |
| 3 | Frontend — Two-Column Layout & Card List | Frontend | STORY-002 |
| 4 | Frontend — Filter Panel with Checkbox Groups | Frontend | STORY-003 |
| 5 | Frontend — List Header, Sort Dropdown & Criteria Chips | Frontend | STORY-004 |
| 6 | Frontend — Empty States, Error Handling & Polish | Frontend | STORY-005 |

---

## STORY-001: Backend — Multi-Value Filter Support

Extend `GET /api/projects/:projectId/backlog` to accept comma-separated values for `status`, `type`, and `priority` filters.

### Changes
- `status` param: accept comma-separated values (e.g., `?status=TO_DO,IN_PROGRESS`). Filter items where `item.status` is in the provided set.
- `type` param: accept comma-separated values (e.g., `?type=STORY,BUG`). Filter items where `item.type` is in the provided set.
- `priority` param: accept comma-separated values (e.g., `?priority=HIGH,CRITICAL`). Filter items where `item.priority` is in the provided set. Items with `null` priority excluded when filter is active.
- Single-value usage remains backward-compatible (e.g., `?status=TO_DO` still works).
- All other params unchanged: `q`, `_sort`, `_order`, `_page`, `_limit`.
- Response envelope unchanged: `{ data, total, page, limit }`.

### Integration tests (~8 new)
| # | Test | Expected |
|---|------|----------|
| 1 | Multi-value status filter `?status=TO_DO,IN_PROGRESS` | Returns items with either status |
| 2 | Multi-value type filter `?type=STORY,BUG` | Returns items with either type |
| 3 | Multi-value priority filter `?priority=HIGH,CRITICAL` | Returns items with either priority |
| 4 | Single-value still works `?status=DONE` | Backward compatible |
| 5 | Combined multi-value `?status=TO_DO,IN_PROGRESS&type=STORY` | AND logic across dimensions, OR within |
| 6 | Multi-value + text search `?status=TO_DO,DONE&q=login` | Combined correctly |
| 7 | Empty multi-value ignored `?status=` | Returns all (no filter) |
| 8 | Invalid value in multi-value `?status=TO_DO,INVALID` | Only valid values applied |

### Files changed
| File | Change |
|------|--------|
| `mock/app/routes/project_routes.js` | Update status/type/priority filter logic to split on comma |
| `mock/app/routes/project_routes.test.js` | Add ~8 integration tests |

---

## STORY-002: Frontend — Models & Service Update for Multi-Value Filters

Update `BacklogListParams` and `ProjectService.getBacklog()` to support multi-value filters.

### Changes
- Update `BacklogListParams` in `project.models.ts`:
  - `status?: string` (comma-separated, e.g., `'TO_DO,IN_PROGRESS'`) — was `WorkflowStatus`
  - `type?: string` (comma-separated) — was `TicketType`
  - `priority?: string` (comma-separated) — was `TicketPriority`
- `ProjectService.getBacklog()` already passes params as HTTP query params — no change needed in the service method itself, just the type.
- `getEpics()` still passes `{ type: 'EPIC', _limit: 100 }` — single value, backward compatible.
- Update existing unit tests for the new param types.

### Unit tests (~3 updated)
| # | Test | Expected |
|---|------|----------|
| 1 | getBacklog sends multi-value status param | HTTP call includes `?status=TO_DO,IN_PROGRESS` |
| 2 | getBacklog sends multi-value type param | HTTP call includes `?type=STORY,BUG` |
| 3 | getEpics still works with single type | HTTP call includes `?type=EPIC` |

### Files changed
| File | Change |
|------|--------|
| `src/app/core/project/project.models.ts` | Update `BacklogListParams` field types |
| `src/app/core/project/project.service.spec.ts` | Update/add tests |

---

## STORY-003: Frontend — Two-Column Layout & Card List

Replace the `eui-table` with the eUI "fluid layout" pattern: an outer `eui-page-columns` with `eui-page-column[hasSubColumns]` wrapping the page header in `eui-page-column-header-body`, and a nested `eui-page-columns` providing a collapsible filter column placeholder + results column with `eui-content-card` per ticket.

### Changes

#### Layout
- Replace the single-column content with the eUI fluid layout pattern inside `eui-page-content`:
  - Outer `eui-page-columns` > `eui-page-column[hasSubColumns]`:
    - `eui-page-column-header-body`: contains `eui-page-header` with label and Create Ticket action items.
    - `eui-page-column-body`: contains nested `eui-page-columns`:
      - Left column: `eui-page-column` with `label="Search filter"` `euiSize2XL` `[isCollapsible]="true"` `[isAutocloseOnMobile]="true"` — placeholder body for STORY-004.
      - Right column: `eui-page-column` (auto-grows) — list header placeholder + card list + paginator.

#### Card list
- Remove `eui-table` and all `ng-template euiTemplate="header"/"body"/"noData"` templates.
- Remove `eui-table-filter` and `eui-toggle-group` controls (replaced in STORY-004).
- Add `@for` loop rendering one `eui-content-card` per `BacklogItem`.
- Card structure per ticket:
  - `eui-content-card-header-start`: Type chip (`eui-chip euiSizeS`)
  - `eui-content-card-header-title`: Ticket title
  - `eui-content-card-header-subtitle`: Ticket key (e.g., "API-42")
  - `eui-content-card-header-end`: Status chip (`eui-chip euiSizeS`)
  - `eui-content-card-header-metadata`: Priority chip + Assignee name
  - `eui-content-card-body`: Description excerpt (truncated, only if present)
- Preserve `eui-paginator` with `paginatorReady` guard.
- Preserve `loadBacklog()`, `onSortChange()`, `onPageChange()` methods.
- Preserve result count `aria-live="polite"`.
- Loading state: show loading indicator or skeleton while `isLoading`.
- Preserve Create Ticket button in `eui-page-header-action-items`.

#### Imports update
- Remove: `EUI_TABLE`, `EuiTemplateDirective`, `EUI_TOGGLE_GROUP`, `EuiToggleGroupItemComponent`
- Add: eUI content-card components, `EUI_CHIP` (already imported)
- Keep: `EUI_PAGE` (already imported — includes all `eui-page-columns`, `eui-page-column`, `eui-page-column-body`, `eui-page-column-header-body` sub-components)

#### i18n keys (EN + FR)
- `backlog.filter.column-label`: "Search filter" / "Filtre de recherche"
- `backlog.filter.expand-label`: "Expand search filter" / "Ouvrir le filtre de recherche"
- `backlog.filter.collapse-label`: "Collapse search filter" / "Fermer le filtre de recherche"
- `backlog.card.no-description`: "No description" / "Pas de description"
- `backlog.card.no-assignee`: "Unassigned" / "Non assigné"

### Unit tests (~12 updated/new)
| # | Test | Expected |
|---|------|----------|
| 1 | Should render content cards for each item | N `eui-content-card` elements |
| 2 | Should display ticket key in subtitle | "API-1" format |
| 3 | Should display type chip | Chip with translated type |
| 4 | Should display status chip | Chip with translated status |
| 5 | Should display priority chip when present | Chip with translated priority |
| 6 | Should display "—" when no priority | Dash shown |
| 7 | Should display assignee name | Resolved from members |
| 8 | Should display "Unassigned" when no assignee | Fallback text |
| 9 | Should truncate long descriptions | Truncated text |
| 10 | Should show paginator | `eui-paginator` present |
| 11 | Should show loading state | Loading indicator visible |
| 12 | Should render fluid layout with page-columns | `eui-page-columns` + `eui-page-column` structure present |
| 13 | Should render collapsible filter column | Filter column with `isCollapsible` present |

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Remove table imports, add card imports, add `isFilterCollapsed` + handler |
| `src/app/features/projects/backlog/backlog.component.html` | Replace table with fluid layout (eui-page-columns) + card list |
| `src/app/features/projects/backlog/backlog.component.scss` | Remove old filter bar styles, add empty state centering |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Rewrite tests for card-based layout |
| `src/assets/i18n/en.json` | Add card-related i18n keys |
| `src/assets/i18n/fr.json` | Add card-related i18n keys |

---

## STORY-004: Frontend — Filter Panel with Checkbox Groups

Populate the collapsible filter column (left `eui-page-column` from STORY-003) with search input and collapsible checkbox filter sections.

### Changes

#### Search input
- `input[euiInputText]` with `<label euiLabel>` and placeholder "Search tickets...".
- Reuse existing `searchSubject` with `debounceTime(300)` + `distinctUntilChanged()`.
- On input change: update `params.q`, reset `_page` to 1, call `loadBacklog()`.

#### Filter sections (3 collapsible `eui-card` sections)
Each section is an `eui-card` with `[euiCollapsible]="true"` (expanded by default), placed inside the filter column's `eui-page-column-body`:

**Status filter:**
- `<fieldset>` + `<legend>` wrapping 4 checkboxes: To Do, In Progress, In Review, Done.
- Each: `<input euiInputCheckBox id="..." [(ngModel)]="..." (change)="onStatusCheckChange()" />` + `<label for="...">`.
- Component tracks `selectedStatuses: Set<WorkflowStatus>`.
- On change: build comma-separated string, update `params.status`, reset page, reload.

**Type filter:**
- Same pattern, 4 checkboxes: Story, Bug, Task, Epic.
- Component tracks `selectedTypes: Set<TicketType>`.

**Priority filter:**
- Same pattern, 4 checkboxes: Critical, High, Medium, Low.
- Component tracks `selectedPriorities: Set<TicketPriority>`.

#### State management
- Replace `activeStatusFilter` / `activeTypeFilter` single-value properties with `Set`-based multi-value tracking.
- Remove `onStatusFilterChange(item: EuiToggleGroupItemComponent)` and `onTypeFilterChange(item: EuiToggleGroupItemComponent)`.
- Add `onStatusCheckChange()`, `onTypeCheckChange()`, `onPriorityCheckChange()` handlers.
- Each handler: builds comma-separated param string from the Set, updates params, resets page to 1, reloads.

#### i18n keys (EN + FR)
- `backlog.filter.search-label`: "Search" / "Recherche"
- `backlog.filter.status-legend`: "Status" / "Statut"
- `backlog.filter.type-legend`: "Type" / "Type"
- `backlog.filter.priority-legend`: "Priority" / "Priorité"
- Reuse existing `workflow.status.*`, `workflow.ticket-type.*`, `ticket.priority.*` keys for checkbox labels.

### Unit tests (~10 new)
| # | Test | Expected |
|---|------|----------|
| 1 | Should render search input in filter column | `input[euiInputText]` present |
| 2 | Should render status checkbox group | 4 checkboxes |
| 3 | Should render type checkbox group | 4 checkboxes |
| 4 | Should render priority checkbox group | 4 checkboxes |
| 5 | Should call loadBacklog on search (after debounce) | Service called with `q` param |
| 6 | Should send multi-value status param | `params.status === 'TO_DO,IN_PROGRESS'` |
| 7 | Should send multi-value type param | `params.type === 'STORY,BUG'` |
| 8 | Should send multi-value priority param | `params.priority === 'HIGH,CRITICAL'` |
| 9 | Should reset page to 1 on filter change | `params._page === 1` |
| 10 | Should clear param when all checkboxes unchecked | `params.status === undefined` |

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Add checkbox state (Sets), handlers, remove toggle group logic |
| `src/app/features/projects/backlog/backlog.component.html` | Add filter column body content: search + 3 collapsible card sections |
| `src/app/features/projects/backlog/backlog.component.scss` | Filter panel styles, checkbox spacing |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Add ~10 tests |
| `src/assets/i18n/en.json` | Add filter i18n keys |
| `src/assets/i18n/fr.json` | Add filter i18n keys |

---

## STORY-005: Frontend — List Header, Sort Dropdown & Criteria Chips

Add the list header area above the card list with result count, sort dropdown, and selected-criteria chips.

### Changes

#### Result count
- `<p aria-live="polite">` showing "X results found" (already partially exists as "Showing X of Y", rephrase).

#### Sort dropdown
- `<label euiLabel for="sort-select">` + `<select euiSelect id="sort-select" [(ngModel)]="selectedSort" (change)="onSortSelectChange()">`.
- Options: Ticket # (desc), Ticket # (asc), Title (asc), Title (desc), Priority, Status.
- On change: update `params._sort` and `params._order`, reset page to 1, reload.
- Replaces the table column header sort — since there's no table anymore, sort moves to the dropdown.

#### Selected criteria chips
- `eui-chip-list` with `aria-label="Selected filters"`.
- One removable `eui-chip` per active filter value (e.g., "Status: To Do", "Status: In Progress", "Type: Story").
- Search term also shown as a chip if `params.q` is set (e.g., "Search: login").
- `(remove)` event on each chip: unchecks the corresponding checkbox (or clears search), updates params, reloads.
- "Clear all" button (`button[euiButton][euiBasicButton][euiSecondary] euiSizeS`): resets all Sets, clears `params.q`, resets sort to default, reloads.
- "Clear all" only visible when at least one filter is active.

#### i18n keys (EN + FR)
- `backlog.results-found`: "{{total}} results found" / "{{total}} résultats trouvés"
- `backlog.sort-label`: "Sort by" / "Trier par"
- `backlog.sort.ticket-desc`: "Ticket # (newest)" / "Ticket n° (récent)"
- `backlog.sort.ticket-asc`: "Ticket # (oldest)" / "Ticket n° (ancien)"
- `backlog.sort.title-asc`: "Title (A–Z)" / "Titre (A–Z)"
- `backlog.sort.title-desc`: "Title (Z–A)" / "Titre (Z–A)"
- `backlog.sort.priority`: "Priority" / "Priorité"
- `backlog.sort.status`: "Status" / "Statut"
- `backlog.chip.search`: "Search: {{term}}" / "Recherche : {{term}}"
- `backlog.chip.status`: "Status: {{value}}" / "Statut : {{value}}"
- `backlog.chip.type`: "Type: {{value}}" / "Type : {{value}}"
- `backlog.chip.priority`: "Priority: {{value}}" / "Priorité : {{value}}"
- `backlog.clear-all`: "Clear all" / "Tout effacer"
- `backlog.selected-filters`: "Selected filters" / "Filtres sélectionnés"

### Unit tests (~10 new)
| # | Test | Expected |
|---|------|----------|
| 1 | Should render result count | "X results found" text present |
| 2 | Should render sort dropdown | `select[euiSelect]` present with options |
| 3 | Should call loadBacklog on sort change | Service called with updated `_sort`/`_order` |
| 4 | Should render criteria chips for active status filters | Chips with "Status: To Do" etc. |
| 5 | Should render criteria chips for active type filters | Chips with "Type: Story" etc. |
| 6 | Should render criteria chip for search term | Chip with "Search: login" |
| 7 | Should remove status filter when chip removed | Set updated, param cleared, reload |
| 8 | Should clear search when search chip removed | `params.q` cleared, reload |
| 9 | Should show "Clear all" when filters active | Button visible |
| 10 | Should reset all filters on "Clear all" | All Sets empty, params reset, reload |

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Add sort select logic, chip generation, clear all |
| `src/app/features/projects/backlog/backlog.component.html` | Add list header: count + sort + chips + clear all |
| `src/app/features/projects/backlog/backlog.component.scss` | List header layout styles |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Add ~10 tests |
| `src/assets/i18n/en.json` | Add sort/chip/clear i18n keys |
| `src/assets/i18n/fr.json` | Add sort/chip/clear i18n keys |

---

## STORY-006: Frontend — Empty States, Error Handling & Polish

Finalize contextual empty states, error handling, and visual polish for the new layout.

### Changes

#### Contextual empty states
- Update `emptyStateMessage` getter for the card-based layout:
  - Search active + no results: "No tickets match your search"
  - Filters active + no results: "No tickets match the selected filters"
  - No filters + no results: "No backlog items yet. Create your first ticket."
  - Error state: "Failed to load backlog"
- Empty state rendered as a centered message inside the results column's `eui-page-column-body` (not inside a table row anymore).
- Error state includes a retry button.

#### Error handling
- Preserve `EuiGrowlService` notification on load error.
- Preserve retry button calling `loadBacklog()`.

#### Visual polish
- Card spacing: `eui-u-mb-s` between cards.
- Responsive: filter column auto-collapses on mobile via `isAutocloseOnMobile` (set in STORY-003). No custom CSS media queries needed.
- Priority chip color variants on cards: `euiDanger` for CRITICAL, `euiWarning` for HIGH, `euiInfo` for MEDIUM, default for LOW.
- Type chip: neutral styling for all types.
- Status chip: neutral styling.

#### i18n keys (EN + FR)
- Reuse existing: `backlog.no-match-search`, `backlog.no-match-filter`, `backlog.no-items`, `backlog.load-error`
- `backlog.no-items-hint`: "Create your first ticket." / "Créez votre premier ticket."

### Unit tests (~6 new)
| # | Test | Expected |
|---|------|----------|
| 1 | Should show search empty state when q active and no results | Correct message |
| 2 | Should show filter empty state when filters active and no results | Correct message |
| 3 | Should show default empty state when no filters and no results | Correct message |
| 4 | Should show error state with retry button | Error message + button |
| 5 | Should call loadBacklog on retry | Service called |
| 6 | Should show growl on load error | GrowlService called |

### Files changed
| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Update emptyStateMessage, polish logic |
| `src/app/features/projects/backlog/backlog.component.html` | Empty state template in results column |
| `src/app/features/projects/backlog/backlog.component.scss` | Empty state centering, chip color utility classes |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Add ~6 tests |
| `src/assets/i18n/en.json` | Add/update empty state keys |
| `src/assets/i18n/fr.json` | Add/update empty state keys |

---

## Files Changed (estimated, all stories)

| File | Stories |
|------|---------|
| `mock/app/routes/project_routes.js` | 1 |
| `mock/app/routes/project_routes.test.js` | 1 |
| `src/app/core/project/project.models.ts` | 2 |
| `src/app/core/project/project.service.spec.ts` | 2 |
| `src/app/features/projects/backlog/backlog.component.ts` | 3, 4, 5, 6 |
| `src/app/features/projects/backlog/backlog.component.html` | 3, 4, 5, 6 |
| `src/app/features/projects/backlog/backlog.component.scss` | 3, 4, 5, 6 |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | 3, 4, 5, 6 |
| `src/assets/i18n/en.json` | 3, 4, 5, 6 |
| `src/assets/i18n/fr.json` | 3, 4, 5, 6 |
