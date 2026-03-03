# STORY-002: Filter Panel Refactoring

## Objective

Refactor the filter panel (left column) to match the new design: add a dynamic "Select filter" dropdown that shows/hides filter sections, simplify the search input, convert status to a dropdown, flatten type checkboxes (remove `eui-card` wrapper), convert priority to radio buttons (single-select with "All" default), remove Quick Filters entirely, and simplify Advanced Filters (remove `eui-card` wrapper, use section header with chevron toggle).

---

## Prerequisites

- STORY-001 completed (page header restructured).

---

## Modifications

### 1. Template — `src/app/features/tickets/tickets.component.html`

#### 1a. "Select filter" dropdown

Add a `select[euiSelect]` at the top of the filter column, above the search input. Options: Status, Type, Priority. Selecting an option toggles the visibility of that filter section. Multiple options can be selected (use a multi-select approach or repeated single-select with chips).

Implementation approach — use a `select[euiSelect]` with `(change)` that adds the selected dimension to a `visibleFilters` set, then resets the select value. Each filter section is guarded by `@if (visibleFilters.has('status'))` etc.

```html
<div class="eui-u-mb-m">
    <label euiLabel for="select-filter">{{ 'tickets.filter.select-filter' | translate }}</label>
    <select euiSelect id="select-filter"
            [ngModel]="filterDropdownValue"
            (ngModelChange)="onAddFilter($event)">
        <option [ngValue]="null">{{ 'tickets.filter.select-filter' | translate }}</option>
        @for (dim of availableFilterDimensions; track dim.value) {
            <option [ngValue]="dim.value">{{ dim.label | translate }}</option>
        }
    </select>
</div>
```

Each visible filter section gets a remove button (small `eui-icon-button` with `eui-close` icon) in its header to hide it again.

#### 1b. Search input — simplify

Remove the separate search button. Keep only the `input[euiInputText]` with placeholder. Search triggers on debounce (already implemented via `searchSubject`).

```html
<div class="eui-u-mb-m">
    <label euiLabel for="tickets-search">{{ 'tickets.filter.search-label' | translate }}</label>
    <input euiInputText id="tickets-search"
           [value]="searchValue"
           [placeholder]="'tickets.filter.search-filter-placeholder' | translate"
           (input)="onFilterChange($any($event.target).value)" />
</div>
```

Remove `onSearchSubmit()` method and the search button. Remove `.search-input-group` CSS class usage.

#### 1c. Status filter — dropdown

Replace the status checkbox group with a `select[euiSelect]`:

```html
@if (visibleFilters.has('status')) {
    <div class="eui-u-mb-m">
        <div class="eui-u-d-flex eui-u-align-items-center eui-u-flex-justify-content-between eui-u-mb-2xs">
            <label euiLabel for="filter-status">{{ 'tickets.filter.status-legend' | translate }}</label>
            <eui-icon-button icon="eui-close" size="s"
                             [ariaLabel]="'tickets.filter.remove-filter' | translate"
                             (buttonClick)="onRemoveFilter('status')">
            </eui-icon-button>
        </div>
        <select euiSelect id="filter-status"
                [(ngModel)]="selectedStatusValue"
                (ngModelChange)="onStatusSelectChange()">
            <option [ngValue]="null">{{ 'tickets.filter.all-statuses' | translate }}</option>
            @for (s of workflowStatuses; track s) {
                <option [ngValue]="s">{{ 'workflow.status.' + s | translate }}</option>
            }
        </select>
    </div>
}
```

Status is now single-select (one status at a time or "All"). This simplifies the filter model.

#### 1d. Type filter — flat checkboxes

Remove the `eui-card` wrapper. Use a flat `fieldset` with 2-column grid layout via eUI utility classes:

