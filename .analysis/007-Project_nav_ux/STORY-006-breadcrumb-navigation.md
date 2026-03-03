# STORY-006: Frontend — Breadcrumb Navigation

## Goal

Add breadcrumb navigation to all project pages so users always know where they are in the hierarchy. Use the eUI `EuiBreadcrumbService` (from `@eui/components/eui-breadcrumb`) rather than building a custom service.

## Current State

- `LayoutComponent` has `eui-app` shell with toolbar and sidebar — no breadcrumb slot yet.
- `EUI_LAYOUT` from `@eui/components/layout` includes `eui-app-breadcrumb` (the shell slot).
- `EUI_BREADCRUMB` from `@eui/components/eui-breadcrumb` provides `eui-breadcrumb`, `eui-breadcrumb-item`, `EuiBreadcrumbService`, and `BreadCrumbItem`.
- `EuiBreadcrumbService` has `setBreadcrumb(items)`, `addCrumb(item)`, `removeCrumb()`, and `breadcrumbs$` observable.
- Pages: Portfolio (`screen/projects`), Dashboard (`screen/projects/:projectId`), Home (`screen/home`).
- No breadcrumbs exist anywhere in the app.

## Analysis

### Approach: eUI BreadcrumbService

The eUI library provides `EuiBreadcrumbService` which manages breadcrumb state reactively via `breadcrumbs$`. Each page component calls `service.setBreadcrumb([...])` on init to set its breadcrumb trail.

The `LayoutComponent` template adds the `<eui-app-breadcrumb>` slot containing a `<eui-breadcrumb>` that renders a static Home icon item plus the dynamic items from `service.breadcrumbs$ | async`.

### Breadcrumb trails per page

| Page | Trail |
|------|-------|
| Home | (empty — just the Home icon) |
| Portfolio | Home > Projects |
| Dashboard | Home > Projects > {Project Name} |
| Admin Users | Home > Users |

### Where to set breadcrumbs

Each page component sets its own breadcrumbs in `ngOnInit()` by calling `breadcrumbService.setBreadcrumb([...])`. This keeps the logic simple and co-located with the page.

- `HomeComponent`: `setBreadcrumb([])` — just the Home icon, no additional items.
- `PortfolioComponent`: `setBreadcrumb([{ id: 'projects', label: 'Projects', link: null }])` — last item has no link (current page).
- `DashboardComponent`: `setBreadcrumb([{ id: 'projects', label: 'Projects', link: '/screen/projects' }, { id: 'project', label: project.name, link: null }])`.
- `UsersComponent`: `setBreadcrumb([{ id: 'users', label: 'Users', link: null }])`.

### Layout template change

Add `<eui-app-breadcrumb>` inside `<eui-app>`, after the toolbar/sidebar:

```html
<eui-app-breadcrumb>
    <eui-breadcrumb>
        <eui-breadcrumb-item link="/screen/home" iconSvgName="eui-home" ariaLabel="Home"></eui-breadcrumb-item>
        @for (item of breadcrumbService.breadcrumbs$ | async; track item.id) {
            <eui-breadcrumb-item
                [id]="item.id"
                [link]="item.link"
                [label]="item.label">
            </eui-breadcrumb-item>
        }
    </eui-breadcrumb>
</eui-app-breadcrumb>
```

### Provider scope

`EuiBreadcrumbService` should be provided at the `LayoutComponent` level (in `providers`) so all child pages share the same instance. This ensures breadcrumbs persist across route changes within the layout.

### Edge cases

- Dashboard: project name comes from `ProjectContextService.currentProject$`. Need to wait for the project to be set before calling `setBreadcrumb`. Subscribe to `currentProject$` and update breadcrumbs when project changes.
- Navigating between projects: dashboard subscribes to `currentProject$`, so breadcrumbs update automatically.
- Home page: clear breadcrumbs (empty array) so only the Home icon shows.

## Implementation Plan

1. Update `src/app/layout/layout.component.ts`:
   - Add `EuiBreadcrumbService` to `providers`
   - Import `EUI_BREADCRUMB` from `@eui/components/eui-breadcrumb`
   - Inject `EuiBreadcrumbService` as public `breadcrumbService`
   - Import `AsyncPipe`

2. Update `src/app/layout/layout.component.html`:
   - Add `<eui-app-breadcrumb>` with `<eui-breadcrumb>` inside `<eui-app>`
   - Static Home icon item + `@for` loop over `breadcrumbService.breadcrumbs$ | async`

3. Update `src/app/features/projects/portfolio/portfolio.component.ts`:
   - Inject `EuiBreadcrumbService`
   - In `ngOnInit`: `setBreadcrumb([{ id: 'projects', label: 'Projects', link: null }])`

4. Update `src/app/features/projects/dashboard/dashboard.component.ts`:
   - Inject `EuiBreadcrumbService`
   - When project context arrives: `setBreadcrumb([{ id: 'projects', label: 'Projects', link: '/screen/projects' }, { id: 'project', label: project.name, link: null }])`

5. Update Home component (if it exists) to clear breadcrumbs.

6. Update `src/app/features/admin/users/users.component.ts`:
   - Inject `EuiBreadcrumbService`
   - In `ngOnInit`: `setBreadcrumb([{ id: 'users', label: 'Users', link: null }])`

7. Update tests:
   - `layout.component.spec.ts`: provide `EuiBreadcrumbService`, test breadcrumb slot renders
   - `portfolio.component.spec.ts`: verify `setBreadcrumb` called with correct items
   - `dashboard.component.spec.ts`: verify breadcrumbs update with project name
   - `users.component.spec.ts`: verify `setBreadcrumb` called

8. Verify all tests pass and build succeeds.

## Files Changed

- `src/app/layout/layout.component.ts` (add provider, import breadcrumb)
- `src/app/layout/layout.component.html` (add breadcrumb slot)
- `src/app/layout/layout.component.spec.ts` (provide service, add test)
- `src/app/features/projects/portfolio/portfolio.component.ts` (set breadcrumbs)
- `src/app/features/projects/portfolio/portfolio.component.spec.ts` (verify breadcrumbs)
- `src/app/features/projects/dashboard/dashboard.component.ts` (set breadcrumbs)
- `src/app/features/projects/dashboard/dashboard.component.spec.ts` (verify breadcrumbs)
- `src/app/features/admin/users/users.component.ts` (set breadcrumbs)
- `src/app/features/admin/users/users.component.spec.ts` (verify breadcrumbs)

## Accessibility

- `eui-app-breadcrumb` provides built-in `nav` landmark with ARIA
- `ariaLabel="Home"` on the Home icon item
- Last item (current page) has no link — not focusable, indicates current location
- `eui-breadcrumb` handles separators and keyboard navigation automatically
- Screen readers announce the navigation structure

## Acceptance Criteria

- [ ] Breadcrumb bar visible below toolbar on all pages
- [ ] Home icon links to `/screen/home`
- [ ] Portfolio page: Home > Projects (Projects not linked)
- [ ] Dashboard page: Home > Projects > {Project Name} (project name not linked)
- [ ] Admin Users page: Home > Users (Users not linked)
- [ ] Breadcrumbs update when navigating between projects
- [ ] Home page shows only the Home icon
- [ ] `ariaLabel="Home"` on Home icon item
- [ ] All existing tests still pass: `npm run test:ci`
- [ ] Build passes: `npx ng build --configuration=development`
