# CR-2002 Ticket Detail Page Form Refactoring — Story Breakdown

## Context

This CR refactors the Ticket Detail page from a custom `<dl>`-based layout with per-field inline editing to the standard eUI "Page Details" form pattern. The current page uses `ngModel` bindings, custom SCSS (~120 lines), and ad-hoc `<ul>` lists for comments/activity. The target uses reactive forms, `eui-fieldset` with `euiInputGroup`, `eui-tabs`, `eui-discussion-thread`, `eui-page-footer`, and zero custom SCSS.

### Current state
- `TicketDetailComponent` with `eui-page` > `eui-page-header` > `eui-page-content`
- No breadcrumb navigation
- Title as `<h2>` with inline edit icon
- Chips row for type/status/priority with per-field edit icons
- `<dl>` with `<dt>`/`<dd>` for description, assignee, epic, created by, created at
- Per-field `editingFields` Set with `ngModel` bindings
- Custom save bar `<div>` with border-top
- Comments: custom `<ul class="comment-list">` with `<li>` items
- Activity: custom `<ul class="activity-list">` with `<li>` items
- Links: custom `<ul class="link-list">` with `<li>` items + add/delete dialogs
- ~120 lines custom SCSS
- `FormsModule` with `ngModel`

### Target state
- Breadcrumb: `Home > Tickets > PROJ-123`
- Page header with `label` = ticket key, `subLabel` = title, Edit/Back buttons in action items
- `eui-tabs` with 4 tabs: Details, Comments, Activity, Links
- Details tab: reactive `FormGroup` with `eui-fieldset` sections
  - "Ticket information": Type, Status, Priority, Assignee in `euiInputGroup` with `row`/`col-md-*` grid
  - "Description": textarea with `euiMaxlength`
  - "Additional information": Epic, Created by, Created at
- Comments tab: `eui-discussion-thread` + add comment form
- Activity tab: `eui-discussion-thread` (read-only)
- Links tab: utility-class list + add/delete dialogs
- `eui-page-footer` with Reset / Cancel / Save buttons (visible only in edit mode)
- Global `isEditActive` toggle (not per-field)
- Zero custom SCSS — eUI utility classes only
- `ReactiveFormsModule` with `FormGroup`

## eUI Components Used (new or changed)

| Component | Import | Purpose |
|-----------|--------|---------|
| `eui-fieldset` | `EUI_FIELDSET` from `@eui/components/eui-fieldset` | Form section grouping |
| `div[euiInputGroup]` | `EUI_INPUT_GROUP` from `@eui/components/eui-input-group` | Form field container |
| `div[euiInputGroupAddOn]` | `EUI_INPUT_GROUP` from `@eui/components/eui-input-group` | Input prefix icons |
| `div[euiInputGroupAddOnItem]` | `EUI_INPUT_GROUP` from `@eui/components/eui-input-group` | Icon wrapper |
| `eui-page-footer` | `EUI_PAGE` (already imported) | Form action buttons |
| `eui-tabs` / `eui-tab` | `EUI_TABS` from `@eui/components/eui-tabs` | Content tabs |
| `eui-tab-body` | `EUI_TABS` | Tab content container |
| `eui-tab-header` | `EUI_TABS` | Custom tab header with badge |
| `eui-discussion-thread` | `EUI_DISCUSSION_THREAD` from `@eui/components/eui-discussion-thread` | Comments + activity |
| `eui-breadcrumb` | `EUI_BREADCRUMB` from `@eui/components/eui-breadcrumb` | Breadcrumb nav |
| `eui-badge` | `EUI_BADGE` from `@eui/components/eui-badge` | Comment count on tab |
| `[euiTooltip]` | `EuiTooltipDirective` from `@eui/components/eui-tooltip` | Field help tooltips |
| `ReactiveFormsModule` | `@angular/forms` | Reactive forms |

## Execution Order

Stories must be implemented in this exact order. Each story builds on the previous one.

```
STORY-001 (Breadcrumb + page header + edit mode toggle)
    └── STORY-002 (Reactive forms + fieldset structure — Details tab)
            └── STORY-003 (eui-tabs — organize content into tabs)
                    └── STORY-004 (Comments tab — eui-discussion-thread)
                            └── STORY-005 (Activity tab — eui-discussion-thread)
                                    └── STORY-006 (Links tab refactoring)
                                            └── STORY-007 (eui-page-footer + SCSS cleanup)
                                                    └── STORY-008 (i18n keys EN/FR)
```

## Stories

| # | Title | Scope |
|---|-------|-------|
| STORY-001 | Breadcrumb navigation + page header + edit mode toggle | Template + TS |
| STORY-002 | Reactive forms migration + eui-fieldset structure (Details content) | Template + TS (major) |
| STORY-003 | eui-tabs — organize content into 4 tabs | Template + TS |
| STORY-004 | Comments tab — eui-discussion-thread + add comment form | Template + TS |
| STORY-005 | Activity tab — eui-discussion-thread (read-only timeline) | Template + TS |
| STORY-006 | Links tab — utility-class list + dialogs | Template + TS |
| STORY-007 | eui-page-footer + complete SCSS elimination | Template + TS + SCSS deletion |
| STORY-008 | i18n keys (EN/FR) for all new elements | JSON files |

## Technical Notes

- No custom SCSS — use only eUI utility classes (`eui-u-*`) and Bootstrap grid (`row`, `col-md-*`).
- `eui-fieldset` uses semantic `<fieldset>` + `<legend>` — no need for manual `<fieldset>` elements.
- `euiInputGroup` must be an attribute on a `<div>`, not a standalone element.
- `euiInputGroupAddOn` wraps the icon + input together; `euiInputGroupAddOnItem` wraps each icon.
- Icons in `euiInputGroupAddOnItem` should only appear when `isEditActive` (following the eUI pattern).
- `eui-page-footer` must be a direct child of `eui-page`, after `eui-page-content`.
- `eui-tabs` keyboard navigation: Arrow keys switch tabs, Tab moves focus into content.
- `eui-discussion-thread` accepts `items` array of `EuiDiscussionThreadItem` — map from `TicketComment` and `ActivityEntry`.
- Status select must respect workflow transitions: populate options from `allowedStatuses` getter.
- `[readonly]` on `select[euiSelect]` and `input[euiInputText]` controls edit/read state.
- `eui-badge` on Comments tab header shows comment count — update on comment add.
- Focus management: when entering edit mode, focus the first editable field.
- `eui-page-header` must use open/close tags (not self-closing) for content projection.
- Icon naming: `ticket:regular`, `eui-edit`, `eui-ellipsis-horizontal`, `home:outline`, `arrow-left:regular`.

## Accessibility Checklist (applies to all stories)

- [ ] All form inputs have associated `<label euiLabel>` with `for`/`id` pairs
- [ ] Required fields use `euiRequired` directive + `aria-required="true"`
- [ ] Validation errors use `aria-describedby` pointing to error message elements
- [ ] `eui-fieldset` provides semantic `<fieldset>` + `<legend>` grouping
- [ ] `eui-tabs` has `aria-label` for the tab group
- [ ] Tab content panels have `role="tabpanel"`
- [ ] `eui-discussion-thread` provides `role="list"` + `role="listitem"`
- [ ] Edit mode toggle button has clear label ("Edit" / "Cancel editing")
- [ ] Focus moves to first editable field when entering edit mode
- [ ] `eui-page-footer` buttons are keyboard accessible
- [ ] No color-only information — status text always visible alongside any color indicator
- [ ] Heading hierarchy: h1 (page header) → fieldset legends (no skipped levels)
