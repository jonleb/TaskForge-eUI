# BUG-001: PROJECT_ADMIN not recognized as manager on Members page

## Summary

A PROJECT_ADMIN user logging into the application and navigating to a project's Members page does not see the "Add Member" button or the edit/remove action icons. Only SUPER_ADMIN users have manager access.

## Root Cause

The `/api/auth/me` endpoint returned the raw database user object, which uses `id` as the primary key field. The frontend `UserProfile` interface expects `userId`. As a result, `PermissionService.setUser(profile)` set `this.userId = profile.userId` to `undefined`.

In `MembersComponent.determineManagerStatus()`, the comparison `members.find(m => m.userId === userId)` always failed because `userId` was `undefined`, so `isManager` was never set to `true` for non-SUPER_ADMIN users.

SUPER_ADMIN was unaffected because `determineManagerStatus` short-circuits with `isSuperAdmin()` before reaching the userId comparison.

## Affected Users

All users with PROJECT_ADMIN role on any project. They could view the members list but could not add, change role, or remove members through the UI.

## Fix

In `mock/app/routes/auth_routes.js`, the `GET /api/auth/me` endpoint now maps `id` to `userId` in the response:

```js
// Before (broken)
const { password, ...profile } = user;
return res.status(200).json(profile);

// After (fixed)
const { password, id, ...profile } = user;
return res.status(200).json({ userId: id, ...profile });
```

The test in `mock/app/routes/auth_routes.test.js` was updated to assert `res.body.userId` instead of `res.body.id`.

## Files Changed

- `mock/app/routes/auth_routes.js` — map `id` → `userId` in `/api/auth/me` response
- `mock/app/routes/auth_routes.test.js` — update assertion from `res.body.id` to `res.body.userId`

## Verification

- 154 mock server tests pass (`npm run test:mock`)
- 306 frontend unit tests pass (`npm run test:ci`)
- Manual test: log in as `projectadmin`, navigate to `/screen/projects/1/members` → "Add Member" button and action icons are now visible
