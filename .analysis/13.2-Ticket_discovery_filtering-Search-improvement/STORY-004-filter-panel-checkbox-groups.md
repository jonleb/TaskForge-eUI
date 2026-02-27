# STORY-004: Frontend — Filter Panel with Checkbox Groups

## Goal

Populate the collapsible filter column (left `eui-page-column` from STORY-003) with a search input and three collapsible `eui-card` sections containing `input[euiInputCheckBox]` groups for status, type, and priority. Multi-value selections are sent as comma-separated params to the backend.

## Existing Code

- `src/app/features/projects/backlog/backlog.component.ts` — fluid layout from STORY-003, `searchSubject` with `debounceTime(300)`, `loadBacklog()`, `params: BacklogListParams`, `isFilterCollapsed`.
- `src/app/features/projects/backlog/backlog.component.html` — collapsible `eui-page-column` with empty `eui-page-column-body` placeholder from STORY-003.
- `src/app/features/projects/portfolio/portfolio.component.ts` — reference for search pattern with `searchSubject`.

## Implementation Plan

### 1. Component class — State tracking

```typescript
// Multi-value filter state (replaces old single-value activeStatusFilter / activeTypeFilter)
selectedStatuses = new Set<WorkflowStatus>();
selectedTypes = new Set<TicketType>();
selectedPriorities = new Set<TicketPriority>();

// Checkbox model bindings
statusChecks: Record<WorkflowStatus, boolean> = {
    TO_DO: false, IN_PROGRESS: false, IN_REVIEW: false, DONE: false,
};
typeChecks: Record<TicketType, boolean> = {
    STORY: false, BUG: false, TASK: false, EPIC: false,
};
priorityChecks: Record<TicketPriority, boolean> = {
    CRITICAL: false, HIGH: false, MEDIUM: false, LOW: false,
};

onStatusCheckChange(): void {
    this.selectedStatuses.clear();
    for (const [key, checked] of Object.entries(this.statusChecks)) {
        if (checked) this.selectedStatuses.add(key as WorkflowStatus);
    }
    this.params = {
        ...this.params,
        status: this.selectedStatuses.size > 0
            ? [...this.selectedStatuses].join(',')
            : undefined,
        _page: 1,
    };
    if (this.project) this.loadBacklog(this.project.id);
}

onTypeCheckChange(): void {
    this.selectedTypes.clear();
    for (const [key, checked] of Object.entries(this.typeChecks)) {
        if (checked) this.selectedTypes.add(key as TicketType);
    }
    this.params = {
        ...this.params,
        type: this.selectedTypes.size > 0
            ? [...this.selectedTypes].join(',')
            : undefined,
        _page: 1,
    };
    if (this.project) this.loadBacklog(this.project.id);
}

onPriorityCheckChange(): void {
    this.selectedPriorities.clear();
    for (const [key, checked] of Object.entries(this.priorityChecks)) {
        if (checked) this.selectedPriorities.add(key as TicketPriority);
    }
    this.params = {
        ...this.params,
        priority: this.selectedPriorities.size > 0
            ? [...this.selectedPriorities].join(',')
            : undefined,
        _page: 1,
    };
    if (this.project) this.loadBacklog(this.project.id);
}
```

### 2. Template — Filter column body content

The filter content goes inside the `eui-page-column-body` of the collapsible filter column (from STORY-003). No `<aside>` wrapper needed — the `eui-page-column` itself provides the panel structure.

```html
<!-- Inside the collapsible eui-page-column's eui-page-column-body -->
<eui-page-column-body>

    <!-- Search -->
    <div class="eui-u-mb-m">
        <label euiLabel for="backlog-search">{{ 'backlog.filter.search-label' | translate }}</label>
        <input euiInputText id="backlog-search"
               [placeholder]="'backlog.search-placeholder' | translate"
               (input)="onFilterChange($event.target.value)" />
    </div>

    <!-- Status filter -->
    <eui-card [euiCollapsible]="true" [euiCollapsed]="false" euiNoShadow class="eui-u-mb-s">
        <eui-card-header>
            <eui-card-header-title>{{ 'backlog.filter.status-legend' | translate }}</eui-card-header-title>
        </eui-card-header>
        <eui-card-content>
            <fieldset class="filter-fieldset">
                <legend class="eui-u-sr-only">{{ 'backlog.filter.status-legend' | translate }}</legend>
                @for (s of workflowStatuses; track s) {
                    <div class="filter-checkbox eui-u-mb-2xs">
                        <input euiInputCheckBox
                               [id]="'status-' + s"
                               [(ngModel)]="statusChecks[s]"
                               (change)="onStatusCheckChange()" />
                        <label [for]="'status-' + s">{{ 'workflow.status.' + s | translate }}</label>
                    </div>
                }
            </fieldset>
        </eui-card-content>
    </eui-card>

    <!-- Type filter -->
    <eui-card [euiCollapsible]="true" [euiCollapsed]="false" euiNoShadow class="eui-u-mb-s">
        <eui-card-header>
            <eui-card-header-title>{{ 'backlog.filter.type-legend' | translate }}</eui-card-header-title>
        </eui-card-header>
        <eui-card-content>
            <fieldset class="filter-fieldset">
                <legend class="eui-u-sr-only">{{ 'backlog.filter.type-legend' | translate }}</legend>
                @for (t of ticketTypes; track t) {
                    <div class="filter-checkbox eui-u-mb-2xs">
                        <input euiInputCheckBox
                               [id]="'type-' + t"
                               [(ngModel)]="typeChecks[t]"
                               (change)="onTypeCheckChange()" />
                        <label [for]="'type-' + t">{{ 'workflow.ticket-type.' + t | translate }}</label>
                    </div>
                }
            </fieldset>
        </eui-card-content>
    </eui-card>

    <!-- Priority filter -->
    <eui-card [euiCollapsible]="true" [euiCollapsed]="false" euiNoShadow class="eui-u-mb-s">
        <eui-card-header>
            <eui-card-header-title>{{ 'backlog.filter.priority-legend' | translate }}</eui-card-header-title>
        </eui-card-header>
        <eui-card-content>
            <fieldset class="filter-fieldset">
                <legend class="eui-u-sr-only">{{ 'backlog.filter.priority-legend' | translate }}</legend>
                @for (p of priorities; track p) {
                    <div class="filter-checkbox eui-u-mb-2xs">
                        <input euiInputCheckBox
                               [id]="'priority-' + p"
                               [(ngModel)]="priorityChecks[p]"
                               (change)="onPriorityCheckChange()" />
                        <label [for]="'priority-' + p">{{ 'ticket.priority.' + p | translate }}</label>
                    </div>
                }
            </fieldset>
        </eui-card-content>
    </eui-card>

</eui-page-column-body>
```

