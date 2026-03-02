# CR-19-2: Ticket Navigation from Board — Context-Aware Back Navigation

## Summary

When a user opens a ticket from the Board page, the ticket detail page does not preserve the navigation context. The sidebar highlights "Backlog Items" instead of "Board", and the back button returns to the Backlog list instead of the Board. This CR fixes both issues so that ticket detail remembers where the user came from and navigates back accordingly.

## Motivation

The Board and Backlog are two different views of the same ticket data. A user working on the Board expects to stay in the Board context when opening and closing tickets. Currently, opening a ticket from the Board breaks the user's flow by switching context to Backlog — they lose their sprint filter, column view, and mental model of where they were.

## Root Cause Analysis

There are two interrelated problems:

### Problem 1: Ticket detail route is nested under `backlog`

The route structure in `projects.routes.ts`:

```
:projectId/backlog              → BacklogComponent
:projectId/backlog/:ticketNumber → TicketDetailComponent (lazy)
:projectId/board                → BoardComponent
```

The ticket detail route is `backlog/:ticketNumber`. When the Board navigates to a ticket, the URL becomes `/screen/projects/{id}/backlog/{ticketNumber}`. The eUI sidebar uses `RouterLinkActive` internally to determine which menu item is active. Since the URL contains `/backlog/`, the sidebar matches the "Backlog Items" menu item (`url: screen/projects/{id}/backlog`) — not "Board".

### Problem 2: Back button uses relative navigation

In `ticket-detail.component.ts`:

```typescript
goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
}
```

`../` from `backlog/:ticketNumber` resolves to `backlog/` — always. There is no awareness of where the user came from.

### Problem 3: Board hardcodes the backlog route

In `board.component.ts`:

```typescript
navigateToTicket(ticket: BacklogItem): void {
    this.router.navigate(['/screen/projects', this.project.id, 'backlog', ticket.ticket_number]);
}
```

The Board navigates to the `backlog/:ticketNumber` route directly. There is no query parameter or state to indicate the origin.

## Desired Behavior

| Scenario | Sidebar active item | Back button destination |
|----------|-------------------|----------------------|
| Open ticket from Backlog | Backlog Items | Backlog list |
| Open ticket from Board | Board | Board |
| Direct URL `/backlog/42` | Backlog Items | Backlog list (default) |

## Design Options

### Option A: Query parameter `?from=board`

The Board passes a query parameter when navigating to ticket detail. The ticket detail component reads it to determine the back destination and stores it. The sidebar active state remains wrong (URL still contains `/backlog/`), so the sidebar would need manual override logic.

Pros: Simple to implement for back navigation.
Cons: Sidebar active state still broken. Query param pollutes the URL. If user refreshes, the param is preserved but feels fragile.

### Option B: Duplicate route `board/:ticketNumber`

Add a parallel route:

```
:projectId/board/:ticketNumber → TicketDetailComponent (lazy)
```

The Board navigates to `/board/{ticketNumber}` instead of `/backlog/{ticketNumber}`. The sidebar naturally highlights "Board" because the URL starts with `/board/`. The back button navigates to `../` which resolves to `/board/`.

Pros: Sidebar works automatically via `RouterLinkActive`. Back button works automatically via relative navigation. Clean URL semantics. No query params. No state management.
Cons: Two routes pointing to the same component. Ticket detail must handle both `backlog/:ticketNumber` and `board/:ticketNumber` parent paths.

### Option C: Browser history `Location.back()`

Replace `router.navigate(['../'])` with `location.back()`. This goes to the actual previous page in browser history.

Pros: Always returns to the exact page the user came from.
Cons: Sidebar active state still broken. If user navigated directly to the URL (bookmark, shared link), `back()` goes to an unexpected page. Breaks if user opened the ticket in a new tab.

### Recommended: Option B — Duplicate route

Option B is the cleanest solution. It leverages Angular's routing system and eUI's `RouterLinkActive` without any custom state management. The ticket detail component already uses `ActivatedRoute` to read `ticketNumber` — it doesn't care about the parent segment. The only change needed is:

1. Add the route
2. Change Board's `navigateToTicket` to use `/board/` instead of `/backlog/`
3. Ticket detail's `goBack()` already uses `../` which will resolve correctly for both paths

## Scope

### 1. Routes — `src/app/features/projects/projects.routes.ts`

Add a new child route under `:projectId`:

```typescript
{ path: 'board/:ticketNumber', loadComponent: () => import('./ticket-detail/ticket-detail.component').then(m => m.TicketDetailComponent) },
```

