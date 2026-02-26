# STORY-004: Frontend — Project Shell & Scoped Sidebar

## Goal

Create a project shell component that wraps all project-scoped pages. When a user enters a project context, the sidebar updates to show project-specific navigation items. When they leave, the sidebar reverts to the global menu.

## Current State

- `ProjectContextService` exists (STORY-002) with `setProject()`, `clearProject()`, `currentProject$`.
- `ProjectService` exists (STORY-001) with `getProject()`.
- `PortfolioComponent` exists (STORY-003) at `screen/projects` with "Open" buttons navigating to `screen/projects/:projectId`.
- `LayoutComponent` manages sidebar with static `allSidebarItems` filtered by global role.
- `PermissionService` has `hasProjectRole()`, `isSuperAdmin()`, `hasGlobalRole()`.
- No project-scoped routes or shell component exist yet.
- The `screen/projects/:projectId` route doesn't exist — clicking "Open" would currently 404.

## Analysis

### Project shell component

`ProjectShellComponent` is a wrapper component that:
1. Reads `:projectId` from the route params.
2. Fetches the project via `projectService.getProject(projectId)`.
3. On success: calls `projectContextService.setProject(project)`.
4. On 404/403: shows a growl, redirects to `screen/projects` (portfolio).
5. Contains a `<router-outlet>` for child pages (dashboard, backlog, board, settings — future stories).
6. On destroy (user navigates away from project routes): calls `projectContextService.clearProject()`.

### Sidebar switching in LayoutComponent

`LayoutComponent` subscribes to `projectContextService.currentProject$`:
- When `project !== null`: replace `sidebarItems` with project-scoped items:
  - `← All Projects` → `screen/projects`
  - `Dashboard` → `screen/projects/:projectId`
  - `Backlog` → `screen/projects/:projectId/backlog` (placeholder)
  - `Board` → `screen/projects/:projectId/board` (placeholder)
  - `Settings` → `screen/projects/:projectId/settings` (PROJECT_ADMIN / SUPER_ADMIN only)
- When `project === null`: revert to global sidebar (Home, Projects, Users).

The sidebar items are rebuilt dynamically when the project context changes. The "Settings" item is gated by checking `permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN')` — but since this is async, we'll simplify: show Settings for SUPER_ADMIN always, and for others we'll check after the project shell resolves. For the initial implementation, we'll show Settings to all users and gate it with a route guard in a future story.

Actually, simpler approach: show all project sidebar items to everyone for now. Route-level guards (future story) will handle access control. The sidebar is just navigation — it's the route guard that enforces access.

### Placeholder child pages

For this story, we need at least one child route so the shell works. The dashboard (STORY-005) will be the default child. For now, create a minimal placeholder:
- `{ path: '', component: ProjectDashboardPlaceholderComponent }` — just shows the project name.

Actually, per the stories breakdown, STORY-005 creates the dashboard. So for STORY-004, we'll create a minimal inline placeholder that STORY-005 will replace.

### Route structure update

```typescript
// projects.routes.ts
export const PROJECTS_ROUTES: Routes = [
    { path: '', component: PortfolioComponent },
    {
        path: ':projectId',
        component: ProjectShellComponent,
        children: [
            { path: '', component: ProjectDashboardPlaceholderComponent },
        ],
    },
];
```

### Edge cases

1. User navigates directly to `screen/projects/999` (invalid ID) → 404 from API → growl + redirect to portfolio.
2. User navigates to `screen/projects/3` (no access) → 403 from API → growl + redirect to portfolio.
3. User navigates from one project to another (e.g. `screen/projects/1` → `screen/projects/2`) → route params change triggers new fetch, context updates.
4. User clicks "← All Projects" → navigates to `screen/projects`, shell destroys, context clears, sidebar reverts.

### Handling route param changes without destroy

When navigating between projects (`/projects/1` → `/projects/2`), Angular reuses the `ProjectShellComponent` instance (same route, different param). So `ngOnDestroy` won't fire. We need to subscribe to `ActivatedRoute.params` to detect param changes and re-fetch the project.

## Implementation Plan

1. Create `src/app/features/projects/project-shell/project-shell.component.ts`:
   - Subscribe to `route.params` for `:projectId` changes
   - Fetch project, set context, handle errors
   - On destroy: clear context
   - Template: `<router-outlet />`

2. Create a minimal `src/app/features/projects/dashboard-placeholder/dashboard-placeholder.component.ts`:
   - Reads project from `ProjectContextService`
   - Shows project name in `eui-page` structure
   - Will be replaced by STORY-005

3. Update `src/app/features/projects/projects.routes.ts`:
   - Add `:projectId` route with shell and placeholder child

4. Update `src/app/layout/layout.component.ts`:
   - Subscribe to `projectContextService.currentProject$`
   - Switch sidebar items based on project context
   - Rebuild project sidebar items with correct URLs when project changes

5. Create tests for:
   - `ProjectShellComponent`: sets context on init, clears on destroy, handles 404/403, handles param changes
   - `LayoutComponent`: sidebar switches when project context changes

6. Verify build and all tests pass.

## Files Changed

- `src/app/features/projects/project-shell/project-shell.component.ts` (new)
- `src/app/features/projects/project-shell/project-shell.component.spec.ts` (new)
- `src/app/features/projects/dashboard-placeholder/dashboard-placeholder.component.ts` (new)
- `src/app/features/projects/projects.routes.ts` (add shell route)
- `src/app/layout/layout.component.ts` (subscribe to project context, switch sidebar)
- `src/app/layout/layout.component.spec.ts` (update tests)

## Acceptance Criteria

- [ ] Entering `screen/projects/:projectId` fetches the project and sets context
- [ ] Sidebar switches to project-scoped items (← All Projects, Dashboard, Backlog, Board, Settings)
- [ ] Leaving project routes clears context and reverts sidebar to global items
- [ ] Invalid project ID (404) shows growl and redirects to portfolio
- [ ] No access (403) shows growl and redirects to portfolio
- [ ] Navigating between projects updates context without full page reload
- [ ] "← All Projects" navigates back to portfolio
- [ ] Placeholder dashboard shows project name
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
