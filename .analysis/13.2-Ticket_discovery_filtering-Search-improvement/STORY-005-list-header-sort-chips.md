# STORY-005: Frontend — List Header, Sort Dropdown & Criteria Chips

## Goal

Add a list header area above the card list with a result count, a sort `<select euiSelect>` dropdown (replacing the old table column sort), and selected-criteria chips (`eui-chip` with `[isChipRemovable]="true"`) with a "Clear all" action.

## Existing Code

- `src/app/features/projects/backlog/backlog.component.ts` — fluid layout from STORY-003, checkbox filters from STORY-004, `params`, `loadBacklog()`, `selectedStatuses`, `selectedTypes`, `selectedPriorities`, `statusChecks`, `typeChecks`, `priorityChecks`, `isFilterCollapsed`.
- `src/app/features/projects/backlog/backlog.component.html` — result count `<p aria-live="polite">` and card list in the results column (`eui-page-column-body` of the right column).

## Implementation Plan

### 1. Sort dropdown

Replace the old `onSortChange(sort: Sort[])` (removed in STORY-003) with a `<select euiSelect>` dropdown.

```typescript
// Sort options
readonly sortOptions = [
    { label: 'backlog.sort.ticket-desc', sort: 'ticket_number', order: 'desc' as const },
    { label: 'backlog.sort.ticket-asc', sort: 'ticket_number', order: 'asc' as const },
    { label: 'backlog.sort.title-asc', sort: 'title', order: 'asc' as const },
    { label: 'backlog.sort.title-desc', sort: 'title', order: 'desc' as const },
    { label: 'backlog.sort.priority', sort: 'priority', order: 'asc' as const },
    { label: 'backlog.sort.status', sort: 'status', order: 'asc' as const },
];
selectedSortIndex = 0; // default: ticket_number desc

onSortSelectChange(): void {
    const opt = this.sortOptions[this.selectedSortIndex];
    this.params = {
        ...this.params,
        _sort: opt.sort,
        _order: opt.order,
        _page: 1,
    };
    if (this.project) this.loadBacklog(this.project.id);
}
```

### 2. Selected criteria chips

Build a computed list of active filter chips for display:

```typescript
get activeFilterChips(): Array<{ key: string; dimension: string; value: string; label: string }> {
    const chips: Array<{ key: string; dimension: string; value: string; label: string }> = [];

    if (this.params.q) {
        chips.push({
            key: 'q',
            dimension: 'search',
            value: this.params.q,
            label: this.translate.instant('backlog.chip.search', { term: this.params.q }),
        });
    }

    for (const s of this.selectedStatuses) {
        chips.push({
            key: `status-${s}`,
            dimension: 'status',
            value: s,
            label: this.translate.instant('backlog.chip.status', {
                value: this.translate.instant('workflow.status.' + s),
            }),
        });
    }

    for (const t of this.selectedTypes) {
        chips.push({
            key: `type-${t}`,
            dimension: 'type',
            value: t,
            label: this.translate.instant('backlog.chip.type', {
                value: this.translate.instant('workflow.ticket-type.' + t),
            }),
        });
    }

    for (const p of this.selectedPriorities) {
        chips.push({
            key: `priority-${p}`,
            dimension: 'priority',
            value: p,
            label: this.translate.instant('backlog.chip.priority', {
                value: this.translate.instant('ticket.priority.' + p),
            }),
        });
    }

    return chips;
}

get hasActiveFilters(): boolean {
    return this.activeFilterChips.length > 0;
}
```

### 3. Chip removal

```typescript
onChipRemove(chip: { key: string; dimension: string; value: string }): void {
    switch (chip.dimension) {
        case 'search':
            this.params = { ...this.params, q: undefined, _page: 1 };
            // Also clear the search input value (need ViewChild or model binding)
            break;
        case 'status':
            this.statusChecks[chip.value as WorkflowStatus] = false;
            this.onStatusCheckChange();
            return; // onStatusCheckChange already reloads
        case 'type':
            this.typeChecks[chip.value as TicketType] = false;
            this.onTypeCheckChange();
            return;
        case 'priority':
            this.priorityChecks[chip.value as TicketPriority] = false;
            this.onPriorityCheckChange();
            return;
    }
    if (this.project) this.loadBacklog(this.project.id);
}
```

### 4. Clear all

```typescript
clearAllFilters(): void {
    // Reset search
    this.params = { ...this.params, q: undefined, _page: 1 };
    this.searchValue = '';

    // Reset checkboxes
    for (const key of Object.keys(this.statusChecks)) {
        this.statusChecks[key as WorkflowStatus] = false;
    }
    for (const key of Object.keys(this.typeChecks)) {
        this.typeChecks[key as TicketType] = false;
    }
    for (const key of Object.keys(this.priorityChecks)) {
        this.priorityChecks[key as TicketPriority] = false;
    }

    // Clear Sets
    this.selectedStatuses.clear();
    this.selectedTypes.clear();
    this.selectedPriorities.clear();

    // Clear params
    this.params = {
        ...this.params,
        status: undefined,
        type: undefined,
        priority: undefined,
    };

    // Reset sort to default
    this.selectedSortIndex = 0;
    this.params = {
        ...this.params,
        _sort: 'ticket_number',
        _order: 'desc',
    };

    if (this.project) this.loadBacklog(this.project.id);
}
```

### 5. Template — List header

Insert above the card list, inside the results column's `eui-page-column-body`:

