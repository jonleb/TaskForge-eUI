# CR-19-1: Restrict DEVELOPER Status Changes to Assigned Tickets

## Summary

Currently, the DEVELOPER project role can update all ticket fields including status on any ticket. This change request restricts DEVELOPER so they can only change the ticket status on tickets assigned to them. When a DEVELOPER attempts to change the status on an unassigned ticket, they receive a clear feedback message explaining the restriction.

## Motivation

Status transitions represent workflow progression decisions. A DEVELOPER should be able to move their own assigned work through the workflow (e.g. TO_DO → IN_PROGRESS → IN_REVIEW), but should not change status on tickets they are not working on. Roles with broader project oversight (PROJECT_ADMIN, PRODUCT_OWNER) can change status on any ticket.

## Current Behavior

- `PATCH /api/projects/:projectId/backlog/:ticketNumber` allows `PROJECT_ADMIN`, `PRODUCT_OWNER`, `DEVELOPER`, and `REPORTER` to update any editable field, including `status`.
- The frontend ticket detail page shows the status edit button for any user with `canEdit = true`, which includes DEVELOPER.
- The board page enables CDK drag-and-drop between status columns for DEVELOPER (`canManage = true`), which triggers a status change via the same PATCH endpoint.
- No field-level role restriction exists — if you can edit a ticket, you can edit all its fields.

## Desired Behavior

- DEVELOPER can still edit tickets (title, description, priority, assignee, epic) on any ticket.
- DEVELOPER can change the `status` field only on tickets assigned to them (`assignee_id` matches their userId).
- If a DEVELOPER attempts to change the status on an unassigned ticket via the API, the backend returns `403 { message: "Developers can only change status on tickets assigned to them" }`.
- On the frontend ticket detail page, the status edit button is shown for DEVELOPER only when the ticket is assigned to them.
- On the board page, drag-and-drop between columns is enabled per-card: DEVELOPER can drag only tickets assigned to them.
- If the backend 403 is triggered (e.g. direct API call), the existing auth interceptor shows a warning growl automatically.

## Design Decision: REPORTER Status Changes

REPORTER already cannot change status in practice because:
- REPORTER can only edit their own tickets (backend enforced).
- The frontend `canEditStatus` will be `false` for REPORTER (same as DEVELOPER).
- No explicit backend check is needed for REPORTER + status because the ownership restriction already limits their scope, and the frontend hides the status edit UI.

If a REPORTER sends a direct API call with `status` on their own ticket, it would currently succeed. This CR does **not** add a backend block for REPORTER — only for DEVELOPER. A follow-up CR can address REPORTER if needed.

## Scope

### Backend — `mock/app/routes/project_routes.js`

In the `PATCH /api/projects/:projectId/backlog/:ticketNumber` handler, add a check after the existing REPORTER ownership restriction (line ~640 in the current code):

```javascript
// DEVELOPER cannot change status
if (req.projectRole === 'DEVELOPER' && req.body.status !== undefined) {
    return res.status(403).json({ message: 'Developers are not allowed to change ticket status' });
}
```

- This check must come **after** the REPORTER ownership check and **before** field validation.
- All other fields remain editable by DEVELOPER.
- SUPER_ADMIN bypasses this entirely because `req.projectRole` is set to `'SUPER_ADMIN'` by the middleware.

### Backend tests — `mock/app/routes/project_routes.test.js`

**Test user mapping (critical):**
- `diana.brown` (id=11) → DEVELOPER in project 1 — use for DEVELOPER tests.
- `developer` (id=4) → DEVELOPER in project 1. The "update role" test changes it to REPORTER before the REPORTER tests run.

Add test cases in the existing `PATCH /api/projects/:projectId/backlog/:ticketNumber` describe block:

1. `'should reject DEVELOPER updating status'` — `diana.brown` sends `{ status: 'IN_REVIEW' }` on ticket 5 → expect 403, message contains "not allowed to change ticket status".
2. `'should allow DEVELOPER to update non-status fields'` — `diana.brown` sends `{ priority: 'LOW' }` on ticket 5 → expect 200. (The existing test `'should allow DEVELOPER to update any ticket'` already covers `description`, but adding a `priority` test strengthens coverage.)
3. `'should allow PROJECT_ADMIN to update status'` — `superadmin` sends `{ status: ... }` → expect 200. (Partially covered by existing workflow transition tests, but an explicit role-focused test is clearer.)

### Frontend — Ticket Detail Page

#### `src/app/features/projects/ticket-detail/ticket-detail.component.ts`

- Add a `canEditStatus = false` boolean property.
- In `determineCanEdit()`:
  - SUPER_ADMIN → `canEditStatus = true`
  - `hasProjectRole(projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER')` → `canEditStatus = true`
  - DEVELOPER, REPORTER, VIEWER → `canEditStatus = false`
- This requires a separate `hasProjectRole` call from the existing `canEdit` determination, since `canEdit` includes DEVELOPER but `canEditStatus` does not.

#### `src/app/features/projects/ticket-detail/ticket-detail.component.html`

Replace `canEdit` with `canEditStatus` specifically for the status edit button (the `eui-icon-button` next to the status chip). All other edit buttons continue using `canEdit`.

```html
<!-- Status edit button — only for roles that can change status -->
@if (canEditStatus) {
    <eui-icon-button icon="eui-edit" size="s"
                     [ariaLabel]="'ticket-detail.edit' | translate"
                     (buttonClick)="startEdit('status')">
    </eui-icon-button>
}
```

#### `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts`

Add test cases:
1. `'should hide status edit button for DEVELOPER'` — mock `hasProjectRole` to return `true` for DEVELOPER roles, `false` for status roles → status edit button not in DOM.
2. `'should show status edit button for PROJECT_ADMIN'` — mock `isSuperAdmin` false, `hasProjectRole` returns `true` for both canEdit and canEditStatus roles → status edit button present.

