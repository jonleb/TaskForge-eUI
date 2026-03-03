# CR-2001 Tickets Page Refactoring — Story Breakdown

## Context

This CR refactors the existing Tickets page to match the updated design. The current page has a collapsible filter column (search, quick filters, status/type/priority checkboxes in `eui-card` wrappers, advanced filters), a results area with card list, and a paginator. The new design introduces breadcrumb navigation, a dynamic "Select filter" dropdown, restructured filters (status→dropdown, type→flat checkboxes, priority→radio buttons), a results header bar with sort + view toggle, redesigned expandable cards with kebab action menu, and a full table view alternative.

### Current state
- `TicketsComponent` with `eui-page` > `eui-page-columns` layout
- Filter column: search input + button, quick filters (Assigned to me, Open Sprints), status/type/priority checkboxes in `eui-card`, advanced filters (project/sprint selects)
- Results: count text, filter chips, card list with `eui-content-card`, paginator
- Create ticket dialog
- ~67 existing unit tests
- Custom SCSS: `.filter-fieldset`, `.filter-checkbox`, `.search-input-group`, `.empty-state`, `.card-link`, `.dialog-form`

### Target state
- Breadcrumb: `Home > Tickets`
- Page header with "Create ticket" button (icon prefix)
- Dynamic "Select filter" dropdown to show/hide filter sections
- Simplified search input (no button)
- Status → `select[euiSelect]` dropdown
- Type → flat checkboxes (2-column grid, no `eui-card` wrapper)
- Priority → radio buttons (single-select, "All" default)
- Quick Filters → removed
- Advanced filters → section with chevron toggle (no `eui-card`)
- Results header: "Results" heading + count + sort control + view toggle
- Selected criteria chips with "Clear all" link + "More" overflow
- Card view: title as link, subtitle, metadata line, `eui-status-badge`, kebab menu (`eui-popover`), expand/collapse description
- Table view: Key, Title, Type, Status, Priority, Assignee, Project columns
- No custom CSS — eUI utility classes only

## eUI Components Used (new or changed)

| Component | Import | Purpose |
|-----------|--------|---------|
| `eui-page-breadcrumb` | `EuiPageBreadcrumbComponent` from `@eui/components/eui-page` | Breadcrumb container |
| `eui-breadcrumb` | `EuiBreadcrumbComponent` from `@eui/components/eui-breadcrumb` | Breadcrumb nav |
| `eui-breadcrumb-item` | `EuiBreadcrumbItemComponent` from `@eui/components/eui-breadcrumb` | Breadcrumb items |
| `eui-status-badge` | `EuiStatusBadgeComponent` from `@eui/components/eui-status-badge` | Status display on cards |
| `eui-icon-button` | `EuiIconButtonComponent` from `@eui/components/eui-icon-button` | Kebab menu trigger, expand/collapse, sort direction |
| `eui-popover` | `EuiPopoverComponent` from `@eui/components/eui-popover` | Kebab action menu |
| `eui-toggle-group` | from `@eui/components/eui-toggle-group` | Card/table view switcher |
| `eui-toggle-group-item` | from `@eui/components/eui-toggle-group` | View toggle items |
| `input[euiInputRadio]` | `EuiInputRadioComponent` from `@eui/components/eui-input-radio` | Priority radio buttons |
| `eui-icon-svg` | from `@eui/components/eui-icon` | Icons in breadcrumb, toggle, buttons |

## Execution Order

Stories must be implemented in this exact order. Each story builds on the previous one.

```
STORY-001 (Breadcrumb + page header restructuring)
    └── STORY-002 (Filter panel refactoring)
            └── STORY-003 (Results header bar: sort + view toggle)
                    └── STORY-004 (Card view redesign)
                            └── STORY-005 (Table view)
                                    └── STORY-006 (i18n keys EN/FR)
```

## Stories

| # | Title | Scope |
|---|-------|-------|
| STORY-001 | Breadcrumb navigation + page header restructuring | Template + TS |
| STORY-002 | Filter panel refactoring (dynamic filter builder, status dropdown, type flat checkboxes, priority radios, remove quick filters) | Template + TS + remove SCSS |
| STORY-003 | Results header bar (sort control + view toggle) | Template + TS |
| STORY-004 | Card view redesign (expandable description, status badge, kebab action menu) | Template + TS |
| STORY-005 | Table view implementation | Template + TS |
| STORY-006 | i18n keys (EN/FR) for all new elements | JSON files |

## Technical Notes

- No custom CSS — use only eUI utility classes (`eui-u-*`). Remove existing custom SCSS classes progressively.
- `eui-popover` for kebab menu: use `openPopover(triggerRef)` pattern with `[isDismissable]="true"`, `[hasCloseButton]="false"`, `[hasNoContentPadding]="true"`.
- `eui-toggle-group` has `width: 100%` by default — override with `::ng-deep { width: auto }` (only exception to no-custom-CSS rule, per eUI pitfalls).
- `eui-page-breadcrumb` must be a direct child of `eui-page`, before `eui-page-content`.
- Priority radio: use `input[euiInputRadio]` with `name="priority-filter"`, `[(ngModel)]="selectedPriority"`. "All" option has value `null`.
- Icon naming: always use `eui-*` or `name:variant` format (e.g., `home:outline`, `dots-three-vertical:regular`, `caret-down:regular`).
- `eui-icon-button` disabled state uses `[euiDisabled]`, not `[disabled]`.
