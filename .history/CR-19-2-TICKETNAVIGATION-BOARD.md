# CR-19-2 — Ticket Navigation from Board

## What this branch does

Fixes context-aware navigation when opening a ticket from the Board page. Previously, clicking a ticket card on the Board navigated to `/backlog/{ticketNumber}`, which caused the sidebar to highlight "Backlog Items" instead of "Board" and the back button to return to the Backlog list instead of the Board. The fix adds a parallel `board/:ticketNumber` route and updates the Board's navigation to use it.

## Step-by-step walkthrough

### 1. Change request document (analysis)

- Created CR document with root cause analysis (ticket detail route nested under `backlog`, relative back navigation, hardcoded backlog path in Board), three design options evaluated, and recommended Option B (duplicate route).

Files: `.analysis/CR-19-2-TicketNavigation-BOARD/CR-19-2-TicketNavigation-BOARD.md`

### 2. Add `board/:ticketNumber` route and update Board navigation

- Added `{ path: 'board/:ticketNumber', loadComponent: ... TicketDetailComponent }` route in `projects.routes.ts`, placed after the existing `board` route.
- Changed `BoardComponent.navigateToTicket()` to navigate to `/screen/projects/{id}/board/{ticketNumber}` instead of `/screen/projects/{id}/backlog/{ticketNumber}`.
- No changes needed to `TicketDetailComponent` — `goBack()` uses relative `../` which resolves correctly for both `backlog/:ticketNumber` and `board/:ticketNumber`. `paramMap.get('ticketNumber')` reads the same param. API calls go through `ProjectService` with its own URLs.
- No changes needed to sidebar — eUI's `RouterLinkActive` automatically highlights "Board" when the URL contains `/board/`.

Files: `src/app/features/projects/projects.routes.ts`, `src/app/features/projects/board/board.component.ts`

## Working method

This was a small change request — no stories needed. CR document → implementation → verification in one pass.

## Key technical decisions

- **Duplicate route over query params or `Location.back()`**: A parallel `board/:ticketNumber` route leverages Angular's routing and eUI's `RouterLinkActive` without custom state management. The sidebar highlights correctly automatically, and the relative back navigation (`../`) resolves to the correct parent for both paths. Query params would require manual sidebar override logic; `Location.back()` breaks on direct URL access or new tabs.
- **No ticket detail changes**: The component reads `ticketNumber` from route params and calls `ProjectService` APIs — it doesn't care whether the parent segment is `backlog` or `board`.

## Git history

```
c822d98 fix(CR-19-2): ticket navigation from Board — add board/:ticketNumber route, update Board navigateToTicket
2cb135b docs(CR-19-2): add change request for ticket navigation from Board
```

## Test summary

- Frontend: 623 unit tests (vitest) — all passing (no new tests — 2-line routing fix)
- Backend: no changes
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the Board ticket navigation fix on a fresh eUI Angular project that already has: a project shell with child routes for `backlog`, `backlog/:ticketNumber` (ticket detail), and `board`, a sidebar built from `EuiMenuItem[]` with `url` properties matched by `RouterLinkActive`, and a ticket detail component with a back button using `router.navigate(['../'], { relativeTo: this.route })`.

---

**Prompt:**

> Fix ticket navigation from the Board page so the sidebar highlights "Board" and the back button returns to the Board.
>
> **Root cause**: Board navigates to `backlog/:ticketNumber`, so the sidebar matches "Backlog" and `../` resolves to `backlog/`.
>
> **Fix (2 files, ~3 lines)**:
> 1. In `projects.routes.ts`, add a route after `board`: `{ path: 'board/:ticketNumber', loadComponent: () => import('./ticket-detail/ticket-detail.component').then(m => m.TicketDetailComponent) }`
> 2. In `board.component.ts`, change `navigateToTicket()` to use `'board'` instead of `'backlog'` in the route array.
>
> **No other changes needed**: ticket detail's `goBack()` uses relative `../` (works for both parents), sidebar uses `RouterLinkActive` (matches automatically), API calls use `ProjectService` (independent of frontend route).
>
> **Verify**: `npm run test:ci` — all tests pass. `npx ng build --configuration=development` — passes.
