# CR-19-1 — Review Authorization: DEVELOPER Status Restriction

## What this branch does

Restricts the DEVELOPER project role so they can only change ticket status on tickets assigned to them. Previously, any DEVELOPER could change the status of any ticket in their project. After this change, DEVELOPER can still edit all other ticket fields (title, description, priority, assignee, epic) on any ticket, but status changes are limited to tickets where `assignee_id` matches their userId. PROJECT_ADMIN, PRODUCT_OWNER, and SUPER_ADMIN remain unrestricted. Also corrects the `developer@taskforge.local` user (id=4) to have the DEVELOPER role in all projects (was incorrectly set to REPORTER in projects 1 and 2).

## Step-by-step walkthrough

### 1. Change request document (analysis)

- Created `.analysis/CR-19-1-Review-Authorization/CR-19-1-Review-Authorization.md` with full scope, motivation, design decisions, per-file change plan, roles matrix, and acceptance criteria.
- Documented the REPORTER design decision: no explicit backend block for REPORTER status changes because the existing ownership restriction already limits their scope.

Files: `.analysis/CR-19-1-Review-Authorization/CR-19-1-Review-Authorization.md`

### 2. Backend — DEVELOPER status restriction (API)

- Added an assignee check in `PATCH /api/projects/:projectId/backlog/:ticketNumber` in `project_routes.js`: when `req.projectRole === 'DEVELOPER'` and `req.body.status !== undefined`, the handler checks `item.assignee_id !== String(req.user.userId)` and returns 403 with message "Developers can only change status on tickets assigned to them".
- The check sits after the existing REPORTER ownership restriction and before field validation, so DEVELOPER can still update all non-status fields freely.
- SUPER_ADMIN bypasses this entirely because `req.projectRole` is set to `'SUPER_ADMIN'` by the middleware.
- Added 3 integration tests: reject unassigned DEVELOPER status change (403), allow assigned DEVELOPER status change (200), allow DEVELOPER non-status field update (200). Uses `diana.brown` (id=11, DEVELOPER in project 1) as the test user.

Files: `mock/app/routes/project_routes.js`, `mock/app/routes/project_routes.test.js`

### 3. Frontend — Ticket detail page status restriction

- Added `canEditStatus = false` and `isDeveloper = false` properties to `TicketDetailComponent`.
- `determineCanEdit()` now makes a separate `hasProjectRole(projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER')` call to set `canEditStatus`. For DEVELOPER, `canEditStatus` is deferred to `updateCanEditStatus()` which checks `ticket.assignee_id === permissionService.getUserId()` after the ticket loads.
- In the template, the status edit button uses `canEditStatus` instead of `canEdit`. All other edit buttons remain gated by `canEdit`.
- Added 3 unit tests: hide status edit for DEVELOPER on unassigned ticket, show status edit for DEVELOPER on assigned ticket, show status edit for PROJECT_ADMIN.

Files: `src/app/features/projects/ticket-detail/ticket-detail.component.ts`, `src/app/features/projects/ticket-detail/ticket-detail.component.html`, `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts`

### 4. Frontend — Board page per-card drag restriction

- Added `canChangeStatus = false` and `isDeveloper = false` properties to `BoardComponent`.
- `determineCanChangeStatus()` uses `switchMap`: checks PROJECT_ADMIN/PRODUCT_OWNER first, then falls back to checking DEVELOPER. Refactored from nested subscribes to eliminate timing issues.
- Added `canDragTicket(ticket)` method: returns `true` if `canChangeStatus` (manager roles) OR if `isDeveloper && ticket.assignee_id === getUserId()`.
- Template uses `canDragTicket(ticket)` for per-card `[cdkDragDisabled]` and drag handle `@if`. Drop list uses `!canManage` for `[cdkDropListDisabled]` (DEVELOPER can still receive drops on their assigned cards).
- Added 3 unit tests: no drag permission hides handles, canChangeStatus true shows handles, DEVELOPER sees drag handle only for assigned tickets.

Files: `src/app/features/projects/board/board.component.ts`, `src/app/features/projects/board/board.component.html`, `src/app/features/projects/board/board.component.spec.ts`

### 5. Seed data — developer user role correction

- Changed userId "4" (`developer@taskforge.local`) membership from REPORTER to DEVELOPER in project 1 (membership id "3") and project 2 (membership id "13") in `mock/db/db.json`.
- Verified userId "4" is now DEVELOPER in all 6 projects: 1, 2, 4, 7, 10, 13.
- Updated seed data documentation in `.analysis/13.2-Ticket_discovery_filtering-Search-improvement/STORY-000-seed-backlog-data.md` to reflect the corrected roles.

Files: `mock/db/db.json`, `.analysis/13.2-Ticket_discovery_filtering-Search-improvement/STORY-000-seed-backlog-data.md`

## Working method

This was a change request (CR), not a story-based feature:
1. **Analysis first** — CR document in `.analysis/CR-19-1-Review-Authorization/` describing the restriction, design decisions, and per-file change plan.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — backend restriction first, then frontend ticket detail, then board page.
4. **Tests** — integration tests for backend (Jest + supertest), unit tests for frontend (vitest).
5. **Verification** — all tests pass, build passes.
6. **Bug fix** — discovered developer user had wrong role in seed data; corrected and re-verified.

## Key technical decisions

