# STORY-003: Frontend — Async Table with Sorting & Pagination

## Goal

Refactor `BacklogComponent` from a static table loading all items to an async `eui-table` with server-side sorting and pagination. Follow the established pattern from `PortfolioComponent` and `UsersComponent`.

## Existing Code

- `src/app/features/projects/backlog/backlog.component.ts` — static table, loads all items, client-side sort by `ticket_number desc`.
- `src/app/features/projects/backlog/backlog.component.html` — `<table eui-table>` with `<thead>/<tbody>` (not async mode).
- `src/app/features/projects/portfolio/portfolio.component.ts` — reference: async table with `params`, `total`, `paginatorReady`, `onSortChange`, `onPageChange`, `loadProjects`.
- `src/app/features/admin/users/users.component.ts` — reference: same pattern with `loadUsers`.

## Implementation Plan

### 1. Update component class

Replace the current `items` array + `loadItems()` with the async pattern:

```typescript
// New properties
items: BacklogItem[] = [];
total = 0;
params: BacklogListParams = {
    _page: 1,
    _limit: 10,
    _sort: 'ticket_number',
    _order: 'desc',
};
private paginatorReady = false;

// Implement AfterViewInit
ngAfterViewInit(): void {
    this.paginatorReady = true;
}

// Replace loadItems with loadBacklog
loadBacklog(projectId: string): void {
    this.isLoading = true;
    this.hasError = false;
    this.cdr.markForCheck();

    this.projectService.getBacklog(projectId, this.params).pipe(
        takeUntil(this.destroy$),
    ).subscribe({
        next: res => {
            this.items = res.data;
            this.total = res.total;
            this.isLoading = false;
            this.cdr.markForCheck();
            this.loadAssignees(projectId);
        },
        error: () => {
            this.items = [];
            this.total = 0;
            this.hasError = true;
            this.isLoading = false;
            this.cdr.markForCheck();
        },
    });
}

// Sort handler
onSortChange(sort: Sort[]): void {
    if (sort.length > 0) {
        this.params = {
            ...this.params,
            _sort: sort[0].sort,
            _order: sort[0].order.toLowerCase() as 'asc' | 'desc',
            _page: 1,
        };
    }
    if (this.project) this.loadBacklog(this.project.id);
}

// Page handler
onPageChange(event: { page: number; pageSize: number }): void {
    if (!this.paginatorReady) return;
    this.params = {
        ...this.params,
        _page: event.page + 1,
        _limit: event.pageSize,
    };
    if (this.project) this.loadBacklog(this.project.id);
}
```

### 2. Update template

Switch from static `<table eui-table>` to async mode:

```html
<p aria-live="polite">
    {{ 'backlog.showing-of' | translate:{ count: items.length, total: total } }}
</p>

<table euiTable
       [data]="items"
       isAsync
       [isLoading]="isLoading"
       isTableResponsive
       [attr.aria-label]="'backlog.table-label' | translate"
       (sortChange)="onSortChange($event)">

    <ng-template euiTemplate="header">
        <tr>
            <th scope="col" isSortable sortOn="ticket_number">{{ 'ticket.field.ticket-number' | translate }}</th>
            <th scope="col" isSortable sortOn="type">{{ 'ticket.field.type' | translate }}</th>
            <th scope="col" isSortable sortOn="title">{{ 'ticket.field.title' | translate }}</th>
            <th scope="col" isSortable sortOn="priority">{{ 'ticket.priority.label' | translate }}</th>
            <th scope="col" isSortable sortOn="status">{{ 'common.field.status' | translate }}</th>
            <th scope="col">{{ 'ticket.field.assignee' | translate }}</th>
        </tr>
    </ng-template>

    <ng-template let-row euiTemplate="body">
        <tr>
            <td [attr.data-col-label]="'ticket.field.ticket-number' | translate">{{ projectKey }}-{{ row.ticket_number }}</td>
            <!-- ... same cell content as before ... -->
        </tr>
    </ng-template>

    <ng-template euiTemplate="noData">
        <tr>
            <td class="eui-u-text-center" colspan="6">
                {{ emptyStateMessage }}
            </td>
        </tr>
    </ng-template>
</table>

<eui-paginator
    [length]="total"
    [pageSize]="params._limit ?? 10"
    [pageSizeOptions]="[10, 25, 50]"
    (pageChange)="onPageChange($event)">
</eui-paginator>
```

### 3. Add imports

- `EuiTemplateDirective` from `@eui/components/directives`
- `EuiPaginatorComponent` from `@eui/components/eui-paginator`
- `Sort` from `@eui/components/eui-table`
- `AfterViewInit` lifecycle

### 4. Update i18n

Change `backlog.showing-count` to `backlog.showing-of`:
- EN: `"backlog.showing-of": "Showing {{count}} of {{total}} items"`
- FR: `"backlog.showing-of": "Affichage de {{count}} sur {{total}} éléments"`

### 5. Update unit tests

Update existing 26 tests to work with the new async table pattern:
- Mock `getBacklog` to return `{ data: [...], total: N, page: 1, limit: 10 }` instead of flat array.
- Add tests for sort change, page change, paginatorReady guard.
- ~6 new tests.

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Async table, params, sort/page handlers, AfterViewInit |
| `src/app/features/projects/backlog/backlog.component.html` | Async table template, paginator, ng-template |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Update mocks, add ~6 tests |
| `src/assets/i18n/en.json` | Add `backlog.showing-of` |
| `src/assets/i18n/fr.json` | Add `backlog.showing-of` |

## Acceptance Criteria

- [ ] Table uses async mode with `isAsync`, `[isLoading]`, `[data]`
- [ ] Columns are sortable: ticket_number, type, title, priority, status
- [ ] Sort change resets page to 1 and reloads
- [ ] Paginator shows with `[10, 25, 50]` page size options
- [ ] Page change loads correct page from server
- [ ] `paginatorReady` flag prevents spurious init call
- [ ] Result count shows "Showing X of Y items" with `aria-live="polite"`
- [ ] Create Ticket dialog still works
- [ ] All unit tests pass
- [ ] Build passes
