# STORY-001: Backend — Membership Mutation Endpoints

## Objective

Create three endpoints to manage project members: upsert (add/change role), remove, and search candidates. Access restricted to managers (global SUPER_ADMIN + project PROJECT_ADMIN).

## Existing Code

- `mock/app/routes/project_routes.js` — contains `GET /api/projects`, `GET /api/projects/:projectId`, `GET /api/projects/:projectId/members`, `POST /api/projects`, `PATCH /api/projects/:projectId`. The 3 new endpoints are added in the same file, inside the `db.then(db => { ... })` block.
- `mock/app/middleware/authorize.js` — `requireProjectRole(db, ...roles)` checks project membership. SUPER_ADMIN automatic bypass (sets `req.projectRole = 'SUPER_ADMIN'`). `requireGlobalRole(...roles)` checks global role.
- `mock/app/middleware/auth.js` — `authMiddleware` validates JWT and sets `req.user` with `{ userId, username, role }`.
- `mock/db/db.json` — `project-members` collection (46 records, string IDs "1" to "46"). `users` collection (26 records). `projects` collection (14 records).
- `mock/app/routes/project_routes.test.js` — existing tests for GET/POST/PATCH projects and GET members. Helper `getTokenFor(username)` available.

### Key Users for Tests

| Username | ID | Global Role | Active | Project 1 (TF) Membership |
|----------|-----|-------------|--------|---------------------------|
| `superadmin` | 1 | SUPER_ADMIN | ✓ | — (bypass) |
| `projectadmin` | 2 | PROJECT_ADMIN | ✓ | PROJECT_ADMIN |
| `developer` | 4 | DEVELOPER | ✓ | DEVELOPER |
| `viewer` | 6 | VIEWER | ✓ | VIEWER |
| `rachel.moore` | 23 | VIEWER | ✓ | none |
| `leo.lopez` | 24 | VIEWER | ✓ | none |
| `inactive_user` | 7 | DEVELOPER | ✗ | none |
| `alice.smith` | 8 | SUPER_ADMIN | ✓ | none |

## Implementation Plan

### 1. Add `PUT /api/projects/:projectId/members` in `project_routes.js`

Upsert endpoint: adds a new member or updates an existing member's role.

```
PUT /api/projects/:projectId/members
  Middleware: authMiddleware, requireProjectRole(db, 'PROJECT_ADMIN')
  Body: { userId: string, role: string }
```

#### Processing Pipeline

1. Validate body: userId required (non-empty string), role required (must be in ALL_PROJECT_ROLES)
2. Verify target user exists and is active — 400 if not found or inactive
3. SUPER_ADMIN protection: if target user has global role SUPER_ADMIN and requester is not SUPER_ADMIN → 403
4. Upsert: find existing membership → update role (200) or create new with auto-incremented id and joined_at = now() (201)
5. Response: enriched member `{ id, userId, role, joined_at, firstName, lastName, email }`

#### Error Responses

| Status | Condition | Body |
|--------|-----------|------|
| 400 | userId missing | `{ "message": "userId is required" }` |
| 400 | Invalid role | `{ "message": "Invalid role. Must be one of: PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER, VIEWER" }` |
| 400 | User not found or inactive | `{ "message": "User not found or inactive" }` |
| 403 | PROJECT_ADMIN tries to mutate SUPER_ADMIN | `{ "message": "Cannot modify membership of a super administrator" }` |
| 403 | Insufficient role | `{ "message": "Forbidden" }` (via `requireProjectRole`) |

### 2. Add `DELETE /api/projects/:projectId/members/:userId` in `project_routes.js`

#### Processing Pipeline

1. Find membership — 404 if not found
2. SUPER_ADMIN protection: if target user has global role SUPER_ADMIN and requester is not SUPER_ADMIN → 403
3. Delete the project-member record
4. Return 204 (no content)

### 3. Add `GET /api/projects/:projectId/members/candidates` in `project_routes.js`

**Important**: this route must be declared BEFORE `GET /api/projects/:projectId/members` to avoid Express interpreting `candidates` as a parameter.

#### Processing Pipeline

1. Extract `q` query parameter — if absent or length < 2 → return `[]`
2. Get IDs of current project members
3. Search active users matching query (firstName, lastName, or email, case-insensitive), excluding existing members
4. Limit to 10 results
5. Map to response format (without password): `{ id, firstName, lastName, email, role }`

### 4. Helper function: `enrichMember(db, member)`

Extract enrichment logic (already present in GET members) into a reusable function. Refactor existing GET members to use it.

### 5. Integration tests in `project_routes.test.js`

~27 tests across 3 describe blocks covering PUT upsert, DELETE, and GET candidates with all success/error/auth scenarios.

## Files Modified

| File | Modification |
|------|----|
| `mock/app/routes/project_routes.js` | Add 3 endpoints + `enrichMember()` helper |
| `mock/app/routes/project_routes.test.js` | Add 3 describe blocks (~27 tests) |

## Acceptance Criteria

- [x] PUT upsert creates new member (201) with `joined_at` and returns enriched member
- [x] PUT upsert updates existing member's role (200) and returns enriched member
- [x] PUT validates `userId` (active existing user) — 400 otherwise
- [x] PUT validates `role` (valid enum) — 400 otherwise
- [x] PUT prevents PROJECT_ADMIN from mutating SUPER_ADMIN membership — 403
- [x] PUT allows SUPER_ADMIN to mutate another SUPER_ADMIN
- [x] DELETE removes membership (204)
- [x] DELETE returns 404 if membership not found
- [x] DELETE prevents PROJECT_ADMIN from removing SUPER_ADMIN membership — 403
- [x] GET candidates returns active non-member users matching search
- [x] GET candidates excludes existing project members
- [x] GET candidates returns max 10 results
- [x] GET candidates returns `[]` if `q` absent or < 2 characters
- [x] GET candidates does not return inactive users
- [x] GET candidates does not return the `password` field
- [x] Only SUPER_ADMIN and PROJECT_ADMIN have access to all 3 endpoints (DEVELOPER/REPORTER/VIEWER → 403)
- [x] Without token → 401 on all 3 endpoints
- [x] Integration tests cover all cases (~27 tests)
- [x] All mock server tests pass (`npm run test:mock`)
