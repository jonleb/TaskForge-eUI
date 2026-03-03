# STORY-003: Frontend — Project Portfolio Page

## Goal

Create a "Projects" page that lists all projects the user has access to. This is the entry point for project navigation. Replace the placeholder Module 1/Module 2 sidebar entries with a "Projects" entry.

## Current State

- `ProjectService` exists (STORY-001) with `getProjects()` returning `Observable<Project[]>`.
- `ProjectContextService` exists (STORY-002) for managing active project state.
- Sidebar has placeholder entries: Home, Module 1 (with children page1/page2), Module 2, Users (SUPER_ADMIN).
- Routes include `screen/module1` and `screen/module2` pointing to scaffolding placeholder components.
- Backend `GET /api/projects` returns active projects filtered by membership (SUPER_ADMIN sees all).
- No `screen/projects` route exists yet.

## Analysis

### Page design

The portfolio page uses `eui-table` (consistent with the admin users page pattern) to display projects:

| Column | Field | Sortable | Notes |
|--------|-------|----------|-------|
| Key | `key` | No | Short project code (e.g. "TF") |
| Name | `name` | No | Full project name |
| Description | `description` | No | Project description |

The table is client-side (not async) since the project list is small (no pagination needed for the initial implementation). Each row is clickable and navigates to `screen/projects/:projectId`.

No "Your Role" column for now — the backend `GET /api/projects` doesn't return the user's role, and fetching members for each project would be N+1 calls. The user's role will be visible on the project dashboard (STORY-005).

### Row click navigation

eUI table doesn't have a built-in row click handler. Options:
1. Wrap each row in an `<a>` — breaks table semantics.
2. Add a "View" button/link column — explicit, accessible, no table semantics issues.
3. Use `(click)` on `<tr>` with `cursor: pointer` styling + keyboard support.

Option 2 is the most accessible: a dedicated "Open" link or button in an Actions column. This gives keyboard users a clear focusable target and screen readers a clear action. We'll use a text link (`<a>`) styled as an eUI button for each row.

### Sidebar update

Replace Module 1 and Module 2 with a single "Projects" entry:
```typescript
{ label: 'Projects', url: 'screen/projects' }
```

The Module 1 and Module 2 routes and components remain in the codebase (they're eUI scaffolding) but are no longer in the sidebar. They can be cleaned up in a future housekeeping task.

### Route structure

```
screen/projects          → PortfolioComponent (project list)
screen/projects/:projectId → (STORY-004: ProjectShellComponent with children)
```

For this story, only the portfolio route is wired. The `:projectId` route will be a placeholder redirect or 404 until STORY-004.

### Empty states

- No projects: "You don't have access to any projects yet." (for regular users) / "No projects found." (for SUPER_ADMIN — unlikely but possible)
- Error: "Could not load projects. Please try again." with a Retry button
- Loading: `[isLoading]="loading"` on the table

### File structure

```
src/app/features/projects/
├── portfolio/
│   ├── portfolio.component.ts
│   ├── portfolio.component.html
│   └── portfolio.component.spec.ts
└── projects.routes.ts
```

## Implementation Plan

1. Create `src/app/features/projects/portfolio/portfolio.component.ts`:
   - Standalone component with `OnPush` change detection
   - Inject `ProjectService`, `Router`, `ChangeDetectorRef`
   - On init: call `projectService.getProjects()`, store results
   - `loading`, `hasError` flags
   - `onOpenProject(project: Project)` → `router.navigate(['screen/projects', project.id])`
   - `loadProjects()` method with error handling and growl

2. Create `src/app/features/projects/portfolio/portfolio.component.html`:
   - `eui-page` > `eui-page-header` (label "Projects") > `eui-page-content`
   - `eui-table` with columns: Key, Name, Description, Actions
   - Actions column: `<a>` link "Open" per row navigating to the project
   - `noData` template with contextual message and retry button on error
   - `aria-label` on table, `scope="col"` on headers, `data-col-label` on cells

3. Create `src/app/features/projects/projects.routes.ts`:
   - `{ path: '', component: PortfolioComponent }`

4. Update `src/app/app.routes.ts`:
   - Add `{ path: 'screen/projects', loadChildren: () => import('./features/projects/projects.routes').then(m => m.PROJECTS_ROUTES) }`

5. Update `src/app/layout/layout.component.ts`:
   - Replace Module 1 and Module 2 sidebar entries with `{ label: 'Projects', url: 'screen/projects' }`

6. Create `src/app/features/projects/portfolio/portfolio.component.spec.ts`:
   - Test: component creates
   - Test: loads projects on init
   - Test: displays projects in table
   - Test: shows loading state
   - Test: shows error state with retry
   - Test: navigates to project on open click
   - Test: shows empty state when no projects

7. Verify build passes and all existing tests still pass.

## Accessibility

- `aria-label="List of accessible projects"` on the table
- `scope="col"` on all `<th>` elements
- `data-col-label` on all `<td>` elements
- "Open" link per row is keyboard-focusable and has `aria-label="Open {project name}"`
- `aria-live="polite"` on result count
- `eui-page` structure provides proper landmark regions

## Acceptance Criteria

- [ ] Portfolio page lists all accessible projects with Key, Name, Description columns
- [ ] SUPER_ADMIN sees all active projects
- [ ] Regular users see only projects they are members of
- [ ] Each project row has an "Open" action that navigates to `screen/projects/:projectId`
- [ ] Loading state shown while fetching
- [ ] Error state shows growl and retry button
- [ ] Empty state shows contextual message
- [ ] Sidebar shows "Projects" entry instead of Module 1/Module 2
- [ ] Route `screen/projects` is wired and lazy-loaded
- [ ] Table has `aria-label`, `scope="col"`, `data-col-label`
- [ ] "Open" links have `aria-label="Open {project name}"`
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`

## Files Changed

- `src/app/features/projects/portfolio/portfolio.component.ts` (new)
- `src/app/features/projects/portfolio/portfolio.component.html` (new)
- `src/app/features/projects/portfolio/portfolio.component.spec.ts` (new)
- `src/app/features/projects/projects.routes.ts` (new)
- `src/app/app.routes.ts` (add projects route)
- `src/app/layout/layout.component.ts` (replace sidebar entries)
- `src/app/layout/layout.component.spec.ts` (update sidebar tests if any)
