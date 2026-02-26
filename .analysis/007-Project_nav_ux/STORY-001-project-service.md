# STORY-001: Frontend — Project Service

## Goal

Create an Angular service that encapsulates all HTTP calls to the project endpoints. This service is the single point of contact between frontend components and the project API.

## Current State

- Backend endpoints already exist (from RBAC branch):
  - `GET /api/projects` — returns active projects filtered by membership (SUPER_ADMIN sees all)
  - `GET /api/projects/:projectId` — returns a single project (404 if not found, 403 if no access)
  - `GET /api/projects/:projectId/members` — returns enriched members with user details (firstName, lastName, email)
- `PermissionService` already calls `GET /api/projects/:projectId/members` internally for role checks, using a private `ProjectMemberResponse` interface with only `userId` and `role`.
- Auth models already define `ProjectRole` and `ProjectMembership` types in `src/app/core/auth/auth.models.ts`.
- No frontend project service or project models exist yet.
- No `src/app/core/project/` folder exists.

## Analysis

### Backend response shapes

#### `GET /api/projects` → `Project[]`
```json
[
  {
    "id": "1",
    "key": "TF",
    "name": "TaskForge Core",
    "description": "Main product — task and project management platform",
    "created_by": "1",
    "created_at": "2025-01-20T09:00:00.000Z",
    "updated_at": "2025-06-01T10:00:00.000Z",
    "is_active": true
  }
]
```

#### `GET /api/projects/:projectId` → `Project`
Same shape as above, single object. Returns 404 or 403 on error.

#### `GET /api/projects/:projectId/members` → `ProjectMember[]`
```json
[
  {
    "id": "1",
    "userId": "2",
    "role": "PROJECT_ADMIN",
    "joined_at": "2025-01-20T09:00:00.000Z",
    "firstName": "Bob",
    "lastName": "Smith",
    "email": "bob.smith@taskforge.local"
  }
]
```

Note: The members endpoint returns enriched data (with user details). The `PermissionService` only uses `userId` and `role` from this response. The new `ProjectService` should use the full enriched shape since the portfolio and dashboard pages will need user details.

### Model design

Create new models in `src/app/core/project/project.models.ts`:

- `Project` — maps to the project object from the API
- `ProjectMember` — maps to the enriched member response (includes firstName, lastName, email)

These are separate from the auth models (`ProjectRole`, `ProjectMembership`) which are about permission checking. The new models are about data display.

### Service design

`ProjectService` in `src/app/core/project/project.service.ts`:
- `providedIn: 'root'`
- Inject `HttpClient`
- Three methods mapping 1:1 to the three endpoints
- No caching — keep it simple for now. Caching can be added later if needed.
- No error handling in the service — let consumers handle errors (consistent with `AdminUserService` pattern)

### File structure

```
src/app/core/project/
├── index.ts                  (barrel export)
├── project.models.ts         (Project, ProjectMember interfaces)
├── project.service.ts        (ProjectService)
└── project.service.spec.ts   (unit tests)
```

### Relationship with PermissionService

`PermissionService.hasProjectRole()` already calls the members endpoint. The new `ProjectService.getProjectMembers()` will also call the same endpoint but return the full enriched data. This is intentional — `PermissionService` is for access decisions (lightweight), `ProjectService` is for data display (full details). No refactoring of `PermissionService` is needed.

## Implementation Plan

1. Create `src/app/core/project/project.models.ts` with `Project` and `ProjectMember` interfaces.
2. Create `src/app/core/project/project.service.ts` with `getProjects()`, `getProject()`, `getProjectMembers()`.
3. Create `src/app/core/project/index.ts` barrel export.
4. Create `src/app/core/project/project.service.spec.ts` with unit tests covering:
   - `getProjects()` calls `GET /api/projects` and returns typed array
   - `getProject(id)` calls `GET /api/projects/:id` and returns typed object
   - `getProjectMembers(id)` calls `GET /api/projects/:id/members` and returns typed array
5. Verify build passes and all existing tests still pass.

## Acceptance Criteria

- [ ] `Project` interface matches the backend response shape (id, key, name, description, created_by, created_at, updated_at, is_active)
- [ ] `ProjectMember` interface matches the enriched members response (id, userId, role, joined_at, firstName, lastName, email)
- [ ] `getProjects()` calls `GET /api/projects` and returns `Observable<Project[]>`
- [ ] `getProject(projectId)` calls `GET /api/projects/:projectId` and returns `Observable<Project>`
- [ ] `getProjectMembers(projectId)` calls `GET /api/projects/:projectId/members` and returns `Observable<ProjectMember[]>`
- [ ] Barrel export exposes `ProjectService`, `Project`, `ProjectMember`
- [ ] Unit tests cover all three methods
- [ ] Build passes: `npx ng build --configuration=development`
- [ ] All existing tests still pass: `npm run ng test`
