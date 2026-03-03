# STORY-001: Backend — Cross-Project Tickets Endpoint & User Projects Endpoint

## Objective

Create two new endpoints:
1. `GET /api/tickets` — aggregates backlog items across all projects the authenticated user has access to, with filtering, search, sort, and pagination.
2. `GET /api/user/projects` — returns the list of projects the current user can access (for populating frontend dropdowns).

## Existing Code

- `mock/app/routes/project_routes.js` — contains `GET /api/projects/:projectId/backlog` (the reference implementation for filtering/pagination logic). Also contains `GET /api/projects` (membership-filtered project list).
- `mock/app/middleware/auth.js` — `authMiddleware` validates JWT and sets `req.user` with `{ userId, username, role }`.
- `mock/app/middleware/authorize.js` — `requireGlobalRole()`, `requireProjectRole()`.
- `mock/db/db.json` — `backlog-items` collection (items have `projectId`), `project-members` collection, `projects` collection, `sprints` collection.
- `mock/server.js` — registers route modules. New routes file will be registered here.

### Key Users for Tests

| Username | ID | Global Role | Project 1 (TF) | Project 2 (DEMO) | Project 3 (INFRA) |
|----------|-----|-------------|-----------------|-------------------|-------------------|
| `superadmin` | 1 | SUPER_ADMIN | — (bypass) | — (bypass) | — (bypass) |
| `projectadmin` | 2 | PROJECT_ADMIN | PROJECT_ADMIN | — | — |
| `developer` | 4 | DEVELOPER | DEVELOPER | DEVELOPER | DEVELOPER |
| `viewer` | 6 | VIEWER | VIEWER | — | — |

## Implementation Plan

### 1. Create `mock/app/routes/ticket_routes.js`

New route file for cross-project ticket endpoints.

#### `GET /api/tickets`

```
Auth: authMiddleware (no project role check — membership filtering is inline)
```

**Query Parameters:**

| Param | Default | Description |
|-------|---------|-------------|
| `project_id` | — | Filter by project ID |
| `assignee_id` | — | Filter by assignee user ID |
| `sprint_id` | — | Filter by sprint ID. Special value `open` = tickets in any ACTIVE sprint |
| `q` | — | Case-insensitive search on title or description |
| `type` | — | Comma-separated ticket types (STORY,BUG,TASK,EPIC) |
| `status` | — | Comma-separated statuses (TO_DO,IN_PROGRESS,IN_REVIEW,DONE) |
| `priority` | — | Comma-separated priorities (CRITICAL,HIGH,MEDIUM,LOW) |
| `_sort` | `created_at` | Sort field |
| `_order` | `desc` | Sort direction (asc/desc) |
| `_page` | `1` | Page number (1-indexed) |
| `_limit` | `10` | Items per page (max 100) |

**Processing Pipeline:**

```
1. Determine accessible project IDs:
   - SUPER_ADMIN: all active project IDs
   - Regular user: project IDs from project-members where userId matches

2. Base dataset: all backlog-items where projectId is in accessible set

3. Apply filters (same logic as project-scoped backlog):
   - project_id: narrow to single project
   - assignee_id: filter by assignee
   - sprint_id:
     - "open": get all ACTIVE sprint IDs across accessible projects, filter items with sprint_id in that set
     - specific ID: filter by that sprint_id
   - q: case-insensitive search on title/description
   - type: comma-separated multi-value
   - status: comma-separated multi-value
   - priority: comma-separated multi-value

4. Sort by _sort / _order

5. Paginate by _page / _limit

6. Return { data, total, page, limit }
```

**Response Shape:** Same as `GET /api/projects/:projectId/backlog`:
```json
{
  "data": [ /* BacklogItem[] */ ],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

#### `GET /api/user/projects`

```
Auth: authMiddleware
```

Returns the list of active projects the current user can access.

**Processing Pipeline:**

```
1. SUPER_ADMIN: all active projects
2. Regular user: active projects where user is a member (via project-members)
3. Sort by name ascending
4. Return Project[] (flat array, no pagination — project count is small)
```

**Response:** `Project[]`

### 2. Register routes in `mock/server.js`

Add `require('./app/routes/ticket_routes')(app, dbPromise);` after the existing route registrations.

### 3. Integration tests: `mock/app/routes/ticket_routes.test.js`

~20 tests across 2 describe blocks:

#### `GET /api/tickets`

| # | Test | Expected |
|---|------|----------|
| 1 | SUPER_ADMIN sees tickets from all projects | `total` includes items from all active projects |
| 2 | Regular user sees only tickets from member projects | `total` excludes non-member project items |
| 3 | Filter by `project_id` | Only items from that project |
| 4 | Filter by `assignee_id` | Only items assigned to that user |
| 5 | Filter by `sprint_id` (specific) | Only items in that sprint |
| 6 | Filter by `sprint_id=open` | Only items in ACTIVE sprints |
| 7 | Text search `q` | Matches title or description |
| 8 | Filter by `type` (single) | Only matching type |
| 9 | Filter by `type` (multi) | Matches any of the types |
| 10 | Filter by `status` | Only matching status |
| 11 | Filter by `priority` | Only matching priority |
| 12 | Pagination: default | `page: 1`, `limit: 10` |
| 13 | Pagination: custom `_page=2&_limit=5` | Correct slice |
| 14 | Sort by `ticket_number` desc | Descending order |
| 15 | Combined filters | Multiple filters applied together |
| 16 | No token → 401 | Unauthorized |

#### `GET /api/user/projects`

| # | Test | Expected |
|---|------|----------|
| 17 | SUPER_ADMIN sees all active projects | All active projects returned |
| 18 | Regular user sees only member projects | Only member projects |
| 19 | Projects sorted by name | Alphabetical order |
| 20 | No token → 401 | Unauthorized |

## Files Modified

| File | Modification |
|------|----|
| `mock/app/routes/ticket_routes.js` | New file — 2 endpoints |
| `mock/server.js` | Register new route module |
| `mock/app/routes/ticket_routes.test.js` | New file — ~20 integration tests |

## Acceptance Criteria

- [ ] `GET /api/tickets` returns tickets from all accessible projects
- [ ] SUPER_ADMIN sees tickets from all active projects
- [ ] Regular users see only tickets from their member projects
- [ ] `project_id` filter narrows to single project
- [ ] `assignee_id` filter works
- [ ] `sprint_id` filter works (specific ID and `open` special value)
- [ ] Text search (`q`) matches title and description
- [ ] `type`, `status`, `priority` filters support comma-separated multi-value
- [ ] Pagination returns correct `total`, `page`, `limit`
- [ ] Sort works on any field
- [ ] `GET /api/user/projects` returns accessible projects sorted by name
- [ ] SUPER_ADMIN sees all active projects via `/api/user/projects`
- [ ] Regular users see only member projects via `/api/user/projects`
- [ ] No token → 401 on both endpoints
- [ ] Integration tests cover all branches (~20 tests)
- [ ] All mock server tests pass (`npm run test:mock`)
