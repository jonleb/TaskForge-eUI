# STORY-004: Frontend — Search & Filter Bar

## Goal

Add search and filter controls above the backlog table: a text search field, a status filter toggle group, and a type filter toggle group. All filters are server-side, reset page to 1 on change, and follow the established pattern from Portfolio/Users pages.

## Existing Code

- `src/app/features/projects/backlog/backlog.component.ts` — async table from STORY-003 with `params`, `loadBacklog()`, `onSortChange()`, `onPageChange()`.
- `src/app/features/projects/portfolio/portfolio.component.ts` — reference: `eui-table-filter`, `eui-toggle-group`, `searchSubject`, `debounceTime(300)`, `onFilterChange`, `onStatusFilterChange`.
- `src/app/features/admin/users/users.component.ts` — reference: same pattern.

## Implementation Plan

### 1. Add search with debounce

```typescript
private readonly searchSubject = new Subject<string>();

// In ngOnInit:
this.searchSubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    takeUntil(this.destroy$),
).subscribe(q => {
    this.params = { ...this.params, q: q || undefined, _page: 1 };
    if (this.project) this.loadBacklog(this.project.id);
});

onFilterChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
}
```

### 2. Add status filter

```typescript
activeStatusFilter: 'all' | 'TO_DO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' = 'all';

onStatusFilterChange(item: EuiToggleGroupItemComponent): void {
    const filterMap: Record<string, typeof this.activeStatusFilter> = {
        'status-all': 'all',
        'status-todo': 'TO_DO',
        'status-inprogress': 'IN_PROGRESS',
        'status-inreview': 'IN_REVIEW',
        'status-done': 'DONE',
    };
    this.activeStatusFilter = filterMap[item.id] ?? 'all';
    this.params = {
        ...this.params,
        status: this.activeStatusFilter === 'all' ? undefined : this.activeStatusFilter,
        _page: 1,
    };
    if (this.project) this.loadBacklog(this.project.id);
}
```

### 3. Add type filter

```typescript
activeTypeFilter: 'all' | TicketType = 'all';

onTypeFilterChange(item: EuiToggleGroupItemComponent): void {
    const filterMap: Record<string, typeof this.activeTypeFilter> = {
        'type-all': 'all',
        'type-story': 'STORY',
        'type-bug': 'BUG',
        'type-task': 'TASK',
        'type-epic': 'EPIC',
    };
    this.activeTypeFilter = filterMap[item.id] ?? 'all';
    this.params = {
        ...this.params,
        type: this.activeTypeFilter === 'all' ? undefined : this.activeTypeFilter,
        _page: 1,
    };
    if (this.project) this.loadBacklog(this.project.id);
}
```

### 4. Template additions

```html
<!-- Filter bar -->
<div class="filter-bar eui-u-d-flex eui-u-align-items-center eui-u-gap-s eui-u-mb-m">
    <eui-table-filter
        [placeholder]="'backlog.search-placeholder' | translate"
        (filterChange)="onFilterChange($event)">
    </eui-table-filter>

    <eui-toggle-group [attr.aria-label]="'backlog.filter-status-label' | translate"
                      (itemClick)="onStatusFilterChange($event)">
        <eui-toggle-group-item id="status-all" [isChecked]="true">{{ 'common.all' | translate }}</eui-toggle-group-item>
        <eui-toggle-group-item id="status-todo">{{ 'workflow.status.TO_DO' | translate }}</eui-toggle-group-item>
        <eui-toggle-group-item id="status-inprogress">{{ 'workflow.status.IN_PROGRESS' | translate }}</eui-toggle-group-item>
        <eui-toggle-group-item id="status-inreview">{{ 'workflow.status.IN_REVIEW' | translate }}</eui-toggle-group-item>
        <eui-toggle-group-item id="status-done">{{ 'workflow.status.DONE' | translate }}</eui-toggle-group-item>
    </eui-toggle-group>

    <eui-toggle-group [attr.aria-label]="'backlog.filter-type-label' | translate"
                      (itemClick)="onTypeFilterChange($event)">
        <eui-toggle-group-item id="type-all" [isChecked]="true">{{ 'common.all' | translate }}</eui-toggle-group-item>
        <eui-toggle-group-item id="type-story">{{ 'workflow.ticket-type.STORY' | translate }}</eui-toggle-group-item>
        <eui-toggle-group-item id="type-bug">{{ 'workflow.ticket-type.BUG' | translate }}</eui-toggle-group-item>
        <eui-toggle-group-item id="type-task">{{ 'workflow.ticket-type.TASK' | translate }}</eui-toggle-group-item>
        <eui-toggle-group-item id="type-epic">{{ 'workflow.ticket-type.EPIC' | translate }}</eui-toggle-group-item>
    </eui-toggle-group>
</div>
```

### 5. Add imports

- `EUI_TOGGLE_GROUP`, `EuiToggleGroupItemComponent` from `@eui/components/eui-toggle-group`
- `EuiTableFilterComponent` (part of `EUI_TABLE`)
- `debounceTime`, `distinctUntilChanged` from `rxjs/operators`

### 6. SCSS

```scss
.filter-bar {
    flex-wrap: wrap;
}

// Override toggle group default width: 100%
::ng-deep eui-toggle-group {
    width: auto;
}
```

### 7. Add i18n keys

**en.json:**
```json
"backlog.search-placeholder": "Search tickets...",
"backlog.filter-status-label": "Filter by status",
"backlog.filter-type-label": "Filter by type"
```

**fr.json:**
```json
"backlog.search-placeholder": "Rechercher des tickets...",
"backlog.filter-status-label": "Filtrer par statut",
"backlog.filter-type-label": "Filtrer par type"
```

### 8. Unit tests (~8 new)

| # | Test | Expected |
|---|------|----------|
| 1 | Should render search filter | `eui-table-filter` present |
| 2 | Should render status toggle group | 5 toggle items |
| 3 | Should render type toggle group | 5 toggle items |
| 4 | Should call loadBacklog on search (after debounce) | Service called with `q` param |
| 5 | Should reset page to 1 on search | `params._page === 1` |
| 6 | Should call loadBacklog on status filter change | Service called with `status` param |
| 7 | Should call loadBacklog on type filter change | Service called with `type` param |
| 8 | Should clear status param when "All" selected | `params.status === undefined` |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Add search, status/type filter handlers, imports |
| `src/app/features/projects/backlog/backlog.component.html` | Add filter bar with search + toggle groups |
| `src/app/features/projects/backlog/backlog.component.scss` | Filter bar layout, toggle group width override |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Add ~8 tests |
| `src/assets/i18n/en.json` | Add 3 i18n keys |
| `src/assets/i18n/fr.json` | Add 3 i18n keys |

## Acceptance Criteria

- [ ] Text search field with placeholder, debounced 300ms
- [ ] Status toggle group: All / To Do / In Progress / In Review / Done
- [ ] Type toggle group: All / Story / Bug / Task / Epic
- [ ] All filters reset page to 1
- [ ] Filters are combinable (AND logic via server)
- [ ] Toggle groups have `aria-label` for accessibility
- [ ] Toggle group width overridden to `auto` (not 100%)
- [ ] All unit tests pass
- [ ] Build passes
