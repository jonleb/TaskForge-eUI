# Users Table with Pagination

## Goal
Create a new "Table Pagination" page accessible from the sidebar menu that displays users from the mock server in an eUI table with search filtering, column sorting, and pagination.

## Data Source
- Same as the Users page: `GET /api/users` from the mock server (87 users in `mock/db/db.json`)
- No new endpoint needed

## Implementation

### 1. Create the Table Pagination feature

Create `src/app/features/table-pagination/`:

- `table-pagination.component.ts` — Standalone component
  - Imports: `EUI_PAGE`, `EUI_TABLE`, `EuiTemplateDirective`, `HttpClient`
  - Fetches users from `GET /api/users` on init
  - Stores data in a property bound to the table's `[data]` input

- `table-pagination.component.html` — Template using:
  - `eui-page` > `eui-page-header` (label: "Table Pagination") > `eui-page-content`
  - `eui-table-filter` with `#filter` ref and placeholder "Search users..."
  - `table[euiTable]` with `[data]`, `[filter]="filter"`, `[paginator]="paginator"`, `isTableResponsive`
  - `<th isSortable sortOn="fieldName">` on each column
  - `euiTemplate="body"` row template displaying: Username, First Name, Last Name, Email, Role, Active
  - `euiTemplate="noData"` template for empty state
  - `<eui-paginator #paginator>` placed after the table with:
    - `[pageSizeOptions]="[5, 10, 25, 50]"`
    - `[pageSize]="10"`
    - `[hasPageNumberNavigation]="true"`

- `table-pagination.routes.ts` — Export `TABLE_PAGINATION_ROUTES` with `{ path: '', component: TablePaginationComponent }`

### 2. Register route in `app.routes.ts`
```typescript
{ path: 'screen/table-pagination', loadChildren: () => import('./features/table-pagination/table-pagination.routes').then(m => m.TABLE_PAGINATION_ROUTES) }
```

### 3. Add sidebar menu item in `app.component.ts`
```typescript
{ label: 'Table Pagination', url: 'screen/table-pagination' }
```

## eUI Components Used
- `table[euiTable]` with `[data]`, `[filter]`, `[paginator]`, `isSortable`, `sortOn`
- `eui-table-filter` — built-in search filter
- `eui-paginator` — pagination control bound to the table via `[paginator]` input
- `eui-page` — page layout

### Import pattern
```typescript
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_PAGE } from '@eui/components/eui-page';
```

Note: `EUI_TABLE` already includes `EuiPaginatorComponent` and `EuiTableFilterComponent` — no separate import needed.

## Key difference from Users page (table-v1)
- Adds `[paginator]="paginator"` binding on the table
- Adds `<eui-paginator #paginator>` component below the table
- With 87 users and pageSize=10, pagination is clearly visible and testable

## Acceptance Criteria
- [ ] "Table Pagination" menu item appears in the sidebar
- [ ] Clicking it navigates to `/screen/table-pagination`
- [ ] Table displays users with pagination (10 per page by default)
- [ ] Page size dropdown allows switching between 5, 10, 25, 50 items per page
- [ ] Page number navigation is visible and functional
- [ ] Search filter works across all visible columns
- [ ] Column headers are sortable (ASC/DESC)
- [ ] Page follows eUI structure (`eui-page` > `eui-page-header` > `eui-page-content`)
- [ ] Build passes: `npx ng build --configuration=development`
