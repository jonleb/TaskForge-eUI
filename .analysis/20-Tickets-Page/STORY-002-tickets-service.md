# STORY-002: Frontend — TicketsService and Models

## Objective

Create the frontend service layer to communicate with the new `GET /api/tickets` and `GET /api/user/projects` endpoints. Extend existing models where needed.

## Existing Code

- `src/app/core/project/project.service.ts` — existing service with `getBacklog()`, `getSprints()`, `getProjects()`, etc. All project-scoped.
- `src/app/core/project/project.models.ts` — `BacklogItem`, `BacklogListParams`, `BacklogListResponse`, `Project`, `Sprint`, etc.
- `src/app/core/project/index.ts` — barrel export.
- `BacklogListParams` currently lacks `sprint_id` (the board component passes it manually via HttpParams).

## Implementation Plan

### 1. Create `src/app/core/tickets/tickets.service.ts`

New service (standalone, `providedIn: 'root'`) for cross-project ticket operations.

```typescript
@Injectable({ providedIn: 'root' })
export class TicketsService {
    private readonly http = inject(HttpClient);

    getTickets(params?: TicketsListParams): Observable<BacklogListResponse> { ... }
    getUserProjects(): Observable<Project[]> { ... }
}
```

- `getTickets(params)` — calls `GET /api/tickets` with query params built from `TicketsListParams`. Returns `BacklogListResponse` (same shape as backlog).
- `getUserProjects()` — calls `GET /api/user/projects`. Returns `Project[]`.

### 2. Create `src/app/core/tickets/tickets.models.ts`

```typescript
export interface TicketsListParams {
    project_id?: string;
    assignee_id?: string;
    sprint_id?: string;       // specific sprint ID or 'open' for ACTIVE sprints
    q?: string;
    type?: string;            // comma-separated
    status?: string;          // comma-separated
    priority?: string;        // comma-separated
    _sort?: string;
    _order?: 'asc' | 'desc';
    _page?: number;
    _limit?: number;
}
```

### 3. Create `src/app/core/tickets/index.ts`

Barrel export:
```typescript
export { TicketsService } from './tickets.service';
export { TicketsListParams } from './tickets.models';
```

### 4. Update `src/app/core/project/project.models.ts`

Add `sprint_id` to `BacklogListParams` (currently missing, used by board component):

```typescript
export interface BacklogListParams {
    // ... existing fields ...
    sprint_id?: string;
}
```

This is a minor housekeeping fix — the board already passes `sprint_id` but it's not in the interface.

### 5. Unit tests: `src/app/core/tickets/tickets.service.spec.ts`

~8 tests:

| # | Test | Expected |
|---|------|----------|
| 1 | `getTickets()` calls `GET /api/tickets` | Correct URL |
| 2 | `getTickets()` passes query params | Params serialized correctly |
| 3 | `getTickets()` with no params | No query string |
| 4 | `getTickets()` returns `BacklogListResponse` | Correct shape |
| 5 | `getUserProjects()` calls `GET /api/user/projects` | Correct URL |
| 6 | `getUserProjects()` returns `Project[]` | Correct shape |
| 7 | `getTickets()` handles error | Observable error propagated |
| 8 | `getUserProjects()` handles error | Observable error propagated |

Use `provideHttpClientTesting()` + `HttpTestingController` pattern (same as existing service tests).

## Files Modified

| File | Modification |
|------|----|
| `src/app/core/tickets/tickets.service.ts` | New file |
| `src/app/core/tickets/tickets.models.ts` | New file |
| `src/app/core/tickets/index.ts` | New file (barrel) |
| `src/app/core/tickets/tickets.service.spec.ts` | New file (~8 tests) |
| `src/app/core/project/project.models.ts` | Add `sprint_id` to `BacklogListParams` |

## Acceptance Criteria

- [ ] `TicketsService` created with `getTickets()` and `getUserProjects()` methods
- [ ] `TicketsListParams` interface created with all filter fields
- [ ] `BacklogListParams` extended with `sprint_id` field
- [ ] Barrel export in `src/app/core/tickets/index.ts`
- [ ] Unit tests for both service methods (~8 tests)
- [ ] All existing tests still pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
