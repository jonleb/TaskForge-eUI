# STORY-002: Mock Backend — Authorization Middleware

## Goal

Create reusable authorization middleware functions (`requireGlobalRole`, `requireProjectRole`) and project API routes so that backend endpoints can enforce role-based access. This is the backend foundation for all RBAC enforcement.

## Prerequisites

- STORY-001 (projects & project-members seed data) — done
- Existing `authMiddleware` in `mock/app/middleware/auth.js` — attaches `req.user = { userId, role }` after token validation

## Current State

- `authMiddleware` handles authentication (401 if no/invalid token)
- No authorization layer exists — any authenticated user can access any endpoint
- `req.user.role` contains the user's global role (from the token payload)
- `projects` and `project-members` collections exist in `mock/db/db.json`

## Implementation Plan

### 1. Create `mock/app/middleware/authorize.js`

Two factory functions that return Express middleware:

#### `requireGlobalRole(...roles)`
- Assumes `authMiddleware` has already run (`req.user` exists)
- Checks if `req.user.role` is in the allowed `roles` list
- If yes: calls `next()`
- If no: returns `403 { message: "Forbidden" }`

```javascript
function requireGlobalRole(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}
```

#### `requireProjectRole(db, ...roles)`
- Assumes `authMiddleware` has already run
- Reads `projectId` from `req.params.projectId` or `req.body.projectId` or `req.query.projectId`
- If no `projectId` found: returns `400 { message: "Project ID is required" }`
- If `req.user.role === 'SUPER_ADMIN'`: allows access immediately (bypass)
- Otherwise: looks up `project-members` for `{ projectId, userId: req.user.userId }`
  - If no membership found: returns `403 { message: "Forbidden" }`
  - If membership found but role not in allowed list: returns `403 { message: "Forbidden" }`
  - If membership found and role is allowed: attaches `req.projectRole = member.role` and calls `next()`

Note: `requireProjectRole` needs access to the `db` instance. Since the middleware is created inside the route registration function (where `db` is available), we pass `db` as the first argument.

### 2. Create `mock/app/routes/project_routes.js`

Register in `mock/app/routes/index.js`.

#### `GET /api/projects`
- Protected (authMiddleware)
- If SUPER_ADMIN: returns all active projects
- Otherwise: returns active projects where the user is a member
- Response: array of project objects (without internal fields)

#### `GET /api/projects/:projectId`
- Protected (authMiddleware)
- If SUPER_ADMIN: returns the project
- Otherwise: checks membership, returns 403 if not a member
- Returns 404 if project not found

#### `GET /api/projects/:projectId/members`
- Protected (authMiddleware + requireProjectRole with any project role)
- Returns all members of the project with user details (firstName, lastName, email, role)
- SUPER_ADMIN can access any project's members

### 3. Update `mock/app/routes/index.js`

Add `projectRoutes(app, db)` registration.

### 4. Tests

Create `mock/app/routes/project_routes.test.js` with Jest + supertest:

**Authorization middleware tests:**
- `requireGlobalRole('SUPER_ADMIN')` allows SUPER_ADMIN
- `requireGlobalRole('SUPER_ADMIN')` blocks non-SUPER_ADMIN with 403
- `requireProjectRole` allows SUPER_ADMIN without membership
- `requireProjectRole` allows project member with matching role
- `requireProjectRole` blocks non-member with 403
- `requireProjectRole` blocks member with wrong role with 403

**Project routes tests:**
- `GET /api/projects` returns only user's projects for regular user
- `GET /api/projects` returns all active projects for SUPER_ADMIN
- `GET /api/projects` does not return inactive projects
- `GET /api/projects/:projectId` returns project for member
- `GET /api/projects/:projectId` returns project for SUPER_ADMIN
- `GET /api/projects/:projectId` returns 403 for non-member
- `GET /api/projects/:projectId` returns 404 for non-existent project
- `GET /api/projects/:projectId/members` returns members for authorized user
- `GET /api/projects/:projectId/members` returns 403 for non-member
- All routes return 401 without token

## Files to Create
- `mock/app/middleware/authorize.js`
- `mock/app/routes/project_routes.js`
- `mock/app/routes/project_routes.test.js`

## Files to Modify
- `mock/app/routes/index.js` — register project routes

## Acceptance Criteria

- [ ] `requireGlobalRole('SUPER_ADMIN')` blocks non-SUPER_ADMIN users with 403
- [ ] `requireProjectRole(...)` allows SUPER_ADMIN without membership
- [ ] `requireProjectRole(...)` blocks users who are not project members with 403
- [ ] `requireProjectRole(...)` blocks members whose project role is not in the allowed list
- [ ] `GET /api/projects` returns only projects the user belongs to (or all active for SUPER_ADMIN)
- [ ] `GET /api/projects/:projectId` returns 403 for non-members, 404 for missing projects
- [ ] `GET /api/projects/:projectId/members` returns members for authorized users
- [ ] All existing tests still pass: `npm run test:mock`
- [ ] New tests cover all authorization scenarios
