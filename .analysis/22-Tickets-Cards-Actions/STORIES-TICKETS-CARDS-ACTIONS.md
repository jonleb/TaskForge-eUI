# FEATURE-022 Ticket Card Actions — Story Breakdown

## Context

The Tickets page (`/screen/tickets`) displays tickets in a card view with a burger menu (⋮) on each card. The menu currently has four stub actions: Edit, Assign, Change status, and Delete. These actions only show growl notifications and have no real functionality.

This feature implements the actual behavior for three of these actions and removes the Delete action.

## Current State

- `TicketsComponent` at `src/app/features/tickets/tickets.component.ts` — fully functional card/table view with filters, pagination, create dialog
- Burger menu has 4 stub actions: Edit (no-op), Assign (growl), Change status (growl), Delete (growl)
- `ProjectService.updateTicket(projectId, ticketNumber, payload)` already exists — PATCH `/api/projects/:projectId/backlog/:ticketNumber`
- `ProjectService.getProjectMembers(projectId)` already exists
- `PermissionService.hasProjectRole(projectId, ...roles)` returns `Observable<boolean>`
- `UpdateTicketPayload` supports: `title`, `type`, `description`, `status`, `priority`, `assignee_id`, `epic_id`
- Create dialog pattern already established with `EuiDialogComponent` + `@ViewChild` + `cdr.detectChanges()` before `openDialog()`
- i18n keys exist for action labels: `tickets.card.action.edit`, `.assign`, `.change-status`, `.delete`

## eUI Components Used

| Component | Import | Purpose |
|-----------|--------|---------|
| `eui-dialog` | `EuiDialogComponent` from `@eui/components/eui-dialog` | Edit, Assign, Change Status dialogs |
| `euiInputText` | `EUI_INPUT_TEXT` | Title field in edit dialog |
| `euiTextArea` | `EUI_TEXTAREA` | Description field in edit dialog |
| `euiSelect` | `EUI_SELECT` | Type, Priority, Status, Assignee dropdowns |
| `euiLabel` | `EUI_LABEL` | Form labels |
| `eui-feedback-message` | `EUI_FEEDBACK_MESSAGE` | Inline error messages |
| `EuiGrowlService` | `@eui/core` | Success/error notifications |

## Execution Order

Stories must be implemented in this exact order. Each story builds on the previous one.

---

## STORY-001: Remove Delete Action & Clean Up Menu

### Goal
Remove the Delete action from the burger menu and clean up the `onCardAction` method. This is the simplest change and sets the foundation for the remaining stories.

### Changes

1. **`tickets.component.html`** — Remove the Delete `<button euiDropdownItem>` from the dropdown content
2. **`tickets.component.ts`** — Remove the `'delete'` case from `onCardAction()`, update the action type to `'edit' | 'assign' | 'change-status'`
3. **`tickets.component.spec.ts`** — Remove/update the test `'should show growl on card action (delete)'`, verify Delete button is no longer rendered
4. **i18n** — Keep `tickets.card.action.delete` key (no harm, avoids breaking other potential references)

### Acceptance Criteria
- [ ] Delete button no longer appears in the card burger menu
- [ ] No TypeScript compilation errors
- [ ] Existing tests pass (updated for removed action)

---

## STORY-002: Edit Ticket Dialog

### Goal
Implement the Edit action: clicking "Edit" in the burger menu opens a modal dialog pre-populated with the ticket's current data. On accept, the ticket is updated via PATCH and the list refreshes.

### Changes

1. **`tickets.component.ts`**:
   - Add `@ViewChild('editDialog') editDialog!: EuiDialogComponent;`
   - Add edit form state properties: `editItem: BacklogItem | null`, `editTitle`, `editDescription`, `editType`, `editPriority`, `editStatus`, `editAssigneeId`, `editError`, `editMembers: ProjectMember[]`
   - Add `openEditDialog(item: BacklogItem)` — populate form fields from item, load project members, call `cdr.detectChanges()` then `editDialog.openDialog()`
   - Add `onEditTicket()` — validate, call `projectService.updateTicket()`, on success: close dialog, show success growl, reload tickets
   - Add `resetEditForm()` — clear all edit state
   - Add `isEditFormValid(): boolean` — title 2–200 chars required
   - Wire `onCardAction('edit', item)` to call `openEditDialog(item)`

2. **`tickets.component.html`**:
   - Add `<eui-dialog #editDialog>` template after the create dialog with form fields:
     - Title (required, `euiInputText`, 2–200 chars)
     - Description (optional, `euiTextArea`)
     - Type (select: STORY, BUG, TASK, EPIC)
     - Priority (select: CRITICAL, HIGH, MEDIUM, LOW)
     - Status (select: workflow statuses)
     - Assignee (select: project members, loaded dynamically)
   - All fields pre-populated from `editItem`
   - Error feedback via `eui-feedback-message`

3. **i18n (en.json + fr.json)**:
   - `tickets.dialog.edit-title`: "Edit Ticket" / "Modifier le ticket"
   - `tickets.growl.updated-summary`: "Ticket updated" / "Ticket mis à jour"
   - `tickets.growl.updated-detail`: "{{key}}-{{number}} has been updated." / "{{key}}-{{number}} a été mis à jour."
   - `tickets.error.update-default`: "An error occurred while updating the ticket." / "Une erreur est survenue lors de la mise à jour du ticket."
   - `ticket.field.status`: "Status" / "Statut"

4. **`tickets.component.spec.ts`**:
   - Test: edit action opens dialog (spy on `editDialog.openDialog`)
   - Test: edit form pre-populated with ticket data
   - Test: successful edit calls `updateTicket`, shows growl, reloads
   - Test: edit error shows inline feedback
   - Test: edit form validation (title too short)
   - Test: edit form reset on dismiss

