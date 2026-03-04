# BUG-001: Card View Not Using eui-content-card Component

## Problem

The ticket card view (STORY-004) was implemented using raw `<div>` elements with eUI utility classes instead of the proper `eui-content-card` component. This results in:

1. No card shadow, no proper card styling (border, background, spacing are all manual)
2. The status badge renders as a large colored block on the right instead of an inline chip in the header row
3. The kebab menu and expand chevron are vertically stacked and oversized instead of compact inline icons
4. The title link, subtitle (key), and metadata line lack the proper typography and spacing that `eui-content-card` provides out of the box
5. The expanded description area has no proper visual separation
6. Overall the card looks nothing like the reference design (screenshot 1) and instead appears as a plain unstyled block (screenshot 2)

## Root Cause

STORY-004 replaced the original `eui-content-card` with a custom `<div>` layout using utility classes. The `eui-content-card` component provides built-in:
- Card shadow and border styling
- `eui-content-card-header` with structured slots: `header-title`, `header-subtitle`, `header-metadata`, `header-start` (for status chip), `header-end` (for kebab menu)
- `eui-content-card-body` for expandable content
- `isCollapsible` / `isCollapsed` inputs for native expand/collapse with chevron toggle
- Proper typography hierarchy and spacing

## Fix

Replace the custom `<div>` card layout with `eui-content-card` using its sub-components:

| Card section | eUI component | Content |
|---|---|---|
| Title (clickable link) | `eui-content-card-header-title` | `<a>` with `routerLink`, `eui-u-text-link` class |
| Subtitle (project key + ticket number) | `eui-content-card-header-subtitle` | `{{ getProjectKey(item) }}-{{ item.ticket_number }}` |
| Metadata (type · priority · assignee) | `eui-content-card-header-metadata` | Type · Priority · Assignee |
| Status badge (right side of header) | `eui-content-card-header-end` | `euiStatusBadge` with `colorPalette` |
| Kebab menu | `eui-content-card-header-end` | `eui-icon-button` with `dots-three-vertical:regular` |
| Description (expandable) | `eui-content-card-body` | Description text, shown via `isCollapsible` / `isCollapsed` |

### Key changes:
- Add `EUI_CONTENT_CARD` import from `@eui/components/eui-content-card`
- Place status badge + kebab in `eui-content-card-header-end` (always visible)
- Handle expand/collapse manually via `toggleCardExpand()` + expand button in metadata line, because `eui-content-card`'s `isCollapsible` input hides the `header-end` slot (replacing it with the expander chevron), which would hide the status badge and kebab menu
- Card body is conditionally rendered with `@if (item.description && expandedCards.has(item.id))`
- Remove custom `.card-expanded` CSS class (no longer needed)
- Remove `role="article"` (the `eui-content-card` provides its own semantic structure)
- Update tests to query `eui-content-card`, `eui-content-card-header-end`, and expand button

## Files Modified

- `src/app/features/tickets/tickets.component.html` — card template
- `src/app/features/tickets/tickets.component.ts` — imports, collapse handler
- `src/app/features/tickets/tickets.component.scss` — remove `.card-expanded`
- `src/app/features/tickets/tickets.component.spec.ts` — update card selectors in tests