```html
@if (visibleFilters.has('type')) {
    <div class="eui-u-mb-m">
        <div class="eui-u-d-flex eui-u-align-items-center eui-u-flex-justify-content-between eui-u-mb-2xs">
            <legend class="eui-u-f-bold">{{ 'tickets.filter.type-legend' | translate }}</legend>
            <eui-icon-button icon="eui-close" size="s"
                             [ariaLabel]="'tickets.filter.remove-filter' | translate"
                             (buttonClick)="onRemoveFilter('type')">
            </eui-icon-button>
        </div>
        <fieldset class="eui-u-border-none eui-u-p-none eui-u-m-none">
            <legend class="eui-u-sr-only">{{ 'tickets.filter.type-legend' | translate }}</legend>
            <div class="eui-u-d-grid eui-u-grid-template-columns-2 eui-u-gap-xs">
                @for (t of ticketTypes; track t) {
                    <div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-xs">
                        <input euiInputCheckBox [id]="'type-' + t"
                               [(ngModel)]="typeChecks[t]"
                               (change)="onTypeCheckChange()" />
                        <label [for]="'type-' + t">{{ 'workflow.ticket-type.' + t | translate }}</label>
                    </div>
                }
            </div>
        </fieldset>
    </div>
}
```

Note: if `eui-u-d-grid` and `eui-u-grid-template-columns-2` are not available as eUI utility classes, use `eui-u-d-flex eui-u-flex-wrap` with items at 50% width, or a simple 2-column approach with `eui-u-d-flex eui-u-flex-wrap eui-u-gap-xs` and each item at `eui-u-flex-basis-50`.

#### 1e. Priority filter — radio buttons

Replace checkboxes with radio buttons using `input[euiInputRadio]`:

```html
@if (visibleFilters.has('priority')) {
    <div class="eui-u-mb-m">
        <div class="eui-u-d-flex eui-u-align-items-center eui-u-flex-justify-content-between eui-u-mb-2xs">
            <legend class="eui-u-f-bold">{{ 'tickets.filter.priority-legend' | translate }}</legend>
            <eui-icon-button icon="eui-close" size="s"
                             [ariaLabel]="'tickets.filter.remove-filter' | translate"
                             (buttonClick)="onRemoveFilter('priority')">
            </eui-icon-button>
        </div>
        <fieldset class="eui-u-border-none eui-u-p-none eui-u-m-none">
            <legend class="eui-u-sr-only">{{ 'tickets.filter.priority-legend' | translate }}</legend>
            <div class="eui-u-d-flex eui-u-flex-direction-column eui-u-gap-xs">
                <div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-xs">
                    <input euiInputRadio type="radio"
                           name="priority-filter" id="priority-all"
                           [value]="null"
                           [(ngModel)]="selectedPriority"
                           (ngModelChange)="onPriorityRadioChange()" />
                    <label for="priority-all">{{ 'tickets.filter.priority-all' | translate }}</label>
                </div>
                @for (p of priorities; track p) {
                    <div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-xs">
                        <input euiInputRadio type="radio"
                               name="priority-filter" [id]="'priority-' + p"
                               [value]="p"
                               [(ngModel)]="selectedPriority"
                               (ngModelChange)="onPriorityRadioChange()" />
                        <label [for]="'priority-' + p">{{ 'ticket.priority.' + p | translate }}</label>
                    </div>
                }
            </div>
        </fieldset>
    </div>
}
```

#### 1f. Quick Filters — remove

Delete the entire Quick Filters `eui-card` section from the template.

#### 1g. Advanced Filters — simplify

Replace the `eui-card` wrapper with a simple section header + chevron toggle:

```html
<div class="eui-u-mb-m">
    <button euiButton euiBasicButton euiSizeS type="button"
            class="eui-u-w-100"
            [attr.aria-expanded]="!isAdvancedCollapsed"
            (click)="isAdvancedCollapsed = !isAdvancedCollapsed">
        <span class="eui-u-d-flex eui-u-align-items-center eui-u-gap-xs">
            <eui-icon-svg [icon]="isAdvancedCollapsed ? 'caret-right:regular' : 'caret-down:regular'"
                          aria-hidden="true"></eui-icon-svg>
            {{ 'tickets.filter.advanced' | translate }}
        </span>
    </button>
    @if (!isAdvancedCollapsed) {
        <div class="eui-u-mt-s">
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
            <!-- Sprint select -->
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
        </div>
    }
</div>
```

Advanced filters are always visible (not controlled by "Select filter" dropdown) and collapsed by default.

### 2. Component — `src/app/features/tickets/tickets.component.ts`

#### New state properties

