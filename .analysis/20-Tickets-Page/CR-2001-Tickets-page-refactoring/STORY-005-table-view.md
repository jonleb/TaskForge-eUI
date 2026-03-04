# STORY-005: Table View Implementation

## Objective

Implement the table view as an alternative to the card view, toggled via the view switcher from STORY-003. The table displays columns: Key, Title, Type, Status, Priority, Assignee, Project. Clicking a row navigates to the ticket detail page. Sortable columns where applicable.

---

## Prerequisites

- STORY-004 completed (card view redesigned, view toggle functional).

---

## Modifications

### 1. Template — `src/app/features/tickets/tickets.component.html`

Replace the table view placeholder inside `@else` (from STORY-003) with a full table:

```html
@else {
    <!-- Table view -->
    <table euiTable
           [attr.aria-label]="'tickets.table.caption' | translate">
        <thead>
            <tr>
                <th scope="col"
                    [isSortable]="true"
                    [sortOn]="'ticket_number'"
                    [sortDirection]="sortField === 'ticket_number' ? sortOrder : ''"
                    (sortChange)="onTableSort('ticket_number', $event)">
                    {{ 'tickets.table.col.key' | translate }}
                </th>
                <th scope="col"
                    [isSortable]="true"
                    [sortOn]="'title'"
                    [sortDirection]="sortField === 'title' ? sortOrder : ''"
                    (sortChange)="onTableSort('title', $event)">
                    {{ 'tickets.table.col.title' | translate }}
                </th>
                <th scope="col">
                    {{ 'tickets.table.col.type' | translate }}
                </th>
                <th scope="col"
                    [isSortable]="true"
                    [sortOn]="'status'"
                    [sortDirection]="sortField === 'status' ? sortOrder : ''"
                    (sortChange)="onTableSort('status', $event)">
                    {{ 'tickets.table.col.status' | translate }}
                </th>
                <th scope="col"
                    [isSortable]="true"
                    [sortOn]="'priority'"
                    [sortDirection]="sortField === 'priority' ? sortOrder : ''"
                    (sortChange)="onTableSort('priority', $event)">
                    {{ 'tickets.table.col.priority' | translate }}
                </th>
                <th scope="col">
                    {{ 'tickets.table.col.assignee' | translate }}
                </th>
                <th scope="col">
                    {{ 'tickets.table.col.project' | translate }}
                </th>
            </tr>
        </thead>
        <tbody>
            @for (item of items; track item.id) {
                <tr class="eui-u-cursor-pointer"
                    [routerLink]="['/screen/projects', item.projectId, 'tickets', item.ticket_number]"
                    [attr.aria-label]="getProjectKey(item) + '-' + item.ticket_number + ' ' + item.title"
                    tabindex="0"
                    (keydown.enter)="navigateToTicket(item)">
                    <td [attr.data-col-label]="'tickets.table.col.key' | translate">
                        {{ getProjectKey(item) }}-{{ item.ticket_number }}
                    </td>
                    <td [attr.data-col-label]="'tickets.table.col.title' | translate">
                        {{ item.title }}
                    </td>
                    <td [attr.data-col-label]="'tickets.table.col.type' | translate">
                        {{ 'workflow.ticket-type.' + item.type | translate }}
                    </td>
                    <td [attr.data-col-label]="'tickets.table.col.status' | translate">
                        <span euiStatusBadge
                              [class.eui-status-badge--success]="item.status === 'DONE'"
                              [class.eui-status-badge--info]="item.status === 'IN_PROGRESS' || item.status === 'IN_REVIEW'"
                              [class.eui-status-badge--warning]="item.status === 'TO_DO'">
                            {{ 'workflow.status.' + item.status | translate }}
                        </span>
                    </td>
                    <td [attr.data-col-label]="'tickets.table.col.priority' | translate">
                        {{ item.priority ? ('ticket.priority.' + item.priority | translate) : '—' }}
                    </td>
                    <td [attr.data-col-label]="'tickets.table.col.assignee' | translate">
                        {{ getAssigneeName(item) }}
                    </td>
                    <td [attr.data-col-label]="'tickets.table.col.project' | translate">
                        {{ getProjectKey(item) }}
                    </td>
                </tr>
            }
        </tbody>
    </table>
}
```

Note on `eui-table` and `<caption>`: per eUI pitfalls, `eui-table` strips `<caption>` elements. Use `aria-label` on the `<table>` element instead.

