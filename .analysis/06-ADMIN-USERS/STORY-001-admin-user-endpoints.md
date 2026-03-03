# STORY-001: Mock Backend — Admin User Management Endpoints

## Goal

Create a new set of admin-only user management endpoints under `/api/admin/users` that enforce SUPER_ADMIN authorization and support server-side pagination, search, filtering, sorting, user creation with temporary password, password reset, deactivation (with last-SUPER_ADMIN safeguard), and reactivation.

## Prerequisites

- `05-RBAC` branch complete (auth middleware, authorization middleware, seed users)
- `mock/app/middleware/auth.js` — attaches `req.user = { userId, role }` after token validation
- `mock/app/middleware/authorize.js` — provides `requireGlobalRole(...roles)` factory
- `mock/db/db.json` has 77+ seed users with fields: `id`, `username`, `password`, `email`, `role`, `global_role`, `firstName`, `lastName`, `is_active`, `created_at`, `updated_at`
- Multiple active SUPER_ADMIN users exist (ids 1, 8, 14, 20, 26, 32, 38, 50, 56, 62, 68, 74)
- Several inactive users exist (ids 7, 9, 21, 24, 37, 44, 45, 54, 55)

## Current State

- `mock/app/routes/user_routes.js` has basic CRUD routes under `/api/users` with `authMiddleware` only (no SUPER_ADMIN check, no pagination, no search, no business logic)
- These existing routes will be kept as-is for non-admin use cases (e.g. user profile lookup)
- No `/api/admin/users` routes exist

## Implementation Plan

### 1. Create `mock/app/routes/admin_user_routes.js`

New file with all admin user management endpoints. All endpoints use the middleware chain: `authMiddleware` → `requireGlobalRole('SUPER_ADMIN')`.

---

#### `GET /api/admin/users` — List users with pagination, search, sort, filter

**Query parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `_page` | number | `1` | Page number (1-indexed) |
| `_limit` | number | `10` | Items per page |
| `_sort` | string | `created_at` | Field to sort by |
| `_order` | string | `desc` | Sort direction: `asc` or `desc` |
| `q` | string | `""` | Search term (case-insensitive match against `username`, `firstName`, `lastName`, `email`) |
| `is_active` | string | (none) | Filter by status: `"true"` or `"false"`. Omit for all users. |

**Response (200):**
```json
{
    "data": [
        {
            "id": "1",
            "username": "superadmin",
            "email": "superadmin@taskforge.local",
            "role": "SUPER_ADMIN",
            "global_role": "SUPER_ADMIN",
            "firstName": "Super",
            "lastName": "Admin",
            "is_active": true,
            "created_at": "2025-01-15T10:00:00.000Z",
            "updated_at": "2025-01-15T10:00:00.000Z"
        }
    ],
    "total": 77,
    "page": 1,
    "limit": 10
}
```

**Implementation logic:**
```javascript
app.get('/api/admin/users', authMiddleware, requireGlobalRole('SUPER_ADMIN'), (req, res) => {
    let users = db.get('users').value();

    // 1. Filter by is_active (if provided)
    const isActiveParam = req.query.is_active;
    if (isActiveParam === 'true') {
        users = users.filter(u => u.is_active === true);
    } else if (isActiveParam === 'false') {
        users = users.filter(u => u.is_active === false);
    }

    // 2. Search (case-insensitive across username, firstName, lastName, email)
    const q = (req.query.q || '').trim().toLowerCase();
    if (q) {
        users = users.filter(u =>
            u.username.toLowerCase().includes(q) ||
            u.firstName.toLowerCase().includes(q) ||
            u.lastName.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
        );
    }

    // 3. Total count (after filter + search, before pagination)
    const total = users.length;

    // 4. Sort
    const sortField = req.query._sort || 'created_at';
    const sortOrder = req.query._order || 'desc';
    users.sort((a, b) => {
        const valA = (a[sortField] || '').toString().toLowerCase();
        const valB = (b[sortField] || '').toString().toLowerCase();
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    // 5. Paginate
    const page = Math.max(1, parseInt(req.query._page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query._limit, 10) || 10));
    const start = (page - 1) * limit;
    const paginatedUsers = users.slice(start, start + limit);

    // 6. Strip passwords
    const data = paginatedUsers.map(({ password, ...rest }) => rest);

    return res.json({ data, total, page, limit });
});
```

