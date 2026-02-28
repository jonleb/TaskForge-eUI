# STORY-005: Frontend — Add Link Dialog

## Objective

Dialog to create a new link: select link type, enter target ticket number, submit.

## UI Design

- "Add Link" button in the Linked Tickets section header (visible to users with edit permission)
- Dialog with:
  - Link type dropdown (euiSelect) populated from getLinkTypes()
  - Target ticket number input (euiInputText, numeric)
  - Accept/Cancel buttons
- On submit: call createTicketLink(), refresh links list, show growl
- Validation: link type required, target ticket number required

## Files Modified

| File | Modification |
|------|-------------|
| `src/app/features/projects/ticket-detail/ticket-detail.component.ts` | Add dialog logic, link type loading |
| `src/app/features/projects/ticket-detail/ticket-detail.component.html` | Add dialog template, add link button |
| `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts` | Add dialog tests |
| `src/assets/i18n/en.json` | Add i18n keys |
| `src/assets/i18n/fr.json` | Add i18n keys |
