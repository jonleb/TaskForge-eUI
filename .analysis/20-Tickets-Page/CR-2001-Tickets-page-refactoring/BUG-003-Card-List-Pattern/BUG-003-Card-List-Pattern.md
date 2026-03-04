# BUG-003: Card List Not Following eUI Card + Dropdown Pattern

## Problem

The ticket card list view was using `eui-content-card` with a shared `eui-popover` for the kebab menu and `euiStatusBadge` for status display. This diverged from the standard eUI card list pattern which uses:

1. `eui-card` (not `eui-content-card`) with `eui-card-header`, `eui-card-header-title`, `eui-card-header-subtitle`, `eui-card-header-right-content`
2. `eui-dropdown` with `eui-dropdown-content` + `euiDropdownItem` for per-card actions (not a shared `eui-popover`)
3. `eui-chip` with color variants for status display in cards (not `euiStatusBadge`)
4. `eui-page-column-header-left-content` / `header-body` / `header-right-content` for the results column header (not a custom `<div>` layout)
5. `eui-chip-list` for selected filter criteria chips
6. `eui-page-column-footer` for the paginator (not inside `eui-page-column-body`)

Additionally, the shared `eui-popover` approach required tracking `activeKebabItemIndex` and wrapping `event.target` in a fake `ElementRef` — fragile and non-standard.

## Root Cause

The original implementation was built before the eUI card list pattern example was available as a reference. It used `eui-content-card` (designed for content-heavy collapsible cards) instead of `eui-card` (designed for list items with header slots), and a single shared `eui-popover` instead of per-card `eui-dropdown` components.

The results column header used a flat `<div>` with flexbox utilities instead of the structured `eui-page-column-header-*` slots, and the paginator was placed inside the column body instead of the dedicated footer slot.

## Fix

### Card component swap

| Before | After |
|---|---|
| `eui-content-card` | `eui-card` |
| `eui-content-card-header-title` | `eui-card-header-title` |
| `eui-content-card-header-subtitle` | `eui-card-header-subtitle` |
| `eui-content-card-header-end` | `eui-card-header-right-content` |
| `eui-content-card-body` | `eui-card-content` |
| `euiStatusBadge` (in cards) | `eui-chip` with `euiSuccess`/`euiInfo`/`euiWarning` |

### Actions menu swap

| Before | After |
|---|---|
| Shared `eui-popover #kebabPopover` | Per-card `eui-dropdown` inside `eui-card-header-right-content` |
| `eui-icon-button` trigger + `openKebabMenu(i, $event)` | `button euiButton euiBasicButton` trigger with icon |
| `role="menu"` div with `euiButton` items | `eui-dropdown-content` with `button euiDropdownItem` items |
| `activeKebabItemIndex` + `kebabPopover.openPopover()` | Direct `onCardAction(action, item)` on each dropdown item |

### Results column restructure

| Before | After |
|---|---|
| Custom `<div>` with `<h2>` heading + count | `eui-page-column-header-left-content` |
| Inline chip section with `eui-chip euiSizeS` | `eui-page-column-header-body` with `eui-chip-list` |
| Sort + view toggle in custom `<div>` | `eui-page-column-header-right-content` |
| Paginator inside `eui-page-column-body` | `eui-page-column-footer` |

### TypeScript changes

- Removed imports: `EUI_CONTENT_CARD`, `EUI_POPOVER`, `EuiPopoverComponent`
- Added imports: `EUI_DROPDOWN`, `EUI_CHIP_LIST`
- Removed: `@ViewChild('kebabPopover')`, `activeKebabItemIndex`, `openKebabMenu()`
- Changed `onCardAction()` signature from index-based to item-based: `onCardAction(action, item: BacklogItem)`
- Renamed `getStatusBadgeVariant()` → `getStatusChipVariant()` (same logic, clearer name)

### Test updates

- All card selectors updated from `eui-content-card*` to `eui-card*`
- Popover/kebab tests replaced with dropdown presence + direct `onCardAction()` tests
- Status badge tests in cards replaced with chip tests in `eui-card-header-right-content`
- New test for paginator in `eui-page-column-footer`
- New test for results heading in `eui-page-column-header-left-content`

## Files Modified

- `src/app/features/tickets/tickets.component.ts` — imports, method signatures, removed popover logic
- `src/app/features/tickets/tickets.component.html` — full card section + results column rewrite
- `src/app/features/tickets/tickets.component.spec.ts` — updated all card/popover/status tests

## Verification

- 88 component tests passing
- 714 total tests passing
- Build clean (`npx ng build --configuration=development`)
