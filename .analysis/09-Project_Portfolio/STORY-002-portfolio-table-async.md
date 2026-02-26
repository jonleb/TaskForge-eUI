# STORY-002: Frontend — Portfolio Table with Server-Side Pagination, Search & Sort

## Goal

Upgrade the portfolio table from client-side to server-side (async) mode with pagination, search, and sortable columns. The backend enhanced endpoint from STORY-001 (`GET /api/projects` returning `{ data, total, page, limit }`) is the data source. Follow the exact pattern established in the admin users table (`UsersComponent`).

## Existing Code

- `src/app/features/projects/portfolio/portfolio.component.ts` — current component uses client-side table with `[data]="projects"` (flat `Project[]`). Loads via `projectService.getProjects()` which currently returns `Observable<Project[]>`. Has `OnPush` + `cdr.markForCheck()`. Has create project dialog (SUPER_ADMIN only).
- `src/app/features/projects/portfolio/portfolio.component.html` — basic `eui-table` with Key, Name, Description, Actions columns. No search, no pagination, no sort. Has `aria-live="polite"` result count.
- `src/app/core/project/project.service.ts` — `getProjects(): Observable<Project[]>`. Needs to change to accept params and return paginated response.
- `src/app/core/project/project.models.ts` — has `Project`, `ProjectMember`, `CreateProjectPayload`. Needs `ProjectListParams` and `ProjectListResponse`.
- `src/app/core/project/index.ts` — barrel exports. Needs to export new interfaces.
- `src/app/core/project/project.service.spec.ts` — tests `getProjects()` expecting `Project[]`. Must be updated for new signature.
- `src/app/features/projects/portfolio/portfolio.component.spec.ts` — 22 tests. Mock returns `of(mockProjects)` as `Project[]`. Must be updated for paginated response.

### Pattern Reference

- `src/app/features/admin/users/users.component.ts` — async table with `AdminUserListParams`, debounced search via `Subject`, `paginatorReady` flag, `onSortChange()`, `onPageChange()`, `onFilterChange()`.
- `src/app/features/admin/users/users.component.html` — `eui-table-filter`, `eui-paginator`, `isAsync`, `isSortable`, `sortOn`, `(sortChange)`, `(pageChange)`, `(filterChange)`.
- `src/app/features/admin/users/admin-user.models.ts` — `AdminUserListParams`, `AdminUserListResponse` interfaces.

## Implementation Plan

### 1. Add interfaces to `src/app/core/project/project.models.ts`

```typescript
export interface ProjectListParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
    q?: string;
    is_active?: 'true' | 'false';
}

export interface ProjectListResponse {
    data: Project[];
    total: number;
    page: number;
    limit: number;
}
```

### 2. Update barrel export `src/app/core/project/index.ts`

Add `ProjectListParams` and `ProjectListResponse` to exports.

### 3. Update `src/app/core/project/project.service.ts`

Change `getProjects()` signature:

```typescript
getProjects(params?: ProjectListParams): Observable<ProjectListResponse> {
    return this.http.get<ProjectListResponse>('/api/projects', { params: params as any });
}
```

