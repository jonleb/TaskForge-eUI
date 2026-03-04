# CR-2002 — Ticket Detail Page Form Refactoring

## Summary

Refactor the Ticket Detail page (`ticket-detail.component`) from a custom `<dl>`-based layout with ad-hoc inline editing to a proper eUI form page pattern using `eui-fieldset`, `euiInputGroup`, `euiInputGroupAddOn`, `eui-page-footer`, reactive forms, and read/edit mode toggle. The goal is to align with the standard eUI "Page Details" form pattern (as shown in the eUI showcase), eliminate all custom SCSS, and improve accessibility.

## Reference

- eUI Jira: EUI-12178 — [eUI ECL 21] Issue to eUI team to fix a small typo [ESTAT]
- eUI Page Details showcase pattern (provided by user as HTML example)

---

## Current State Analysis

### Layout
- `eui-page` > `eui-page-header` (ticket key as label, back button in action items) > `eui-page-content`
- Read-only banner (`eui-feedback-message`) for viewers
- Title: inline `<h2>` with edit icon button, inline text input on edit
- Chips row: type chip (read-only), status chip + edit icon, priority chip + edit icon
- Detail section: `<dl>` with `<dt>`/`<dd>` pairs for description, assignee, epic, created by, created at
- Each field has its own edit icon button and inline edit mode
- Global save/cancel bar appears when any field is in edit mode
- Linked Tickets section: `<h3>` + list + add/delete dialogs
- Comments section: `<h3>` + add textarea + list
- Activity section: `<h3>` + list

### Custom SCSS (to be eliminated)
- `.ticket-title` — inline-flex title with gap
- `.detail-list` — CSS grid for `<dl>`
- `.detail-item dt/dd` — custom font-weight, color, margin
- `.description-text` — pre-wrap, max-width
- `.field-row`, `.edit-field`, `.edit-actions` — flex layout for inline editing
- `.inline-edit-select` — inline-flex for select dropdowns
- `.save-bar` — border-top, padding
- `.comments-section`, `.comment-list`, `.comment-item`, `.comment-meta`, `.comment-author`, `.comment-content`, `.add-comment` — custom comment styling
- `.links-section`, `.link-list`, `.link-item` — custom link list styling
- `.activity-section`, `.activity-list`, `.activity-item` — custom activity styling
- `.section-header h3` — margin reset

### Problems
1. No `eui-fieldset` grouping — fields are in a flat `<dl>` without semantic form structure
2. Per-field inline editing is fragile — each field has its own edit icon, no global edit/read toggle
3. Heavy custom SCSS (~120 lines) instead of eUI utility classes
4. No `euiInputGroup` / `euiInputGroupAddOn` pattern — inputs lack consistent form styling
5. Comments and activity use custom `<ul>` lists instead of `eui-discussion-thread`
6. No `eui-page-footer` for form actions — save/cancel bar is a custom `<div>`
7. No `eui-tabs` to organize detail, comments, activity, and links sections
8. Missing `eui-breadcrumb` navigation
9. `<h2>` for title + `<h3>` for sections — heading hierarchy could be improved with fieldset labels
10. No `row`/`col-md-*` grid layout for multi-column form fields

---

## Target State

### Page Structure

