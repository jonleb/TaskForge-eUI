# FEATURE-013.2 Ticket Discovery & Filtering — Search Improvement

## Business objective

Redesign the Backlog page from a flat table layout to a two-column layout with a left-side filter panel and card-based results. This improves discoverability, scannability, and provides a richer filtering experience with multi-value checkbox filters, selected-criteria chips, and a sort dropdown.

## What changes and why

### Current state (FEATURE-013)

The Backlog page uses a single-column layout:
- Inline `eui-table-filter` + two `eui-toggle-group` controls (status, type) stacked above an `eui-table`.
- Results displayed as table rows with columns: Ticket #, Type, Title, Priority, Status, Assignee.
- `eui-paginator` below the table.
- Priority filter exists on the backend (`?priority=`) but is not exposed in the UI.
- No "clear all filters" action. No selected-criteria chips. No collapsible filter sections.
- Toggle groups only allow single-value selection per dimension.

### Target state (FEATURE-013.2)

A "fluid layout" using the eUI page-column pattern (`eui-page-columns` > `eui-page-column`). The page header is placed inside `eui-page-column-header-body` of the outer column. A nested `eui-page-columns` provides the two-column split: a collapsible filter column on the left and the results column on the right.

```
┌──────────────────────────────────────────────────────────┐
│  eui-page > eui-page-content > eui-page-columns          │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ eui-page-column (outer, hasSubColumns)               │ │
│ │  ┌─ eui-page-column-header-body ──────────────────┐  │ │
│ │  │ eui-page-header "Backlog"    [Create Ticket]   │  │ │
│ │  └────────────────────────────────────────────────┘  │ │
│ │  ┌─ eui-page-column-body ────────────────────────┐  │ │
│ │  │ eui-page-columns (nested)                     │  │ │
│ │  │ ┌──────────────┬─────────────────────────────┐│  │ │
│ │  │ │ FILTER COL   │  RESULTS COLUMN             ││  │ │
│ │  │ │ (collapsible)│                             ││  │ │
│ │  │ │ ◀ toggle     │  LIST HEADER                ││  │ │
│ │  │ │              │  "X results"  [Sort ▼]      ││  │ │
│ │  │ │  Search      │  [chip ×] [chip ×] Clear all││  │ │
│ │  │ │  ┌────────┐  │                             ││  │ │
│ │  │ │  │ input  │  │  ┌─ eui-content-card ─────┐ ││  │ │
│ │  │ │  └────────┘  │  │ [Story] API-12 [To Do] │ ││  │ │
│ │  │ │              │  │ Title of the ticket     │ ││  │ │
│ │  │ │  ▼ Status    │  │ Description excerpt...  │ ││  │ │
│ │  │ │  ☐ To Do     │  │ [High] · Assignee: J.D.│ ││  │ │
│ │  │ │  ☐ In Progr. │  └───────────────────────┘ ││  │ │
│ │  │ │  ☐ In Review │                             ││  │ │
│ │  │ │  ☐ Done      │  ┌─ eui-content-card ─────┐ ││  │ │
│ │  │ │              │  │ ...                     │ ││  │ │
│ │  │ │  ▼ Type      │  └───────────────────────┘ ││  │ │
│ │  │ │  ☐ Story     │                             ││  │ │
│ │  │ │  ☐ Bug       │  eui-paginator              ││  │ │
│ │  │ │  ☐ Task      │                             ││  │ │
│ │  │ │  ☐ Epic      │                             ││  │ │
│ │  │ │              │                             ││  │ │
│ │  │ │  ▼ Priority  │                             ││  │ │
│ │  │ │  ☐ Critical  │                             ││  │ │
│ │  │ │  ☐ High      │                             ││  │ │
│ │  │ │  ☐ Medium    │                             ││  │ │
│ │  │ │  ☐ Low       │                             ││  │ │
│ │  │ └──────────────┴─────────────────────────────┘│  │ │
│ │  └───────────────────────────────────────────────┘  │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

When the filter column is collapsed, it shows a vertical "Search filter" label tab on the left edge with a toggle arrow to re-expand. The `isAutocloseOnMobile` input auto-collapses the filter panel on small viewports.

## Front-end business needs

- Replace the `eui-table` with a vertical list of `eui-content-card` components, one per ticket.
- Move all filter controls into a collapsible left-side filter panel using the eUI page-column pattern (`eui-page-columns` > `eui-page-column` with `[isCollapsible]="true"`). When collapsed, the panel shows a vertical label tab; when expanded, it shows the full filter content with a collapse toggle arrow.
- Replace `eui-toggle-group` single-value filters with `input[euiInputCheckBox]` checkbox groups that support multi-value selection (e.g., select both "To Do" AND "In Progress" simultaneously).
- Add a priority filter (checkbox group) — currently backend-only, never exposed in UI.
- Add a list header area showing result count, a sort `<select euiSelect>` dropdown, and selected-criteria chips (`eui-chip` with `[isChipRemovable]="true"`) with a "Clear all" action.
- Keep the search input (debounced 300ms) in the filter panel column.
- Preserve the `eui-paginator` below the card list.
- Maintain the Create Ticket button in `eui-page-header-action-items`.
- Preserve contextual empty states and error handling with retry.

## Backend business needs

- Extend `GET /api/projects/:projectId/backlog` to support multi-value filters: `status`, `priority`, and `type` should accept comma-separated values (e.g., `?status=TO_DO,IN_PROGRESS&type=STORY,BUG`). Currently they accept only a single value each.
- The `q`, `_sort`, `_order`, `_page`, `_limit` params remain unchanged.
- The response envelope `{ data, total, page, limit }` remains unchanged.

## eUI component mapping (eUI-only, no ECL)

All components come from `@eui/components` or `@eui/core`. No `@eui/ecl` components are used — this is an internal eUI application.

| UI element | eUI component | Import |
|------------|---------------|--------|
| Page structure | `eui-page`, `eui-page-content` | `EUI_PAGE` from `@eui/components/eui-page` |
| Fluid layout (outer + nested columns) | `eui-page-columns` > `eui-page-column` with `hasSubColumns`, nested `eui-page-columns` | `EUI_PAGE` (includes all page-column sub-components) |
| Collapsible filter column | `eui-page-column` with `[isCollapsible]="true"` `[isAutocloseOnMobile]="true"` `euiSize2XL` | `EUI_PAGE` |
| Results column | `eui-page-column` (auto-grows) | `EUI_PAGE` |
| Page header (inside column) | `eui-page-header` inside `eui-page-column-header-body` | `EUI_PAGE` |
| Create button | `button[euiButton][euiPrimary]` in `eui-page-header-action-items` | `EUI_BUTTON` from `@eui/components/eui-button` |
| Search input | `input[euiInputText]` with placeholder | `EUI_INPUT_TEXT` from `@eui/components/eui-input-text` |
| Collapsible filter sections | `eui-card` with `[euiCollapsible]="true"` | `EUI_CARD` from `@eui/components/eui-card` (includes `eui-card-header`, `eui-card-content`) |
| Checkbox filters | `input[euiInputCheckBox]` + `<label>` | `EUI_INPUT_CHECKBOX` from `@eui/components/eui-input-checkbox` |
| Selected criteria chips | `eui-chip` with `[isChipRemovable]="true"` inside `eui-chip-list` | `EUI_CHIP` from `@eui/components/eui-chip` |
| Clear all button | `button[euiButton][euiBasicButton][euiSecondary]` | `EUI_BUTTON` |
| Result count | `<p aria-live="polite">` with eUI typography utilities | — |
| Sort dropdown | `<select euiSelect>` with sort options | `EUI_SELECT` from `@eui/components/eui-select` |
| Ticket card | `eui-content-card` with header sub-components and body | From `@eui/components/eui-content-card` |
| Status chip on card | `eui-chip euiSizeS` | `EUI_CHIP` |
| Type chip on card | `eui-chip euiSizeS` | `EUI_CHIP` |
| Priority chip on card | `eui-chip euiSizeS` with color variant | `EUI_CHIP` |
| Paginator | `eui-paginator` | `EuiPaginatorComponent` from `@eui/components/eui-paginator` |
| Error growl | `EuiGrowlService` | `EuiGrowlService` from `@eui/core` |
| Dialog (Create Ticket) | `eui-dialog` (preserved as-is from FEATURE-012) | `EuiDialogComponent` from `@eui/components/eui-dialog` |

## Card design per ticket

Each ticket is rendered as an `eui-content-card`:

```
┌─────────────────────────────────────────────────────────┐
│ [Story]  API-42                              [To Do]    │
│ Title of the ticket                                     │
│ Description excerpt (truncated ~120 chars)...           │
│ [High]  ·  Assignee: John Doe                           │
└─────────────────────────────────────────────────────────┘
```

Mapping to `eui-content-card` sub-components:
- `eui-content-card-header-start`: Type chip (`eui-chip euiSizeS`)
- `eui-content-card-header-title`: Ticket title (plain text for now, future: link to detail)
- `eui-content-card-header-subtitle`: Ticket key (e.g., "API-42")
- `eui-content-card-header-end`: Status chip (`eui-chip euiSizeS`)
- `eui-content-card-header-metadata`: Priority chip + Assignee name
- `eui-content-card-body`: Description excerpt (only if description exists, truncated via `euiTruncate` pipe or CSS)

## Filter panel design

The filter panel is a collapsible `eui-page-column` (the left column in the nested `eui-page-columns`). It uses `[isCollapsible]="true"` and `[isAutocloseOnMobile]="true"` so it auto-collapses on small viewports and can be toggled by the user via the built-in arrow button.

- `label`: "Search filter" (translated)
- `euiSize2XL`: gives the column a fixed width when expanded
- When collapsed: shows a vertical "Search filter" label tab with a `>` toggle arrow
- When expanded: shows the full filter content with a `<` collapse arrow

Inside the column body (`eui-page-column-body`), the filter content is stacked vertically:

1. **Search** — `input[euiInputText]` with placeholder "Search tickets..." and a label. Debounced 300ms via `searchSubject`, triggers server-side `q` param.

2. **Status** (collapsible `eui-card`, expanded by default) — checkbox group inside `<fieldset>` + `<legend>`:
   - ☐ To Do
   - ☐ In Progress
   - ☐ In Review
   - ☐ Done

3. **Type** (collapsible `eui-card`, expanded by default) — checkbox group:
   - ☐ Story
   - ☐ Bug
   - ☐ Task
   - ☐ Epic

4. **Priority** (collapsible `eui-card`, expanded by default) — checkbox group:
   - ☐ Critical
   - ☐ High
   - ☐ Medium
   - ☐ Low

Each selected checkbox adds a removable chip to the "Selected criteria" bar in the list header. Removing a chip unchecks the corresponding checkbox. "Clear all" resets all filters and search.

Multi-value filters are sent as comma-separated values: `?status=TO_DO,IN_PROGRESS&type=STORY,BUG&priority=HIGH,CRITICAL`.

## List header design

Above the card list, a header bar contains:
- Result count: "X results found" with `aria-live="polite"`
- Sort dropdown: `<select euiSelect>` with options: Ticket # (desc), Ticket # (asc), Title (asc), Title (desc), Priority, Status
- Selected criteria chips: `eui-chip-list` with removable `eui-chip` for each active filter (e.g., "Status: To Do", "Type: Story", "Priority: High")
- "Clear all" button to reset all filters, search, and sort to defaults

## Role coverage for this feature

- No change from FEATURE-013. Any authenticated role with project access can use discovery.
- Users without project access must not see project tickets.
- Super-admin can discover across broader project context according to policy.
- Create Ticket button visibility remains gated by role (non-VIEWER).

## Accessibility requirements

- Collapsible filter column uses `expandAriaLabel` / `collapseAriaLabel` inputs on `eui-page-column` for the toggle button (handled by eUI component).
- Each filter section uses `<fieldset>` + `<legend>` for checkbox groups.
- Collapsible `eui-card` sections use `aria-expanded` (handled by eUI component).
- Every checkbox has an associated `<label>` with `for`/`id` pair.
- Selected criteria chips are inside `eui-chip-list` with `aria-label`.
- Removable chips have accessible remove button (built into `eui-chip` with `isChipRemovable`).
- Result count uses `aria-live="polite"` for dynamic updates.
- Card list uses semantic structure for screen readers.
- Each card's title, type, priority, status are announced meaningfully via chip `ariaLabel`.
- Keyboard navigation: Tab through filter column toggle → filter controls → chips → sort → cards → paginator.
- No color-only information: all chips include text labels alongside color variants.
- Sort dropdown has an associated `<label>`.

## Expected business outcomes

- Better ticket scannability through card-based layout with richer per-item information.
- More powerful filtering with multi-value checkbox selection (e.g., "show me all TO_DO + IN_PROGRESS stories").
- Clearer filter state visibility through selected-criteria chips with "Clear all".
- Priority filter finally exposed in the UI (was backend-only since FEATURE-013).
- Improved alignment with institutional internal application patterns.

## Scope boundaries

- This feature does NOT add ticket detail view or click-through navigation from cards (future feature).
- This feature does NOT add saved/bookmarkable filter URLs (future enhancement).
- This feature does NOT change the Create Ticket dialog (preserved as-is).
- The Board page is not affected by this redesign.
- No ECL (`@eui/ecl`) components are used — this is a pure eUI internal application.
