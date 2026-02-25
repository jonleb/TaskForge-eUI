# FEATURE-003 RBAC — Manual Testing Scenarios

## Prerequisites

Start the full dev environment:

```bash
npm start
```

This starts both the Angular frontend (port 4200) and the mock server (port 3000).

## Test Accounts

All passwords are `SecurePassword!123`.

| Username      | Global Role     | Use for                          |
|---------------|-----------------|----------------------------------|
| `superadmin`  | `SUPER_ADMIN`   | Full access, admin features      |
| `developer`   | `DEVELOPER`     | Regular user, no admin access    |
| `viewer`      | `VIEWER`        | Regular user, read-only profile  |
| `alice.smith` | `SUPER_ADMIN`   | Second super admin for cross-check |

---

## Scenario 1: SUPER_ADMIN sees all sidebar items

1. Open `http://localhost:4200/login`
2. Log in as `superadmin` / `SecurePassword!123`
3. Verify the sidebar contains: Home, Module 1, Module 2, Users
4. Click "Users" in the sidebar
5. Verify the page shows "User Administration" heading

Expected: All sidebar items visible, Users page loads without error.

---

## Scenario 2: Regular user does not see admin sidebar items

1. Open `http://localhost:4200/login`
2. Log in as `developer` / `SecurePassword!123`
3. Verify the sidebar contains: Home, Module 1, Module 2
4. Verify "Users" is NOT visible in the sidebar

Expected: "Users" entry is hidden for non-SUPER_ADMIN users.

---

## Scenario 3: Direct URL access denied for regular user

1. Log in as `developer`
2. Manually navigate to `http://localhost:4200/screen/admin/users`
3. Verify you are redirected to `/screen/home`
4. Verify a warning growl notification appears: "Access denied — You do not have permission to access this page."

Expected: Redirect to home + growl notification. No blank page or error.

---

## Scenario 4: SUPER_ADMIN can access projects API

1. Log in as `superadmin`
2. Open browser DevTools → Network tab
3. Navigate to any page that triggers API calls, or manually call:
   ```
   GET http://localhost:3000/api/projects
   Authorization: Bearer <token>
   ```
4. Verify the response contains all active projects (3 projects)

Expected: SUPER_ADMIN sees all projects regardless of membership.

---

## Scenario 5: Regular user sees only their projects

1. Log in as `developer`
2. Call `GET /api/projects` with the developer's token
3. Verify the response contains only projects where the developer is a member

Expected: Filtered project list based on membership.

---

## Scenario 6: 403 response triggers growl (interceptor)

1. Log in as `developer`
2. Using DevTools or a REST client, call an endpoint that returns 403:
   ```
   GET http://localhost:3000/api/projects/<projectId>/members
   ```
   (use a projectId where the developer is NOT a member)
3. Verify a warning growl notification appears: "Access denied — You do not have permission to perform this action."
4. Verify the user is NOT redirected — they stay on the current page
5. Verify the session is still active (token not cleared, no redirect to login)

Expected: Growl shown, session intact, no redirect.

---

## Scenario 7: 401 still works as before (session expiry)

1. Log in as any user
2. Manually clear `auth_token` from localStorage (DevTools → Application → Local Storage)
3. Trigger any API call (e.g. navigate to a new page)
4. Verify a warning growl appears: "Session expired"
5. Verify redirect to `/login`

Expected: 401 handling unchanged — clears session, redirects to login.

---

## Scenario 8: Sidebar updates after login (no stale state)

1. Log in as `superadmin` — verify "Users" is visible in sidebar
2. Click Logout
3. Log in as `developer` — verify "Users" is NOT visible
4. Click Logout
5. Log in as `superadmin` again — verify "Users" is visible again

Expected: Sidebar reflects the current user's role on every login.

---

## Scenario 9: Project membership endpoints enforce roles

1. Log in as `developer`
2. Call `GET /api/projects/:projectId` for a project the developer belongs to
3. Verify 200 response with project details
4. Call `GET /api/projects/:projectId` for a project the developer does NOT belong to
5. Verify 403 response

Expected: Project-scoped endpoints enforce membership.

---

## Scenario 10: SUPER_ADMIN bypasses project membership

1. Log in as `superadmin`
2. Call `GET /api/projects/:projectId` for any project (even without explicit membership)
3. Verify 200 response
4. Call `GET /api/projects/:projectId/members` for any project
5. Verify 200 response with member list

Expected: SUPER_ADMIN accesses all project endpoints without membership entries.

---

## Automated Tests

Run all frontend unit tests:

```bash
npm run ng test
```

Run mock server integration tests:

```bash
npm run test:mock
```

Run the build:

```bash
npx ng build --configuration=development
```

All three must pass before the branch is considered complete.
