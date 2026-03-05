# CR-2204 — Navigation Consistency: Tickets → Ticket Detail

## Problem Statement

When a user clicks a ticket card on the **Tickets page** (`/screen/tickets`), they are navigated to the **Ticket Detail page** at `/screen/projects/:projectId/tickets/:ticketNumber`. This route is a child of the `ProjectShellComponent`, which triggers two side-effects that are incorrect in this context:

1. **Sidebar switches to project-scoped menu** — The layout shows "← All Projects", "Dashboard", "Members", "Backlog", "Sprints", "Board", "Settings" instead of the global menu ("Home", "Tickets", "Projects", "Users"). The user came from the Tickets page, not from a project, so the project sidebar is disorienting.

2. **Breadcrumb shows a double "Tickets" entry on two lines** — The ticket-detail component uses an inline `<eui-page-breadcrumb>` block (Home → Tickets → TF-57) which stacks below the layout's `<eui-app-breadcrumb>` (Home → Tickets from the breadcrumbService set by the Tickets page). This produces two breadcrumb bars.

## Root Cause Analysis

### Architecture overview

| Layer | Component | Breadcrumb mechanism | Sidebar effect |
|-------|-----------|---------------------|----------------|
| Shell | `LayoutComponent` | `<eui-app-breadcrumb>` renders `breadcrumbService.breadcrumbs$` | Subscribes to `ProjectContextService.currentProject$` — switches sidebar to project menu when a project is set |
| Global pages | `HomeComponent`, `TicketsComponent`, `PortfolioComponent`, `UsersComponent` | `breadcrumbService.setBreadcrumb([...])` in `ngOnInit` | No project context → global sidebar |
| Project shell | `ProjectShellComponent` | (none — delegates to children) | Calls `projectContext.setProject(project)` → triggers sidebar switch in layout |
| Project children | `DashboardComponent` | `breadcrumbService.setBreadcrumb([...])` in `ngOnInit` | Inherits project context from shell |
| **Ticket detail** | `TicketDetailComponent` | **Inline `<eui-page-breadcrumb>`** (not the service) | Inherits project context from shell |

### Issue 1: Sidebar context mismatch

`navigateToTicket()` in `TicketsComponent` routes to `/screen/projects/:projectId/tickets/:ticketNumber`. This activates `ProjectShellComponent`, which calls `projectContext.setProject(project)`. The layout reacts by switching the sidebar to the project-scoped menu.

This is correct when navigating from within a project (e.g., Backlog → Ticket Detail), but wrong when coming from the cross-project Tickets page.

### Issue 2: Double breadcrumb

`TicketDetailComponent` uses an inline `<eui-page-breadcrumb>` in its template instead of `breadcrumbService.setBreadcrumb()`. Since the layout already renders `<eui-app-breadcrumb>` from the service, the two breadcrumb bars stack vertically.

This is the same bug that was just fixed on the Tickets page itself.

### Issue 3: Breadcrumb inconsistency across project-scoped pages

| Component | Breadcrumb mechanism | Correct? |
|-----------|---------------------|----------|
| `DashboardComponent` | `breadcrumbService.setBreadcrumb(...)` | ✅ |
| `PortfolioComponent` | `breadcrumbService.setBreadcrumb(...)` | ✅ |
| `TicketDetailComponent` | Inline `<eui-page-breadcrumb>` | ❌ |
| `MembersComponent` | None | ⚠️ Falls back to previous page's breadcrumb |
| `BacklogComponent` | None | ⚠️ Falls back to previous page's breadcrumb |
| `SprintsComponent` | None | ⚠️ Falls back to previous page's breadcrumb |
| `SprintPlanningComponent` | Unknown | ⚠️ Needs audit |
| `BoardComponent` | Unknown | ⚠️ Needs audit |
| `SettingsComponent` | Unknown | ⚠️ Needs audit |

## Proposed Changes

### STORY-001: Fix ticket-detail breadcrumb (double breadcrumb bug)

**Scope:** `TicketDetailComponent`

- Remove the inline `<eui-page-breadcrumb>` block from the template
- Remove `EUI_BREADCRUMB` from the component imports array
- Inject `EuiBreadcrumbService` and call `setBreadcrumb()` when the ticket loads
- Breadcrumb trail should be context-aware:
  - **Coming from Tickets page:** `Tickets (link) → TF-57`
  - **Coming from project context (Backlog, Board, etc.):** `Projects (link) → ProjectName (link) → TF-57`
