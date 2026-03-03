# FEATURE-007 Project Navigation UX — Story Breakdown

## Context

This feature adds project-centered navigation to the TaskForge-eUI-v2 app. The goal is to let users browse their projects, select one, and work within a project-scoped context with consistent breadcrumbs, sidebar updates, and session persistence.

The app currently has:
- Backend: `GET /api/projects` (membership-filtered), `GET /api/projects/:projectId`, `GET /api/projects/:projectId/members` — all protected by auth middleware.
- Frontend: `PermissionService` with `hasProjectRole()`, global-role-based sidebar filtering, `authGuard` + `roleGuard` on routes.
- Seed data: 3 projects (2 active, 1 inactive), 16 project-member relationships across 5 project roles.
- No project feature module, no project-scoped routes, no breadcrumbs, no project context selector.

The placeholder sidebar items (Module 1, Module 2) will be replaced with a "Projects" entry that leads to the project portfolio. Once a project is selected, the sidebar updates to show project-scoped navigation (Dashboard, Backlog, Board, Settings — placeholders for future features).

## eUI Components Used

| Component | Import | Purpose |
|-----------|--------|---------|
| `eui-page` / `eui-page-header` / `eui-page-content` | `EUI_PAGE` from `@eui/components/eui-page` | Page structure for portfolio and project pages |
| `eui-page-breadcrumb` | `EUI_PAGE` | Breadcrumb container inside pages |
| `eui-breadcrumb` / `eui-breadcrumb-item` | from `@eui/components/eui-breadcrumb` | Hierarchical navigation trail |
| `eui-app-breadcrumb` | from `@eui/components/layout` | App-level breadcrumb slot in the shell |
| `eui-table` / `eui-table-filter` | `EUI_TABLE` from `@eui/components/eui-table` | Project list table in portfolio |
| `eui-card` | from `@eui/components/eui-card` | Project cards (alternative to table, if available) |
| `euiButton` | from `@eui/components/eui-button` | Navigation actions |
| `EuiGrowlService` | from `@eui/core` | Error notifications |
| `EuiTemplateDirective` | from `@eui/components/directives` | Table templates |

---

## Execution Order

Stories must be implemented in this exact order. Each story depends on the previous one.

---

## STORY-001: Frontend — Project Service

### Goal
Create an Angular service that encapsulates HTTP calls to the project endpoints. This service is the single point of contact between frontend components and the project API.

### Frontend

1. Create `src/app/core/project/project.service.ts`:
   - `providedIn: 'root'`
   - Interfaces in `src/app/core/project/project.models.ts`:
     - `Project`: `id`, `key`, `name`, `description`, `created_by`, `created_at`, `updated_at`, `is_active`
     - `ProjectMember`: `id`, `projectId`, `userId`, `role`, `joined_at`
   - Methods:
     - `getProjects(): Observable<Project[]>` — calls `GET /api/projects` (already membership-filtered by backend)
     - `getProject(projectId: string): Observable<Project>` — calls `GET /api/projects/:projectId`
     - `getProjectMembers(projectId: string): Observable<ProjectMember[]>` — calls `GET /api/projects/:projectId/members`

2. Create barrel export `src/app/core/project/index.ts`.

3. Add unit tests with `HttpClientTestingModule`.

### Acceptance Criteria
- [ ] Service methods map correctly to backend endpoints
- [ ] All methods return typed Observables
- [ ] Unit tests cover all methods
- [ ] Build passes

---

## STORY-002: Frontend — Project Context Service

### Goal
Create a service that manages the currently selected project context. This is the single source of truth for "which project am I working in?" across the entire app.

### Frontend

1. Create `src/app/core/project/project-context.service.ts`:
   - `providedIn: 'root'`
   - State:
     - `currentProject$: BehaviorSubject<Project | null>` — reactive stream of the active project
     - `currentProject: Signal<Project | null>` — signal for template bindings (optional, if using signals)
   - Methods:
     - `setProject(project: Project): void` — sets the active project, persists project ID to `sessionStorage`
     - `clearProject(): void` — clears the active project and removes from `sessionStorage`
     - `getProjectId(): string | null` — returns the current project ID (synchronous)
     - `restoreProject(): Observable<Project | null>` — on app init, reads project ID from `sessionStorage` and fetches the project from the API. Returns `null` if no stored ID or fetch fails.
   - Persistence: store `selectedProjectId` in `sessionStorage` so the context survives page refreshes within the same browser tab.

2. Export from `src/app/core/project/index.ts`.

3. Add unit tests.

### Acceptance Criteria
- [ ] `setProject()` updates the BehaviorSubject and persists to sessionStorage
- [ ] `clearProject()` resets state and removes from sessionStorage
- [ ] `restoreProject()` fetches the project from API using stored ID
- [ ] `restoreProject()` returns null gracefully if no stored ID or API fails
- [ ] Unit tests cover all methods and edge cases
- [ ] Build passes

---

## STORY-003: Frontend — Project Portfolio Page