### a11y
- [ ] All form inputs have associated `<label>` with `euiLabel` and matching `for`/`id`
- [ ] Required fields use `euiRequired` or `aria-required="true"`
- [ ] Validation errors use `aria-describedby`
- [ ] Dialog is keyboard-navigable (Tab, Enter, Escape)

---

## STORY-003: Assign Ticket Dialog (Permission-Gated)

### Goal
Implement the Assign action: only visible if the user has permission (SUPER_ADMIN, PROJECT_ADMIN, or PRODUCT_OWNER on the ticket's project). Opens a dialog with a member select. On accept, updates `assignee_id` via PATCH.

### Changes

1. **`tickets.component.ts`**:
   - Add `@ViewChild('assignDialog') assignDialog!: EuiDialogComponent;`
   - Add assign state: `assignItem: BacklogItem | null`, `assignMemberId: string | null`, `assignMembers: ProjectMember[]`, `assignError: string`
   - Add `canAssignMap: Map<string, boolean>` — caches per-project permission results
   - Add `checkAssignPermissions()` — called after tickets load, checks `permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER')` for each unique project in the loaded items, populates `canAssignMap`
   - Add `canAssign(item: BacklogItem): boolean` — returns `canAssignMap.get(item.projectId) ?? false`
   - Add `openAssignDialog(item: BacklogItem)` — load members, set `assignItem`, open dialog
   - Add `onAssignTicket()` — call `updateTicket` with `{ assignee_id }`, growl, reload
   - Add `resetAssignForm()`
   - Wire `onCardAction('assign', item)` to `openAssignDialog(item)`
   - In template: conditionally show Assign button with `@if (canAssign(item))`

2. **`tickets.component.html`**:
   - Wrap Assign `<button euiDropdownItem>` in `@if (canAssign(item))`
   - Add `<eui-dialog #assignDialog>` with:
     - Assignee select (project members)
     - Error feedback

3. **i18n (en.json + fr.json)**:
   - `tickets.dialog.assign-title`: "Assign Ticket" / "Assigner le ticket"
   - `tickets.growl.assigned-summary`: "Ticket assigned" / "Ticket assigné"
   - `tickets.growl.assigned-detail`: "{{key}}-{{number}} assigned to {{name}}." / "{{key}}-{{number}} assigné à {{name}}."
   - `tickets.error.assign-default`: "An error occurred while assigning the ticket." / "Une erreur est survenue lors de l'assignation du ticket."
   - `tickets.dialog.select-assignee`: "Select an assignee" / "Sélectionner un assigné"

4. **`tickets.component.spec.ts`**:
   - Test: Assign button hidden when user lacks permission
   - Test: Assign button visible when user has permission
   - Test: assign dialog opens with member list
   - Test: successful assign calls updateTicket with assignee_id
   - Test: assign error shows inline feedback

### a11y
- [ ] Assignee select has associated label
- [ ] Dialog keyboard-navigable

---

## STORY-004: Change Status Dialog (Permission-Gated)

### Goal
Implement the Change Status action: same permission gate as Assign. Opens a dialog with a status select pre-populated with the current status. On accept, updates `status` via PATCH.

### Changes

1. **`tickets.component.ts`**:
   - Add `@ViewChild('statusDialog') statusDialog!: EuiDialogComponent;`
   - Add status change state: `statusItem: BacklogItem | null`, `statusValue: string`, `statusError: string`
   - Reuse `canAssignMap` (same permission gate) — rename to `canManageMap` for clarity, or keep as-is since same roles
   - Add `openStatusDialog(item: BacklogItem)` — set `statusItem`, pre-select current status, open dialog
   - Add `onChangeStatus()` — call `updateTicket` with `{ status }`, growl, reload
   - Add `resetStatusForm()`
   - Wire `onCardAction('change-status', item)` to `openStatusDialog(item)`
   - In template: conditionally show Change Status button with `@if (canAssign(item))` (same permission)

2. **`tickets.component.html`**:
   - Wrap Change Status `<button euiDropdownItem>` in `@if (canAssign(item))`
   - Add `<eui-dialog #statusDialog>` with:
     - Status select (workflow statuses, current pre-selected)
     - Error feedback

3. **i18n (en.json + fr.json)**:
   - `tickets.dialog.status-title`: "Change Status" / "Changer le statut"
   - `tickets.growl.status-summary`: "Status changed" / "Statut modifié"
   - `tickets.growl.status-detail`: "{{key}}-{{number}} status changed to {{status}}." / "{{key}}-{{number}} statut changé en {{status}}."
   - `tickets.error.status-default`: "An error occurred while changing the status." / "Une erreur est survenue lors du changement de statut."

4. **`tickets.component.spec.ts`**:
   - Test: Change Status button hidden when user lacks permission
   - Test: Change Status button visible when user has permission
   - Test: status dialog opens with current status pre-selected
   - Test: successful status change calls updateTicket with status
   - Test: status error shows inline feedback

### a11y
- [ ] Status select has associated label
- [ ] Dialog keyboard-navigable

---

## STORY-005: Unit Tests & Final Validation

### Goal
Run the full test suite and build to ensure everything works together. Fix any remaining issues.

### Tasks
1. Run `npm run test:ci` — all tests pass
2. Run `npx ng build --configuration=development` — build passes
3. Verify no regressions in existing functionality
4. Verify all new i18n keys present in both en.json and fr.json

### Acceptance Criteria
- [ ] `npm run test:ci` passes with 0 failures
- [ ] `npx ng build --configuration=development` succeeds
- [ ] All card actions work as specified
- [ ] Permission gating works correctly for Assign and Change Status
