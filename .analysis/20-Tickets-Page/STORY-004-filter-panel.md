# STORY-004: Frontend — Filter Panel (Project, Assigned to me, Sprints, Status, Type, Priority)

## Objective

Implement the full filter panel in the Tickets page left column: Project select, "Assigned to me" checkbox, "Open Sprints" checkbox, Sprint select, and the standard status/type/priority checkbox groups. Include active filter chips above the results.

## Existing Code (reference)

- `src/app/features/projects/backlog/backlog.component.ts` — status/type/priority checkbox filter pattern with `Record<X, boolean>` state, `Set<X>` for selected values, chip generation, chip removal, clear all.
- `src/app/features/projects/backlog/backlog.component.html` — `eui-card` collapsible sections for each filter group, `eui-chip` for active filter chips.
- `src/app/features/tickets/tickets.component.ts` (from STORY-003) — the component to extend.
- `src/app/core/tickets/tickets.service.ts` (from STORY-002) — `getUserProjects()` for project dropdown.
- `src/app/core/project/project.service.ts` — `getSprints(projectId, status?)` for sprint dropdown.
- `src/app/core/auth/permission.service.ts` — `getUserId()` for "Assigned to me" filter.

## Implementation Plan

### 1. Update `src/app/features/tickets/tickets.component.ts`

Add filter state properties and methods:

**New properties:**
```typescript
// Project filter
userProjects: Project[] = [];          // loaded on init via getUserProjects()
selectedProjectId: string | null = null;

// Assigned to me
assignedToMe = false;

// Sprint filters
openSprintsChecked = false;
selectedSprintId: string | null = null;
availableSprints: Sprint[] = [];       // loaded when project changes

// Status/Type/Priority (same pattern as backlog)
readonly workflowStatuses = WORKFLOW_STATUSES;
readonly ticketTypes = TICKET_TYPES;
readonly priorities = TICKET_PRIORITIES;

statusChecks: Record<WorkflowStatus, boolean> = { TO_DO: false, IN_PROGRESS: false, IN_REVIEW: false, DONE: false };
typeChecks: Record<TicketType, boolean> = { STORY: false, BUG: false, TASK: false, EPIC: false };
priorityChecks: Record<TicketPriority, boolean> = { CRITICAL: false, HIGH: false, MEDIUM: false, LOW: false };

selectedStatuses = new Set<WorkflowStatus>();
selectedTypes = new Set<TicketType>();
selectedPriorities = new Set<TicketPriority>();
```

**New methods:**

- `onProjectChange()` — updates `params.project_id`, reloads sprints for the selected project (or clears sprints if no project), clears `selectedSprintId`, resets page to 1, reloads tickets.
- `onAssignedToMeChange()` — sets `params.assignee_id` to `permissionService.getUserId()` when checked, clears when unchecked, reloads.
- `onOpenSprintsChange()` — when checked: sets `params.sprint_id = 'open'`, clears `selectedSprintId`. When unchecked: clears `params.sprint_id`. Reloads.
- `onSprintChange()` — sets `params.sprint_id` to selected sprint ID, unchecks `openSprintsChecked`. Reloads.
- `onStatusCheckChange()` — same pattern as backlog.
- `onTypeCheckChange()` — same pattern as backlog.
- `onPriorityCheckChange()` — same pattern as backlog.
- `loadSprints(projectId)` — calls `projectService.getSprints(projectId)`, populates `availableSprints`.
- `clearAllFilters()` — resets all filter state, clears all params, reloads.

**Chip generation** (`get activeFilterChips()`):

Extends the backlog pattern with additional chip types:
- Project chip: `{ key: 'project', dimension: 'project', value: projectId, label: 'Project: {name}' }`
- Assigned to me chip: `{ key: 'assignee', dimension: 'assignee', value: 'me', label: 'Assigned to me' }`
- Open Sprints chip: `{ key: 'open-sprints', dimension: 'sprint', value: 'open', label: 'Open Sprints' }`
- Sprint chip: `{ key: 'sprint-{id}', dimension: 'sprint', value: sprintId, label: 'Sprint: {name}' }`
- Search, status, type, priority chips: same as backlog.

**Chip removal** (`onChipRemove(chip)`):

Extends backlog pattern:
- `project` → clear `selectedProjectId`, clear sprints, reload.
- `assignee` → uncheck `assignedToMe`, clear `params.assignee_id`, reload.
- `sprint` → if open sprints chip, uncheck `openSprintsChecked`; if specific sprint, clear `selectedSprintId`. Clear `params.sprint_id`, reload.
- `search`, `status`, `type`, `priority` → same as backlog.

### 2. Update `src/app/features/tickets/tickets.component.html`

The filter panel follows the eUI "Search filter" template pattern. Controls are organized into collapsible `eui-card` sections inside `<eui-page-column-body>`. The search input (from STORY-003) stays at the top, then the sections below:

