# STORY-002: Mock Auth Backend — Session Validation Middleware & Logout

## Goal
Add token validation middleware to protect API routes, a logout endpoint, and a `/me` endpoint that returns the current user's profile.

## Branch
Work on `INIT-BACKEND` (continues from STORY-001 commit `517059b`).

## Dependencies
- STORY-001 must be complete (login endpoint + seed data)

## Implementation

### 1. Create `mock/app/middleware/auth.js`

Authentication middleware that:
1. Reads the `Authorization: Bearer <token>` header
2. Extracts the token after `Bearer `
3. Base64-decodes and JSON-parses the token
4. Validates required fields: `userId`, `role`, `exp`
5. Checks `exp` against `Date.now()` — rejects if expired
6. On success: attaches `req.user = { userId, role }` and calls `next()`
7. On any failure: returns `401 { message: "Session expired or invalid" }`

```javascript
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Session expired or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());

        if (!decoded.userId || !decoded.role || !decoded.exp) {
            return res.status(401).json({ message: 'Session expired or invalid' });
        }

        if (decoded.exp < Date.now()) {
            return res.status(401).json({ message: 'Session expired or invalid' });
        }

        req.user = { userId: decoded.userId, role: decoded.role };
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Session expired or invalid' });
    }
}
```

Rejection cases (all return the same generic 401 message):
- Missing `Authorization` header
- Header doesn't start with `Bearer `
- Token is not valid base64
- Decoded token is not valid JSON
- Token payload missing `userId`, `role`, or `exp`
- Token is expired (`exp < Date.now()`)

### 2. Add endpoints to `mock/app/routes/auth_routes.js`

#### `POST /api/auth/logout` (protected)

- Requires valid token via `authMiddleware`
- Always returns `200 { message: "Logged out" }`
- Token invalidation is client-side (clear localStorage) — the mock server is stateless

#### `GET /api/auth/me` (protected)

- Requires valid token via `authMiddleware`
- Reads `req.user.userId` (set by middleware)
- Looks up user in `db.get('users').find({ id: req.user.userId })`
- Returns the full user object WITHOUT the `password` field
- Returns `404 { message: "User not found" }` if user doesn't exist (edge case)

Response (`200`):
```json
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
```

Note: `password` is stripped using destructuring: `const { password, ...profile } = user;`

#### `POST /api/auth/login` — NO CHANGES

Login remains public (no middleware applied). No modifications needed.

### 3. Protect existing user routes in `mock/app/routes/user_routes.js`

Import `authMiddleware` and apply it to all route handlers:

| Route                      | Method | Protected |
|----------------------------|--------|-----------|
| `/api/user-details`        | GET    | Yes       |
| `/api/users`               | GET    | Yes       |
| `/api/users/:userId`       | GET    | Yes       |
| `/api/users/:userId`       | PUT    | Yes       |
| `/api/users/:userId`       | DELETE | Yes       |
| `/api/users`               | POST   | Yes       |

Apply middleware as route-level middleware:
```javascript
app.get('/api/users', authMiddleware, (req, res) => { ... });
```

### 4. Route registration — no changes to `mock/app/routes/index.js`

Auth routes are already registered before user routes (from STORY-001). No changes needed.

## What NOT to do

- Do NOT modify the login endpoint logic
- Do NOT modify `mock/db/db.json`
- Do NOT add any frontend code
- Do NOT implement token blacklisting (mock server is stateless)
- Do NOT use real JWT libraries

## How to Test

Start the mock server:
```bash
npm run start-mock-server
```

Test with curl:
```bash
# 1. Login to get a token
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"SecurePassword!123"}' | jq -r '.accessToken')

# 2. GET /api/auth/me with valid token
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

# 3. POST /api/auth/logout with valid token
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer $TOKEN"

# 4. GET /api/users with valid token (should work)
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN"

# 5. GET /api/users WITHOUT token (should return 401)
curl -X GET http://localhost:3000/api/users

# 6. GET /api/auth/me with expired token (should return 401)
EXPIRED=$(echo '{"userId":"1","role":"SUPER_ADMIN","exp":1000}' | base64)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $EXPIRED"

# 7. Login still works without token (public)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"SecurePassword!123"}'
```

## Automated Tests

Run with: `npm run test:mock`

Tests added to `mock/app/routes/auth_routes.test.js` (appended to existing STORY-001 tests):

### Auth Middleware tests (6 tests)
- 401 when no Authorization header is provided
- 401 when Authorization header has no Bearer prefix
- 401 when token is malformed (not valid base64 JSON)
- 401 when token is expired
- 401 when token payload is missing required fields
- 200 when valid token is provided (pass through)

### GET /api/auth/me tests (2 tests)
- Returns current user profile without password field
- Returns 401 without token

### POST /api/auth/logout tests (3 tests)
- Returns 200 with valid token
- Returns 401 without token
- Returns 401 with expired token

### Login remains public (1 test)
- POST /api/auth/login still works without Authorization header

### Protected user routes (4 tests)
- GET /api/users returns 401 without token
- GET /api/users returns 200 with valid token
- GET /api/user-details returns 401 without token
- GET /api/user-details returns 200 with valid token

Total: 16 new tests (30 total with STORY-001's 14)

## Acceptance Criteria
- [ ] Requests without `Authorization` header to protected routes return `401 { message: "Session expired or invalid" }`
- [ ] Requests with expired token return `401 { message: "Session expired or invalid" }`
- [ ] Requests with malformed token return `401 { message: "Session expired or invalid" }`
- [ ] Requests with valid token pass through to the route handler
- [ ] `GET /api/auth/me` returns current user profile without `password` field
- [ ] `POST /api/auth/logout` returns `200 { message: "Logged out" }`
- [ ] `POST /api/auth/login` remains accessible without token
- [ ] `/api/users`, `/api/users/:userId`, `/api/user-details` all require valid token
- [ ] All 30 tests pass: `npm run test:mock`
- [ ] Mock server starts without errors: `npm run start-mock-server`
