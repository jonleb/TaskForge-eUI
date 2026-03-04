---
inclusion: manual
---

# Card List Implementation Anatomy

Reference guide for building card list pages using eUI components. Based on the standard eUI card list pattern and validated in the Tickets page implementation.

## Required Imports

```typescript
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_CHIP_LIST } from '@eui/components/eui-chip-list';
import { EUI_PAGE } from '@eui/components/eui-page';
import { EuiPaginatorComponent } from '@eui/components/eui-paginator';
```

## Page Structure

A card list page uses `eui-page-columns` with a filter column and a results column. The results column uses structured header slots, a body for the cards, and a footer for the paginator.

```
eui-page
├── eui-page-breadcrumb
├── eui-page-header (with eui-page-header-action-items for Create button)
└── eui-page-content
    └── eui-page-columns
        ├── eui-page-column (filter — euiSize2XL, isCollapsible)
        │   └── eui-page-column-body (search, filters)
        └── eui-page-column (results)
            ├── eui-page-column-header-left-content (heading + count)
            ├── eui-page-column-header-body (selected criteria chips)
            ├── eui-page-column-header-right-content (sort + view toggle)
            ├── eui-page-column-body (card list or table)
            └── eui-page-column-footer (paginator)
```

## Results Column Header

```html
<!-- Left: title + result count -->
<eui-page-column-header-left-content>
    <div class="eui-u-f-l eui-u-f-bold">Filter results</div>
    <div aria-live="polite">
        <strong>{{ total }}</strong>&nbsp;results found
    </div>
</eui-page-column-header-left-content>

<!-- Center: selected filter chips -->
<eui-page-column-header-body>
    <div class="eui-u-flex eui-u-flex-gap-m">
        <div class="eui-u-f-s">
            Selected criteria:<br>
            <a class="eui-u-text-link" (click)="clearAll()">Clear all</a>
        </div>
        <eui-chip-list euiSizeS>
            @for (chip of chips; track chip.key) {
                <eui-chip [isChipRemovable]="true" (remove)="onRemove(chip)">
                    {{ chip.label }}
                </eui-chip>
            }
        </eui-chip-list>
    </div>
</eui-page-column-header-body>

<!-- Right: sort + actions -->
<eui-page-column-header-right-content>
    <div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-s">
        <select euiSelect id="sort-field" [(ngModel)]="sortField">...</select>
        <button euiButton euiPrimary euiSizeS>Action</button>
    </div>
</eui-page-column-header-right-content>
```

## Card Anatomy (eui-card)

Use `eui-card` (NOT `eui-content-card`) for list items. `eui-content-card` is for standalone content-heavy collapsible cards.

```html
<eui-card class="eui-u-mb-m" [attr.aria-label]="item.title">
    <eui-card-header>
        <eui-card-header-title>
            <a class="eui-u-text-link" [routerLink]="['/detail', item.id]">
                {{ item.title }}
            </a>
        </eui-card-header-title>

        <eui-card-header-subtitle>
            {{ item.key }} · {{ item.type }} · {{ item.assignee }}
        </eui-card-header-subtitle>

        <eui-card-header-right-content>
            <!-- Status chip -->
            <eui-chip euiSuccess [ariaLabel]="item.status">
                {{ item.status }}
            </eui-chip>

            <!-- Actions dropdown -->
            <eui-dropdown class="eui-u-ml-s">
                <button euiButton euiBasicButton euiPrimary euiOutline euiSizeS
                        aria-label="Actions menu">
                    <eui-icon-svg icon="dots-three-vertical:regular"
                                  aria-hidden="true"></eui-icon-svg>
                </button>
                <eui-dropdown-content>
                    <button euiDropdownItem (click)="onAction('edit', item)">
                        <eui-icon-svg icon="eui-edit" class="eui-u-mr-s"
                                      aria-hidden="true"></eui-icon-svg>
                        Edit
                    </button>
                    <button euiDropdownItem (click)="onAction('delete', item)">
                        <eui-icon-svg icon="eui-trash" class="eui-u-mr-s"
                                      aria-hidden="true"></eui-icon-svg>
                        Delete
                    </button>
                </eui-dropdown-content>
            </eui-dropdown>
        </eui-card-header-right-content>
    </eui-card-header>

    <!-- Optional expandable body -->
    @if (item.description && isExpanded(item.id)) {
        <eui-card-content>
            <p>{{ item.description }}</p>
        </eui-card-content>
    }
</eui-card>
```

## Paginator Placement

ALWAYS place the paginator in `eui-page-column-footer`, NOT inside `eui-page-column-body`.

```html
<eui-page-column-footer>
    @if (!isLoading) {
        <eui-paginator
            [length]="total"
            [page]="currentPage"
            [pageSize]="pageSize"
            [pageSizeOptions]="[10, 25, 50]"
            (pageChange)="onPageChange($event)">
        </eui-paginator>
    }
</eui-page-column-footer>
```

## eui-chip Color Variants

Use CSS class bindings for dynamic status colors on `eui-chip`:

| Status | Class | Visual |
|---|---|---|
| Success / Done | `euiSuccess` | Green |
| Info / In Progress | `euiInfo` | Blue |
| Warning / To Do | `euiWarning` | Orange |
| Danger / Blocked | `euiDanger` | Red |

```html
<eui-chip
    [class.euiSuccess]="variant === 'success'"
    [class.euiInfo]="variant === 'info'"
    [class.euiWarning]="variant === 'warning'"
    [class.euiDanger]="variant === 'danger'">
    {{ label }}
</eui-chip>
```

## eui-dropdown vs eui-popover

For card action menus, ALWAYS use `eui-dropdown` with `euiDropdownItem` buttons. Do NOT use `eui-popover`.

| Feature | eui-dropdown | eui-popover |
|---|---|---|
| Use case | Action menus, context menus | Tooltips, rich content overlays |
| Menu items | `euiDropdownItem` directive | Manual button layout |
| Keyboard nav | Built-in arrow key navigation | Manual |
| Positioning | Automatic | Manual `position` input |
| Per-item usage | One dropdown per card (simple) | Shared popover needs index tracking (fragile) |

## eui-card vs eui-content-card

| Feature | eui-card | eui-content-card |
|---|---|---|
| Use case | List items, dashboards | Standalone collapsible content |
| Header slots | `title`, `subtitle`, `right-content` | `title`, `subtitle`, `start`, `end`, `metadata` |
| Body | `eui-card-content` | `eui-content-card-body` |
| Collapsible | `euiCollapsible` / `euiCollapsed` (keeps right-content visible) | `isCollapsible` (hides header-end, replaces with chevron) |
| Actions menu | Place in `eui-card-header-right-content` | Place in `eui-content-card-header-end` (hidden when collapsible) |

## eui-chip-list

`eui-chip-list` is a container for chip groups. It does NOT have `isChipsRemovable` — set `[isChipRemovable]="true"` on each individual `eui-chip`.

```html
<eui-chip-list euiSizeS>
    @for (chip of chips; track chip.key) {
        <eui-chip [isChipRemovable]="true" (remove)="onRemove(chip)">
            {{ chip.label }}
        </eui-chip>
    }
</eui-chip-list>
```

## Reference Implementation

See `src/app/features/tickets/tickets.component.html` and `.ts` for a complete working example of this pattern.