Note on sortable columns: the `eui-table` directive provides `[isSortable]`, `[sortOn]`, `[sortDirection]`, and `(sortChange)` on `<th>` elements. Check the exact API at implementation time. If `eui-table` uses a different sort API (e.g., `(sortChange)` on the table element itself), adjust accordingly.

### 2. Component — `src/app/features/tickets/tickets.component.ts`

#### New methods

```ts
onTableSort(field: string, event: any): void {
    const direction = event?.direction || (this.sortOrder === 'asc' ? 'desc' : 'asc');
    this.sortField = field;
    this.sortOrder = direction;
    this.params = { ...this.params, _sort: field, _order: direction, _page: 1 };
    this.loadTickets();
}

navigateToTicket(item: BacklogItem): void {
    // Programmatic navigation for keyboard Enter on table rows
    // Import Router if not already imported
    this.router.navigate(['/screen/projects', item.projectId, 'tickets', item.ticket_number]);
}
```

#### Add imports

```ts
import { Router, RouterLink } from '@angular/router';
import { EUI_TABLE } from '@eui/components/eui-table';
```

Add `...EUI_TABLE` to `imports` array. Inject `Router`:

```ts
private readonly router = inject(Router);
```

`RouterLink` is already imported — verify it's in the `imports` array for the `[routerLink]` on `<tr>`.

### 3. Unit tests — `src/app/features/tickets/tickets.component.spec.ts`

New tests (~10):

| # | Test | Detail |
|---|------|--------|
| 1 | Table renders when `currentView === 'table'` | Switch to table view, verify `table[euiTable]` present |
| 2 | Table has 7 columns | Verify 7 `<th>` elements with correct labels |
| 3 | Table has `aria-label` | Verify `aria-label` on `<table>` |
| 4 | Table headers have `scope="col"` | Verify all `<th>` have `scope="col"` |
| 5 | Table cells have `data-col-label` | Verify all `<td>` have `data-col-label` |
| 6 | Table rows render ticket data | Verify key, title, type, status, priority, assignee, project in cells |
| 7 | Table row click navigates to ticket | Click a row, verify router navigation |
| 8 | Table row Enter key navigates | Simulate Enter keydown, verify navigation |
| 9 | Sortable columns trigger sort | Click a sortable header, verify `onTableSort()` called |
| 10 | Status badge in table | Verify `span[euiStatusBadge]` in status cells |

---

## eUI Components Used

| Component | Import | Usage |
|-----------|--------|-------|
| `table[euiTable]` | `EUI_TABLE` from `@eui/components/eui-table` | Table view |
| `span[euiStatusBadge]` | already imported (STORY-004) | Status display in table |

---

## Accessibility

- `aria-label` on `<table>` (since `eui-table` strips `<caption>`).
- `scope="col"` on all `<th>` elements.
- `data-col-label` on all `<td>` elements (eUI responsive table requirement).
- Table rows are focusable (`tabindex="0"`) and navigable via Enter key.
- `aria-label` on each `<tr>` with ticket key + title.
- Status displayed as text badge (not color-only).
- Priority displayed as text (not color-only).
- Keyboard navigation: Tab to focus rows, Enter to navigate.

---

## i18n Keys (new)

| Key | EN | FR |
|-----|----|----|
| `tickets.table.caption` | Tickets list | Liste des tickets |
| `tickets.table.col.key` | Key | Clé |
| `tickets.table.col.title` | Title | Titre |
| `tickets.table.col.type` | Type | Type |
| `tickets.table.col.status` | Status | Statut |
| `tickets.table.col.priority` | Priority | Priorité |
| `tickets.table.col.assignee` | Assignee | Assigné à |
| `tickets.table.col.project` | Project | Projet |

---

## Acceptance Criteria

- [ ] Table view renders when view toggle is set to "table"
- [ ] Table has 7 columns: Key, Title, Type, Status, Priority, Assignee, Project
- [ ] Table has `aria-label` (no `<caption>` per eUI pitfall)
- [ ] All `<th>` have `scope="col"`
- [ ] All `<td>` have `data-col-label`
- [ ] Key, Title, Status, Priority columns are sortable
- [ ] Table sort syncs with the sort controls in the results header bar
- [ ] Clicking a row navigates to ticket detail page
- [ ] Enter key on a focused row navigates to ticket detail page
- [ ] Status displayed as `eui-status-badge` with text
- [ ] Priority displayed as text (not color-only)
- [ ] Empty state shown when no tickets match filters (shared with card view)
- [ ] All interactive elements reachable via keyboard
- [ ] Unit tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
