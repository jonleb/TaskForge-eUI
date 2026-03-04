# CR-2003 — Ticket Detail Page Interface Improvements

## Summary

A series of UX and layout improvements to the Ticket Detail page (`ticket-detail.component`) following the CR-2002 form refactoring. These changes refine field layout, edit/view mode behavior, fieldset ordering, and comment submission workflow based on user feedback.

## Changes Implemented

### 1. Horizontal alignment of Status, Priority, Assignee

**Before:** Status, Priority, and Assignee were stacked vertically in separate rows.
**After:** All three fields are displayed on a single horizontal row using eUI flex utilities (`eui-u-d-flex`, `eui-u-flex-1`, `eui-u-gap-m`).

**Files:** `ticket-detail.component.html`

### 2. View mode shows text, edit mode shows selects

**Before:** Status, Priority, Assignee, and Epic always rendered as `<select>` dropdowns.
**After:** In view mode, these fields display as readonly `<input euiInputText>` with translated text values. In edit mode, they switch to `<select euiSelect>` dropdowns using `@if (isEditActive)` blocks.

**Files:** `ticket-detail.component.html`, `ticket-detail.component.ts`

### 3. Epic moved to same row as Title and Type

**Before:** Epic was in the "Additional Information" fieldset.
**After:** Epic is displayed alongside Title and Type on the first row of the form, using a 3-column flex layout.

**Files:** `ticket-detail.component.html`

### 4. Type field made editable

**Before:** Type was always readonly.
**After:** Type is now editable in edit mode via a `<select>` dropdown populated from `TICKET_TYPES`. The form control, save logic, and mock server PATCH endpoint all support type changes.

**Files:** `ticket-detail.component.html`, `ticket-detail.component.ts`, `project.models.ts`, `mock/app/routes/project_routes.js`

### 5. Fieldset reordering

**Before:** Order was Ticket Information → Description → Additional Information (3 fieldsets).
**After:** Order is Title → Description → Ticket Information → Additional Information (4 fieldsets).
- Title has its own fieldset with the inner label hidden (`eui-u-sr-only`) to avoid duplication with the fieldset heading.
- Description fieldset inner label also hidden for the same reason.
- Ticket Information now contains Type, Epic, Status, Priority, Assignee.
- Additional Information contains Created by and Created at.

**Files:** `ticket-detail.component.html`, `ticket-detail.component.spec.ts`

### 6. Add Comment moved to header action button with dialog

**Before:** Comment form was inline in the Comments tab (textarea + submit button).
**After:** An "Add comment" secondary button appears in the page header action items. Clicking it opens an `eui-dialog` with a textarea form. The inline form in the Comments tab was removed.

**Files:** `ticket-detail.component.html`, `ticket-detail.component.ts`, `ticket-detail.component.spec.ts`, `en.json`, `fr.json`

## New i18n Keys

| Key | EN | FR |
|-----|----|----|
| `ticket-detail.comments.dialog.title` | Add comment | Ajouter un commentaire |
| `ticket-detail.comments.dialog.cancel` | Cancel | Annuler |

## Backend Changes

- Mock server PATCH endpoint (`/api/projects/:projectId/backlog/:ticketNumber`) now supports the `type` field with validation against `['STORY', 'BUG', 'TASK', 'EPIC']` and activity logging.

## Test Impact

- Fieldset count assertion updated from 3 to 4.
- Header action button count assertion updated from 1 to 2 (Add comment + Edit toggle).
- All 704 frontend tests pass.
- Build passes.
