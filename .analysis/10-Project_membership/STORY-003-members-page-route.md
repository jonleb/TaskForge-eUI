# STORY-003: Frontend — Members Page (table + route)

## Objective

Create a dedicated Members page under the project shell, with a table listing members and their roles. Managers (global SUPER_ADMIN or project PROJECT_ADMIN) see action buttons (edit, delete) and the "Add Member" button. Add the route and sidebar link. Remove the members section from the Dashboard.

## Existing Code

- `src/app/features/projects/projects.routes.ts` — route `:projectId` with `ProjectShellComponent` and `DashboardComponent` child on `''`. No `members` route.
- `src/app/layout/layout.component.ts` — `buildSidebar()` builds project sidebar with Dashboard, Backlog, Board, Settings. No Members link.
- `src/app/features/projects/dashboard/dashboard.component.ts` — loads members via `projectService.getProjectMembers()`, displays Name/Email/Role table.
- `src/app/core/auth/permission.service.ts` — `isSuperAdmin()`, `getUserId()`, `hasGlobalRole()`.

## Implementation Plan

1. Create `MembersComponent` (standalone, OnPush) with eui-table, eui-chip for roles, eui-icon-button for actions.
2. Add `members` child route under `:projectId`.
3. Add "Members" sidebar entry between Dashboard and Backlog.
4. Strip members section from Dashboard (template, component, spec).
5. Create members spec (~15 tests).
6. Update layout spec (Members in sidebar assertions).

## Files Modified

| File | Modification |
|------|----|
| `src/app/features/projects/members/members.component.ts` | New — Members component |
| `src/app/features/projects/members/members.component.html` | New — template |
| `src/app/features/projects/members/members.component.scss` | New — minimal styles |
| `src/app/features/projects/members/members.component.spec.ts` | New — ~15 tests |
| `src/app/features/projects/projects.routes.ts` | Add `members` route |
| `src/app/layout/layout.component.ts` | Add "Members" in `buildSidebar()` |
| `src/app/layout/layout.component.spec.ts` | Update 2 sidebar tests |
| `src/app/features/projects/dashboard/dashboard.component.ts` | Remove members (properties, method, imports) |
| `src/app/features/projects/dashboard/dashboard.component.html` | Remove members section |
| `src/app/features/projects/dashboard/dashboard.component.spec.ts` | Remove ~7 members tests |

## Acceptance Criteria

- [x] Page accessible via `/screen/projects/:projectId/members`
- [x] Sidebar shows "Members" link between Dashboard and Backlog
- [x] Table displays Name, Email, Role (chip) for each member
- [x] Actions column visible only for SUPER_ADMIN and PROJECT_ADMIN
- [x] "Add Member" button in `eui-page-header-action-items` for managers
- [x] Edit/trash buttons with `icon="eui-edit"` / `icon="eui-trash"` and `ariaLabel`
- [x] Members section removed from Dashboard
- [x] Dashboard retains project details, creator, widgets
- [x] Loading and error states functional
- [x] Accessible markup: `aria-label` on table, `scope="col"`, `data-col-label`
- [x] `isManager` = true for global SUPER_ADMIN OR project PROJECT_ADMIN
- [x] `isManager` = false for DEVELOPER, REPORTER, VIEWER
- [x] Members unit tests (~15 tests) pass
- [x] Dashboard tests updated (~13 tests) pass
- [x] Layout tests updated pass
- [x] All frontend tests pass (`npm run test:ci`)
- [x] Build passes (`npx ng build --configuration=development`)
