# STORY-001: Backend — Role Filter Param

## Objective

Add `role` query parameter support to `GET /api/admin/users` so the frontend can filter users by role.

## Current state

The mock server handler in `mock/app/routes/admin_user_routes.js` (line 35) supports:
- `is_active` — filter by active/inactive
- `q` — full-text search across username, firstName, lastName, email
- `_sort` / `_order` — sorting
- `_page` / `_limit` — pagination

It does NOT support filtering by `role`.

## Changes

### `mock/app/routes/admin_user_routes.js`

Add a role filter step between the `is_active` filter (step 1) and the search (step 2):

```javascript
// 1b. Filter by role
const roleParam = req.query.role;
if (roleParam) {
    users = users.filter(u => u.role === roleParam);
}
```

### `src/app/features/admin/users/admin-user.models.ts`

Add `role` to `AdminUserListParams`:

```typescript
export interface AdminUserListParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
    q?: string;
    is_active?: 'true' | 'false';
    role?: string;  // NEW
}
```

### `mock/app/routes/admin_user_routes.test.js`

Add tests:

```
it('role=DEVELOPER returns only developers')
it('role=SUPER_ADMIN returns only super admins')
it('combined: role + is_active + q')
```

## Acceptance criteria

- [ ] `GET /api/admin/users?role=DEVELOPER` returns only users with `role === 'DEVELOPER'`
- [ ] `GET /api/admin/users?role=INVALID_ROLE` returns empty data array (no error)
- [ ] Combined filters work: `role + is_active + q + pagination`
- [ ] All existing backend tests still pass: `npm run test:mock`
- [ ] `AdminUserListParams` interface updated with optional `role` field

## Files to modify

- `mock/app/routes/admin_user_routes.js`
- `mock/app/routes/admin_user_routes.test.js`
- `src/app/features/admin/users/admin-user.models.ts`
