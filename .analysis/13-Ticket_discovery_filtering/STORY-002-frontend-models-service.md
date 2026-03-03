# STORY-002: Frontend — Backlog List Params + Service

## Goal

Add `BacklogListParams` and `BacklogListResponse` interfaces to the project models, and update `ProjectService.getBacklog()` to accept params and return the paginated envelope. This aligns the backlog API contract with the existing `ProjectListParams`/`ProjectListResponse` pattern.

## Existing Code

- `src/app/core/project/project.models.ts` — `ProjectListParams`, `ProjectListResponse`, `BacklogItem`, `TicketType`, `WorkflowStatus`, `TicketPriority`.
- `src/app/core/project/project.service.ts` — `getBacklog(projectId, type?)` returns `Observable<BacklogItem[]>`. `getEpics(projectId)` calls `getBacklog(projectId, 'EPIC')`.
- `src/app/core/project/index.ts` — barrel export.
- `src/app/core/project/project.service.spec.ts` — existing tests for `getBacklog` and `getEpics`.
- `src/app/features/projects/dashboard/dashboard.component.ts` — calls `getBacklog(projectId)` and uses `backlogItems` array directly.

## Implementation Plan

### 1. Add interfaces to `project.models.ts`

```typescript
export interface BacklogListParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
    q?: string;
    type?: TicketType;
    status?: WorkflowStatus;
    priority?: TicketPriority;
}

export interface BacklogListResponse {
    data: BacklogItem[];
    total: number;
    page: number;
    limit: number;
}
```

### 2. Update `ProjectService`

```typescript
getBacklog(projectId: string, params?: BacklogListParams): Observable<BacklogListResponse> {
    let httpParams = new HttpParams();
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                httpParams = httpParams.set(key, String(value));
            }
        });
    }
    return this.http.get<BacklogListResponse>(
        `/api/projects/${projectId}/backlog`,
        { params: httpParams },
    );
}

getEpics(projectId: string): Observable<BacklogItem[]> {
    return this.getBacklog(projectId, { type: 'EPIC', _limit: 100 }).pipe(
        map(res => res.data),
    );
}
```

### 3. Update Dashboard component

`DashboardComponent.loadBacklog()` currently expects `BacklogItem[]`. Update to unwrap `BacklogListResponse.data`:

```typescript
this.projectService.getBacklog(projectId).pipe(...)
    .subscribe({
        next: res => {
            this.backlogItems = res.data;
            ...
        },
    });
```

### 4. Update barrel export

Add `BacklogListParams`, `BacklogListResponse` to `index.ts`.

### 5. Update unit tests

- Update existing `getBacklog` test to expect `BacklogListResponse` shape.
- Update existing `getEpics` test to verify it passes `{ type: 'EPIC', _limit: 100 }` and maps `res.data`.
- Add 1 test: `getBacklog` with params sends correct query string.

## Files Changed

| File | Change |
|------|--------|
| `src/app/core/project/project.models.ts` | Add `BacklogListParams`, `BacklogListResponse` |
| `src/app/core/project/project.service.ts` | Update `getBacklog()` signature, update `getEpics()` |
| `src/app/core/project/index.ts` | Export new interfaces |
| `src/app/core/project/project.service.spec.ts` | Update existing tests, add 1 new test |
| `src/app/features/projects/dashboard/dashboard.component.ts` | Unwrap `.data` from response |
| `src/app/features/projects/dashboard/dashboard.component.spec.ts` | Update mock to return envelope |

## Acceptance Criteria

- [ ] `BacklogListParams` interface matches backend query params
- [ ] `BacklogListResponse` interface matches backend response envelope
- [ ] `getBacklog()` sends params as query string
- [ ] `getEpics()` returns `BacklogItem[]` (unwrapped from envelope)
- [ ] Dashboard still works (unwraps `.data`)
- [ ] All existing tests updated and passing
- [ ] Build passes
