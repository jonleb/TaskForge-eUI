# STORY-002: Frontend — Models & Service Update for Multi-Value Filters

## Goal

Update `BacklogListParams` to support multi-value (comma-separated string) filters for `status`, `type`, and `priority`, aligning with the backend changes from STORY-001.

## Existing Code

- `src/app/core/project/project.models.ts` — `BacklogListParams` interface with `status?: WorkflowStatus`, `type?: TicketType`, `priority?: TicketPriority` (single enum values).
- `src/app/core/project/project.service.ts` — `getBacklog(projectId, params)` passes params as HTTP query params.
- `src/app/core/project/project.service.spec.ts` — existing tests for `getBacklog`.

## Implementation Plan

### 1. Update `BacklogListParams` in `project.models.ts`

```typescript
export interface BacklogListParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
    q?: string;
    type?: string;      // was TicketType — now comma-separated (e.g., 'STORY,BUG')
    status?: string;    // was WorkflowStatus — now comma-separated (e.g., 'TO_DO,IN_PROGRESS')
    priority?: string;  // was TicketPriority — now comma-separated (e.g., 'HIGH,CRITICAL')
}
```

### 2. No changes to `ProjectService.getBacklog()`

The method already passes params as `HttpParams` — comma-separated strings are sent as-is in the query string. No code change needed.

### 3. No changes to `getEpics()`

Still passes `{ type: 'EPIC', _limit: 100 }` — single value, backward compatible.

### 4. Update unit tests

Update existing tests that assert on param types to use string values.

## Unit Tests (~3 updated)

| # | Test | Expected |
|---|------|----------|
| 1 | getBacklog sends multi-value status param | HTTP call includes `?status=TO_DO,IN_PROGRESS` |
| 2 | getBacklog sends multi-value type param | HTTP call includes `?type=STORY,BUG` |
| 3 | getEpics still works with single type | HTTP call includes `?type=EPIC` |

## Files Changed

| File | Change |
|------|--------|
| `src/app/core/project/project.models.ts` | Change `status`, `type`, `priority` fields to `string` |
| `src/app/core/project/project.service.spec.ts` | Update/add tests for multi-value params |

## Acceptance Criteria

- [ ] `BacklogListParams.status` accepts comma-separated string
- [ ] `BacklogListParams.type` accepts comma-separated string
- [ ] `BacklogListParams.priority` accepts comma-separated string
- [ ] `getBacklog()` sends multi-value params correctly in HTTP request
- [ ] `getEpics()` still works with single `type: 'EPIC'`
- [ ] All existing frontend tests still pass: `npm run test:ci`
- [ ] Build passes: `npx ng build --configuration=development`
