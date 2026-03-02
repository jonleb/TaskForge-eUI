# STORY-003: Frontend — Tickets Page (route, sidebar, card list)

## Objective

Create the `TicketsComponent` with the two-column layout (collapsible filter panel on the left, card results on the right), basic text search, pagination, and card rendering. Wire up the route at `screen/tickets` and add the "Tickets" sidebar menu item.

This story delivers the page skeleton with text search only. The full filter panel (Project, Assigned to me, Sprints, etc.) is added in STORY-004.

## Existing Code (reference implementation)

- `src/app/features/projects/backlog/backlog.component.ts` — the primary reference. Two-column layout with `eui-page-columns`, collapsible filter column, `eui-content-card` cards, `eui-paginator`, text search with debounce.
- `src/app/features/projects/backlog/backlog.component.html` — template structure to replicate (minus reorder/drag-drop).
- `src/app/features/projects/backlog/backlog.component.scss` — card styling to reuse.
- `src/app/app.routes.ts` — add new lazy-loaded route.
- `src/app/layout/layout.component.ts` — `filterSidebarItems()` builds the global sidebar.

## Implementation Plan

### 1. Create `src/app/features/tickets/tickets.component.ts`

Standalone component, `OnPush` change detection.

**Injected services:**
- `TicketsService` — `getTickets()`, `getUserProjects()`
- `PermissionService` — `getUserId()`
- `EuiGrowlService` — error notifications
- `TranslateService` — i18n
- `ChangeDetectorRef` — `markForCheck()` in async callbacks
- `Router` — navigation to ticket detail

**Key properties:**
```typescript
items: BacklogItem[] = [];
total = 0;
isLoading = true;
hasError = false;

params: TicketsListParams = {
    _page: 1,
    _limit: 10,
    _sort: 'created_at',
    _order: 'desc',
};

// Filter state (text search only in this story)
isFilterCollapsed = false;
searchValue = '';

// Project key map for card display
projectMap = new Map<string, Project>();
```

**Key methods:**
- `ngOnInit()` — load user projects (to build `projectMap`), then load tickets.
- `loadTickets()` — calls `ticketsService.getTickets(params)`, updates `items`, `total`, handles errors.
- `onFilterChange(value)` — debounced text search (300ms via `Subject` + `debounceTime`).
- `onPageChange(event)` — guarded by `paginatorReady` flag (AfterViewInit pattern).
- `onFilterColumnCollapse(collapsed)` — toggle filter panel.
- `getProjectKey(item)` — resolves `item.projectId` to project key via `projectMap`.
- `getAssigneeName(item)` — resolves assignee (loads members lazily or shows ID).
- `truncateDescription(desc)` — same helper as backlog.
- `navigateToTicket(item)` — navigates to `screen/projects/${item.projectId}/backlog/${item.ticket_number}`.

**Lifecycle:**
- `OnInit`: subscribe to search subject, load projects, load tickets.
- `AfterViewInit`: set `paginatorReady = true`.
- `OnDestroy`: complete `destroy$` subject.

### 2. Create `src/app/features/tickets/tickets.component.html`

Replicates the backlog template structure, minus reorder/drag-drop:

```html
<eui-page>
    <eui-page-content>
        <eui-page-columns>
            <eui-page-column hasSubColumns>
                <eui-page-column-header-body>
                    <eui-page-header [label]="'tickets.page-title' | translate">
                        <!-- Create button added in STORY-005 -->
                    </eui-page-header>
                </eui-page-column-header-body>

                <eui-page-column-body>
                    <eui-page-columns>
                        <!-- Left: filter column -->
                        <eui-page-column
                            [label]="'tickets.filter.column-label' | translate"
                            euiSize2XL
                            [isCollapsible]="true"
                            [isCollapsed]="isFilterCollapsed"
                            [isAutocloseOnMobile]="true"
                            (collapse)="onFilterColumnCollapse($event)">
                            <eui-page-column-body>
                                <!-- Text search -->
                                <div class="eui-u-mb-m">
                                    <label euiLabel for="tickets-search">...</label>
                                    <input euiInputText id="tickets-search" ... />
                                </div>
                                <!-- Additional filters added in STORY-004 -->
                            </eui-page-column-body>
                        </eui-page-column>

                        <!-- Right: results column -->
                        <eui-page-column>
                            <eui-page-column-body>
                                <!-- Result count (aria-live) -->
                                <!-- Card list -->
                                <!-- Paginator -->
                            </eui-page-column-body>
                        </eui-page-column>
                    </eui-page-columns>
                </eui-page-column-body>
            </eui-page-column>
        </eui-page-columns>
    </eui-page-content>
</eui-page>
```

**Card structure** (per ticket):
```html
<a [routerLink]="['/screen/projects', item.projectId, 'backlog', item.ticket_number]"
   class="card-link"
   [attr.aria-label]="getProjectKey(item) + '-' + item.ticket_number + ' ' + item.title">
    <eui-content-card class="eui-u-mb-s">
        <eui-content-card-header>
            <eui-content-card-header-start>
                <eui-chip euiSizeS>{{ 'workflow.ticket-type.' + item.type | translate }}</eui-chip>
            </eui-content-card-header-start>
            <eui-content-card-header-title>{{ item.title }}</eui-content-card-header-title>
            <eui-content-card-header-subtitle>
                {{ getProjectKey(item) }}-{{ item.ticket_number }}
            </eui-content-card-header-subtitle>
            <eui-content-card-header-end>
                <eui-chip euiSizeS>{{ 'workflow.status.' + item.status | translate }}</eui-chip>
            </eui-content-card-header-end>
            <eui-content-card-header-metadata>
                <!-- Priority chip + project name + assignee -->
                @if (item.priority) {
                    <eui-chip euiSizeS ...>{{ 'ticket.priority.' + item.priority | translate }}</eui-chip>
                }
                <span class="eui-u-ml-s">{{ getProjectKey(item) }}</span>
                <span class="eui-u-ml-s">{{ getAssigneeName(item) }}</span>
            </eui-content-card-header-metadata>
        </eui-content-card-header>
        @if (item.description) {
            <eui-content-card-body>{{ truncateDescription(item.description) }}</eui-content-card-body>
        }
    </eui-content-card>
</a>
```

