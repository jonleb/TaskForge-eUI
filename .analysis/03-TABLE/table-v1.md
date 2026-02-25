# Users Table Page

## Goal
Create a new "Users" page accessible from the sidebar menu that displays users from the mock server in an eUI table with search filtering and column sorting.

## Data Source

### Mock server
- The `users` array from `users.json` must be loaded into `mock/db/db.json` (the existing `users` array is empty — populate it with the 7 users from `users.json`)
- The mock server already exposes `GET /api/users` via `mock/app/routes/user_routes.js` — no new endpoint needed
- Proxy config (`proxy-mock.conf.json`) already routes `/api` to the mock server on port 3000

### User fields to display in the table
| Column      | Field       | Sortable |
|-------------|-------------|----------|
| Username    | `username`  | Yes      |
| First Name  | `firstName` | Yes      |
| Last Name   | `lastName`  | Yes      |
| Email       | `email`     | Yes      |
| Role        | `role`      | Yes      |
| Active      | `is_active` | Yes      |

Do NOT display `password`, `created_at`, `updated_at`, or `global_role`.

## Implementation

### 1. Populate mock database
Copy the 7 users from `.analysis/03-TABLE/users.json` → `users` array into `mock/db/db.json`.

### 2. Create the Users feature

Create `src/app/features/users/`:
- `users.component.ts` — Standalone component
  - Imports: `EUI_PAGE`, `EUI_TABLE`, `EuiTemplateDirective`, `HttpClient`, `AsyncPipe`
  - Fetches users from `GET /api/users` on init
  - Stores data in a property bound to the table's `[data]` input
- `users.component.html` — Template using:
  - `eui-page` > `eui-page-header` (label: "Users") > `eui-page-content`
  - `eui-table-filter` with `#filter` ref and placeholder "Search users..."
  - `table[euiTable]` with `[data]`, `[filter]="filter"`, `isTableResponsive`
  - `<th isSortable>` on each column for sorting
  - `euiTemplate="body"` row template displaying the 6 fields above
  - `euiTemplate="noData"` template for empty state
- `users.routes.ts` — Export `USERS_ROUTES` with `{ path: '', component: UsersComponent }`

### 3. Register route in `app.routes.ts`
```typescript
{ path: 'screen/users', loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES) }
```

### 4. Add sidebar menu item in `app.component.ts`
```typescript
{ label: 'Users', url: 'screen/users' }
```

## eUI Components Used
- `eui-table` / `table[euiTable]` — data table with `[data]`, `[filter]`, `isSortable`
- `eui-table-filter` — built-in search filter bound to the table
- `eui-page` — page layout
- `EuiTemplateDirective` — for `euiTemplate="header"`, `"body"`, `"noData"`

### Import pattern
```typescript
import { EUI_TABLE } from '@eui/components/eui-table';
import { EuiTemplateDirective } from '@eui/components/directives';
import { EUI_PAGE } from '@eui/components/eui-page';
```

## Acceptance Criteria
- [ ] "Users" menu item appears in the sidebar
- [ ] Clicking it navigates to `/screen/users`
- [ ] Table displays 7 users fetched from `GET /api/users` (mock server)
- [ ] Search filter filters rows across all visible columns
- [ ] Clicking a column header sorts the table by that column (ASC/DESC)
- [ ] Page follows eUI page structure (`eui-page` > `eui-page-header` > `eui-page-content`)
- [ ] Build passes: `npx ng build --configuration=development`

## How to verify
1. Start the full dev environment: `npm start` (starts both Angular + mock server)
2. Navigate to the "Users" page via sidebar
3. Verify all 7 users are displayed
4. Type in the search filter — rows should filter in real time
5. Click column headers — rows should sort ascending/descending
