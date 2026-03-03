# CR-2001 — Tickets Page Refactoring

## Summary

Refactor the Tickets page to match the updated design. The new design introduces breadcrumb navigation, a restructured filter panel with a dynamic "Select filter" dropdown, a status dropdown, checkbox-based type filters, radio-button priority filter (single-select with "All" default, keeping all 4 values including Critical), a results header bar with sort control + view toggle (card/table), redesigned ticket cards with inline status badge, expandable description, and a kebab action menu with all possible actions (Edit, Delete, Assign, Change status), plus a full table view alternative.

---

## Decisions (from Q&A)

| Question | Decision |
|----------|----------|
| "Select filter" dropdown | Dynamic filter builder — user picks which filter sections to show/hide |
| Quick Filters (Assigned to me, Open Sprints) | **Removed** entirely |
| Priority filter | Radio buttons with "All" default, **keep all 4 values** (Critical, High, Medium, Low) |
| View toggle (card/table) | **Implement both** card view and table view |
| Export button | **Not included** in this CR |
| Card kebab menu actions | All possible actions: Edit, Delete, Assign, Change status |
| Blue left border on card | **Expanded state** (description visible) |
| Table view columns | Key, Title, Type, Status, Priority, Assignee, Project |

---

## Detailed Gap Analysis: Current vs Target

### 1. Breadcrumb Navigation

| Current | Target |
|---------|--------|
| No breadcrumb | `Home > Tickets` breadcrumb above the page title |

**Action:** Add `eui-page-breadcrumb` with `eui-breadcrumb` + `eui-breadcrumb-item` components above the page header. Items: Home (link to `/screen/home`, icon `home:outline`) → Tickets (no link, current page).

---

### 2. Page Title & Header

| Current | Target |
|---------|--------|
| Title "Tickets" inside `eui-page-columns` sub-header | Title "Tickets" as a standalone `<h1>` below breadcrumb |
| "Créer un ticket" button in sub-header action items | "Create ticket" button with icon (plus/add) in top-right, same row as title |

**Action:** Move the page header outside the nested `eui-page-columns` structure. Use `eui-page-header` with `label="Tickets"` and the create button in `eui-page-header-action-items` with an icon prefix (`add:regular` or similar).

---

### 3. Filter Panel (Left Column)

#### 3a. "Select filter" Dropdown — Dynamic Filter Builder

| Current | Target |
|---------|--------|
| All filter sections always visible | "Select filter" dropdown at top of panel to show/hide filter sections |

**Action:** Add a `select[euiSelect]` at the top of the filter column. Options correspond to filter dimensions (Status, Type, Priority, Project, Sprint). Selecting an option toggles the visibility of that filter section. Sections are hidden by default until the user adds them via the dropdown. Already-active filters remain visible.

#### 3b. Search Input

| Current | Target |
|---------|--------|
| Label "Recherche" + input + magnifying glass button | Simpler "Search filter" input (no separate button) |

**Action:** Simplify to a single `input[euiInputText]` with placeholder "Search filter". Remove the separate search button — search triggers on debounce only.

#### 3c. Status Filter

| Current | Target |
|---------|--------|
| Checkboxes in collapsible `eui-card` | A `select` dropdown |

**Action:** Replace the status checkbox group with a `select[euiSelect]` dropdown. Keep all 4 statuses (TO_DO, IN_PROGRESS, IN_REVIEW, DONE). Hidden by default until added via "Select filter".

#### 3d. Type Filter

| Current | Target |
|---------|--------|
| Checkboxes in collapsible `eui-card` | Checkboxes in a flat section, 2-column grid |

**Action:** Keep checkboxes but flatten the layout (remove the `eui-card` wrapper). Use existing types from the data model (STORY, BUG, TASK, EPIC). Layout: 2-column grid. Hidden by default until added via "Select filter".

#### 3e. Priority Filter

| Current | Target |
|---------|--------|
| Checkboxes (multi-select) in collapsible `eui-card` | Radio buttons (single-select): All, Critical, High, Medium, Low |

**Action:** Replace checkboxes with radio buttons. "All" is the default (no filter). Keep all 4 priority values (Critical, High, Medium, Low). Only one priority can be selected at a time. Hidden by default until added via "Select filter".

#### 3f. Advanced Filters (Project + Sprint)

| Current | Target |
|---------|--------|
| Collapsible `eui-card` with Project + Sprint selects | "Advanced filters" section with chevron toggle |

**Action:** Keep the collapsible behavior but use a simpler toggle (section header with chevron icon) instead of `eui-card`. Content remains: Project select + Sprint select. Always visible (not controlled by "Select filter" dropdown).

#### 3g. Quick Filters — REMOVED

| Current | Target |
|---------|--------|
| Collapsible `eui-card` with "Assigned to me" + "Open Sprints" checkboxes | Not present |

**Action:** Remove the Quick Filters section entirely. Remove `assignedToMe` and `openSprintsChecked` state, `onAssignedToMeChange()`, `onOpenSprintsChange()` methods, and related chip generation. Remove associated i18n keys.