### 3. Create `src/app/features/tickets/tickets.component.scss`

Reuse the same card styling as backlog (`.card-link`, `.empty-state`, `.dialog-form`, `.filter-fieldset`, `.filter-checkbox`).

### 4. Create `src/app/features/tickets/tickets.routes.ts`

```typescript
export const TICKETS_ROUTES: Routes = [
    { path: '', component: TicketsComponent },
];
```

### 5. Update `src/app/app.routes.ts`

Add lazy-loaded route between `screen/home` and `screen/projects`:

```typescript
{
    path: 'screen/tickets',
    loadChildren: () => import('./features/tickets/tickets.routes').then(m => m.TICKETS_ROUTES),
},
```

### 6. Update `src/app/layout/layout.component.ts`

Add "Tickets" to the global sidebar in `filterSidebarItems()`, between Home and Projects:

```typescript
const allItems: EuiMenuItem<SidebarItemMetadata>[] = [
    { label: this.translate.instant('nav.home'), url: 'screen/home' },
    { label: this.translate.instant('nav.tickets'), url: 'screen/tickets' },  // NEW
    { label: this.translate.instant('nav.projects'), url: 'screen/projects' },
    { label: this.translate.instant('nav.users'), url: 'screen/admin/users', metadata: { roles: ['SUPER_ADMIN'] } },
];
```

### 7. Unit tests: `src/app/features/tickets/tickets.component.spec.ts`

~18 tests:

| # | Test | Expected |
|---|------|----------|
| 1 | Component creates | Truthy |
| 2 | Loads tickets on init | `ticketsService.getTickets()` called |
| 3 | Loads user projects on init | `ticketsService.getUserProjects()` called |
| 4 | Displays ticket cards | Cards rendered for each item |
| 5 | Card shows project key prefix | `TF-1` format |
| 6 | Card shows type chip | Type translated |
| 7 | Card shows status chip | Status translated |
| 8 | Card shows priority chip | Priority translated |
| 9 | Card links to ticket detail | Correct routerLink |
| 10 | Text search triggers debounced reload | `getTickets()` called with `q` param |
| 11 | Pagination works | `getTickets()` called with updated `_page`/`_limit` |
| 12 | Paginator init event ignored | No spurious load before `AfterViewInit` |
| 13 | Loading state shown | Progress bar visible during load |
| 14 | Empty state shown | Message when no results |
| 15 | Error state shown | Error message + retry button |
| 16 | Retry reloads tickets | `getTickets()` called again |
| 17 | Filter column collapses | `isFilterCollapsed` toggled |
| 18 | Result count has aria-live | `aria-live="polite"` present |

### 8. Update layout component spec

Update the existing sidebar tests to account for the new "Tickets" menu item (item count changes).

## Files Modified

| File | Modification |
|------|----|
| `src/app/features/tickets/tickets.component.ts` | New file |
| `src/app/features/tickets/tickets.component.html` | New file |
| `src/app/features/tickets/tickets.component.scss` | New file |
| `src/app/features/tickets/tickets.routes.ts` | New file |
| `src/app/features/tickets/tickets.component.spec.ts` | New file (~18 tests) |
| `src/app/app.routes.ts` | Add `screen/tickets` route |
| `src/app/layout/layout.component.ts` | Add "Tickets" to global sidebar |
| `src/app/layout/layout.component.spec.ts` | Update sidebar item count assertions |

## eUI Components & Imports

```typescript
imports: [
    TranslateModule,
    FormsModule,
    RouterLink,
    ...EUI_PAGE,
    ...EUI_CONTENT_CARD,
    ...EUI_CHIP,
    EuiPaginatorComponent,
    EuiProgressBarComponent,
    EuiInputTextComponent,
    EuiLabelDirective,
    ...EUI_CARD,
    EuiInputCheckBoxComponent,
    EuiSelectComponent,
]
```

## Accessibility Checklist

- [x] `eui-page` > `eui-page-header` > `eui-page-content` structure
- [x] `aria-live="polite"` on result count
- [x] `aria-label` on card links (`{projectKey}-{ticketNumber} {title}`)
- [x] `for`/`id` pairs on search input label
- [x] Filter column has `expandAriaLabel` and `collapseAriaLabel`
- [x] Keyboard navigation: cards are `<a>` elements (focusable, Enter activates)
- [x] Focus indicator on card links (`:focus-visible` outline)
- [x] Empty state uses `<output>` element
- [x] No color-only information (priority has text label alongside color)

## Acceptance Criteria

- [ ] Page accessible at `screen/tickets`
- [ ] "Tickets" menu item in global sidebar between Home and Projects
- [ ] Two-column layout: collapsible filter panel (left) + results (right)
- [ ] Ticket cards show project key prefix, type, title, status, priority, assignee
- [ ] Clicking a card navigates to the ticket detail within its project
- [ ] Text search with 300ms debounce
- [ ] Pagination with 10/25/50 page sizes
- [ ] Paginator init event does not trigger spurious load
- [ ] Loading, empty, and error states
- [ ] `aria-live="polite"` on result count
- [ ] All a11y criteria met
- [ ] Unit tests pass (~18 tests)
- [ ] Existing layout tests updated and passing
- [ ] Build passes