```
eui-page
├── eui-page-breadcrumb
│   └── eui-breadcrumb
│       ├── eui-breadcrumb-item (Home, link, icon)
│       ├── eui-breadcrumb-item (Tickets, link)
│       └── eui-breadcrumb-item (PROJ-123, current)
├── eui-page-header
│   ├── label = "PROJ-123" (ticket key)
│   ├── subLabel = ticket title
│   └── eui-page-header-action-items
│       ├── button euiSecondary "Back" (or icon-button arrow-left)
│       └── button euiPrimary "Edit" (toggles isEditActive)
├── eui-page-content
│   └── eui-tabs
│       ├── eui-tab "Details"
│       │   └── form [formGroup]
│       │       ├── eui-fieldset "Ticket information" (icon: ticket:regular)
│       │       │   ├── row > col-md-6: Type (select, readonly always)
│       │       │   ├── row > col-md-6: Status (select, readonly when !isEditActive)
│       │       │   ├── row > col-md-6: Priority (select)
│       │       │   └── row > col-md-6: Assignee (select)
│       │       ├── eui-fieldset "Description" (icon: eui-edit)
│       │       │   └── textarea (readonly when !isEditActive)
│       │       └── eui-fieldset "Additional information" (icon: eui-ellipsis-horizontal)
│       │           ├── row > col-md-6: Epic (select)
│       │           ├── row > col-md-6: Created by (readonly always)
│       │           └── row > col-md-6: Created at (readonly always)
│       ├── eui-tab "Comments"
│       │   └── eui-discussion-thread + add comment form
│       ├── eui-tab "Activity"
│       │   └── eui-discussion-thread (read-only timeline)
│       └── eui-tab "Links"
│           └── linked tickets list + add/delete dialogs
└── eui-page-footer (visible only when isEditActive)
    ├── button "Reset" (left)
    └── button "Cancel" + button "Save" (right)
```

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Edit mode | Global `isEditActive` toggle (not per-field) | Matches eUI page details pattern; simpler UX |
| Form approach | Reactive forms (`FormGroup`) | Better validation, cleaner template, testable |
| Field layout | `euiInputGroup` + `euiInputGroupAddOn` with icons | Standard eUI form pattern with visual consistency |
| Grid | Bootstrap `row` / `col-md-*` classes (provided by eUI) | Responsive multi-column layout without custom CSS |
| Sections | `eui-fieldset` with `isExpandable` | Semantic grouping, collapsible, accessible |
| Comments | `eui-discussion-thread` | Native eUI component for threaded discussions |
| Activity | `eui-discussion-thread` (read-only) | Consistent with comments, structured timeline |
| Tabs | `eui-tabs` with 4 tabs | Organizes content, reduces page length |
| Footer | `eui-page-footer` | Standard eUI pattern for form actions |
| SCSS | Zero custom SCSS | All styling via eUI utility classes + eUI components |
| Status transitions | Workflow-aware select options | Keep existing logic, wrap in reactive form |

---

## Detailed Gap Analysis: Current vs Target

### 1. Breadcrumb Navigation

| Current | Target |
|---------|--------|
| No breadcrumb | `Home > Tickets > PROJ-123` |

Action: Add `eui-page-breadcrumb` with 3 items. Home (link `/screen/home`, icon `home:outline`), Tickets (link `/screen/tickets`), ticket key (no link, current page).

### 2. Page Header

| Current | Target |
|---------|--------|
| `label` = ticket key, back button in action items | `label` = ticket key, `subLabel` = ticket title, Edit + Back buttons in action items |

Action: Add `subLabel` binding for ticket title. Add "Edit" toggle button (`euiPrimary` when not editing, `euiSecondary` "Cancel" when editing). Keep back button.

### 3. Form Structure — Reactive Forms

| Current | Target |
|---------|--------|
| `[(ngModel)]` bindings on individual edit fields | `FormGroup` with `FormControl` for each editable field |
| Per-field `editingFields` Set | Global `isEditActive` boolean |

Action: Replace `FormsModule` ngModel bindings with `ReactiveFormsModule` `FormGroup`. Create form controls for: title, description, status, priority, assignee_id, epic_id. Set `[readonly]` based on `isEditActive`.

### 4. Ticket Information Fieldset

| Current | Target |
|---------|--------|
| Chips row for type/status/priority | `eui-fieldset` "Ticket information" with `euiInputGroup` rows |
| Inline edit icons per field | All fields editable when `isEditActive` is true |

Action: Replace chips row + `<dl>` with:
- `eui-fieldset label="Ticket information" iconSvgName="ticket:regular" isExpandable [isExpanded]="true"`
- Row 1: Type (col-md-6, select, always readonly) + Status (col-md-6, select with workflow transitions)
- Row 2: Priority (col-md-6, select) + Assignee (col-md-6, select)
- Each field uses `euiInputGroup` > `label euiLabel` + `euiInputGroupAddOn` with icon + `select euiSelect`

### 5. Description Fieldset

