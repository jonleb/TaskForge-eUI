# STORY-005 — Frontend: Create sprint dialog & sprint planning

## Objective
Create Sprint dialog for quick sprint creation. Sprint planning view for assigning/removing tickets.

## Create Sprint dialog
- Triggered from "Create Sprint" button in sprint list page header.
- `eui-dialog` with fields:
  - Name (required, euiInputText, 2–100 chars)
  - Goal (optional, euiTextArea, max 500 chars)
- On accept: call `createSprint()`, show growl, refresh list.
- On dismiss: reset form.

## Sprint planning
- Clicking a sprint card (PLANNED or ACTIVE) navigates to planning view.
- Route: `projects/:projectId/sprints/:sprintId` (lazy-loaded component).
- `SprintPlanningComponent` at `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.ts`

### Layout
```
eui-page
  eui-page-header [label="Sprint Planning: {sprint.name}"]
  eui-page-content
    eui-page-columns
      — Left column: "Available tickets" (backlog items with sprint_id=null)
        — List of content-cards with checkbox selection
        — "Add to sprint" button (assigns selected tickets)
      — Right column: "Sprint tickets" (backlog items with sprint_id=this sprint)
        — List of content-cards with remove button
```

### eUI components
- `eui-page-columns`, `eui-page-column`
- `eui-content-card` for ticket cards
- `eui-input-checkbox` for multi-select
- `eui-button` for "Add to sprint" / back navigation
- `eui-icon-button` for remove (icon: `eui-close`)
- `eui-chip` for ticket type/status badges
- `eui-progress-bar` for loading

### Permissions
- Only `canManage` users see add/remove controls.
- Read-only users see the sprint ticket list without controls.
- CLOSED sprints: read-only for everyone.

### a11y
- Checkbox labels include ticket number and title.
- Remove buttons have `aria-label="Remove {KEY}-{number} from sprint"`.
- `aria-live="polite"` on ticket counts.

## Unit tests
- Create dialog: form validation, successful creation, error handling
- Planning: loads available and sprint tickets
- Add tickets to sprint
- Remove ticket from sprint
- Read-only mode for non-privileged users