### 3. Component class — Expose arrays for template iteration

```typescript
readonly workflowStatuses = WORKFLOW_STATUSES;   // ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE']
readonly ticketTypes = TICKET_TYPES;             // ['STORY', 'BUG', 'TASK', 'EPIC']
// priorities already exists from TICKET_PRIORITIES
```

### 4. Imports update

Add:
- `EUI_CARD` from `@eui/components/eui-card`
- `EUI_INPUT_CHECKBOX` from `@eui/components/eui-input-checkbox`

Keep:
- `EUI_INPUT_TEXT` (already imported)
- `FormsModule` (already imported for ngModel)

### 5. SCSS

```scss
.filter-fieldset {
    border: none;
    padding: 0;
    margin: 0;
}

.filter-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
```

### 6. i18n keys (EN + FR)

**en.json:**
```json
"backlog.filter.search-label": "Search",
"backlog.filter.status-legend": "Status",
"backlog.filter.type-legend": "Type",
"backlog.filter.priority-legend": "Priority"
```

**fr.json:**
```json
"backlog.filter.search-label": "Recherche",
"backlog.filter.status-legend": "Statut",
"backlog.filter.type-legend": "Type",
"backlog.filter.priority-legend": "Priorité"
```

## Unit Tests (~10 new)

| # | Test | Expected |
|---|------|----------|
| 1 | Should render search input in filter column | `input[euiInputText]` present in filter column body |
| 2 | Should render status checkbox group with 4 items | 4 checkboxes with correct labels |
| 3 | Should render type checkbox group with 4 items | 4 checkboxes with correct labels |
| 4 | Should render priority checkbox group with 4 items | 4 checkboxes with correct labels |
| 5 | Should call loadBacklog on search (after debounce) | Service called with `q` param |
| 6 | Should send multi-value status param when 2 checked | `params.status === 'TO_DO,IN_PROGRESS'` |
| 7 | Should send multi-value type param when 2 checked | `params.type === 'STORY,BUG'` |
| 8 | Should send multi-value priority param when 2 checked | `params.priority === 'HIGH,CRITICAL'` |
| 9 | Should reset page to 1 on any filter change | `params._page === 1` |
| 10 | Should clear param when all checkboxes unchecked | `params.status === undefined` |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Add checkbox state, handlers, expose arrays, add imports |
| `src/app/features/projects/backlog/backlog.component.html` | Populate filter column body with search + 3 collapsible cards |
| `src/app/features/projects/backlog/backlog.component.scss` | Fieldset reset, checkbox layout |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Add ~10 tests |
| `src/assets/i18n/en.json` | Add 4 filter i18n keys |
| `src/assets/i18n/fr.json` | Add 4 filter i18n keys |

## Acceptance Criteria

- [ ] Search input with label and placeholder in filter column body
- [ ] Search debounced 300ms, resets page to 1
- [ ] Status collapsible card with 4 checkboxes (To Do, In Progress, In Review, Done)
- [ ] Type collapsible card with 4 checkboxes (Story, Bug, Task, Epic)
- [ ] Priority collapsible card with 4 checkboxes (Critical, High, Medium, Low)
- [ ] Multiple checkboxes can be selected simultaneously within each group
- [ ] Multi-value params sent as comma-separated strings
- [ ] All filters reset page to 1 on change
- [ ] Unchecking all checkboxes clears the param (shows all)
- [ ] Each checkbox has associated `<label>` with `for`/`id` pair
- [ ] Each group wrapped in `<fieldset>` + `<legend>` (sr-only)
- [ ] Collapsible cards expand/collapse correctly within the filter column
- [ ] All unit tests pass
- [ ] Build passes