| Current | Target |
|---------|--------|
| `<dt>/<dd>` with inline textarea edit | `eui-fieldset` "Description" with `euiInputGroup` > `textarea euiTextArea` |

Action: Wrap description in its own `eui-fieldset` with `euiMaxlength="2000"`, `[readonly]="!isEditActive"`.

### 6. Additional Information Fieldset

| Current | Target |
|---------|--------|
| `<dt>/<dd>` for epic, created by, created at | `eui-fieldset` "Additional information" with `euiInputGroup` rows |

Action:
- Row 1: Epic (col-md-6, select) + Created by (col-md-6, input text, always readonly)
- Row 2: Created at (col-md-6, input text or datepicker readonly, always readonly)

### 7. Tabs — Content Organization

| Current | Target |
|---------|--------|
| All sections stacked vertically in `eui-page-content` | `eui-tabs` with 4 tabs: Details, Comments, Activity, Links |

Action: Wrap content in `eui-tabs`. Each section becomes a `eui-tab` > `eui-tab-body`. Tab labels use i18n keys. Comments tab shows badge with count.

### 8. Comments — eui-discussion-thread

| Current | Target |
|---------|--------|
| Custom `<ul class="comment-list">` with `<li>` items | `eui-discussion-thread` with `eui-discussion-thread-item` |
| Custom `.comment-meta`, `.comment-author`, `.comment-content` SCSS | No custom SCSS |

Action: Replace custom comment list with `eui-discussion-thread`. Map `TicketComment` to `EuiDiscussionThreadItem` format. Keep add-comment form above the thread.

### 9. Activity — eui-discussion-thread

| Current | Target |
|---------|--------|
| Custom `<ul class="activity-list">` with `<li>` items | `eui-discussion-thread` (read-only timeline) |
| Custom `.activity-item`, `.activity-text`, `.activity-date` SCSS | No custom SCSS |

Action: Replace custom activity list with `eui-discussion-thread`. Map `ActivityEntry` to discussion thread items with author = changer name, body = change description, date = timestamp.

### 10. Links Section

| Current | Target |
|---------|--------|
| Custom `<ul class="link-list">` with `<li>` items | Clean list using eUI utility classes only |
| Custom `.link-item`, `.link-label`, `.link-target` SCSS | No custom SCSS |

Action: Replace custom list with eUI utility class layout. Keep add/delete dialogs. Move to "Links" tab.

### 11. Page Footer — Form Actions

| Current | Target |
|---------|--------|
| Custom `.save-bar` div with border-top | `eui-page-footer` with Reset (left), Cancel + Save (right) |
| Visible only when `hasUnsavedChanges` | Visible only when `isEditActive` |

Action: Replace custom save bar with `eui-page-footer`. Layout: flex with justify-between. Left: Reset button. Right: Cancel (`euiSecondary`) + Save (`euiPrimary`).

### 12. SCSS Elimination

| Current | Target |
|---------|--------|
| ~120 lines of custom SCSS | 0 lines (empty `:host { display: block; }` only) |

Action: Remove all custom SCSS classes. Replace with:
- `row` / `col-md-*` for grid layout
- `eui-u-mb-m`, `eui-u-mt-m`, `eui-u-gap-s` for spacing
- `eui-u-d-flex`, `eui-u-align-items-center` for flex layouts
- `eui-u-f-xl`, `eui-u-f-bold` for typography
- `eui-u-text-link` for links
- `eui-u-sr-only` for screen-reader-only labels

---

## Accessibility Improvements

| Area | Current Issue | Target Fix |
|------|--------------|------------|
| Form grouping | No `<fieldset>`/`<legend>` | `eui-fieldset` provides semantic `<fieldset>` + `<legend>` |
| Label association | Some labels use `class="eui-u-sr-only"` without `for`/`id` | All labels use `euiLabel` with `for`/`id` pairs + `euiRequired` |
| Validation errors | No `aria-describedby` on inputs | `aria-describedby` pointing to `eui-feedback-message` elements |
| Required fields | `aria-required="true"` only | `euiRequired` directive on labels + `aria-required` on inputs |
| Keyboard navigation | Edit icons require Tab to each field | Single "Edit" button toggles all fields; Tab through form naturally |
| Focus management | No focus management on mode switch | Focus first editable field when entering edit mode |
| Live regions | Save bar has `aria-live="polite"` | `eui-page-footer` appearance + `eui-growl` notifications |
| Heading hierarchy | `<h2>` title + `<h3>` sections | `eui-page-header` label (h1) + `eui-fieldset` labels (semantic legend) |
| Comments | Custom list without roles | `eui-discussion-thread` with `role="list"` + `role="listitem"` |

