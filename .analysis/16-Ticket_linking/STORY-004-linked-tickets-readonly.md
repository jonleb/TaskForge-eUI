# STORY-004: Frontend — Linked Tickets Section (Read-Only)

## Objective

Display a "Linked Tickets" section on the ticket detail page showing all linked tickets with their link type labels and ticket references.

## UI Design

- Section placed between the ticket fields and the save bar
- Heading: "Linked Tickets" (h3, same level as Comments/Activity)
- Each link displayed as a list item with: link label, ticket key (e.g. TF-3), ticket title
- Empty state: "No linked tickets."
- Links loaded on ticket load via `getTicketLinks()`

## Files Modified

| File | Modification |
|------|-------------|
| `src/app/features/projects/ticket-detail/ticket-detail.component.ts` | Add ticketLinks array, loadTicketLinks(), link type resolution |
| `src/app/features/projects/ticket-detail/ticket-detail.component.html` | Add linked tickets section |
| `src/app/features/projects/ticket-detail/ticket-detail.component.scss` | Minimal styling for link list |
| `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts` | Add tests for linked tickets display |
| `src/assets/i18n/en.json` | Add i18n keys |
| `src/assets/i18n/fr.json` | Add i18n keys |
