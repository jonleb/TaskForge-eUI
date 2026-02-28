# STORY-006: Frontend — Role Gating & Read-Only Mode

## Objective

Enforce role-based access control on the workflow editor. Only SUPER_ADMIN and PROJECT_ADMIN can edit workflows. All other roles see the page in read-only mode with a clear visual indicator. Also add a confirmation dialog before saving to prevent accidental changes.

## Existing Code (after STORY-005)

- `SettingsComponent` has `canManage = false` (hardcoded, placeholder from STORY-003)
- Edit button, Save/Cancel buttons exist but are not yet gated by `canManage`
- `PermissionService` provides `isSuperAdmin()` and `hasProjectRole(projectId, ...roles): Observable<boolean>`
- `ProjectContextService` provides `currentProject$` and `getCurrentProject()`
- `EuiDialogService` available for confirmation dialogs

### Current Permission Pattern (from ticket-detail)

```typescript
private determineCanEdit(projectId: string): void {
    if (this.permissionService.isSuperAdmin()) {
        this.canEdit = true;
        return;
    }
    this.permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN').pipe(
        takeUntil(this.destroy$),
    ).subscribe(can => {
        this.canEdit = can;
        this.cdr.markForCheck();
    });
}
```

## Analysis

### Permission logic

- `canManage = true` if user is SUPER_ADMIN (global role) OR has PROJECT_ADMIN role in the current project
- All other roles: `canManage = false` → read-only mode
- The permission check runs when the project context is set (on init)

### UI gating

- Edit button: hidden when `!canManage`
- When `!canManage` and not in edit mode: show a read-only info banner at the top of the page
- The toggle group (ticket type selector) remains visible to all roles — everyone can view workflows
- Status flow and transitions table remain visible in read-only mode

### Confirmation dialog before save

To prevent accidental workflow changes that could affect all tickets:
- When user clicks Save, show a confirmation dialog: "Are you sure? Changing the workflow will affect all tickets of this type."
- Accept → proceed with save
- Cancel → stay in edit mode

### eUI components

- `EuiDialogService` for confirmation dialog
- `eui-feedback-message` with `euiInfo` for read-only banner

### i18n keys (EN + FR)

```
"workflow-mgmt.read-only": "You have read-only access to workflow settings." / "Vous avez un accès en lecture seule aux paramètres de workflow."
"workflow-mgmt.confirm-save-title": "Confirm workflow changes" / "Confirmer les modifications du workflow"
"workflow-mgmt.confirm-save-message": "Changing the workflow will affect all tickets of type {{type}}. Are you sure?" / "La modification du workflow affectera tous les tickets de type {{type}}. Êtes-vous sûr ?"
"workflow-mgmt.confirm-save-accept": "Save changes" / "Enregistrer les modifications"
"workflow-mgmt.confirm-save-cancel": "Cancel" / "Annuler"
```

## Implementation Plan

### 1. Add permission check in `SettingsComponent.ngOnInit()`

```typescript
private determineCanManage(projectId: string): void {
    if (this.permissionService.isSuperAdmin()) {
        this.canManage = true;
        this.cdr.markForCheck();
        return;
    }
    this.permissionService.hasProjectRole(projectId, 'PROJECT_ADMIN').pipe(
        takeUntil(this.destroy$),
    ).subscribe(can => {
        this.canManage = can;
        this.cdr.markForCheck();
    });
}
```

Call `determineCanManage(project.id)` when the project context emits.

### 2. Gate UI elements

- Edit button: `@if (canManage && !isEditMode)`
- Read-only banner: `@if (!canManage)`
- Save/Cancel buttons already only show in edit mode, which requires canManage to enter

### 3. Add confirmation dialog before save

Inject `EuiDialogService`. In `saveWorkflow()`:

```typescript
saveWorkflow(): void {
    // Build payload...
    const dialogRef = this.dialogService.open(this.confirmDialog, {
        // dialog config
    });
    dialogRef.afterClosed$.subscribe(result => {
        if (result === 'accept') {
            this.performSave(payload);
        }
    });
}
```

Use an `<ng-template #confirmDialog>` in the template with the confirmation message.

### 4. Update template

- Add read-only banner
- Add confirmation dialog template
- Gate Edit button with `canManage`

### 5. Update i18n files

Add the new keys to EN and FR.

### 6. Unit tests (~8)

| # | Test |
|---|------|
| 1 | Should set canManage=true for SUPER_ADMIN |
| 2 | Should set canManage=true for PROJECT_ADMIN |
| 3 | Should set canManage=false for DEVELOPER |
| 4 | Should set canManage=false for VIEWER |
| 5 | Should hide Edit button when canManage=false |
| 6 | Should show read-only banner when canManage=false |
| 7 | Should show confirmation dialog on Save click |
| 8 | Should not save when dialog is cancelled |

## Files Modified

| File | Modification |
|------|----|
| `src/app/features/projects/settings/settings.component.ts` | Add `determineCanManage()`, inject `EuiDialogService`, add confirmation flow |
| `src/app/features/projects/settings/settings.component.html` | Add read-only banner, gate Edit button, add confirm dialog template |
| `src/app/features/projects/settings/settings.component.scss` | Read-only banner styles (if needed) |
| `src/app/features/projects/settings/settings.component.spec.ts` | Add ~8 tests |
| `src/assets/i18n/en.json` | Add role gating + confirmation keys |
| `src/assets/i18n/fr.json` | Add role gating + confirmation keys |

## Acceptance Criteria

- [ ] SUPER_ADMIN can edit workflows
- [ ] PROJECT_ADMIN can edit workflows
- [ ] DEVELOPER, PRODUCT_OWNER, REPORTER, VIEWER see read-only mode
- [ ] Read-only banner displayed for non-managers
- [ ] Edit button hidden for non-managers
- [ ] Confirmation dialog shown before saving
- [ ] Save proceeds only on dialog accept
- [ ] Save cancelled on dialog dismiss
- [ ] All interactive elements keyboard-navigable
- [ ] Screen reader announces read-only banner
- [ ] All existing tests still pass: `npm run test:ci`
- [ ] Build passes: `npx ng build --configuration=development`