---

## eUI Components — New or Changed

| Component | Import | Purpose |
|-----------|--------|---------|
| `eui-fieldset` | `EUI_FIELDSET` from `@eui/components/eui-fieldset` | Form section grouping |
| `div[euiInputGroup]` | `EUI_INPUT_GROUP` from `@eui/components/eui-input-group` | Form field container |
| `div[euiInputGroupAddOn]` | `EUI_INPUT_GROUP` from `@eui/components/eui-input-group` | Input prefix icons |
| `div[euiInputGroupAddOnItem]` | `EUI_INPUT_GROUP` from `@eui/components/eui-input-group` | Icon wrapper in add-on |
| `eui-page-footer` | `EUI_PAGE` from `@eui/components/eui-page` | Form action buttons |
| `eui-tabs` / `eui-tab` | `EUI_TABS` from `@eui/components/eui-tabs` | Content organization |
| `eui-discussion-thread` | `EUI_DISCUSSION_THREAD` from `@eui/components/eui-discussion-thread` | Comments + activity |
| `eui-breadcrumb` | `EUI_BREADCRUMB` from `@eui/components/eui-breadcrumb` | Breadcrumb navigation |
| `eui-badge` | `EUI_BADGE` from `@eui/components/eui-badge` | Tab header comment count |
| `[euiTooltip]` | `EuiTooltipDirective` from `@eui/components/eui-tooltip` | Field help text |
| `ReactiveFormsModule` | `@angular/forms` | Reactive form controls |

### Components to Remove
- `EUI_CHIP` — no longer used for field display (status/type/priority move to selects)
- Per-field edit icon buttons — replaced by global Edit toggle

---

## New i18n Keys Required

```
ticket-detail.breadcrumb.tickets
ticket-detail.edit-mode.toggle
ticket-detail.edit-mode.cancel
ticket-detail.fieldset.ticket-info
ticket-detail.fieldset.description
ticket-detail.fieldset.additional-info
ticket-detail.tab.details
ticket-detail.tab.comments
ticket-detail.tab.activity
ticket-detail.tab.links
ticket-detail.footer.reset
ticket-detail.footer.cancel
ticket-detail.footer.save
ticket-detail.footer.delete
```

---

## Out of Scope

- Ticket deletion (no delete endpoint exists yet)
- File attachments
- Watchers / followers
- Sprint assignment from detail page
- Workflow transition confirmation dialog

---

## Risks

1. Reactive forms migration changes the data flow — all existing tests need rewriting for `FormGroup` instead of `ngModel`.
2. `eui-discussion-thread` may not match the exact comment layout — verify `EuiDiscussionThreadItem` interface compatibility with `TicketComment`.
3. `eui-fieldset` with `isExpandable` adds expand/collapse state management for each section.
4. `eui-tabs` lazy loading — ensure data loads correctly when switching tabs (comments/activity should load on tab activation, not on page load).
5. `eui-page-footer` positioning — verify it sticks to the bottom of the page correctly within the `eui-page` structure.
6. Workflow-aware status select — the allowed transitions logic must work within reactive forms `[readonly]` pattern.

---

## Estimated Scope

- Template restructuring (HTML): major (complete rewrite)
- Component logic (TS): major (reactive forms, edit mode toggle, tab management, discussion thread mapping)
- Styling (SCSS): deletion only (~120 lines removed, 0 added)
- i18n: ~14 new keys (EN + FR)
- Tests: complete rewrite of existing tests + new tests for tabs, fieldsets, footer, discussion thread
- Backend: no changes needed
