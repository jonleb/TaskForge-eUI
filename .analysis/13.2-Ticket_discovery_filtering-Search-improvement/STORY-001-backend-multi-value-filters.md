# STORY-001: Backend — Multi-Value Filter Support

## Goal

Extend `GET /api/projects/:projectId/backlog` to accept comma-separated values for `status`, `type`, and `priority` filters, enabling multi-value selection from the frontend (e.g., `?status=TO_DO,IN_PROGRESS`).

## Existing Code

- `mock/app/routes/project_routes.js` — backlog GET endpoint (line ~253). Currently filters `status`, `type`, `priority` as single exact-match values.
- `mock/app/routes/project_routes.test.js` — 18 existing integration tests for the backlog endpoint.

## Implementation Plan

### 1. Update filter logic in the GET handler

Replace the three single-value filter blocks with multi-value logic:

```javascript
// Current (single value):
const status = req.query.status;
if (status) {
    items = items.filter(i => i.status === status);
}

// New (multi-value, comma-separated):
const status = req.query.status;
if (status) {
    const statusValues = status.split(',').map(s => s.trim()).filter(Boolean);
    if (statusValues.length > 0) {
        items = items.filter(i => statusValues.includes(i.status));
    }
}
```

Apply the same pattern to `type` and `priority`. For `priority`, items with `null` priority are still excluded when the filter is active (same as current behavior).

### 2. Backward compatibility

Single-value usage (e.g., `?status=TO_DO`) still works because `"TO_DO".split(',')` returns `["TO_DO"]`.

### 3. No changes to response format

The envelope `{ data, total, page, limit }` remains unchanged.

## Integration Tests (~8 new)

| # | Test | Expected |
|---|------|----------|
| 1 | `?status=TO_DO,IN_PROGRESS` | Returns items with status TO_DO or IN_PROGRESS |
| 2 | `?type=STORY,BUG` | Returns items with type STORY or BUG |
| 3 | `?priority=HIGH,CRITICAL` | Returns items with priority HIGH or CRITICAL |
| 4 | `?status=DONE` (single value) | Backward compatible, returns only DONE items |
| 5 | `?status=TO_DO,IN_PROGRESS&type=STORY` | AND across dimensions, OR within: TO_DO or IN_PROGRESS stories |
| 6 | `?status=TO_DO,DONE&q=login` | Multi-value + text search combined |
| 7 | `?status=` (empty) | No filter applied, returns all |
| 8 | `?priority=HIGH,CRITICAL` excludes null-priority items | Items with null priority not returned |

## Files Changed

| File | Change |
|------|--------|
| `mock/app/routes/project_routes.js` | Update status/type/priority filter logic to split on comma |
| `mock/app/routes/project_routes.test.js` | Add ~8 integration tests |

## Acceptance Criteria

- [ ] `?status=TO_DO,IN_PROGRESS` returns items matching either status
- [ ] `?type=STORY,BUG` returns items matching either type
- [ ] `?priority=HIGH,CRITICAL` returns items matching either priority
- [ ] Single-value usage remains backward compatible
- [ ] Multi-value filters combine with AND logic across dimensions
- [ ] Empty filter values are ignored
- [ ] Null-priority items excluded when priority filter is active
- [ ] All existing backend tests still pass: `npm run test:mock`
