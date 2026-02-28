# STORY-004 — Frontend: Sprint list page with lifecycle actions

## Objective
New `SprintsComponent` displaying all project sprints grouped by status, with Start/Close lifecycle buttons.

## Route
- Add `{ path: 'sprints', component: SprintsComponent }` to `PROJECTS_ROUTES` children.
- Add "Sprints" entry to sidebar in `layout.component.ts` between Backlog and Board.

## Component: SprintsComponent
Location: `src/app/features/projects/sprints/sprints.component.ts`

### eUI components used
- `eui-page`, `eui-page-header`, `eui-page-header-action-items`, `eui-page-content`
- `eui-card` (collapsible) for each status group
- `eui-content-card` for each sprint
- `eui-chip` for status badge
- `eui-button` for Create Sprint, Start, Close actions
- `eui-icon-button` for edit sprint
- `eui-progress-bar` for loading
- `eui-feedback-message` for errors
- `eui-dialog` for create sprint dialog

### Layout
```
eui-page
  eui-page-header [label="Sprints"]
    eui-page-header-action-items
      [Create Sprint] button (if canManage)
  eui-page-content
    — Active Sprint section (eui-card collapsible, expanded by default)
      — sprint content-card(s) with Start/Close buttons
    — Planned Sprints section (eui-card collapsible, expanded)
      — sprint content-card(s)
    — Closed Sprints section (eui-card collapsible, collapsed by default)
      — sprint content-card(s)
```

### Sprint card content
- Header: sprint name + status chip
- Subtitle: goal (if any)
- Metadata: start_date – end_date, ticket count
- Footer action buttons:
  - PLANNED sprint: "Start Sprint" button
  - ACTIVE sprint: "Close Sprint" button
  - CLOSED sprint: no actions

### Permissions
- `canManage`: SUPER_ADMIN or PROJECT_ADMIN or PRODUCT_OWNER
- Read: all project members

### State
- `sprints: Sprint[]` — all sprints for the project
- `sprintTicketCounts: Map<string, number>` — ticket count per sprint (from backlog filtered by sprint_id)
- `isLoading`, `hasError`

### Data flow
1. On init, load sprints via `getSprints(projectId)`.
2. For each sprint, count tickets by filtering backlog with `sprint_id`.
3. Group sprints by status for display.

### a11y
- Collapsible cards use eui-card built-in a11y for expand/collapse.
- Status chips have `ariaLabel`.
- Action buttons have descriptive text (not icon-only).
- `aria-live="polite"` on sprint count.

## Unit tests
- Renders sprint list grouped by status
- Create Sprint button visible only for privileged roles
- Start Sprint calls updateSprintStatus with ACTIVE
- Close Sprint triggers close flow
- Loading and error states
