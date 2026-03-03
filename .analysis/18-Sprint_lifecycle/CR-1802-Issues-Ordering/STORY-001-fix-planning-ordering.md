# STORY-001 — Fix Sprint Planning Ordering Consistency

## Objective

Sort `sprintTickets` and `availableTickets` by `position ?? ticket_number` in the Sprint Planning view so the display order matches the Sprints view.

## Root Cause

`sprint-planning.component.ts` assigns filtered arrays without sorting:

```typescript
// Current (line 94-95) — no sort
this.availableTickets = backlog.data.filter(item => !item.sprint_id);
this.sprintTickets = backlog.data.filter(item => item.sprint_id === sprintId);
```

The Sprints view sorts via `getSprintItems()`:

```typescript
.sort((a, b) => (a.position ?? a.ticket_number) - (b.position ?? b.ticket_number));
```

This mismatch causes the same sprint's issues to appear in different orders.

## Changes

### `sprint-planning.component.ts`

In `loadData()`, after filtering, sort both arrays:

```typescript
this.availableTickets = backlog.data
    .filter(item => !item.sprint_id)
    .sort((a, b) => (a.position ?? a.ticket_number) - (b.position ?? b.ticket_number));

this.sprintTickets = backlog.data
    .filter(item => item.sprint_id === sprintId)
    .sort((a, b) => (a.position ?? a.ticket_number) - (b.position ?? b.ticket_number));
```

No template or style changes needed.

## Unit Tests

- `sprintTickets` are sorted by `position ?? ticket_number` ascending.
- `availableTickets` are sorted by `position ?? ticket_number` ascending.
- Verify with mock data that has non-sequential positions.

## Files

- `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.ts`
- `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.spec.ts`