```ts
// Dynamic filter builder
visibleFilters = new Set<string>(); // 'status' | 'type' | 'priority'
filterDropdownValue: string | null = null;
availableFilterDimensions: { value: string; label: string }[] = [
    { value: 'status', label: 'tickets.filter.status-legend' },
    { value: 'type', label: 'tickets.filter.type-legend' },
    { value: 'priority', label: 'tickets.filter.priority-legend' },
];

// Priority — single-select radio
selectedPriority: TicketPriority | null = null;

// Status — single-select dropdown
selectedStatusValue: WorkflowStatus | null = null;

// Advanced filters collapse
isAdvancedCollapsed = true;
```

#### New methods

```ts
onAddFilter(dimension: string): void {
    if (dimension) {
        this.visibleFilters.add(dimension);
    }
    this.filterDropdownValue = null; // reset dropdown
}

onRemoveFilter(dimension: string): void {
    this.visibleFilters.delete(dimension);
    // Clear the filter value for the removed dimension
    switch (dimension) {
        case 'status':
            this.selectedStatusValue = null;
            this.onStatusSelectChange();
            break;
        case 'type':
            for (const t of this.ticketTypes) this.typeChecks[t] = false;
            this.onTypeCheckChange();
            break;
        case 'priority':
            this.selectedPriority = null;
            this.onPriorityRadioChange();
            break;
    }
}

onStatusSelectChange(): void {
    this.params = {
        ...this.params,
        status: this.selectedStatusValue || undefined,
        _page: 1,
    };
    this.loadTickets();
}

onPriorityRadioChange(): void {
    this.params = {
        ...this.params,
        priority: this.selectedPriority || undefined,
        _page: 1,
    };
    this.loadTickets();
}
```

#### Computed property `availableFilterDimensions`

Filter out dimensions already visible:

```ts
get availableFilterDimensions(): { value: string; label: string }[] {
    const all = [
        { value: 'status', label: 'tickets.filter.status-legend' },
        { value: 'type', label: 'tickets.filter.type-legend' },
        { value: 'priority', label: 'tickets.filter.priority-legend' },
    ];
    return all.filter(d => !this.visibleFilters.has(d.value));
}
```

#### Remove

- `assignedToMe` property
- `openSprintsChecked` property
- `onAssignedToMeChange()` method
- `onOpenSprintsChange()` method
- `onSearchSubmit()` method
- `statusChecks` record (replaced by `selectedStatusValue`)
- `selectedStatuses` set (replaced by `selectedStatusValue`)
- `onStatusCheckChange()` method (replaced by `onStatusSelectChange()`)
- `priorityChecks` record (replaced by `selectedPriority`)
- `selectedPriorities` set (replaced by `selectedPriority`)
- `onPriorityCheckChange()` method (replaced by `onPriorityRadioChange()`)

#### Update `activeFilterChips`

- Remove `assignedToMe` chip
- Remove `openSprintsChecked` chip
- Update status chip: single chip for `selectedStatusValue` instead of iterating `selectedStatuses`
- Update priority chip: single chip for `selectedPriority` instead of iterating `selectedPriorities`

#### Update `onChipRemove()`

- Remove `assignee` case
- Remove `sprint` case for `open` value
- Update `status` case: set `selectedStatusValue = null`, call `onStatusSelectChange()`
- Update `priority` case: set `selectedPriority = null`, call `onPriorityRadioChange()`

#### Update `clearAllFilters()`

- Remove `assignedToMe = false`
- Remove `openSprintsChecked = false`
- Set `selectedStatusValue = null`
- Set `selectedPriority = null`
- Clear `visibleFilters` set
- Keep type checkbox clearing

#### Add imports

```ts
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
```

Add `...EUI_INPUT_RADIO`, `...EUI_ICON_BUTTON` to `imports` array. Remove `...EUI_CARD` (no longer used in filter panel — check if used elsewhere first).

### 3. SCSS — `src/app/features/tickets/tickets.component.scss`

Remove:
- `.filter-fieldset` (replaced by eUI utility classes `eui-u-border-none eui-u-p-none eui-u-m-none`)
- `.filter-checkbox` (replaced by `eui-u-d-flex eui-u-align-items-center eui-u-gap-xs`)
- `.search-input-group` (search button removed, single input only)

Keep:
- `:host { display: block; }` (needed)
- `.empty-state` (still used in results area — will be addressed in STORY-004)
- `.card-link` (still used — will be addressed in STORY-004)
- `.dialog-form` (still used in create dialog)

### 4. Unit tests — `src/app/features/tickets/tickets.component.spec.ts`

