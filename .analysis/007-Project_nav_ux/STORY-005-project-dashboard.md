# STORY-005: Frontend — Project Dashboard (Placeholder)

## Goal

Replace the minimal dashboard placeholder (from STORY-004) with a proper project dashboard page that shows project details and team member count. This is the landing page when entering a project context.

## Current State

- `DashboardPlaceholderComponent` exists at `src/app/features/projects/dashboard-placeholder/dashboard-placeholder.component.ts`.
- It shows only the project name via `ProjectContextService.getCurrentProject()?.name` and a "coming soon" message.
- It's wired as the default child route of `ProjectShellComponent` in `projects.routes.ts`.
- `ProjectService.getProjectMembers(projectId)` exists and returns `ProjectMember[]`.
- `ProjectContextService` provides `currentProject$` and `getCurrentProject()`.
- No eUI card component exists in the library — we'll use semantic HTML (`<dl>`, `<section>`) inside `eui-page-content`.

## Analysis

### What the dashboard should display

1. **Project header**: project name via `eui-page-header`.
2. **Project details section**: key, description, created date — displayed in a definition list (`<dl>`/`<dt>`/`<dd>`) for semantic correctness and screen reader support.
3. **Team members count**: fetched via `projectService.getProjectMembers()`, displayed as a summary (e.g. "5 members"). The full member list is a future feature.
4. **Placeholder widget cards**: static sections hinting at future content (Recent Activity, Open Tickets, Sprint Progress). These are just visual placeholders — no data, no interactivity. Use `<section>` elements with headings.

### Component approach

Replace the existing `DashboardPlaceholderComponent` in-place. Rename the folder from `dashboard-placeholder` to `dashboard` and the component to `DashboardComponent` for clarity, since this is now the real dashboard (even if still minimal).

Actually, simpler: keep the existing file location and just enhance the component. Rename the class to `DashboardComponent` and update the route reference. This avoids unnecessary file moves.

Wait — even simpler: create the new `DashboardComponent` in a `dashboard/` folder and update the route. Delete the old placeholder. This is cleaner for the codebase going forward.

### Data flow

- `ProjectShellComponent` already sets the project context before child routes render.
- `DashboardComponent` reads the project from `ProjectContextService.getCurrentProject()`.
- Team members are fetched via `ProjectService.getProjectMembers(project.id)` in `ngOnInit`.
- Use `OnPush` change detection with `cdr.markForCheck()` after async data arrives.

### Edge cases

- Project context not yet set when dashboard renders (race condition) → subscribe to `currentProject$` and react when project arrives.
- `getProjectMembers()` fails → show "Unable to load team info" instead of count, no crash.

## Implementation Plan

1. Create `src/app/features/projects/dashboard/dashboard.component.ts`:
   - Inject `ProjectContextService`, `ProjectService`, `ChangeDetectorRef`
   - Subscribe to `projectContext.currentProject$` to get the project
   - Fetch members via `projectService.getProjectMembers(project.id)`
   - Store `memberCount` for display
   - Template: `eui-page` > `eui-page-header` > `eui-page-content` with:
     - Project details `<dl>` (Key, Description, Created)
     - Team members summary
     - Placeholder widget sections

2. Create `src/app/features/projects/dashboard/dashboard.component.html` (separate template file for readability).

3. Create `src/app/features/projects/dashboard/dashboard.component.scss` for layout styling (grid for placeholder widgets).

4. Update `src/app/features/projects/projects.routes.ts`:
   - Replace `DashboardPlaceholderComponent` import with `DashboardComponent`
   - Update the child route

5. Delete `src/app/features/projects/dashboard-placeholder/dashboard-placeholder.component.ts`.

6. Create `src/app/features/projects/dashboard/dashboard.component.spec.ts`:
   - Test: component creates
   - Test: displays project name in page header
   - Test: displays project key, description, created date
   - Test: fetches and displays member count
   - Test: handles member fetch error gracefully
   - Test: reacts to project context changes

7. Verify all tests pass and build succeeds.

## Files Changed

- `src/app/features/projects/dashboard/dashboard.component.ts` (new)
- `src/app/features/projects/dashboard/dashboard.component.html` (new)
- `src/app/features/projects/dashboard/dashboard.component.scss` (new)
- `src/app/features/projects/dashboard/dashboard.component.spec.ts` (new)
- `src/app/features/projects/projects.routes.ts` (update route)
- `src/app/features/projects/dashboard-placeholder/dashboard-placeholder.component.ts` (delete)

## Accessibility

- `eui-page` > `eui-page-header` provides the `<h1>` (project name)
- Project details use `<dl>` / `<dt>` / `<dd>` — semantic and screen-reader friendly
- Placeholder widget sections use `<h2>` headings — proper heading hierarchy
- `aria-live="polite"` on the member count region so screen readers announce when it loads
- No color-only information

## Acceptance Criteria

- [ ] Dashboard shows project name as page header
- [ ] Dashboard shows project key, description, and created date
- [ ] Team member count is fetched and displayed
- [ ] Member fetch error is handled gracefully (no crash, fallback message)
- [ ] Placeholder widget sections are visible with headings
- [ ] Page uses `eui-page` structure with proper heading hierarchy
- [ ] `aria-live="polite"` on dynamic content (member count)
- [ ] Old `DashboardPlaceholderComponent` is removed
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
