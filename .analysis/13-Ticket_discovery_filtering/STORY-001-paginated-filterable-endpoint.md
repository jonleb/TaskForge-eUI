# STORY-001: Backend — Paginated & Filterable Backlog Endpoint

## Goal

Extend `GET /api/projects/:projectId/backlog` to support server-side pagination, text search, and multi-dimension filtering. Return a paginated envelope `{ data, total, page, limit }` matching the `ProjectListResponse` pattern used by `GET /api/projects`.

## Existing Code

- `mock/app/routes/project_routes.js` — current GET handler at line ~245: filters by `projectId`, optional `?type=`, `?_sort`/`?_order`. Returns flat array.
- `mock/app/routes/project_routes.test.js` — 6 existing tests for GET backlog (auth, membership, SUPER_ADMIN, type filter, 404, sort).
- `GET /api/projects` in same file — reference for paginated response pattern with `_page`, `_limit`, `q`, `is_active`.

## Implementation Plan

### 1. Update GET handler

Replace the current flat-array response with a paginated envelope:

```javascript
app.get(
    '/api/projects/:projectId/backlog',
    authMiddleware,
    requireProjectRole(db, ...ALL_PROJECT_ROLES),
    (req, res) => {
        let items = db.get('backlog-items')
            .filter({ projectId: req.params.projectId })
            .value();

        // Text search (q) — case-insensitive on title or description
        const q = (req.query.q || '').toLowerCase().trim();
        if (q) {
            items = items.filter(i =>
                i.title.toLowerCase().includes(q) ||
                (i.description && i.description.toLowerCase().includes(q))
            );
        }

        // Type filter (existing)
        const type = req.query.type;
        if (type) {
            items = items.filter(i => i.type === type);
        }

        // Status filter
        const status = req.query.status;
        if (status) {
            items = items.filter(i => i.status === status);
        }

        // Priority filter
        const priority = req.query.priority;
        if (priority) {
            items = items.filter(i => i.priority === priority);
        }

        // Sort
        const sortField = req.query._sort || 'created_at';
        const sortOrder = req.query._order || 'desc';
        items.sort((a, b) => {
            const valA = a[sortField] ?? '';
            const valB = b[sortField] ?? '';
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        // Pagination
        const total = items.length;
        const page = Math.max(1, parseInt(req.query._page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query._limit, 10) || 10));
        const start = (page - 1) * limit;
        const data = items.slice(start, start + limit);

        return res.json({ data, total, page, limit });
    }
);
```

### 2. Update existing tests

The 6 existing GET backlog tests expect a flat array response. Update them to expect `{ data, total, page, limit }` envelope:
- `res.body` → `res.body.data` for array assertions
- Add `total`, `page`, `limit` assertions where relevant

### 3. New integration tests (~12)

| # | Test | Expected |
|---|------|----------|
| 1 | Default pagination returns page 1, limit 10 | `{ page: 1, limit: 10, total: N }` |
| 2 | `_page=2&_limit=1` returns second item | Correct slice |
| 3 | `_page` beyond total returns empty data | `{ data: [], total: N }` |
| 4 | `q=maintenance` matches title | Filtered results |
| 5 | `q=` with no match returns empty | `{ data: [], total: 0 }` |
| 6 | `status=TO_DO` filters by status | Only TO_DO items |
| 7 | `status=IN_PROGRESS` with no matches | Empty data |
| 8 | `priority=CRITICAL` filters by priority | Only CRITICAL items |
| 9 | `priority=HIGH` excludes null-priority items | EPICs excluded |
| 10 | `type=STORY&status=TO_DO` combined filters | AND logic |
| 11 | `q=maint&type=EPIC` combined search + type | AND logic |
| 12 | Pagination metadata correct after filtering | `total` reflects filtered count |

## Files Changed

| File | Change |
|------|--------|
| `mock/app/routes/project_routes.js` | Update GET handler with pagination, search, status/priority filters |
| `mock/app/routes/project_routes.test.js` | Update 6 existing tests + add ~12 new tests |

## Acceptance Criteria

- [ ] Response is `{ data: BacklogItem[], total: number, page: number, limit: number }`
- [ ] `_page` is 1-indexed, defaults to 1
- [ ] `_limit` defaults to 10, max 100
- [ ] `q` searches title and description (case-insensitive)
- [ ] `type` filters by ticket type (existing behavior preserved)
- [ ] `status` filters by workflow status
- [ ] `priority` filters by priority (null-priority items excluded)
- [ ] All filters are combinable (AND logic)
- [ ] Sorting still works (`_sort`, `_order`)
- [ ] Auth and membership checks unchanged
- [ ] All existing tests updated and passing
- [ ] All new tests passing: `npm run test:mock`