**Mock setup note:** The permission mock needs to differentiate between calls. `hasProjectRole` is called with different role lists:
- `canEdit`: `('PROJECT_ADMIN', 'PRODUCT_OWNER', 'DEVELOPER')`
- `canEditStatus`: `('PROJECT_ADMIN', 'PRODUCT_OWNER')`

The mock should use `mockImplementation` to return different values based on the roles argument.

### Frontend — Board Page (Drag & Drop)

#### `src/app/features/projects/board/board.component.ts`

- Add a `canChangeStatus = false` boolean property.
- Add `determineCanChangeStatus(projectId)` method:
  ```typescript
  private determineCanChangeStatus(projectId: string): void {
      if (this.permissionService.isSuperAdmin()) {
          this.canChangeStatus = true;
          this.cdr.markForCheck();
          return;
      }
      this.permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN', 'PRODUCT_OWNER').pipe(
          takeUntil(this.destroy$),
      ).subscribe(can => {
          this.canChangeStatus = can;
          this.cdr.markForCheck();
      });
  }
  ```
- Call `determineCanChangeStatus(project.id)` in `ngOnInit` alongside `determineCanManage`.
- `canManage` remains unchanged — DEVELOPER still has `canManage = true` for general board interaction (ticket click navigation works regardless of drag state).
- No need for a guard in `onCardDrop()` — since drag is disabled in the template, the handler won't fire for DEVELOPER.

#### `src/app/features/projects/board/board.component.html`

Replace `canManage` with `canChangeStatus` on drag-related directives:

```html
[cdkDropListDisabled]="!canChangeStatus"
...
[cdkDragDisabled]="!canChangeStatus"
...
@if (canChangeStatus) {
    <button cdkDragHandle ...>
```

This means DEVELOPER can still see and click cards (navigation), but cannot drag them between columns.

#### `src/app/features/projects/board/board.component.spec.ts`

The existing tests mock `hasProjectRole` with a single return value. After this change, `hasProjectRole` is called twice (once for `canManage`, once for `canChangeStatus`) with different role lists. Tests need to be updated:

1. `'should determine canChangeStatus from permission service'` — mock returns `true` for PROJECT_ADMIN/PRODUCT_OWNER → `canChangeStatus = true`.
2. `'should disable drag when canChangeStatus is false (DEVELOPER)'` — mock `hasProjectRole` to return `true` for canManage roles but `false` for canChangeStatus roles → drag handles not rendered, `canChangeStatus = false`.
3. Update existing `'should determine canManage from permission service'` — ensure the mock differentiates between the two calls.
4. Update existing `'should not show drag handle when canManage is false'` — this test now needs to check `canChangeStatus` instead.

## Files to Modify

| File | Change |
|------|--------|
| `mock/app/routes/project_routes.js` | Add DEVELOPER status restriction in PATCH handler |
| `mock/app/routes/project_routes.test.js` | Add test cases for DEVELOPER status restriction |
| `src/app/features/projects/ticket-detail/ticket-detail.component.ts` | Add `canEditStatus` property and determination logic |
| `src/app/features/projects/ticket-detail/ticket-detail.component.html` | Use `canEditStatus` for status edit button |
| `src/app/features/projects/ticket-detail/ticket-detail.component.spec.ts` | Add tests for status edit visibility per role |
| `src/app/features/projects/board/board.component.ts` | Add `canChangeStatus` property and determination |
| `src/app/features/projects/board/board.component.html` | Use `canChangeStatus` for drag directives and handle |
| `src/app/features/projects/board/board.component.spec.ts` | Update drag tests to use `canChangeStatus`, add DEVELOPER test |

## Roles After Change

| Role | Edit ticket fields | Change status (detail) | Drag on board |
|------|-------------------|----------------------|---------------|
| SUPER_ADMIN | ✅ | ✅ | ✅ |
| PROJECT_ADMIN | ✅ | ✅ | ✅ |
| PRODUCT_OWNER | ✅ | ✅ | ✅ |
| DEVELOPER | ✅ | ✅ (assigned only) | ✅ (assigned only) |
| REPORTER | ✅ (own tickets only) | ❌ (frontend only) | ❌ |
| VIEWER | ❌ | ❌ | ❌ |

## Existing Tests Impact

| Test | Impact |
|------|--------|
| `'should allow DEVELOPER to update any ticket'` (diana.brown, description) | ✅ No change — doesn't touch status |
| `'should determine canManage from permission service'` | ⚠️ Needs update — mock must differentiate two `hasProjectRole` calls |
| `'should not show drag handle when canManage is false'` | ⚠️ Needs update — drag handle now gated by `canChangeStatus` |
| `'should show drag handles when canManage is true'` | ⚠️ Needs update — drag handle now gated by `canChangeStatus` |
| All other existing tests | ✅ No change |

## Acceptance Criteria

- [ ] DEVELOPER cannot change ticket status via API (403 returned with specific message)
- [ ] DEVELOPER can still update other ticket fields (title, description, priority, assignee, epic)
- [ ] Frontend ticket detail page hides status edit button for DEVELOPER
- [ ] Frontend board page disables drag-and-drop between columns for DEVELOPER
- [ ] PROJECT_ADMIN and PRODUCT_OWNER can still change status on detail page and board (no regression)
- [ ] SUPER_ADMIN can still change status (no regression)
- [ ] 403 response triggers a warning growl via the existing auth interceptor
- [ ] All existing backend tests pass: `npm run test:mock`
- [ ] All existing frontend tests pass: `npm run test:ci`
- [ ] Build passes: `npx ng build --configuration=development`
