# STORY-003: Frontend — Two-Column Layout & Card List

## Goal

Replace the `eui-table` with the eUI "fluid layout" pattern: an outer `eui-page-columns` with `eui-page-column[hasSubColumns]` wrapping the page header in `eui-page-column-header-body`, and a nested `eui-page-columns` providing a collapsible filter column placeholder + results column with `eui-content-card` per ticket plus the existing `eui-paginator`.

## Existing Code

- `src/app/features/projects/backlog/backlog.component.ts` — async `eui-table` with `params`, `loadBacklog()`, `onSortChange()`, `onPageChange()`, `paginatorReady` guard.
- `src/app/features/projects/backlog/backlog.component.html` — `eui-table-filter`, two `eui-toggle-group`, async `euiTable`, `eui-paginator`, Create Ticket dialog.
- `src/app/features/projects/backlog/backlog.component.scss` — filter bar styles, toggle group width override.

## Implementation Plan

### 1. Template — Fluid layout with eui-page-columns

Replace the content inside `<eui-page-content>` with the eUI fluid layout pattern. The page header moves inside `eui-page-column-header-body` of the outer column. A nested `eui-page-columns` provides the two-column split.

```html
<eui-page>
    <eui-page-content>
        <eui-page-columns>
            <!-- Outer column: wraps header + nested columns -->
            <eui-page-column hasSubColumns>
                <eui-page-column-header-body>
                    <eui-page-header
                        [label]="'backlog.title' | translate">
                        <eui-page-header-action-items>
                            <button euiButton euiPrimary euiSizeS
                                    type="button"
                                    (click)="openCreateTicketDialog()">
                                {{ 'backlog.create-ticket' | translate }}
                            </button>
                        </eui-page-header-action-items>
                    </eui-page-header>
                </eui-page-column-header-body>

                <eui-page-column-body>
                    <!-- Nested columns: filter + results -->
                    <eui-page-columns>

                        <!-- Left: collapsible filter column (body populated in STORY-004) -->
                        <eui-page-column
                            [label]="'backlog.filter.column-label' | translate"
                            euiSize2XL
                            [isCollapsible]="true"
                            [isCollapsed]="isFilterCollapsed"
                            [isAutocloseOnMobile]="true"
                            [expandAriaLabel]="'backlog.filter.expand-label' | translate"
                            [collapseAriaLabel]="'backlog.filter.collapse-label' | translate"
                            (collapse)="onFilterColumnCollapse($event)">
                            <eui-page-column-body>
                                <!-- Filter content added in STORY-004 -->
                            </eui-page-column-body>
                        </eui-page-column>

                        <!-- Right: results column -->
                        <eui-page-column>
                            <eui-page-column-body>
                                <!-- List header placeholder (STORY-005) -->

                                <p aria-live="polite" class="eui-u-mt-s eui-u-mb-s">
                                    {{ 'backlog.results-found' | translate:{ total: total } }}
                                </p>

                                <!-- Card list -->
                                @if (isLoading) {
                                    <div class="eui-u-text-center eui-u-pv-3xl">
                                        <eui-spinner></eui-spinner>
                                    </div>
                                } @else if (items.length === 0) {
                                    <div class="empty-state eui-u-text-center eui-u-pv-3xl">
                                        <p>{{ emptyStateMessage }}</p>
                                        @if (hasError) {
                                            <button euiButton euiSecondary type="button"
                                                    class="eui-u-mt-m"
                                                    (click)="retry()">
                                                {{ 'common.retry' | translate }}
                                            </button>
                                        }
                                    </div>
                                } @else {
                                    @for (item of items; track item.id) {
                                        <eui-content-card class="eui-u-mb-s">
                                            <eui-content-card-header>
                                                <eui-content-card-header-start>
                                                    <eui-chip euiSizeS
                                                        [ariaLabel]="'workflow.ticket-type.' + item.type | translate">
                                                        {{ 'workflow.ticket-type.' + item.type | translate }}
                                                    </eui-chip>
                                                </eui-content-card-header-start>

                                                <eui-content-card-header-title>
                                                    {{ item.title }}
                                                </eui-content-card-header-title>

                                                <eui-content-card-header-subtitle>
                                                    {{ projectKey }}-{{ item.ticket_number }}
                                                </eui-content-card-header-subtitle>

                                                <eui-content-card-header-end>
                                                    <eui-chip euiSizeS
                                                        [ariaLabel]="'workflow.status.' + item.status | translate">
                                                        {{ 'workflow.status.' + item.status | translate }}
                                                    </eui-chip>
                                                </eui-content-card-header-end>

                                                <eui-content-card-header-metadata>
                                                    @if (item.priority) {
                                                        <eui-chip euiSizeS
                                                            [ariaLabel]="'ticket.priority.' + item.priority | translate">
                                                            {{ 'ticket.priority.' + item.priority | translate }}
                                                        </eui-chip>
                                                    }
                                                    <span class="eui-u-ml-s">{{ getAssigneeName(item) }}</span>
                                                </eui-content-card-header-metadata>
                                            </eui-content-card-header>

                                            @if (item.description) {
                                                <eui-content-card-body>
                                                    {{ item.description | euiTruncate:120 }}
                                                </eui-content-card-body>
                                            }
                                        </eui-content-card>
                                    }
                                }

                                <eui-paginator
                                    [length]="total"
                                    [pageSize]="params._limit ?? 10"
                                    [pageSizeOptions]="[10, 25, 50]"
                                    (pageChange)="onPageChange($event)">
                                </eui-paginator>
                            </eui-page-column-body>
                        </eui-page-column>

                    </eui-page-columns>
                </eui-page-column-body>
            </eui-page-column>
        </eui-page-columns>
    </eui-page-content>
</eui-page>
```

