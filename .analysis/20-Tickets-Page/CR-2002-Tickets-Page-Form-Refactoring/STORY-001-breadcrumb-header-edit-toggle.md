# STORY-001 — Breadcrumb Navigation + Page Header + Edit Mode Toggle

## Scope

Replace the current minimal page header (ticket key label + back icon button) with:
1. Breadcrumb navigation: Home > Tickets > PROJ-123
2. Enhanced page header with `label` = ticket key, `subLabel` = ticket title
3. Action items: Back button + Edit/Cancel toggle button
4. Global `isEditActive` boolean replacing per-field `editingFields` Set

## Current State

```html
<eui-page-header [label]="ticketKey">
    <eui-page-header-action-items>
        <eui-icon-button icon="arrow-left:regular" [ariaLabel]="..." (buttonClick)="goBack()">
        </eui-icon-button>
    </eui-page-header-action-items>
</eui-page-header>
```

- No breadcrumb
- No subLabel
- No edit mode toggle — per-field `editingFields` Set with `startEdit(field)` / `cancelEdit(field)`

## Target State

```html
<eui-page-breadcrumb>
    <eui-breadcrumb>
        <eui-breadcrumb-item link="/screen/home" iconSvgName="home:outline"
                             [ariaLabel]="'tickets.breadcrumb.home' | translate" />
        <eui-breadcrumb-item link="/screen/tickets"
                             [label]="'ticket-detail.breadcrumb.tickets' | translate" />
        <eui-breadcrumb-item [label]="ticketKey" />
    </eui-breadcrumb>
</eui-page-breadcrumb>

<eui-page-header [label]="ticketKey" [subLabel]="ticket?.title">
    <eui-page-header-action-items>
        <eui-icon-button icon="arrow-left:regular" [ariaLabel]="..." (buttonClick)="goBack()" />
        @if (canEdit) {
            <button euiButton [class]="isEditActive ? '' : ''" ...>
                {{ isEditActive ? 'Cancel' : 'Edit' }}
            </button>
        }
    </eui-page-header-action-items>
</eui-page-header>
```

## TypeScript Changes

- Add `isEditActive = false` property
- Add `toggleEditMode()` method: toggles `isEditActive`, resets form when cancelling
- Remove `editingFields` Set, `startEdit()`, `cancelEdit()`, `cancelAllEdits()`, `isEditing()`, `hasUnsavedChanges`
- Keep `syncEditFields()` — called when toggling off edit mode

## Imports to Add

- `EUI_BREADCRUMB` from `@eui/components/eui-breadcrumb` (already in EUI_PAGE spread)

## i18n Keys

- `ticket-detail.breadcrumb.tickets` — "Tickets"
- `ticket-detail.edit-mode.toggle` — "Edit"
- `ticket-detail.edit-mode.cancel` — "Cancel editing"

## Tests

- Breadcrumb renders 3 items (Home, Tickets, ticket key)
- Page header shows ticket key as label
- Page header shows ticket title as subLabel
- Edit button visible when canEdit is true
- Edit button hidden when canEdit is false
- Clicking Edit toggles isEditActive to true
- Clicking Cancel toggles isEditActive to false
- Back button still calls goBack()

## Acceptance Criteria

- [ ] Breadcrumb shows Home > Tickets > PROJ-123
- [ ] Page header label = ticket key, subLabel = ticket title
- [ ] Edit button toggles global edit mode
- [ ] Keyboard accessible (Tab to Edit button, Enter/Space to toggle)
- [ ] Screen reader announces edit mode state change