---

#### `GET /api/admin/users/:userId` — Get single user

**Response (200):** User object without `password` field.

**Response (404):** `{ "message": "User not found" }`

```javascript
app.get('/api/admin/users/:userId', authMiddleware, requireGlobalRole('SUPER_ADMIN'), (req, res) => {
    const user = db.get('users').find({ id: req.params.userId }).value();
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { password, ...rest } = user;
    return res.json(rest);
});
```

---

#### `POST /api/admin/users` — Create user

**Request body:**
```json
{
    "username": "newuser",
    "firstName": "New",
    "lastName": "User",
    "email": "new.user@taskforge.local",
    "role": "DEVELOPER"
}
```

**Validation rules:**
- All fields required → 400 `{ "message": "All fields are required: username, firstName, lastName, email, role" }`
- `role` must be one of: `SUPER_ADMIN`, `PROJECT_ADMIN`, `PRODUCT_OWNER`, `DEVELOPER`, `REPORTER`, `VIEWER` → 400 `{ "message": "Invalid role" }`
- `email` normalized: `trim().toLowerCase()`
- `username` normalized: `trim().toLowerCase()`
- `email` must be unique (case-insensitive) → 409 `{ "message": "A user with this email already exists" }`
- `username` must be unique (case-insensitive) → 409 `{ "message": "A user with this username already exists" }`

**Temporary password generation:**
```javascript
function generateTemporaryPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
```

**New user record:**
```javascript
const newUser = {
    id: String(maxId + 1),  // auto-increment based on existing max id
    username: normalizedUsername,
    password: temporaryPassword,
    email: normalizedEmail,
    role: role,
    global_role: role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : role,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};
```

**Response (201):**
```json
{
    "user": { /* user without password */ },
    "temporaryPassword": "aB3dEf7hIj2k"
}
```

---

#### `POST /api/admin/users/:userId/reset-password` — Reset password

**Logic:**
1. Find user by `id` → 404 if not found
2. Generate new temporary password
3. Update user's `password` field in DB
4. Update `updated_at` timestamp

**Response (200):**
```json
{
    "temporaryPassword": "xY9zAb3cDe4f"
}
```

---

#### `PATCH /api/admin/users/:userId/deactivate` — Deactivate user

**Logic:**
1. Find user by `id` → 404 if not found
2. If user is already inactive → 400 `{ "message": "User is already inactive" }`
3. If `req.user.userId === userId` (self-deactivation) → 409 `{ "message": "You cannot deactivate your own account" }`
4. If user is SUPER_ADMIN, count remaining active SUPER_ADMINs. If this is the last one → 409 `{ "message": "Cannot deactivate the last active super admin" }`
5. Set `is_active: false`, update `updated_at`
6. Write to DB

**Response (200):** Updated user without `password`.

**Last-SUPER_ADMIN check:**
```javascript
if (user.role === 'SUPER_ADMIN') {
    const activeSuperAdmins = db.get('users')
        .filter(u => u.role === 'SUPER_ADMIN' && u.is_active === true)
        .value();
    if (activeSuperAdmins.length <= 1) {
        return res.status(409).json({ message: 'Cannot deactivate the last active super admin' });
    }
}
```

---

#### `PATCH /api/admin/users/:userId/reactivate` — Reactivate user

**Logic:**
1. Find user by `id` → 404 if not found
2. If user is already active → 400 `{ "message": "User is already active" }`
3. Set `is_active: true`, update `updated_at`
4. Write to DB