Build query params from `ProjectListParams`, omitting undefined values (Angular's `HttpClient` handles this when passing an object to `params`).

### 4. Update `src/app/features/projects/portfolio/portfolio.component.ts`

Key changes (follow `UsersComponent` pattern):

| Aspect | Current | New |
|--------|---------|-----|
| Data source | `projects: Project[]` from flat array | `projects: Project[]` from `response.data` |
| Total count | `projects.length` | `total: number` from response |
| Table mode | Client-side (`[data]="projects"`) | Async (`isAsync`, `[data]="projects"`) |
| Search | None | `eui-table-filter` with debounced `Subject` (300ms) |
| Pagination | None | `eui-paginator` with `[10, 25, 50]` page sizes |
| Sort | None | `isSortable` + `sortOn` on Key and Name columns |
| Params | None | `params: ProjectListParams` object |
| Lifecycle | `OnInit` | `OnInit`, `AfterViewInit`, `OnDestroy` |

#### New properties

```typescript
private readonly destroy$ = new Subject<void>();
private readonly searchSubject = new Subject<string>();
private paginatorReady = false;

total = 0;
params: ProjectListParams = {
    _page: 1,
    _limit: 10,
    _sort: 'name',
    _order: 'asc',
};
```

#### New imports

```typescript
import { EuiPaginatorComponent } from '@eui/components/eui-paginator';
import { Sort } from '@eui/components/eui-table';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ProjectListParams } from '../../../core/project';
```

Add `EuiPaginatorComponent` to `imports` array.

#### Lifecycle changes

- `ngOnInit()`: set up `searchSubject` pipe (debounce 300ms, distinctUntilChanged, takeUntil destroy$). Call `loadProjects()`.
- `ngAfterViewInit()`: set `paginatorReady = true`.
- `ngOnDestroy()`: `destroy$.next(); destroy$.complete()`.

#### Updated `loadProjects()`

```typescript
loadProjects(): void {
    this.loading = true;
    this.hasError = false;
    this.projectService.getProjects(this.params).subscribe({
        next: res => {
            this.projects = res.data;
            this.total = res.total;
            this.loading = false;
            this.cdr.markForCheck();
        },
        error: () => {
            this.projects = [];
            this.total = 0;
            this.loading = false;
            this.hasError = true;
            this.growlService.growl({ ... });
            this.cdr.markForCheck();
        },
    });
}
```

#### New event handlers

```typescript
onFilterChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
}

onSortChange(sort: Sort[]): void {
    if (sort.length > 0) {
        this.params = {
            ...this.params,
            _sort: sort[0].sort,
            _order: sort[0].order.toLowerCase() as 'asc' | 'desc',
            _page: 1,
        };
    }
    this.loadProjects();
}

onPageChange(event: { page: number; pageSize: number }): void {
    if (!this.paginatorReady) return;
    this.params = {
        ...this.params,
        _page: event.page + 1,
        _limit: event.pageSize,
    };
    this.loadProjects();
}
```


### 5. Update `src/app/features/projects/portfolio/portfolio.component.html`

Key changes:

#### Add search filter above table

```html
<eui-table-filter
    placeholder="Search projects..."
    (filterChange)="onFilterChange($event)">
</eui-table-filter>
```

#### Switch table to async mode

Add `isAsync` attribute. Add `(sortChange)="onSortChange($event)"`.

#### Add sortable columns

```html
<th scope="col" isSortable sortOn="key">Key</th>
<th scope="col" isSortable sortOn="name">Name</th>
<th scope="col">Description</th>
<th scope="col">Actions</th>
```

#### Update result count

```html
<p aria-live="polite" class="eui-u-mt-s eui-u-mb-s">
    Showing {{ projects.length }} of {{ total }} project{{ total !== 1 ? 's' : '' }}
</p>
```

#### Add paginator below table (not bound to table — async mode)

```html
<eui-paginator
    [length]="total"
    [pageSize]="params._limit ?? 10"
    [pageSizeOptions]="[10, 25, 50]"
    (pageChange)="onPageChange($event)">
</eui-paginator>
```

#### Update noData template

Add contextual empty state message (same pattern as admin users):

```html
@if (hasError) {
    Could not load projects. Please try again.
    <button euiButton euiSecondary type="button" class="eui-u-ml-m" (click)="loadProjects()">Retry</button>
} @else if (params.q) {
    No projects match your search criteria.
} @else {
    No projects available.
}
```

### 6. Update `src/app/core/project/project.service.spec.ts`

Update `getProjects()` tests:

| # | Test | Expected |
|---|------|----------|
| 1 | `getProjects()` with no params | GET `/api/projects`, returns `ProjectListResponse` |
| 2 | `getProjects({ _page: 2, _limit: 25 })` | GET `/api/projects?_page=2&_limit=25` |
| 3 | `getProjects({ q: 'task', _sort: 'name', _order: 'asc' })` | GET with correct query params |
| 4 | Empty response | Returns `{ data: [], total: 0, page: 1, limit: 10 }` |

### 7. Update `src/app/features/projects/portfolio/portfolio.component.spec.ts`

Update mock setup: `projectServiceMock.getProjects` must return `of({ data: mockProjects, total: 2, page: 1, limit: 10 })` instead of `of(mockProjects)`.

Update all assertions that reference `component.projects` — these still work since `projects` is populated from `response.data`.

Add new tests:

| # | Test | Expected |
|---|------|----------|
| 1 | Should call `getProjects()` with default params on init | `getProjects` called with `{ _page: 1, _limit: 10, _sort: 'name', _order: 'asc' }` |
| 2 | Should set `total` from response | `component.total === 2` |
| 3 | Should call `getProjects()` with search param after debounce | After `onFilterChange('task')`, params include `q: 'task'`, `_page: 1` |
| 4 | Should reset page to 1 on search | `params._page === 1` after search |
| 5 | Should call `getProjects()` with sort params | After `onSortChange([{ sort: 'key', order: 'ASC' }])`, params include `_sort: 'key'`, `_order: 'asc'` |
| 6 | Should reset page to 1 on sort change | `params._page === 1` after sort |
| 7 | Should call `getProjects()` with page params | After `onPageChange({ page: 1, pageSize: 25 })`, params include `_page: 2`, `_limit: 25` |
| 8 | Should ignore paginator init event | `onPageChange()` before `ngAfterViewInit` does not trigger `loadProjects()` |
| 9 | Should set `total` to 0 on error | `component.total === 0` |
| 10 | Should show contextual empty message for search | When `params.q` is set and data is empty |

## Files Changed

| File | Change |
|------|--------|
| `src/app/core/project/project.models.ts` | Add `ProjectListParams`, `ProjectListResponse` interfaces |
| `src/app/core/project/index.ts` | Export new interfaces |
| `src/app/core/project/project.service.ts` | Update `getProjects()` signature to accept params and return `ProjectListResponse` |
| `src/app/core/project/project.service.spec.ts` | Update `getProjects()` tests for new signature |
| `src/app/features/projects/portfolio/portfolio.component.ts` | Switch to async mode, add search/sort/pagination handlers, add `AfterViewInit`/`OnDestroy` |
| `src/app/features/projects/portfolio/portfolio.component.html` | Add `eui-table-filter`, `eui-paginator`, `isAsync`, `isSortable`/`sortOn`, `(sortChange)` |
| `src/app/features/projects/portfolio/portfolio.component.spec.ts` | Update mocks for paginated response, add ~10 new tests |

## Acceptance Criteria

- [ ] Table loads data from server with pagination (default page 1, limit 10)
- [ ] Search filters projects by name/key/description with 300ms debounce
- [ ] Search resets page to 1
- [ ] Key and Name columns are sortable (asc/desc)
- [ ] Sort resets page to 1
- [ ] Paginator shows correct total and page size options `[10, 25, 50]`
- [ ] Paginator init event does not trigger spurious API call (`paginatorReady` guard)
- [ ] Result count shows "Showing X of Y projects" via `aria-live="polite"`
- [ ] Empty state shows contextual message (error vs search vs no data)
- [ ] Loading state works correctly
- [ ] Error state shows growl + retry button
- [ ] Create project dialog still works (unchanged)
- [ ] `ProjectService.getProjects()` accepts `ProjectListParams` and returns `ProjectListResponse`
- [ ] Unit tests updated for new response shape
- [ ] New unit tests cover search, sort, pagination, paginator guard
- [ ] All tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