### Goal
Create a "Projects" page that lists all projects the user has access to. This is the entry point for project navigation.

### Frontend

1. Create `src/app/features/projects/portfolio/portfolio.component.ts`:
   - `eui-page` > `eui-page-header` (label "Projects") > `eui-page-content`
   - Table or card list showing accessible projects:
     - Columns/fields: Key, Name, Description, Your Role (looked up from project-members for the current user)
     - Each row/card is clickable → navigates to `screen/projects/:projectId`
   - Loading state while fetching
   - Empty state: "You don't have access to any projects." (or "No projects found." for SUPER_ADMIN)
   - Error state with retry

2. Create `src/app/features/projects/projects.routes.ts`:
   - `{ path: '', component: PortfolioComponent }`
   - `{ path: ':projectId', ... }` (placeholder for STORY-005)

3. Update `src/app/app.routes.ts`:
   - Add `{ path: 'screen/projects', loadChildren: () => import('./features/projects/projects.routes') }`

4. Update sidebar in `LayoutComponent`:
   - Replace "Module 1" and "Module 2" with `{ label: 'Projects', url: 'screen/projects' }`
   - Keep "Home" and "Users" (SUPER_ADMIN) entries

5. Accessibility:
   - `aria-label` on the table or list
   - `scope="col"` on headers, `data-col-label` on cells (if using table)
   - Clickable rows use `role="link"` or actual `<a>` elements for keyboard navigation
   - `aria-live="polite"` for result count

6. Unit tests.

### Acceptance Criteria
- [ ] Portfolio page lists all accessible projects
- [ ] SUPER_ADMIN sees all active projects
- [ ] Regular users see only projects they are members of
- [ ] Each project shows key, name, description, and user's role in that project
- [ ] Clicking a project navigates to `screen/projects/:projectId`
- [ ] Sidebar shows "Projects" entry instead of Module 1/Module 2
- [ ] Loading, empty, and error states handled
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-004: Frontend — Project Shell & Scoped Sidebar

### Goal
Create a project shell component that wraps all project-scoped pages. When a user enters a project context, the sidebar updates to show project-specific navigation items.

### Frontend

1. Create `src/app/features/projects/project-shell/project-shell.component.ts`:
   - Resolves the project from the `:projectId` route param on init
   - Calls `projectContextService.setProject(project)` to set the active context
   - On destroy (leaving project routes): calls `projectContextService.clearProject()`
   - Handles 404 (project not found) and 403 (no access) with growl + redirect to portfolio
   - Contains a `<router-outlet>` for child project pages

2. Update `LayoutComponent` to react to `projectContextService.currentProject$`:
   - When a project is active: show project-scoped sidebar items:
     - `{ label: '← All Projects', url: 'screen/projects' }` (back link)
     - `{ label: 'Dashboard', url: 'screen/projects/:projectId' }`
     - `{ label: 'Backlog', url: 'screen/projects/:projectId/backlog' }` (placeholder)
     - `{ label: 'Board', url: 'screen/projects/:projectId/board' }` (placeholder)
     - `{ label: 'Settings', url: 'screen/projects/:projectId/settings' }` (placeholder, PROJECT_ADMIN only)
   - When no project is active: show the default global sidebar (Home, Projects, Users)
   - Filter project sidebar items by project role using `permissionService.hasProjectRole()`

3. Update `projects.routes.ts`:
   - `{ path: ':projectId', component: ProjectShellComponent, children: [...] }`

4. Unit tests.

### Acceptance Criteria
- [ ] Entering a project route sets the project context
- [ ] Leaving project routes clears the project context
- [ ] Sidebar switches to project-scoped items when inside a project
- [ ] Sidebar reverts to global items when leaving a project
- [ ] "← All Projects" link navigates back to portfolio
- [ ] Settings item only visible to PROJECT_ADMIN (and SUPER_ADMIN)
- [ ] Invalid project ID shows error and redirects to portfolio
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-005: Frontend — Project Dashboard (Placeholder)

### Goal
Create a minimal project dashboard page that serves as the landing page when entering a project. This is a placeholder for future feature content.

### Frontend

1. Create `src/app/features/projects/dashboard/dashboard.component.ts`:
   - `eui-page` > `eui-page-header` (label: project name) > `eui-page-content`
   - Display project details: name, key, description, created date
   - Display team members count (from `projectService.getProjectMembers()`)
   - Placeholder cards for future widgets (e.g. "Recent Activity", "Open Tickets", "Sprint Progress")

2. Wire as default child route of `ProjectShellComponent`:
   - `{ path: '', component: DashboardComponent }`

3. Accessibility:
   - `eui-page` structure with proper heading
   - Semantic HTML for project info

4. Unit tests.

### Acceptance Criteria
- [ ] Dashboard shows project name, key, description
- [ ] Team member count is displayed
- [ ] Page uses `eui-page` structure
- [ ] Accessible heading hierarchy
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-006: Frontend — Breadcrumb Navigation

### Goal
Add breadcrumb navigation to project pages so users always know where they are in the hierarchy.

