# BUG-001: Ticket Detail Routing and Sidebar Selection Issues

## Status: RESOLVED

## Summary

Two related issues with ticket navigation:
1. When opening a ticket from the Board view, the sidebar incorrectly highlights "Backlog" instead of "Board"
2. The ticket detail URL is nested under the parent view (e.g., `/screen/projects/5/backlog/9`), which couples the ticket to its origin and complicates navigation

## Current Behavior

### Issue 1: Incorrect Sidebar Menu Selection

When navigating to a ticket from different views:
- From **Backlog** → Sidebar correctly highlights "Backlog" ✓
- From **Board** → Sidebar incorrectly highlights "Backlog" ✗
- From **Sprint Planning** → Sidebar incorrectly highlights "Backlog" ✗

### Issue 2: URL Structure

Current ticket URLs are nested under the originating view:
```
/screen/projects/5/backlog/9
```

This creates problems:
- The ticket is semantically tied to "backlog" even when accessed from Board
- The back button behavior depends on browser history, not the URL structure
- Deep linking to a ticket always implies a "backlog" context
- Bookmarking a ticket URL loses the original navigation context

## Root Cause Analysis

### Sidebar Selection Issue

The `eui-app-sidebar-menu` component uses URL matching to determine the active menu item. Looking at `layout.component.ts`:

```typescript
private buildSidebar(project: Project | null): void {
    if (project) {
        const base = `screen/projects/${project.id}`;
        this.sidebarItems = [
            { label: 'nav.all-projects', url: 'screen/projects' },
            { label: 'nav.dashboard', url: base },
            { label: 'nav.members', url: `${base}/members` },
            { label: 'nav.backlog', url: `${base}/backlog` },      // ← matches /backlog/9
            { label: 'nav.sprints', url: `${base}/sprints` },
            { label: 'nav.board', url: `${base}/board` },
            { label: 'nav.settings', url: `${base}/settings` },
        ];
    }
}
```

The `eui-app-sidebar-menu` performs prefix matching on URLs. When the current route is `/screen/projects/5/backlog/9`, it matches the "Backlog" menu item (`/screen/projects/5/backlog`) because the URL starts with that path.

### Routing Structure Issue

In `projects.routes.ts`, the ticket detail is a child of the backlog route:

```typescript
{ path: 'backlog/:ticketNumber', loadComponent: () => import('./ticket-detail/ticket-detail.component') }
```

The Board component navigates to tickets using the backlog path:

```typescript
// board.component.ts
navigateToTicket(ticket: BacklogItem): void {
    if (this.project) {
        this.router.navigate(['/screen/projects', this.project.id, 'backlog', ticket.ticket_number]);
    }
}
```

## Expected Behavior

### Option A: Context-Aware Routing (Recommended)

1. Ticket detail should have its own top-level route: `/screen/projects/:projectId/tickets/:ticketNumber`
2. The sidebar should not highlight any project sub-section when viewing a ticket (or highlight a dedicated "Tickets" item if added)
3. The back button should use navigation history (already implemented via `Location.back()`)
4. Optionally, preserve origin context via query parameter for breadcrumb display: `/screen/projects/5/tickets/9?from=board`

### Option B: Flat Ticket Route (Simpler)

1. Move ticket detail outside project context: `/screen/tickets/:ticketNumber`
2. The ticket detail component fetches project context from the ticket data
3. Sidebar reverts to global navigation when viewing a ticket
4. Back button navigates to previous location via browser history

## UX Guidelines Reference

### Angular Router Best Practices
- Routes should represent resources, not navigation paths
- A ticket is a resource that exists independently of how it was discovered
- Child routes should represent true parent-child relationships (e.g., project → settings), not navigation flows

### eUI Sidebar Menu Behavior
- `eui-app-sidebar-menu` uses URL prefix matching for active state
- No built-in support for "no active item" state when URL doesn't match any menu item
- Workaround: ensure ticket routes don't share prefixes with menu item URLs

### Navigation History Pattern
- The current `Location.back()` implementation is correct for the back button
- Query parameters can preserve context without affecting URL structure
- Breadcrumbs should reflect the resource hierarchy, not the navigation path

## Proposed Solution

### Route Changes

1. Add a new route for ticket detail at project level:
```typescript
// projects.routes.ts
{ path: ':projectId/tickets/:ticketNumber', loadComponent: () => import('./ticket-detail/ticket-detail.component') }
```

2. Update navigation in all components (Board, Backlog, Sprint Planning):
```typescript
this.router.navigate(['/screen/projects', this.project.id, 'tickets', ticket.ticket_number]);
```

3. Optionally add origin tracking:
```typescript
this.router.navigate(
    ['/screen/projects', this.project.id, 'tickets', ticket.ticket_number],
    { queryParams: { from: 'board' } }
);
```

### Sidebar Behavior

With the new route `/screen/projects/:projectId/tickets/:ticketNumber`:
- No sidebar item will match (no item has URL ending in `/tickets`)
- This is acceptable UX — the user is viewing a detail page, not a list view
- Alternatively, add a "Tickets" menu item if a dedicated tickets list view exists

### Back Button

The current implementation using `Location.back()` is correct and should be preserved. It navigates to the previous browser history entry regardless of URL structure.

### Breadcrumb Enhancement (Optional)

Use the `from` query parameter to show contextual breadcrumbs:
```
Home > Project Name > Board > PROJ-9
```
or
```
Home > Project Name > Backlog > PROJ-9
```

## Files to Modify

1. `src/app/features/projects/projects.routes.ts` — Add new ticket route
2. `src/app/features/projects/board/board.component.ts` — Update `navigateToTicket()`
3. `src/app/features/projects/backlog/backlog.component.html` — Update `routerLink`
4. `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.ts` — Update navigation if applicable
5. `src/app/features/projects/ticket-detail/ticket-detail.component.ts` — Update route parameter extraction
6. (Optional) `src/app/layout/layout.component.ts` — Add "Tickets" sidebar item if desired

## Acceptance Criteria

- [ ] Clicking a ticket from Board navigates to `/screen/projects/:projectId/tickets/:ticketNumber`
- [ ] Clicking a ticket from Backlog navigates to `/screen/projects/:projectId/tickets/:ticketNumber`
- [ ] Sidebar does not incorrectly highlight "Backlog" when viewing a ticket from Board
- [ ] Back button returns to the originating view (Board, Backlog, etc.)
- [ ] Direct URL access to a ticket works correctly
- [ ] Existing ticket links in the application continue to work (or are migrated)

## Priority

Medium — This is a UX inconsistency that causes user confusion but does not block functionality.

## Related

- FEATURE-007-Project_nav_ux
- FEATURE-20-Tickets-Page


---

## Resolution

Implemented on 2026-03-03.

### Changes Made

1. **Route change** (`projects.routes.ts`): Changed ticket detail route from `backlog/:ticketNumber` to `tickets/:ticketNumber`

2. **Navigation updates**:
   - `board.component.ts`: Updated `navigateToTicket()` to use `/tickets/` path
   - `backlog.component.html`: Updated `routerLink` to use `tickets` instead of `backlog`
   - `tickets.component.html`: Updated `routerLink` to use `/tickets/` path

3. **Test updates**:
   - `tickets.component.spec.ts`: Updated expected href assertions

### Result

- Ticket detail URL is now `/screen/projects/:projectId/tickets/:ticketNumber`
- Sidebar no longer incorrectly highlights "Backlog" when viewing a ticket from Board
- Back button continues to work correctly via `Location.back()`
- All 693 tests pass
- Build succeeds