Place it after the existing `board` route. The existing `backlog/:ticketNumber` route remains unchanged — Backlog navigation continues to work as before.

### 2. Board navigation — `src/app/features/projects/board/board.component.ts`

Change `navigateToTicket()`:

```typescript
navigateToTicket(ticket: BacklogItem): void {
    if (this.project) {
        this.router.navigate(['/screen/projects', this.project.id, 'board', ticket.ticket_number]);
    }
}
```

### 3. Ticket detail back button — `src/app/features/projects/ticket-detail/ticket-detail.component.ts`

No change needed. `goBack()` uses `this.router.navigate(['../'], { relativeTo: this.route })`:
- From `backlog/42` → navigates to `backlog/` ✓
- From `board/42` → navigates to `board/` ✓

### 4. Sidebar active state

No change needed. The eUI sidebar uses `RouterLinkActive` internally:
- URL `/screen/projects/1/backlog/42` → matches sidebar item `screen/projects/1/backlog` ✓
- URL `/screen/projects/1/board/42` → matches sidebar item `screen/projects/1/board` ✓

### 5. Ticket detail data loading — `src/app/features/projects/ticket-detail/ticket-detail.component.ts`

No change needed. The component reads `ticketNumber` from `this.route.paramMap.get('ticketNumber')` and calls `projectService.getTicket(projectId, ticketNumber)`. The API endpoint is `/api/projects/:projectId/backlog/:ticketNumber` — this is the API path, not the frontend route. The component doesn't care whether the frontend route parent is `backlog` or `board`.

### 6. Backlog card links — `src/app/features/projects/backlog/backlog.component.html`

No change needed. Backlog cards use `[routerLink]="['../', 'backlog', item.ticket_number]"` which continues to navigate to `backlog/:ticketNumber`.

## Impact Analysis

### Files to modify

| File | Change | Risk |
|------|--------|------|
| `src/app/features/projects/projects.routes.ts` | Add `board/:ticketNumber` route | Low — additive, no existing routes affected |
| `src/app/features/projects/board/board.component.ts` | Change `navigateToTicket` path from `backlog` to `board` | Low — single line change |

### Files NOT modified (verified no impact)

| File | Why no change |
|------|--------------|
| `ticket-detail.component.ts` | `goBack()` uses relative `../` — works for both parent paths. `paramMap.get('ticketNumber')` reads the same param name. API calls use `projectService` which has its own URL. |
| `ticket-detail.component.html` | No route-dependent template logic |
| `backlog.component.html` | Uses `routerLink` to `backlog/:ticketNumber` — unchanged |
| `layout.component.ts` | Sidebar items use `url` property matched by `RouterLinkActive` — works automatically |
| `mock/app/routes/project_routes.js` | No backend change — API routes are independent of frontend routes |
| `sprints.component.ts` / `sprint-planning.component.ts` | Do not navigate to ticket detail |

### Existing tests impact

| Test file | Impact |
|-----------|--------|
| `board.component.spec.ts` | Update `navigateToTicket` test — expect `board` in route instead of `backlog` |
| `ticket-detail.component.spec.ts` | No change — tests mock `ActivatedRoute` with `ticketNumber` param, don't depend on parent segment |
| `backlog.component.spec.ts` | No change — backlog navigation unchanged |

### Edge cases

| Scenario | Behavior |
|----------|----------|
| User bookmarks `/board/42` | Works — route exists, ticket detail loads, sidebar shows Board, back goes to Board |
| User bookmarks `/backlog/42` | Works — unchanged behavior |
| User shares `/board/42` link | Works — recipient sees ticket with Board context |
| User navigates `/board/42` then edits URL to `/backlog/42` | Works — context switches to Backlog, back goes to Backlog |
| Browser back button after Board → ticket | Goes to Board (browser history, not `goBack()`) |

## Acceptance Criteria

- [ ] Clicking a ticket card on the Board navigates to `/screen/projects/{id}/board/{ticketNumber}`
- [ ] Sidebar highlights "Board" when viewing a ticket opened from the Board
- [ ] Back button on ticket detail returns to the Board when opened from Board
- [ ] Clicking a ticket card on the Backlog still navigates to `/screen/projects/{id}/backlog/{ticketNumber}` (no regression)
- [ ] Sidebar highlights "Backlog Items" when viewing a ticket opened from Backlog (no regression)
- [ ] Back button on ticket detail returns to Backlog when opened from Backlog (no regression)
- [ ] All existing frontend tests pass: `npm run test:ci`
- [ ] Build passes: `npx ng build --configuration=development`
