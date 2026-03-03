# BUG — Sprint ticket ordering not synced between views

## Summary

Drag & drop reorder in Sprint Planning does not persist to the backend. When the user reorders tickets in the Sprint Planning view and navigates back to the Sprints view, the tickets appear in their original order.

## Steps to Reproduce

1. Open the Sprints view — note the ticket order in a sprint (e.g. #9, #13, #14).
2. Click the sprint name to open Sprint Planning.
3. Confirm the Sprint tickets section shows the same order (#9, #13, #14).
4. Drag #14 to the top position → order becomes #14, #9, #13.
5. A success growl appears.
6. Navigate back to the Sprints view.
7. The sprint still shows the old order (#9, #13, #14).

## Expected Behaviour

After step 6, the Sprints view should display the new order (#14, #9, #13) matching what was set in Sprint Planning.

## Root Cause

Both `sprints.component.ts` (`onIssueDrop`) and `sprint-planning.component.ts` (`onSprintTicketDrop`) built the reorder payload with **0-indexed** positions:

```typescript
const reorderPayload = items.map((item, index) => ({
    ticket_number: item.ticket_number,
    position: index,   // ← produces 0, 1, 2 …
}));
```

The mock server endpoint `PUT /api/projects/:id/backlog/reorder` validates each position:

```javascript
if (!Number.isInteger(entry.position) || entry.position < 1) {
    return res.status(400).json({ message: 'Each item must have a positive integer position' });
}
```

Position `0` fails the `< 1` check, so the API returned a **400 Bad Request** for every reorder attempt. The error handler in Sprint Planning reloaded the data (reverting the visual change), but the success growl was never reached — the reorder was silently discarded. The Sprints view, which fetches fresh data on mount, always received the unchanged positions from the server.

## Affected Files

| File | Method |
|------|--------|
| `src/app/features/projects/sprints/sprints.component.ts` | `onIssueDrop()` |
| `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.ts` | `onSprintTicketDrop()` |

## Fix Applied

Changed both methods to use **1-indexed** positions:

```typescript
const reorderPayload = items.map((item, index) => ({
    ticket_number: item.ticket_number,
    position: index + 1,   // ← produces 1, 2, 3 …
}));
```

This matches the API contract (`position >= 1`) and the convention used everywhere else in the codebase (backlog reorder, ticket creation).

## Commit

`fix(CR-1802): use 1-indexed positions in sprint reorder payloads`

## Verification

- 598 frontend tests pass (`npm run test:ci`).
- Build passes (`npx ng build --configuration=development`).
- Reorder in Sprint Planning now persists; navigating back to Sprints shows the updated order.
