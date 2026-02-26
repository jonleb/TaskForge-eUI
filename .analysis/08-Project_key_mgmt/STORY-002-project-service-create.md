# STORY-002: Frontend — Project Service Create Method

## Goal

Add a `createProject()` method to the existing `ProjectService` and a `CreateProjectPayload` interface to the project models. This wires the frontend to the `POST /api/projects` endpoint created in STORY-001.

## Existing Code

- `src/app/core/project/project.service.ts` — has `getProjects()`, `getProject()`, `getProjectMembers()`.
- `src/app/core/project/project.models.ts` — has `Project`, `ProjectMember` interfaces.
- `src/app/core/project/index.ts` — barrel export.
- `src/app/core/project/project.service.spec.ts` — 8 existing tests using `HttpClientTestingModule`.

## Implementation Plan

### 1. Add `CreateProjectPayload` to `project.models.ts`

```ts
export interface CreateProjectPayload {
    name: string;
    description?: string;
    key?: string;
}
```

### 2. Add `createProject()` to `project.service.ts`

```ts
createProject(payload: CreateProjectPayload): Observable<Project> {
    return this.http.post<Project>('/api/projects', payload);
}
```

### 3. Export from `index.ts`

Add `CreateProjectPayload` to the barrel export.

### 4. Add unit tests to `project.service.spec.ts`

| # | Test | Expected |
|---|------|----------|
| 1 | Sends POST to `/api/projects` with payload | HttpTestingController verifies method + URL + body |
| 2 | Returns typed `Project` observable | Response matches `Project` interface |

## Files Changed

| File | Change |
|------|--------|
| `src/app/core/project/project.models.ts` | Add `CreateProjectPayload` interface |
| `src/app/core/project/project.service.ts` | Add `createProject()` method |
| `src/app/core/project/index.ts` | Export `CreateProjectPayload` |
| `src/app/core/project/project.service.spec.ts` | Add 2 test cases |

## Acceptance Criteria

- [ ] `createProject()` sends POST to `/api/projects` with correct payload
- [ ] Returns typed `Observable<Project>`
- [ ] `CreateProjectPayload` exported from barrel
- [ ] Unit tests pass
- [ ] All existing tests still pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
