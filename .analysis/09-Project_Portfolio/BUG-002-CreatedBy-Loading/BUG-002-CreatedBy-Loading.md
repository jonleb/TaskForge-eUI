# BUG-002: "Created by" shows "Loading…" permanently on project dashboard

## Summary

On every project dashboard page (e.g. `/screen/projects/16`), the "Created by" field displays "Loading…" and never resolves to the creator's name.

## Severity

Medium — cosmetic but affects all project dashboards.

## Root Cause

The `GET /api/users/:userId` endpoint in `mock/app/routes/user_routes.js` was querying the database with the wrong field name:

```js
// BEFORE (broken)
db.get('users').find({ userId: req.params.userId })

// AFTER (fixed)
db.get('users').find({ id: req.params.userId })
```

The `users` collection stores records with an `id` field, not `userId`. The query always returned `undefined`, which was sent as an empty response. The frontend `DashboardComponent.loadCreator()` received an error and the `creatorName` stayed at `null`, rendering the fallback text `Loading…`.

## Affected Components

- Backend: `mock/app/routes/user_routes.js` — `GET /api/users/:userId`
- Frontend: `src/app/features/projects/dashboard/dashboard.component.ts` — `loadCreator()` method
- Frontend: `src/app/core/project/project.service.ts` — `getUser()` method

## Fix Applied

In `mock/app/routes/user_routes.js`:

1. Changed `find({ userId: ... })` to `find({ id: ... })`
2. Added 404 response when user is not found
3. Stripped the `password` field from the response

## Verification

```bash
# With a valid auth token:
curl http://localhost:3000/api/users/1 -H "Authorization: Bearer $TOKEN"
# Returns: { "id": "1", "firstName": "Super", "lastName": "Admin", ... }
# (no password field, correct user data)
```

Navigate to any project dashboard — "Created by" now shows the creator's full name.
