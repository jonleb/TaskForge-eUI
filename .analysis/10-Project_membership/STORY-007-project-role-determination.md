# STORY-007: Frontend — Current Project Role Determination

## Objective

Allow the frontend to determine whether the current user is a project manager (PROJECT_ADMIN or SUPER_ADMIN) to conditionally display mutation actions (Add Member, Change Role, Remove Member).

## Status

This story was integrated directly into STORY-003 during implementation. No additional work is required.

## Implementation (already done in STORY-003)

The `MembersComponent` includes a private `determineManagerStatus(members)` method that runs after members are loaded:

1. If `PermissionService.isSuperAdmin()` returns `true` → `isManager = true` (SUPER_ADMIN always has manager access).
2. Otherwise, look up the current user's `userId` via `PermissionService.getUserId()` in the members list.
3. If the current user is found with `role === 'PROJECT_ADMIN'` → `isManager = true`.
4. All other cases → `isManager = false`.

The `isManager` flag controls visibility of:
- "Add Member" button in the page header
- "Actions" column (edit/remove icon buttons) in the members table

## Existing Tests (in `members.component.spec.ts`)

- `should show Add Member button for SUPER_ADMIN` — verifies SUPER_ADMIN sees the button
- `should show action buttons for SUPER_ADMIN` — verifies 6 icon buttons (2 per row × 3 rows)
- `should hide Add Member button and actions for non-manager` — verifies non-manager sees neither
- `should grant manager status to PROJECT_ADMIN member` — verifies PROJECT_ADMIN of the project gets `isManager = true`

## Acceptance Criteria

- [x] `isManager` correctly determined based on global role and project role
- [x] SUPER_ADMIN is always a manager
- [x] PROJECT_ADMIN of the project is a manager
- [x] Other roles are not managers
- [x] Unit tests pass
