# STORY-001: Mock Auth Backend — User Seed Data & Login Endpoint

## Goal
Set up the mock server with auth-capable user seed data and a `POST /api/auth/login` endpoint. This is the backend foundation for the entire auth feature.

## Branch
Work on `INIT-BACKEND` (currently at `dbe769e`).

## Data Source

### Update `users.json` and `mock/db/db.json`

The existing `users.json` (from `002-TABLE`) has 87 users but only uses `SUPER_ADMIN` and `USER` roles. We need to:

1. Copy `users.json` from `002-TABLE` branch into `.analysis/04-Auth/users.json`
2. Update the first 7 users to cover all 6 required roles + 1 inactive user for rejection testing
3. Set all passwords to `SecurePassword!123`
4. Keep the remaining 80 users as-is (just update their passwords to `SecurePassword!123` and assign varied roles)

### Required seed users (first 7 — one per role + one inactive)

| id | username       | password            | role            | is_active | firstName  | lastName  |
|----|----------------|---------------------|-----------------|-----------|------------|-----------|
| 1  | superadmin     | SecurePassword!123  | SUPER_ADMIN     | true      | Super      | Admin     |
| 2  | projectadmin   | SecurePassword!123  | PROJECT_ADMIN   | true      | Project    | Admin     |
| 3  | productowner   | SecurePassword!123  | PRODUCT_OWNER   | true      | Product    | Owner     |
| 4  | developer      | SecurePassword!123  | DEVELOPER       | true      | Dev        | Eloper    |
| 5  | reporter       | SecurePassword!123  | REPORTER        | true      | Rep        | Orter     |
| 6  | viewer         | SecurePassword!123  | VIEWER          | true      | View       | Er        |
| 7  | inactive_user  | SecurePassword!123  | DEVELOPER       | false     | Inactive   | User      |

All other users (id 8–87) keep their existing data but with:
- `password`: `SecurePassword!123`
- `role`: distribute across the 6 roles (round-robin or random)

### User fields schema
```
id, username, password, email, role, global_role, firstName, lastName, is_active, created_at, updated_at
```

`global_role` should match `role` for consistency.

## Implementation

### 1. Create `mock/app/models/auth-user.js`

```javascript
module.exports = {
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    is_active: true,
};
```

### 2. Create `mock/app/routes/auth_routes.js`

#### `POST /api/auth/login`

Request body:
```json
{ "username": "superadmin", "password": "SecurePassword!123" }
```

Logic:
1. Find user in `db.get('users')` by `username`
2. If not found → `401 { message: "Invalid username or password" }`
3. If found but `password` doesn't match → `401 { message: "Invalid username or password" }`
4. If found but `is_active === false` → `403 { message: "Account is deactivated" }`
5. If valid and active → generate token and return:

Success response (`200`):
```json
{
    "accessToken": "<base64-encoded-token>",
    "user": {
        "userId": "1",
        "firstName": "Super",
        "lastName": "Admin",
        "email": "superadmin@taskforge.local",
        "role": "SUPER_ADMIN"
    }
}
```

#### Token format

The `accessToken` is a base64-encoded JSON string:
```json
{ "userId": "1", "role": "SUPER_ADMIN", "exp": 1740000000 }
```

Where `exp` = `Date.now() + 3600000` (1 hour from now, in milliseconds).

Generate with:
```javascript
const payload = { userId: user.id, role: user.role, exp: Date.now() + 3600000 };
const accessToken = Buffer.from(JSON.stringify(payload)).toString('base64');
```

### 3. Register routes in `mock/app/routes/index.js`

```javascript
const authRoutes = require('./auth_routes');

module.exports = function (app, db) {
    authRoutes(app, db);
    userRoutes(app, db);
};
```

Auth routes must be registered BEFORE user routes (order matters for middleware in later stories).

### 4. Update `mock/db/db.json`

Load the updated users array from `users.json` into the `users` collection in `db.json`. Keep the existing `user-details` object as-is.

## What NOT to do

- Do NOT add auth middleware yet (that's STORY-002)
- Do NOT modify any frontend code
- Do NOT add logout or `/me` endpoints yet
- Do NOT use real JWT libraries — just base64 encoding

## How to Test

Start the mock server:
```bash
npm run start-mock-server
```

Test with curl:
```bash
# Successful login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"SecurePassword!123"}'

# Invalid password
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"wrong"}'

# Inactive user
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"inactive_user","password":"SecurePassword!123"}'

# Non-existent user
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"nobody","password":"whatever"}'
```

## Acceptance Criteria
- [ ] `POST /api/auth/login` with `superadmin / SecurePassword!123` returns `200` with `accessToken` and user object
- [ ] `POST /api/auth/login` with valid credentials for each role returns `200`
- [ ] `POST /api/auth/login` with wrong password returns `401 { message: "Invalid username or password" }`
- [ ] `POST /api/auth/login` with non-existent username returns `401 { message: "Invalid username or password" }`
- [ ] `POST /api/auth/login` with `inactive_user` returns `403 { message: "Account is deactivated" }`
- [ ] Error messages are generic — no distinction between "user not found" and "wrong password"
- [ ] `mock/db/db.json` contains 87 users with all 6 roles represented
- [ ] Token contains `userId`, `role`, and `exp` fields when base64-decoded
- [ ] Mock server starts without errors: `npm run start-mock-server`
