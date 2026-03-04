# FEATURE-022 — Ticket Card Actions (Burger Menu)

## Context

The Tickets page (`/screen/tickets`) displays tickets in a card view with a burger menu (⋮) on each card. The menu currently has four stub actions: Edit, Assign, Change status, and Delete. These actions only show growl notifications and have no real functionality.

This feature implements the actual behavior for three of these actions and removes the Delete action.

## Current State

- **Edit**: stub — no action
- **Assign**: stub — shows growl
- **Change status**: stub — shows growl
- **Delete**: stub — shows growl

## Target State

### 1. Edit — Open edit dialog

Clicking "Edit" opens a modal dialog pre-populated with the ticket's current data. The dialog allows editing the following fields:
- Title (required, 2–200 chars)
- Description (optional, textarea)
- Type (select from STORY, BUG, TASK, EPIC)
- Priority (select from LOW, MEDIUM, HIGH, CRITICAL)
- Status (select from workflow statuses)
- Assignee (select from project members)

On accept, the ticket is updated via PATCH `/api/projects/:projectId/backlog/:ticketNumber` and the list is refreshed. A success growl is shown.

### 2. Assign — Permission-gated assign dialog

The "Assign" action is only visible if the current user has permission to assign tickets in the ticket's project. Permission check: user must be SUPER_ADMIN, PROJECT_ADMIN, or PRODUCT_OWNER on the ticket's project.

Clicking "Assign" opens a modal dialog with a search-and-select field to pick a project member. The field filters members as the user types. On accept, the ticket is updated via PATCH with the new `assignee_id`.

### 3. Change status — Permission-gated status dialog

Same permission gate as Assign. The "Change status" action is only visible if the user has permission.

Clicking "Change status" opens a modal dialog with a select dropdown showing all workflow statuses. The current status is pre-selected. On accept, the ticket is updated via PATCH with the new `status`.

### 4. Delete — Removed

The "Delete" action is removed from the burger menu entirely. No delete functionality is needed at this stage.

## Technical Notes

- The tickets page uses `TicketsService` and `ProjectService` for API calls
- Permission checks use `PermissionService.hasProjectRole()` which returns an Observable
- The existing PATCH endpoint already supports `status`, `assignee_id`, `type`, `priority`, `title`, `description`
- Dialogs use `eui-dialog` component
- Search-and-select for Assign uses `eui-autocomplete` if available, otherwise a filtered select
- All user-facing text must use i18n keys (EN + FR)
- All form inputs must follow a11y steering rules (labels, aria attributes, keyboard navigation)

## Files Impacted

- `src/app/features/tickets/tickets.component.html` — dialog templates, menu visibility
- `src/app/features/tickets/tickets.component.ts` — dialog logic, permission checks, API calls
- `src/app/features/tickets/tickets.component.spec.ts` — tests for new actions
- `src/assets/i18n/en.json` — new i18n keys
- `src/assets/i18n/fr.json` — new i18n keys
- `src/app/core/tickets/tickets.service.ts` — may need updateTicket method
