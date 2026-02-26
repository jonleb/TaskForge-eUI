# STORY-001: Backend — Enhanced Project List Endpoint

## Goal

Upgrade `GET /api/projects` to support server-side pagination, search, sorting, and status filtering. SUPER_ADMIN sees all projects (including inactive). Regular users see only active projects they are members of. Response shape changes from `Project[]` to `{ data, total, page, limit }`.

## Existing Code

- `mock/app/routes/project_routes.js` — current `GET /api/projects` returns a flat array of active projects. SUPER_ADMIN sees all active; regular users see only their active member projects.
- `mock/app/routes/admin_user_routes.js` — `GET /api/admin/users` implements the exact same pagination/search/sort/filter pattern we need. This is the reference implementation.
- `mock/app/routes/project_routes.test.js` — existing tests for `GET /api/projects` assert on the flat array response. These must be updated to match the new `{ data, total, page, limit }` shape.
- `mock/db/db.json` — `projects` collection (3 records: TF active, DEMO active, INFRA inactive). `project-members` collection (16 records).

## Implementation Plan

### 1. Update `GET /api/projects` in `mock/app/routes/project_routes.js`

Replace the current handler with the enhanced version. Follow the same pipeline as `GET /api/admin/users`:

#### Query Parameters

| Param | Default | Description |
|-------|---------|-------------|
| `_page` | `1` | Page number (min 1) |
| `_limit` | `10` | Items per page (min 1, max 100) |
| `_sort` | `name` | Sort field (`name`, `key`, `created_at`) |
| `_order` | `asc` | Sort direction (`asc` / `desc`) |
| `q` | — | Search term (case-insensitive match on `name`, `key`, `description`) |
| `is_active` | — | Status filter: `true`, `false`, or omitted for all. Only effective for SUPER_ADMIN. |

#### Processing Pipeline

```
1. Base dataset
   - SUPER_ADMIN: all projects (active + inactive)
   - Regular user: active projects where user is a member

2. Status filter (SUPER_ADMIN only)
   - is_active=true  → filter to active only
   - is_active=false → filter to inactive only
   - omitted         → no filter (all)

3. Search (q)
   - Case-insensitive substring match on name, key, description

4. Total count (after filter + search, before sort/paginate)

5. Sort
   - By _sort field, _order direction
   - String comparison, case-insensitive

6. Paginate
   - Slice from (page-1)*limit to page*limit
```

#### Response Shape

```json
{
  "data": [ /* Project[] */ ],
  "total": 15,
  "page": 1,
  "limit": 10
}
```

#### Error Responses

No new error responses — invalid params fall back to defaults (same as admin users pattern).


### 2. Update Existing Tests in `mock/app/routes/project_routes.test.js`

The existing `describe('GET /api/projects', ...)` tests assert on a flat array (`Array.isArray(res.body)`). These must be updated to use the new response shape:

| Old assertion | New assertion |
|---------------|---------------|
| `Array.isArray(res.body)` | `Array.isArray(res.body.data)` |
| `res.body.map(p => p.key)` | `res.body.data.map(p => p.key)` |
| — | `expect(res.body.total).toBeDefined()` |
| — | `expect(res.body.page).toBe(1)` |
| — | `expect(res.body.limit).toBe(10)` |

Also update the SUPER_ADMIN test: it should now return all projects (active + inactive) by default, not just active ones. The "should not return inactive projects" test becomes "should return inactive projects by default" for SUPER_ADMIN.

### 3. Add New Tests for Enhanced Features

Add a new `describe('GET /api/projects — pagination, search, sort, filter', ...)` block:

| # | Test | Expected |
|---|------|----------|
| 1 | Default pagination | `page: 1`, `limit: 10`, `total` matches project count |
| 2 | Custom page/limit (`_page=1&_limit=2`) | Returns 2 items, correct `total` |
| 3 | Page beyond data (`_page=999`) | `data: []`, `total` unchanged |
| 4 | Search by name (`q=taskforge`) | Returns matching projects |
| 5 | Search by key (`q=TF`) | Returns matching projects |
| 6 | Search by description (`q=...`) | Returns matching projects |
| 7 | Search with no results (`q=zzzznotfound`) | `data: []`, `total: 0` |
| 8 | Sort by name asc (`_sort=name&_order=asc`) | First item alphabetically first |
| 9 | Sort by name desc (`_sort=name&_order=desc`) | First item alphabetically last |
| 10 | Sort by key (`_sort=key&_order=asc`) | Sorted by key |
| 11 | SUPER_ADMIN: `is_active=true` | Only active projects |
| 12 | SUPER_ADMIN: `is_active=false` | Only inactive projects |
| 13 | SUPER_ADMIN: no `is_active` | All projects (active + inactive) |
| 14 | Regular user: `is_active` param ignored | Only their active member projects |
| 15 | Regular user: search within own projects | Filters within membership scope |
| 16 | Empty result set | `{ data: [], total: 0, page: 1, limit: 10 }` |

Tests use the existing `getTokenFor()` helper. No DB mutations — all tests are read-only.

## Code Reference: Admin Users Pattern

The implementation should mirror `GET /api/admin/users` in `admin_user_routes.js` (lines ~38–75):

```javascript
// 1. Base dataset (role-dependent)
// 2. Filter by is_active
// 3. Search (q) — case-insensitive substring on relevant fields
// 4. Total count
// 5. Sort by _sort / _order
// 6. Paginate by _page / _limit
// 7. Return { data, total, page, limit }
```

Key differences from admin users:
- Base dataset depends on role: SUPER_ADMIN gets all projects, regular users get membership-filtered active projects.
- `is_active` filter only applies to SUPER_ADMIN (regular users always see active only).
- Search fields: `name`, `key`, `description` (not `username`, `firstName`, `lastName`, `email`).
- Default sort: `name` asc (not `created_at` desc).

## Files Changed

| File | Change |
|------|--------|
| `mock/app/routes/project_routes.js` | Rewrite `GET /api/projects` handler with pagination/search/sort/filter pipeline |
| `mock/app/routes/project_routes.test.js` | Update existing GET tests for new response shape + add ~16 new test cases |

## Acceptance Criteria

- [ ] SUPER_ADMIN sees all projects (active + inactive) by default
- [ ] Regular users see only their active member projects
- [ ] Pagination returns correct `total`, `page`, `limit`
- [ ] Custom `_page` and `_limit` work correctly
- [ ] Page beyond data returns empty `data` array with correct `total`
- [ ] Search filters by `name`, `key`, `description` (case-insensitive)
- [ ] Search with no matches returns `{ data: [], total: 0, page: 1, limit: 10 }`
- [ ] Sort works on `name` and `key` columns, both `asc` and `desc`
- [ ] `is_active` filter works for SUPER_ADMIN (`true`, `false`, omitted)
- [ ] `is_active` filter is ignored for regular users
- [ ] Response shape is `{ data: Project[], total: number, page: number, limit: number }`
- [ ] Existing tests updated and passing
- [ ] New integration tests cover all branches
- [ ] All mock server tests pass (`npm run test:mock`)
- [ ] DB restored after test run (`git checkout mock/db/db.json`)
