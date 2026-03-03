# STORY-002: Frontend — MembershipService and Models

## Objective

Add the interfaces, project roles constant, and service methods needed to communicate with the 3 membership mutation endpoints created in STORY-001. Extend the existing `ProjectService` and models in `project.models.ts`.

## Existing Code

- `src/app/core/project/project.models.ts` — interfaces `Project`, `ProjectMember`, `CreateProjectPayload`, `UpdateProjectPayload`, `UserInfo`, `ProjectListParams`, `ProjectListResponse`. No `UpsertMemberPayload`, `MemberCandidate`, or `PROJECT_ROLES` constant yet.
- `src/app/core/project/project.service.ts` — `ProjectService` with `getProjects()`, `getProject()`, `getProjectMembers()`, `createProject()`, `updateProject()`, `getUser()`. No `upsertMember()`, `removeMember()`, `searchCandidates()` methods yet.
- `src/app/core/project/index.ts` — barrel export. Must export new types.
- `src/app/core/project/project.service.spec.ts` — existing tests using `HttpTestingController` + vitest.

## Implementation Plan

### 1. Update `src/app/core/project/project.models.ts`

```typescript
export interface UpsertMemberPayload {
    userId: string;
    role: string;
}

export interface MemberCandidate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export const PROJECT_ROLES = [
    'PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER', 'REPORTER', 'VIEWER',
] as const;

export type ProjectRole = typeof PROJECT_ROLES[number];
```

### 2. Update `src/app/core/project/project.service.ts`

Add 3 methods: `upsertMember()`, `removeMember()`, `searchCandidates()`.

### 3. Update barrel export (`index.ts`)

### 4. Unit tests (~9 tests)

## Files Modified

| File | Modification |
|------|----|
| `src/app/core/project/project.models.ts` | Add `UpsertMemberPayload`, `MemberCandidate`, `PROJECT_ROLES`, `ProjectRole` |
| `src/app/core/project/project.service.ts` | Add `upsertMember()`, `removeMember()`, `searchCandidates()` |
| `src/app/core/project/index.ts` | Export new types |
| `src/app/core/project/project.service.spec.ts` | Add ~9 tests for 3 new methods |

## Acceptance Criteria

- [x] `UpsertMemberPayload` interface created with `userId` and `role`
- [x] `MemberCandidate` interface created with `id`, `firstName`, `lastName`, `email`, `role`
- [x] `PROJECT_ROLES` constant exported (tuple `as const`)
- [x] `ProjectRole` type union exported
- [x] `upsertMember()` calls `PUT /api/projects/:projectId/members` with payload
- [x] `removeMember()` calls `DELETE /api/projects/:projectId/members/:userId`
- [x] `searchCandidates()` calls `GET /api/projects/:projectId/members/candidates?q=...`
- [x] Barrel export (`index.ts`) updated
- [x] Unit tests cover all 3 methods (~9 tests)
- [x] All frontend tests pass (`npm run test:ci`)
- [x] Build passes (`npx ng build --configuration=development`)