---

### 4. Results Header Bar

| Current | Target |
|---------|--------|
| Simple "112 résultats trouvés" text | "Results" heading + "{N} tickets found" + sort dropdown + sort direction + view toggle (card/table) |

**Action:** Add a results toolbar row containing:
- "Results" heading + "{N} tickets found" count
- Sort control: `select[euiSelect]` for sort field ("Creation date") + sort direction icon button (arrow up/down)
- View toggle: `eui-toggle-group` with 2 items (card icon / table icon) to switch between card and table views

No export button.

---

### 5. Selected Criteria / Filter Chips

| Current | Target |
|---------|--------|
| Chips below result count with "Clear all" button | "Selected criteria" row with chips, "Clear all" link, and "More" overflow |

**Action:** Restructure the chips area:
- Add "Selected criteria" label
- Add "Clear all" as a text link (not a button)
- Add "More" indicator when chips overflow a single line
- Chips use `eui-chip` with `[isChipRemovable]="true"` (same as current)

---

### 6. Ticket Cards (Card View)

| Current | Target |
|---------|--------|
| `eui-content-card` with type chip, title, subtitle, status chip, priority chip, metadata | Redesigned card with expandable description, status badge, kebab menu |

**Action:** Redesign each card:
- Title: displayed as a blue link (primary color), larger font
- Subtitle: project key + ticket number (e.g., `API-16`)
- Metadata line: `Type · Priority · Assignee` as plain text separated by `·`
- Status: right-aligned `eui-status-badge` showing status text with appropriate color
- Kebab menu: `eui-icon-button` with `dots-three-vertical:regular` icon — actions: Edit, Delete, Assign, Change status
- Expand/collapse chevron: `eui-icon-button` with `caret-down:regular` to toggle description visibility
- Description: hidden by default, shown on expand. Expanded card has blue left border
- Use `[isCollapsible]="true"` on `eui-content-card` or custom toggle

---

### 7. Table View (NEW)

| Current | Target |
|---------|--------|
| No table view | Full table view as alternative to card view |

**Action:** Implement a table view using `eui-table` (or semantic `<table>`) with columns:
- Key (project key + ticket number)
- Title
- Type
- Status
- Priority
- Assignee
- Project

Table follows a11y rules: `aria-label` on table, `scope="col"` on headers, `data-col-label` on cells. Clicking a row navigates to ticket detail. Sortable columns where applicable.

---

### 8. Paginator

| Current | Target |
|---------|--------|
| `eui-paginator` below cards | Same, with "Items per page" + "Showing X–Y of Z" |

**Action:** Verify `eui-paginator` default behavior includes these labels. No changes expected.

---

## New i18n Keys Required

```
tickets.breadcrumb.home
tickets.breadcrumb.tickets
tickets.filter.select-filter
tickets.filter.search-filter-placeholder
tickets.results.heading
tickets.results.count
tickets.results.selected-criteria
tickets.results.clear-all
tickets.results.more
tickets.results.sort-by
tickets.results.sort-creation-date
tickets.card.expand
tickets.card.collapse
tickets.card.actions-menu
tickets.card.action.edit
tickets.card.action.delete
tickets.card.action.assign
tickets.card.action.change-status
tickets.view.card
tickets.view.table
tickets.table.col.key
tickets.table.col.title
tickets.table.col.type
tickets.table.col.status
tickets.table.col.priority
tickets.table.col.assignee
tickets.table.col.project
```

---

## Components to Add/Change

| eUI Component | Usage |
|---|---|
| `eui-page-breadcrumb` + `eui-breadcrumb` + `eui-breadcrumb-item` | Breadcrumb navigation |
| `eui-status-badge` | Status display on cards |
| `eui-icon-button` | Kebab menu, expand/collapse chevron, sort direction |
| `eui-toggle-group` + `eui-toggle-group-item` | Card/table view switcher |
| `eui-content-card` with `[isCollapsible]` | Expandable card description |
| `eui-table` or semantic `<table>` | Table view |

---

## Out of Scope

- Export functionality (not included per decision)
- New ticket types ("Enabler story", "Other") — use existing data model types only

---

## Risks

1. Dynamic "Select filter" dropdown adds UI complexity — filter sections need show/hide state management.
2. Kebab menu actions (Edit, Delete, Assign, Change status) require navigation or dialog integration that may touch other components.
3. Table view is a significant addition — needs its own sorting, row click navigation, and responsive behavior.
4. Removing Quick Filters (Assigned to me, Open Sprints) is a behavioral regression — users lose those shortcuts.

---

## Estimated Scope

- Template restructuring (HTML): significant
- Component logic (TS): significant (dynamic filter builder, view toggle, card expand, kebab actions, table view)
- Styling (SCSS): significant (card redesign, table view, layout changes)
- i18n: ~25 new keys
- Tests: update existing ~67 tests + add ~25 new tests for dynamic filters, view toggle, table view, card expand, kebab menu, breadcrumb
- Backend: no changes needed