**Response (200):** Updated user without `password`.

---

### 2. Create `mock/app/routes/admin_user_routes.js` — Helper function

Extract `generateTemporaryPassword()` as a module-level function at the top of the file.

Extract `stripPassword(user)` helper:
```javascript
function stripPassword(user) {
    const { password, ...rest } = user;
    return rest;
}
```

### 3. Register in `mock/app/routes/index.js`

```javascript
const adminUserRoutes = require('./admin_user_routes');

module.exports = function (app, db) {
    authRoutes(app, db);
    userRoutes(app, db);
    projectRoutes(app, db);
    adminUserRoutes(app, db);
};
```

### 4. Keep existing `user_routes.js` unchanged

The existing `/api/users` and `/api/users/:userId` routes remain for non-admin use cases (user profile lookup, eUI UserService integration). They are protected by `authMiddleware` only — any authenticated user can access them.

---

## Test Plan — `mock/app/routes/admin_user_routes.test.js`

Following the same pattern as `auth_routes.test.js` and `project_routes.test.js`.

### Setup

```javascript
const request = require('supertest');
const createApp = require('../../app');

let app;
let db;

beforeAll(async () => {
    const instance = createApp('mock/db/db.json');
    app = instance.app;
    db = await instance.db;
});

async function getTokenFor(username) {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ username, password: 'SecurePassword!123' });
    return res.body.accessToken;
}
```

### Test cases

#### Authorization (all endpoints)

- `GET /api/admin/users` returns 401 without token
- `GET /api/admin/users` returns 403 for non-SUPER_ADMIN (e.g. `developer`)
- `GET /api/admin/users` returns 200 for SUPER_ADMIN
- `POST /api/admin/users` returns 403 for non-SUPER_ADMIN
- `POST /api/admin/users/:userId/reset-password` returns 403 for non-SUPER_ADMIN
- `PATCH /api/admin/users/:userId/deactivate` returns 403 for non-SUPER_ADMIN
- `PATCH /api/admin/users/:userId/reactivate` returns 403 for non-SUPER_ADMIN

#### `GET /api/admin/users` — List

- Returns paginated results with default page=1, limit=10
- Response contains `data`, `total`, `page`, `limit` fields
- `data` items do not contain `password` field
- `_page=2&_limit=5` returns correct slice
- `q=super` returns only users matching "super" in username/firstName/lastName/email
- `q` search is case-insensitive
- `is_active=true` returns only active users
- `is_active=false` returns only inactive users
- `_sort=username&_order=asc` returns users sorted by username ascending
- `_sort=email&_order=desc` returns users sorted by email descending
- Default sort is `created_at` desc
- Combined: `q=admin&is_active=true&_page=1&_limit=5` works correctly

#### `GET /api/admin/users/:userId` — Get single user

- Returns user without password for valid id
- Returns 404 for non-existent id

#### `POST /api/admin/users` — Create user

- Returns 201 with user and temporaryPassword for valid input
- Created user does not contain password in response
- `temporaryPassword` is a 12-character string
- Returns 400 when required fields are missing (test each: username, firstName, lastName, email, role)
- Returns 400 for invalid role
- Returns 409 for duplicate email (case-insensitive)
- Returns 409 for duplicate username (case-insensitive)
- Email is normalized to lowercase
- Username is normalized to lowercase
- Created user has `is_active: true`
- Created user has `created_at` and `updated_at` timestamps
- Created user has correct `global_role` derived from `role`
- New user can be retrieved via `GET /api/admin/users/:userId`

#### `POST /api/admin/users/:userId/reset-password` — Reset password

- Returns 200 with new temporaryPassword
- `temporaryPassword` is a 12-character string
- Returns 404 for non-existent user
- User's password is actually updated in DB (can login with new password — optional integration test)

#### `PATCH /api/admin/users/:userId/deactivate` — Deactivate