### 2. Component class — New properties and methods

```typescript
// Filter column collapse state
isFilterCollapsed = false;

onFilterColumnCollapse(collapsed: boolean): void {
    this.isFilterCollapsed = collapsed;
}
```

### 3. Component class — Import updates

Remove:
- `EUI_TABLE`, `Sort` from `@eui/components/eui-table`
- `EuiTemplateDirective` from `@eui/components/directives`
- `EUI_TOGGLE_GROUP`, `EuiToggleGroupItemComponent` from `@eui/components/eui-toggle-group`

Keep:
- `EUI_PAGE` from `@eui/components/eui-page` — already imported, includes all `eui-page-columns`, `eui-page-column`, `eui-page-column-body`, `eui-page-column-header-body` sub-components

Add:
- Content card components from `@eui/components/eui-content-card`
- `EuiSpinnerComponent` from `@eui/components/eui-spinner` (if available, else use eUI loader)
- `EuiTruncatePipe` from `@eui/components/pipes` (for description truncation)

Remove methods:
- `onSortChange()` (sort moves to dropdown in STORY-005)
- `activeStatusFilter`, `activeTypeFilter` properties
- `onStatusFilterChange()`, `onTypeFilterChange()` methods

Keep:
- `loadBacklog()`, `onPageChange()`, `paginatorReady`, `getAssigneeName()`, `retry()`
- `emptyStateMessage` getter
- Create Ticket dialog and all related methods

### 4. SCSS

Minimal SCSS needed — the `eui-page-columns` / `eui-page-column` components handle the layout, collapse animation, and responsive behavior natively. Only card spacing and empty state centering needed:

```scss
.empty-state {
    min-height: 200px;
}
```

### 5. i18n keys (EN + FR)

**en.json:**
```json
"backlog.filter.column-label": "Search filter",
"backlog.filter.expand-label": "Expand search filter",
"backlog.filter.collapse-label": "Collapse search filter",
"backlog.results-found": "{{total}} results found",
"backlog.card.no-description": "No description",
"backlog.card.no-assignee": "Unassigned"
```

**fr.json:**
```json
"backlog.filter.column-label": "Filtre de recherche",
"backlog.filter.expand-label": "Ouvrir le filtre de recherche",
"backlog.filter.collapse-label": "Fermer le filtre de recherche",
"backlog.results-found": "{{total}} résultats trouvés",
"backlog.card.no-description": "Pas de description",
"backlog.card.no-assignee": "Non assigné"
```

## Unit Tests (~13 updated/new)

| # | Test | Expected |
|---|------|----------|
| 1 | Should render content cards for each item | N `eui-content-card` elements |
| 2 | Should display ticket key in subtitle | "API-1" format |
| 3 | Should display type chip in header-start | Chip with translated type |
| 4 | Should display status chip in header-end | Chip with translated status |
| 5 | Should display priority chip when present | Chip with translated priority |
| 6 | Should display dash when no priority | No priority chip |
| 7 | Should display assignee name | Resolved from members |
| 8 | Should display "Unassigned" when no assignee | Fallback text |
| 9 | Should truncate long descriptions | Truncated text in body |
| 10 | Should show paginator | `eui-paginator` present |
| 11 | Should show loading spinner | Spinner visible when isLoading |
| 12 | Should render fluid layout with eui-page-columns | `eui-page-columns` + `eui-page-column` structure present |
| 13 | Should render collapsible filter column | Filter column with `isCollapsible` present |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Remove table/toggle imports, add card imports, add `isFilterCollapsed` + handler, remove sort/toggle methods |
| `src/app/features/projects/backlog/backlog.component.html` | Replace table with fluid layout (eui-page-columns) + card list |
| `src/app/features/projects/backlog/backlog.component.scss` | Remove old filter bar styles, add empty state centering |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Rewrite tests for card-based layout |
| `src/assets/i18n/en.json` | Add 6 i18n keys |
| `src/assets/i18n/fr.json` | Add 6 i18n keys |

## Acceptance Criteria

- [ ] Fluid layout: outer `eui-page-columns` > `eui-page-column[hasSubColumns]` with page header in `eui-page-column-header-body`
- [ ] Nested `eui-page-columns` with collapsible filter column + results column
- [ ] Filter column has `isCollapsible`, `isAutocloseOnMobile`, `expandAriaLabel`, `collapseAriaLabel`
- [ ] Filter column collapses to vertical label tab, expands with toggle arrow
- [ ] Each ticket rendered as `eui-content-card` with type, title, key, status, priority, assignee
- [ ] Description truncated to ~120 chars in card body
- [ ] Loading spinner shown while loading
- [ ] Empty state message shown when no results
- [ ] Error state with retry button preserved
- [ ] Paginator preserved with `paginatorReady` guard
- [ ] Create Ticket button in `eui-page-header-action-items` preserved (inside column header)
- [ ] Create Ticket dialog still works
- [ ] All unit tests pass
- [ ] Build passes
