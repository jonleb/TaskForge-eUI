# STORY-001: Backend — Create Project Endpoint

## Goal

Add a `POST /api/projects` endpoint to the mock server that allows SUPER_ADMIN users to create a new project with key generation, uniqueness validation, and proper error responses.

## Existing Code

- `mock/app/routes/project_routes.js` — has `GET /api/projects`, `GET /api/projects/:projectId`, `GET /api/projects/:projectId/members`.
- `mock/app/middleware/auth.js` — `authMiddleware` validates JWT and sets `req.user`.
- `mock/app/middleware/authorize.js` — `requireGlobalRole(...roles)` checks `req.user.role`.
- `mock/db/db.json` — `projects` collection with 3 seed records (TF, DEMO, INFRA). IDs are string numbers ("1", "2", "3").
- Pattern reference: `POST /api/admin/users` in `admin_user_routes.js` — same auth + role guard, auto-increment ID, uniqueness checks, 201/400/409 responses.

## Implementation Plan

### 1. Add `POST /api/projects` to `mock/app/routes/project_routes.js`

Inside the existing `db.then(db => { ... })` block, after the existing routes:

```
POST /api/projects
  Middleware: authMiddleware, requireGlobalRole('SUPER_ADMIN')
  Body: { name: string, description?: string, key?: string }
```

#### Validation rules

| Field | Rule | Error |
|-------|------|-------|
| `name` | Required, non-empty after trim, min 2 chars | 400 `"Project name is required (min 2 characters)"` |
| `name` | Unique (case-insensitive) among all projects | 409 `"A project with this name already exists"` |
| `key` (if provided) | Must match `^[A-Z0-9]{2,10}$` after uppercase | 400 `"Project key must be 2–10 uppercase alphanumeric characters"` |
| `key` (if provided) | Unique (case-insensitive) among all projects | 409 `"A project with this key already exists"` |
| `key` (if omitted) | Auto-generate from name | — |

#### Key auto-generation algorithm

```
function generateProjectKey(name, existingKeys):
  1. Split name by whitespace, take first letter of each word, uppercase
  2. If result < 2 chars, take first 2 chars of name instead, uppercase
  3. Truncate to 5 chars
  4. If key exists in existingKeys (case-insensitive):
     - Append incrementing digit: KEY1, KEY2, KEY3...
     - Try up to 99 times
  5. Return generated key
```

#### Success response

```
201 Created
{
  "id": "4",
  "key": "NP",
  "name": "New Project",
  "description": "A new project",
  "created_by": "1",
  "created_at": "2026-02-26T...",
  "updated_at": "2026-02-26T...",
  "is_active": true
}
```

#### Error responses

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Missing/short name | `{ "message": "Project name is required (min 2 characters)" }` |
| 400 | Invalid key format | `{ "message": "Project key must be 2–10 uppercase alphanumeric characters" }` |
| 403 | Not SUPER_ADMIN | `{ "message": "Forbidden" }` (from `requireGlobalRole`) |
| 409 | Duplicate name | `{ "message": "A project with this name already exists" }` |
| 409 | Duplicate key | `{ "message": "A project with this key already exists" }` |

### 2. Helper function: `generateProjectKey(name, existingKeys)`

Extracted as a module-level function inside `project_routes.js` (same pattern as `generateTemporaryPassword` in `admin_user_routes.js`).

### 3. Integration tests in `mock/app/routes/project_routes.test.js`

Add a new `describe('POST /api/projects', ...)` block with these test cases:

| # | Test | Expected |
|---|------|----------|
| 1 | Create with manual key | 201, returned project has the provided key |
| 2 | Create with auto-generated key | 201, returned project has a generated key |
| 3 | Auto-key collision appends digit | 201, key ends with digit when base collides |
| 4 | Missing name | 400 |
| 5 | Name too short (1 char) | 400 |
| 6 | Invalid key format — too short | 400 |
| 7 | Invalid key format — too long | 400 |
| 8 | Invalid key format — special chars | 400 |
| 9 | Duplicate name (case-insensitive) | 409 |
| 10 | Duplicate key (case-insensitive) | 409 |
| 11 | Non-SUPER_ADMIN user | 403 |
| 12 | No auth token | 401 |

Tests use the existing `getTokenFor()` helper. Tests that create projects should use unique names/keys to avoid interference with other tests.

**Important**: After running tests, restore `mock/db/db.json` with `git checkout mock/db/db.json` since the tests mutate the DB file.

## Files Changed

| File | Change |
|------|--------|
| `mock/app/routes/project_routes.js` | Add `POST /api/projects` route + `generateProjectKey()` helper |
| `mock/app/routes/project_routes.test.js` | Add `describe('POST /api/projects', ...)` with 12 test cases |

## Acceptance Criteria

- [ ] SUPER_ADMIN can create a project with a manual key → 201
- [ ] SUPER_ADMIN can create a project without a key (auto-generated) → 201
- [ ] Auto-generated key handles collisions by appending digits
- [ ] Missing or too-short name → 400
- [ ] Invalid key format → 400
- [ ] Duplicate name (case-insensitive) → 409
- [ ] Duplicate key (case-insensitive) → 409
- [ ] Non-SUPER_ADMIN → 403
- [ ] No token → 401
- [ ] Created project has correct `created_by`, `created_at`, `is_active: true`
- [ ] All existing tests still pass (`npm run test:mock`)
- [ ] DB restored after test run (`git checkout mock/db/db.json`)