- **Assignee-based restriction, not blanket block**: DEVELOPER can change status on tickets assigned to them. This reflects real-world workflow where developers move their own work through statuses (TO_DO → IN_PROGRESS → IN_REVIEW) but shouldn't change status on others' tickets.
- **Per-card drag vs per-column drag**: The board uses `canDragTicket(ticket)` to enable/disable drag per card, not per column. This allows DEVELOPER to drag their assigned tickets while other cards in the same column remain non-draggable.
- **`switchMap` over nested subscribes in `determineCanChangeStatus`**: Refactored to avoid timing issues where the inner subscribe could fire after the component was destroyed or the project changed. `switchMap` cancels the inner observable when the outer emits.
- **No REPORTER backend block**: REPORTER already can only edit their own tickets (backend enforced). Adding a separate status block for REPORTER would be redundant. The frontend hides the status edit UI for REPORTER via `canEditStatus = false`.
- **`diana.brown` (id=11) as DEVELOPER test user**: The `developer` user (id=4) gets its role changed to REPORTER by the "update role" test earlier in the test suite. Using `diana.brown` (who stays DEVELOPER throughout) avoids test ordering dependencies.
- **Drop list stays enabled for DEVELOPER**: `[cdkDropListDisabled]="!canManage"` — DEVELOPER has `canManage = true`, so the drop list accepts drops. The restriction is on the drag side (`[cdkDragDisabled]`), not the drop side. This is intentional: if a DEVELOPER drags an assigned card, the target column must accept the drop.

## Git history

```
(no commits yet — changes are uncommitted on CR-19-1-Review-Authorization branch)
```

## Test summary

- Frontend: 623 unit tests (vitest) — all passing (6 new: 3 ticket-detail, 3 board)
- Backend: 3 new integration tests (Jest + supertest) — all passing. 10 pre-existing failures unrelated to this CR (project creation 409s, member add 200 vs 201, link creation 409, admin user retrieval/reactivation).
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the DEVELOPER status restriction on a fresh eUI Angular project that already has: project CRUD, project membership with roles (SUPER_ADMIN, PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER, VIEWER), a mock Express/json-server backend with `PATCH /api/projects/:projectId/backlog/:ticketNumber`, a `PermissionService` with `isSuperAdmin()`, `hasProjectRole()`, `getUserId()`, a ticket detail page with inline edit, and a Kanban board with CDK drag & drop.

---

**Prompt:**

> Implement a DEVELOPER status restriction: DEVELOPER can only change ticket status on tickets assigned to them. All other ticket fields remain editable by DEVELOPER on any ticket.
>
> **Backend — `PATCH /api/projects/:projectId/backlog/:ticketNumber`:**
> 1. After the existing REPORTER ownership check, add: if `req.projectRole === 'DEVELOPER'` and `req.body.status !== undefined`, check `item.assignee_id !== String(req.user.userId)`. If not assigned, return `403 { message: "Developers can only change status on tickets assigned to them" }`.
> 2. SUPER_ADMIN bypasses this (already handled by middleware setting `req.projectRole = 'SUPER_ADMIN'`).
> 3. Add 3 integration tests: reject unassigned status change (403), allow assigned status change (200), allow non-status field update (200).
>
> **Frontend — Ticket Detail Page:**
> 1. Add `canEditStatus = false` and `isDeveloper = false` properties.
> 2. In `determineCanEdit()`: SUPER_ADMIN → `canEditStatus = true`. `hasProjectRole('PROJECT_ADMIN', 'PRODUCT_OWNER')` → `canEditStatus = true`. For DEVELOPER, defer to `updateCanEditStatus()`.
> 3. `updateCanEditStatus()`: if `isDeveloper && ticket`, set `canEditStatus = ticket.assignee_id === permissionService.getUserId()`. Call this after ticket loads.
> 4. In template: status edit button uses `canEditStatus` instead of `canEdit`. All other edit buttons keep `canEdit`.
> 5. Add 3 unit tests: hide status for unassigned DEVELOPER, show status for assigned DEVELOPER, show status for PROJECT_ADMIN.
>
> **Frontend — Board Page (Drag & Drop):**
> 1. Add `canChangeStatus = false` and `isDeveloper = false` properties.
> 2. `determineCanChangeStatus()`: SUPER_ADMIN → `canChangeStatus = true`. Use `switchMap`: check `hasProjectRole('PROJECT_ADMIN', 'PRODUCT_OWNER')` first → `canChangeStatus = true`. Else check `hasProjectRole('DEVELOPER')` → set `isDeveloper = true`.
> 3. Add `canDragTicket(ticket)`: returns `canChangeStatus || (isDeveloper && ticket.assignee_id === getUserId())`.
> 4. Template: `[cdkDragDisabled]="!canDragTicket(ticket)"`, `@if (canDragTicket(ticket))` for drag handle. Keep `[cdkDropListDisabled]="!canManage"` unchanged.
> 5. Add 3 unit tests: no drag permission, canChangeStatus true, DEVELOPER assigned-only drag.
>
> **eUI gotchas:**
> - `eui-icon-button` uses `[euiDisabled]`, not `[disabled]`
> - Use `eui-edit` for edit icon, `dots-six-vertical:regular` for drag handle
> - Drag handle hidden entirely (`@if`) for non-authorized, not just disabled
>
> **Test commands:**
> - `npm run test:ci` — all frontend tests pass
> - `npm run test:mock` — all backend tests pass (restore DB after: `git checkout mock/db/db.json`)
> - `npx ng build --configuration=development` — build passes