- Returns 200 with updated user (is_active: false)
- Response does not contain password
- Returns 404 for non-existent user
- Returns 400 if user is already inactive
- Returns 409 for self-deactivation (SUPER_ADMIN trying to deactivate themselves)
- Returns 409 when trying to deactivate the last active SUPER_ADMIN (requires test setup: deactivate all but one SUPER_ADMIN first — or use a targeted check)
- `updated_at` is updated after deactivation

#### `PATCH /api/admin/users/:userId/reactivate` — Reactivate

- Returns 200 with updated user (is_active: true)
- Response does not contain password
- Returns 404 for non-existent user
- Returns 400 if user is already active
- `updated_at` is updated after reactivation
- Reactivated user can log in again (optional integration test)

---

## Files to Create

- `mock/app/routes/admin_user_routes.js`
- `mock/app/routes/admin_user_routes.test.js`

## Files to Modify

- `mock/app/routes/index.js` — register `adminUserRoutes`

## Files NOT Modified

- `mock/app/routes/user_routes.js` — kept as-is for non-admin use
- `mock/db/db.json` — no seed data changes (existing 77+ users are sufficient)
- `mock/app/middleware/authorize.js` — `requireGlobalRole` already exists
- No frontend changes in this story

## Design Decisions

- **Separate route file** (`admin_user_routes.js`) rather than modifying `user_routes.js` — keeps admin and non-admin concerns separated, avoids breaking existing routes.
- **`/api/admin/users` prefix** — clearly distinguishes admin endpoints from regular user endpoints. The frontend will call these from the admin module only.
- **Server-side pagination** — the DB has 77+ users and will grow. Client-side pagination would require fetching all users on every request.
- **Auto-increment ID** — `String(maxId + 1)` based on the highest existing numeric ID. Simple and deterministic for a mock server. A real backend would use UUIDs or DB-generated IDs.
- **Temporary password in plain text** — acceptable for a mock server. A real backend would hash before storing and never return the hash.
- **`global_role` derived from `role`** — mirrors the existing convention in the seed data. If `role === 'SUPER_ADMIN'` then `global_role = 'SUPER_ADMIN'`, otherwise `global_role = role`. This keeps the dual-field pattern consistent.
- **Last-SUPER_ADMIN safeguard** — counts active SUPER_ADMINs at deactivation time. If only 1 remains, the deactivation is blocked. This prevents admin lockout.
- **Self-deactivation blocked** — a SUPER_ADMIN cannot deactivate their own account. This is a safety measure to prevent accidental lockout.
- **Already-inactive/active checks** — return 400 (not 409) because it's a client error (wrong state), not a conflict.

## Acceptance Criteria

- [ ] All `/api/admin/users*` endpoints require SUPER_ADMIN role (401 without token, 403 for non-SUPER_ADMIN)
- [ ] `GET /api/admin/users` supports `_page`, `_limit`, `_sort`, `_order`, `q`, `is_active` query params
- [ ] `GET /api/admin/users` returns `{ data, total, page, limit }` with no passwords in `data`
- [ ] `POST /api/admin/users` validates all required fields and uniqueness (email, username)
- [ ] `POST /api/admin/users` returns 201 with user and 12-char `temporaryPassword`
- [ ] `POST /api/admin/users/:userId/reset-password` returns new 12-char `temporaryPassword`
- [ ] `PATCH /api/admin/users/:userId/deactivate` blocks self-deactivation (409)
- [ ] `PATCH /api/admin/users/:userId/deactivate` blocks last-active-SUPER_ADMIN deactivation (409)
- [ ] `PATCH /api/admin/users/:userId/deactivate` returns 400 if already inactive
- [ ] `PATCH /api/admin/users/:userId/reactivate` returns 400 if already active
- [ ] All responses exclude the `password` field
- [ ] All existing tests still pass: `npm run test:mock`
- [ ] New tests cover all endpoints and edge cases