```html
<!-- ── Search input is already at the top (from STORY-003) ── -->

<!-- Quick filters (collapsible eui-card section) -->
<eui-card [euiCollapsible]="true" [euiCollapsed]="false" euiNoShadow class="eui-u-mb-s">
    <eui-card-header>
        <eui-card-header-title>{{ 'tickets.filter.quick-filters' | translate }}</eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <fieldset class="filter-fieldset">
            <legend class="eui-u-sr-only">{{ 'tickets.filter.quick-filters' | translate }}</legend>
            <div class="filter-checkbox eui-u-mb-2xs">
                <input euiInputCheckBox id="assigned-to-me"
                       [(ngModel)]="assignedToMe"
                       (change)="onAssignedToMeChange()" />
                <label for="assigned-to-me">{{ 'tickets.filter.assigned-to-me' | translate }}</label>
            </div>
            <div class="filter-checkbox eui-u-mb-2xs">
                <input euiInputCheckBox id="open-sprints"
                       [(ngModel)]="openSprintsChecked"
                       (change)="onOpenSprintsChange()" />
                <label for="open-sprints">{{ 'tickets.filter.open-sprints' | translate }}</label>
            </div>
        </fieldset>
    </eui-card-content>
</eui-card>

<!-- Status filter (collapsible eui-card section) -->
<eui-card [euiCollapsible]="true" [euiCollapsed]="false" euiNoShadow class="eui-u-mb-s">
    <eui-card-header>
        <eui-card-header-title>{{ 'tickets.filter.status-legend' | translate }}</eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <fieldset class="filter-fieldset">
            <legend class="eui-u-sr-only">{{ 'tickets.filter.status-legend' | translate }}</legend>
            @for (s of workflowStatuses; track s) {
                <div class="filter-checkbox eui-u-mb-2xs">
                    <input euiInputCheckBox [id]="'status-' + s"
                           [(ngModel)]="statusChecks[s]"
                           (change)="onStatusCheckChange()" />
                    <label [for]="'status-' + s">{{ 'workflow.status.' + s | translate }}</label>
                </div>
            }
        </fieldset>
    </eui-card-content>
</eui-card>

<!-- Type filter (collapsible eui-card section) -->
<eui-card [euiCollapsible]="true" [euiCollapsed]="false" euiNoShadow class="eui-u-mb-s">
    <eui-card-header>
        <eui-card-header-title>{{ 'tickets.filter.type-legend' | translate }}</eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <fieldset class="filter-fieldset">
            <legend class="eui-u-sr-only">{{ 'tickets.filter.type-legend' | translate }}</legend>
            @for (t of ticketTypes; track t) {
                <div class="filter-checkbox eui-u-mb-2xs">
                    <input euiInputCheckBox [id]="'type-' + t"
                           [(ngModel)]="typeChecks[t]"
                           (change)="onTypeCheckChange()" />
                    <label [for]="'type-' + t">{{ 'workflow.ticket-type.' + t | translate }}</label>
                </div>
            }
        </fieldset>
    </eui-card-content>
</eui-card>

<!-- Priority filter (collapsible eui-card section) -->
<eui-card [euiCollapsible]="true" [euiCollapsed]="false" euiNoShadow class="eui-u-mb-s">
    <eui-card-header>
        <eui-card-header-title>{{ 'tickets.filter.priority-legend' | translate }}</eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <fieldset class="filter-fieldset">
            <legend class="eui-u-sr-only">{{ 'tickets.filter.priority-legend' | translate }}</legend>
            @for (p of priorities; track p) {
                <div class="filter-checkbox eui-u-mb-2xs">
                    <input euiInputCheckBox [id]="'priority-' + p"
                           [(ngModel)]="priorityChecks[p]"
                           (change)="onPriorityCheckChange()" />
                    <label [for]="'priority-' + p">{{ 'ticket.priority.' + p | translate }}</label>
                </div>
            }
        </fieldset>
    </eui-card-content>
</eui-card>

<!-- Advanced filter (collapsible eui-card section, collapsed by default) -->
<eui-card [euiCollapsible]="true" [euiCollapsed]="true" euiNoShadow class="eui-u-mb-s">
    <eui-card-header>
        <eui-card-header-title>{{ 'tickets.filter.advanced' | translate }}</eui-card-header-title>
    </eui-card-header>
    <eui-card-content>
        <!-- Project select -->
        <div class="eui-u-mb-m">
            <label euiLabel for="tickets-project">{{ 'tickets.filter.project-label' | translate }}</label>
            <select euiSelect id="tickets-project"
                    [(ngModel)]="selectedProjectId"
                    (change)="onProjectChange()">
                <option [ngValue]="null">{{ 'tickets.filter.select-project' | translate }}</option>
                @for (p of userProjects; track p.id) {
                    <option [ngValue]="p.id">{{ p.name }}</option>
                }
            </select>
        </div>

        <!-- Sprint select (disabled when no project selected) -->
        <div class="eui-u-mb-m">
            <label euiLabel for="tickets-sprint">{{ 'tickets.filter.sprint-label' | translate }}</label>
            <select euiSelect id="tickets-sprint"
                    [(ngModel)]="selectedSprintId"
                    [disabled]="!selectedProjectId"
                    (change)="onSprintChange()">
                <option [ngValue]="null">{{ 'tickets.filter.select-sprint' | translate }}</option>
                @for (s of availableSprints; track s.id) {
                    <option [ngValue]="s.id">{{ s.name }}</option>
                }
            </select>
        </div>
    </eui-card-content>
</eui-card>
```