### Frontend

1. Create `src/app/core/project/breadcrumb.service.ts`:
   - `providedIn: 'root'`
   - Manages breadcrumb items reactively based on the current route and project context
   - Methods:
     - `setBreadcrumbs(items: BreadcrumbItem[]): void`
     - `breadcrumbs$: Observable<BreadcrumbItem[]>`
   - `BreadcrumbItem`: `{ label: string, link?: string | string[], icon?: string }`

2. Update `LayoutComponent` template to include `eui-app-breadcrumb`:
   ```html
   <eui-app-breadcrumb>
       <eui-breadcrumb>
           <eui-breadcrumb-item link="/" iconSvgName="home:outline" ariaLabel="Home" />
           @for (item of breadcrumbs; track item.label) {
               <eui-breadcrumb-item [link]="item.link" [label]="item.label" />
           }
       </eui-breadcrumb>
   </eui-app-breadcrumb>
   ```

3. Update project pages to set breadcrumbs:
   - Portfolio: `Home > Projects`
   - Dashboard: `Home > Projects > {Project Name}`
   - Future pages: `Home > Projects > {Project Name} > {Page Name}`

4. Accessibility:
   - `eui-breadcrumb` provides built-in `nav` landmark with ARIA
   - `ariaLabel="Home"` on the home icon item
   - Last item (current page) has no link

5. Unit tests.

### Acceptance Criteria
- [ ] Breadcrumbs show hierarchical path on all project pages
- [ ] Portfolio page: Home > Projects
- [ ] Dashboard page: Home > Projects > {Project Name}
- [ ] Breadcrumb links navigate correctly
- [ ] Home icon item has `ariaLabel`
- [ ] Current page (last item) is not linked
- [ ] Breadcrumbs update when navigating between pages
- [ ] All existing tests still pass
- [ ] Build passes

---

## STORY-007: Frontend — Session Persistence & Restore

### Goal
Ensure the project context survives page refreshes. When the user refreshes the browser, the app should restore the previously selected project and navigate back to the correct project-scoped page.

### Frontend

1. Update `LayoutComponent.ngOnInit()`:
   - After user profile is loaded, call `projectContextService.restoreProject()`
   - If a project is restored, update the sidebar to project-scoped items
   - If restore fails (project deleted, access revoked), clear sessionStorage silently

2. Update `ProjectShellComponent`:
   - On init, check if the project from the route param matches the stored context
   - If different, update the context (user navigated to a different project via URL)

3. Ensure route guards work correctly with restored context:
   - `authGuard` runs first (ensures user is logged in)
   - Project shell resolves the project (ensures access)
   - If access is denied after restore, redirect to portfolio with growl

4. Unit tests covering:
   - Refresh with valid stored project → context restored
   - Refresh with invalid/deleted project → context cleared, no error
   - Refresh with revoked access → context cleared, redirect to portfolio
   - No stored project → normal behavior

### Acceptance Criteria
- [ ] Page refresh preserves project context
- [ ] Sidebar shows correct items after refresh
- [ ] Breadcrumbs show correct path after refresh
- [ ] Invalid stored project is handled gracefully
- [ ] Revoked access is handled with redirect and growl
- [ ] All existing tests still pass
- [ ] Build passes

---

## Dependency Graph

```
STORY-001 (Project service)
    └── STORY-002 (Project context service)
            └── STORY-003 (Portfolio page + sidebar update)
                    └── STORY-004 (Project shell + scoped sidebar)
                            └── STORY-005 (Project dashboard placeholder)
                                    └── STORY-006 (Breadcrumb navigation)
                                            └── STORY-007 (Session persistence & restore)
```

## Technical Notes

- The backend project endpoints already exist from the RBAC branch — no new backend work is needed for this feature.
- `sessionStorage` is used instead of `localStorage` for project context because the context should be tab-scoped (different tabs can have different projects) and should not persist across browser sessions.
- The sidebar switching pattern (global vs project-scoped) is driven by `projectContextService.currentProject$`. The `LayoutComponent` subscribes and rebuilds the sidebar items array reactively.
- Project-scoped sidebar items (Backlog, Board, Settings) are placeholders — they route to simple placeholder components. Future features will replace them with real implementations.
- The "Settings" sidebar item is gated by project role (`PROJECT_ADMIN`) using `permissionService.hasProjectRole()`. SUPER_ADMIN bypasses this check (existing behavior in `PermissionService`).
- Breadcrumbs use the eUI `eui-app-breadcrumb` slot in the app shell (positioned below the toolbar, above content) combined with `eui-breadcrumb` / `eui-breadcrumb-item` components.
- The `BreadcrumbService` is a lightweight reactive service — it does not use Angular's router data or resolvers. Each page component explicitly sets its breadcrumbs on init. This keeps the breadcrumb logic simple and predictable.
- Module 1 and Module 2 sidebar entries are scaffolding placeholders from `eui-cli`. They will be removed in STORY-003 when the "Projects" entry is added.