```html
<!-- List header -->
<div class="list-header eui-u-d-flex eui-u-align-items-center eui-u-flex-justify-content-between eui-u-mb-s">
    <p aria-live="polite" class="eui-u-f-m">
        {{ 'backlog.results-found' | translate:{ total: total } }}
    </p>

    <div class="eui-u-d-flex eui-u-align-items-center eui-u-gap-s">
        <label euiLabel for="sort-select" class="eui-u-f-s">{{ 'backlog.sort-label' | translate }}</label>
        <select euiSelect id="sort-select"
                [(ngModel)]="selectedSortIndex"
                (change)="onSortSelectChange()">
            @for (opt of sortOptions; track opt.label; let i = $index) {
                <option [ngValue]="i">{{ opt.label | translate }}</option>
            }
        </select>
    </div>
</div>

<!-- Selected criteria chips -->
@if (hasActiveFilters) {
    <div class="criteria-bar eui-u-d-flex eui-u-align-items-center eui-u-flex-wrap eui-u-gap-xs eui-u-mb-m">
        <span class="eui-u-f-s">{{ 'backlog.selected-filters' | translate }}:</span>
        <eui-chip-list [attr.aria-label]="'backlog.selected-filters' | translate">
            @for (chip of activeFilterChips; track chip.key) {
                <eui-chip euiSizeS
                          [isChipRemovable]="true"
                          [ariaLabel]="chip.label"
                          (remove)="onChipRemove(chip)">
                    {{ chip.label }}
                </eui-chip>
            }
        </eui-chip-list>
        <button euiButton euiBasicButton euiSecondary euiSizeS
                type="button"
                (click)="clearAllFilters()">
            {{ 'backlog.clear-all' | translate }}
        </button>
    </div>
}
```

### 6. Imports update

Add (if not already present):
- `EUI_CHIP` from `@eui/components/eui-chip` (chip + chip-list)

### 7. i18n keys (EN + FR)

**en.json:**
```json
"backlog.results-found": "{{total}} results found",
"backlog.sort-label": "Sort by",
"backlog.sort.ticket-desc": "Ticket # (newest)",
"backlog.sort.ticket-asc": "Ticket # (oldest)",
"backlog.sort.title-asc": "Title (A–Z)",
"backlog.sort.title-desc": "Title (Z–A)",
"backlog.sort.priority": "Priority",
"backlog.sort.status": "Status",
"backlog.chip.search": "Search: {{term}}",
"backlog.chip.status": "Status: {{value}}",
"backlog.chip.type": "Type: {{value}}",
"backlog.chip.priority": "Priority: {{value}}",
"backlog.clear-all": "Clear all",
"backlog.selected-filters": "Selected filters"
```

**fr.json:**
```json
"backlog.results-found": "{{total}} résultats trouvés",
"backlog.sort-label": "Trier par",
"backlog.sort.ticket-desc": "Ticket n° (récent)",
"backlog.sort.ticket-asc": "Ticket n° (ancien)",
"backlog.sort.title-asc": "Titre (A–Z)",
"backlog.sort.title-desc": "Titre (Z–A)",
"backlog.sort.priority": "Priorité",
"backlog.sort.status": "Statut",
"backlog.chip.search": "Recherche : {{term}}",
"backlog.chip.status": "Statut : {{value}}",
"backlog.chip.type": "Type : {{value}}",
"backlog.chip.priority": "Priorité : {{value}}",
"backlog.clear-all": "Tout effacer",
"backlog.selected-filters": "Filtres sélectionnés"
```

## Unit Tests (~10 new)

| # | Test | Expected |
|---|------|----------|
| 1 | Should render result count | "X results found" text present |
| 2 | Should render sort dropdown with 6 options | `select[euiSelect]` with 6 `<option>` |
| 3 | Should call loadBacklog on sort change | Service called with updated `_sort`/`_order` |
| 4 | Should reset page to 1 on sort change | `params._page === 1` |
| 5 | Should render criteria chips for active status filters | Chips with "Status: To Do" etc. |
| 6 | Should render criteria chips for active type filters | Chips with "Type: Story" etc. |
| 7 | Should render criteria chip for search term | Chip with "Search: login" |
| 8 | Should remove status filter when chip removed | Checkbox unchecked, param updated, reload |
| 9 | Should show "Clear all" only when filters active | Button visible/hidden correctly |
| 10 | Should reset all filters on "Clear all" | All checkboxes unchecked, params reset, reload |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Add sort options, selectedSortIndex, onSortSelectChange, activeFilterChips, onChipRemove, clearAllFilters |
| `src/app/features/projects/backlog/backlog.component.html` | Add list header with count + sort + chips + clear all |
| `src/app/features/projects/backlog/backlog.component.scss` | List header layout, criteria bar styles |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Add ~10 tests |
| `src/assets/i18n/en.json` | Add 14 i18n keys |
| `src/assets/i18n/fr.json` | Add 14 i18n keys |

## Acceptance Criteria

- [ ] Result count "X results found" with `aria-live="polite"`
- [ ] Sort dropdown with label, 6 options, triggers reload on change
- [ ] Sort resets page to 1
- [ ] Criteria chips appear for each active filter (status, type, priority, search)
- [ ] Removing a chip unchecks the corresponding checkbox and reloads
- [ ] Removing search chip clears the search input
- [ ] "Clear all" button visible only when filters are active
- [ ] "Clear all" resets all checkboxes, search, sort to defaults
- [ ] Sort dropdown has associated `<label>` with `for`/`id`
- [ ] Chip list has `aria-label`
- [ ] All unit tests pass
- [ ] Build passes