Add active filter chips section above results in the right column (same pattern as backlog):
```html
@if (hasActiveFilters) {
    <section class="eui-u-d-flex eui-u-align-items-center eui-u-flex-wrap eui-u-gap-xs eui-u-mb-m"
             [attr.aria-label]="'tickets.selected-filters' | translate">
        <span class="eui-u-f-s">{{ 'tickets.selected-filters' | translate }}:</span>
        @for (chip of activeFilterChips; track chip.key) {
            <eui-chip euiSizeS [isChipRemovable]="true" [ariaLabel]="chip.label" (remove)="onChipRemove(chip)">
                {{ chip.label }}
            </eui-chip>
        }
        <button euiButton euiSecondary euiSizeS type="button" (click)="clearAllFilters()">
            {{ 'tickets.clear-all' | translate }}
        </button>
    </section>
}
```

### 3. Unit tests: update `tickets.component.spec.ts`

Add ~20 tests for filter functionality:

| # | Test | Expected |
|---|------|----------|
| 1 | Project select populated with user projects | Options rendered |
| 2 | Selecting a project reloads tickets with `project_id` | `getTickets()` called with param |
| 3 | Selecting a project loads sprints | `getSprints()` called |
| 4 | Clearing project clears sprints and sprint selection | Sprint select reset |
| 5 | "Assigned to me" sets `assignee_id` param | `getTickets()` called with user ID |
| 6 | Unchecking "Assigned to me" clears `assignee_id` | Param removed |
| 7 | "Open Sprints" sets `sprint_id=open` | Correct param |
| 8 | "Open Sprints" clears specific sprint selection | `selectedSprintId` null |
| 9 | Selecting a sprint unchecks "Open Sprints" | `openSprintsChecked` false |
| 10 | Sprint select disabled when no project selected | `disabled` attribute present |
| 11 | Status checkboxes update params | Comma-separated status param |
| 12 | Type checkboxes update params | Comma-separated type param |
| 13 | Priority checkboxes update params | Comma-separated priority param |
| 14 | Active filter chips generated | Chips for each active filter |
| 15 | Chip removal clears corresponding filter | Filter state reset |
| 16 | "Clear all" resets all filters | All state cleared |
| 17 | All filters reset page to 1 | `_page: 1` in params |
| 18 | Project chip shows project name | Correct label |
| 19 | Sprint chip shows sprint name | Correct label |
| 20 | "Assigned to me" chip shows correct label | Translated label |

## Files Modified

| File | Modification |
|------|----|
| `src/app/features/tickets/tickets.component.ts` | Add filter state, methods, chip logic |
| `src/app/features/tickets/tickets.component.html` | Add filter controls + chips section |
| `src/app/features/tickets/tickets.component.spec.ts` | Add ~20 filter tests |

## Accessibility Checklist

- [x] All filter inputs have associated `<label>` with `for`/`id` pairs
- [x] Filter groups use `<fieldset>` + `<legend>` (sr-only) for status/type/priority
- [x] Chips have `ariaLabel` and are removable via keyboard
- [x] Sprint select has `disabled` attribute when no project (not just visual)
- [x] Filter chips section has `aria-label`
- [x] "Clear all" button is keyboard accessible

## Acceptance Criteria

- [ ] Project select lists user's accessible projects
- [ ] "Assigned to me" checkbox filters by current user's ID
- [ ] "Open Sprints" checkbox filters tickets in ACTIVE sprints
- [ ] Sprint select loads sprints from selected project
- [ ] Sprint select disabled when no project selected
- [ ] "Open Sprints" and Sprint select are mutually exclusive
- [ ] Status, Type, Priority checkbox groups work as in backlog
- [ ] Active filter chips displayed above results with "Clear all" button
- [ ] Chip removal updates corresponding filter
- [ ] All filters reset page to 1
- [ ] All a11y criteria met
- [ ] Unit tests pass (~20 new tests)
- [ ] Build passes