- To determine origin, check `this.route` or use a query param / navigation state
- Update unit tests: replace DOM-based breadcrumb assertions with service mock assertions

**Files:**
- `src/app/features/projects/ticket-detail/ticket-detail.component.ts`
- `src/app/features/projects/ticket-detail/ticket-detail.component.html`
- `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts`

### STORY-002: Context-aware sidebar when navigating from Tickets page

**Scope:** `TicketsComponent`, `TicketDetailComponent`

The sidebar switches to project-scoped mode because the route goes through `ProjectShellComponent`. Two approaches:

**Option A (recommended): Pass navigation origin via router state**
- In `TicketsComponent.navigateToTicket()`, pass `{ state: { from: 'tickets' } }` in the navigation extras
- In `TicketDetailComponent`, read `this.router.getCurrentNavigation()?.extras.state` or `this.location.getState()`
- If `from === 'tickets'`, call `projectContext.clearProject()` after loading the ticket data (so the sidebar stays global), and set the breadcrumb to `Tickets → TF-57`
- The "Back" button (`goBack()`) already uses `location.back()` which will return to the Tickets page correctly

**Option B (alternative): Dedicated route outside project shell**
- Add a new route `screen/tickets/:projectId/:ticketNumber` that loads `TicketDetailComponent` without going through `ProjectShellComponent`
- This avoids the sidebar switch entirely but requires the component to load project data independently (it currently relies on `ProjectContextService.currentProject$` from the shell)
- More invasive, but cleaner long-term

**Recommendation:** Option A for minimal disruption. Option B can be considered in a future refactoring.

**Files:**
- `src/app/features/tickets/tickets.component.ts` (navigateToTicket)
- `src/app/features/projects/ticket-detail/ticket-detail.component.ts`
- `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts`

### STORY-003: Breadcrumb alignment for all project-scoped pages

**Scope:** All project child components that don't currently set breadcrumbs

Ensure every project-scoped page calls `breadcrumbService.setBreadcrumb()` with a consistent trail: `Projects (link) → ProjectName (link to dashboard) → PageName`.

Components to update:
- `MembersComponent` → `Projects → ProjectName → Members`
- `BacklogComponent` → `Projects → ProjectName → Backlog`
- `SprintsComponent` → `Projects → ProjectName → Sprints`
- `SprintPlanningComponent` → `Projects → ProjectName → Sprints (link) → SprintName`
- `BoardComponent` → `Projects → ProjectName → Board`
- `SettingsComponent` → `Projects → ProjectName → Settings`

Each component should inject `EuiBreadcrumbService` and `ProjectContextService`, subscribe to `currentProject$`, and call `setBreadcrumb()` with the appropriate trail.

**Files:**
- `src/app/features/projects/members/members.component.ts`
- `src/app/features/projects/backlog/backlog.component.ts`
- `src/app/features/projects/sprints/sprints.component.ts`
- `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.ts`
- `src/app/features/projects/board/board.component.ts`
- `src/app/features/projects/settings/settings.component.ts`
- Corresponding `.spec.ts` files

## Navigation Matrix (Target State)

| Origin | Destination | Sidebar | Breadcrumb |
|--------|------------|---------|------------|
| Home | Tickets | Global | `Tickets` |
| Tickets | Ticket Detail (TF-57) | Global | `Tickets → TF-57` |
| Project Dashboard | Ticket Detail (TF-57) | Project | `Projects → TaskForge → TF-57` |
| Backlog | Ticket Detail (TF-57) | Project | `Projects → TaskForge → Backlog → TF-57` |
| Board | Ticket Detail (TF-57) | Project | `Projects → TaskForge → Board → TF-57` |
| Ticket Detail | Back button | Previous page | Restored from history |

## Priority

High — the double breadcrumb and sidebar mismatch are visible on every ticket navigation from the Tickets page.

## Definition of Done

- [ ] No double breadcrumb on any page
- [ ] Sidebar stays global when navigating from Tickets page to Ticket Detail
- [ ] Sidebar shows project menu when navigating from within a project to Ticket Detail
- [ ] All project-scoped pages set breadcrumbs via `breadcrumbService`
- [ ] All existing tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