New tests (~12):

| # | Test | Detail |
|---|------|--------|
| 1 | "Select filter" dropdown renders | Verify `select#select-filter` is present |
| 2 | Adding a filter shows the section | Call `onAddFilter('status')`, verify status dropdown appears |
| 3 | Removing a filter hides the section | Call `onRemoveFilter('status')`, verify status dropdown disappears |
| 4 | Removing a filter clears its value | Add status filter, select a value, remove filter, verify `selectedStatusValue` is null and API called |
| 5 | Status dropdown renders with all options | Add status filter, verify 4 status options + "All" |
| 6 | Status dropdown change triggers reload | Select a status, verify `params.status` updated and `loadTickets()` called |
| 7 | Type checkboxes render in flat layout | Add type filter, verify 4 checkboxes without `eui-card` wrapper |
| 8 | Priority radio buttons render | Add priority filter, verify 5 radio buttons (All + 4 priorities) |
| 9 | Priority radio is single-select | Select "High", verify `selectedPriority` is `'HIGH'` and API called with `priority=HIGH` |
| 10 | Quick Filters section removed | Verify no "Assigned to me" or "Open Sprints" checkboxes in DOM |
| 11 | Advanced filters toggle | Click advanced header, verify project/sprint selects appear |
| 12 | Search input has no button | Verify no search button, only input with placeholder |

Remove tests for:
- Quick Filters (Assigned to me, Open Sprints)
- Status checkboxes (replaced by dropdown)
- Priority checkboxes (replaced by radio)
- Search submit button

---

## eUI Components Used

| Component | Import | Usage |
|-----------|--------|-------|
| `select[euiSelect]` | already imported | "Select filter" dropdown, status dropdown |
| `input[euiInputRadio]` | `EUI_INPUT_RADIO` from `@eui/components/eui-input-radio` | Priority radio buttons |
| `input[euiInputCheckBox]` | already imported | Type checkboxes (kept) |
| `eui-icon-button` | `EUI_ICON_BUTTON` from `@eui/components/eui-icon-button` | Remove filter button, advanced toggle |
| `eui-icon-svg` | already imported | Chevron icon in advanced toggle |

---

## Accessibility

- `fieldset` + `legend` (screen-reader-only) for type checkboxes and priority radio groups.
- `label[for]` / `id` pairs on all inputs (search, status select, each checkbox, each radio).
- `aria-expanded` on advanced filters toggle button.
- `ariaLabel` on remove-filter icon buttons.
- Radio buttons use `name="priority-filter"` for native grouping — keyboard arrow keys navigate between options.
- "All" radio option is the default (no filter applied).

---

## i18n Keys (new)

| Key | EN | FR |
|-----|----|----|
| `tickets.filter.select-filter` | Select filter | Sélectionner un filtre |
| `tickets.filter.search-filter-placeholder` | Search tickets... | Rechercher des tickets... |
| `tickets.filter.all-statuses` | All statuses | Tous les statuts |
| `tickets.filter.priority-all` | All | Tous |
| `tickets.filter.remove-filter` | Remove filter | Supprimer le filtre |

---

## Acceptance Criteria

- [ ] "Select filter" dropdown renders at top of filter panel
- [ ] Selecting a dimension from dropdown shows the corresponding filter section
- [ ] Filter sections are hidden by default until added via dropdown
- [ ] Each visible filter section has a close/remove button
- [ ] Removing a filter section clears its value and reloads tickets
- [ ] Status filter is a single-select dropdown (not checkboxes)
- [ ] Type filter is flat checkboxes in 2-column layout (no `eui-card` wrapper)
- [ ] Priority filter is radio buttons with "All" default (single-select)
- [ ] Quick Filters section (Assigned to me, Open Sprints) is removed
- [ ] Advanced Filters use a chevron toggle (no `eui-card` wrapper)
- [ ] Search input has no separate button — debounce only
- [ ] Custom SCSS classes `.filter-fieldset`, `.filter-checkbox`, `.search-input-group` are removed
- [ ] All filter interactions trigger correct API calls
- [ ] Filter chips update correctly for new filter model
- [ ] "Clear all" resets all filters including visible filter sections
- [ ] All interactive elements reachable via keyboard
- [ ] `fieldset`/`legend` used for checkbox and radio groups
- [ ] Unit tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
