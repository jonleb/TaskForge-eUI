# STORY-004: Frontend — Add/Remove Status UI

## Objective

In edit mode, allow the user to add new statuses and remove existing ones from the selected workflow. Provide inline validation and visual feedback. Removing a status also cleans up its transitions automatically.

## Existing Code (after STORY-003)

- `SettingsComponent` has `isEditMode`, `editStatuses: string[]`, `editTransitions: Record<string, string[]>`, `selectedWorkflow`
- The template shows the status flow as a list of `euiStatusBadge` items with arrows between them
- Edit mode is entered/exited via Edit/Cancel buttons
- Save calls `updateWorkflow()` which validates on the backend (including 409 for statuses in use)

### Current Status Flow Template (read-only)

```html
<ul class="status-flow">
  @for (status of workflow.statuses; track status; let last = $last) {
    <li class="status-flow-item">
      <span euiStatusBadge euiInfo euiSizeS>{{ 'workflow.status.' + status | translate }}</span>
      @if (!last) { <eui-icon-svg icon="eui-arrow-right" size="s" aria-hidden="true" /> }
    </li>
  }
</ul>
```

## Analysis

### Edit mode status list

In edit mode, replace the read-only status flow with an editable list:
1. Each status shown as a chip/badge with a remove button (X icon)
2. An "Add status" input field + button at the end
3. Removing a status:
   - Removes it from `editStatuses`
   - Removes its key from `editTransitions`
   - Removes it from all transition target arrays
   - Backend will reject if the status is in use (409 on save) — but we can also show a client-side warning
4. Adding a status:
   - Validates format: uppercase, alphanumeric + underscore, max 30 chars
   - Validates uniqueness: no duplicate in current `editStatuses`
   - Adds to `editStatuses`
   - Adds empty transition entry: `editTransitions[newStatus] = []`
   - Clears input field

### Validation rules (client-side)

- Status name: `/^[A-Z][A-Z0-9_]{0,29}$/` — starts with letter, uppercase + digits + underscore, 1–30 chars
- No duplicates in `editStatuses`
- Cannot remove all statuses (minimum 1)

### eUI components

- `eui-icon-button` with `icon="eui-close"` for remove button (use `[euiDisabled]` per pitfalls)
- Standard `<input>` with `euiInput` directive for the new status name
- `euiButton` for "Add" action
- `eui-feedback-message` for inline validation errors

### i18n keys (EN + FR)

```
"workflow-mgmt.add-status": "Add status" / "Ajouter un statut"
"workflow-mgmt.add-status-placeholder": "NEW_STATUS" / "NOUVEAU_STATUT"
"workflow-mgmt.remove-status": "Remove status {{status}}" / "Supprimer le statut {{status}}"
"workflow-mgmt.status-duplicate": "This status already exists." / "Ce statut existe déjà."
"workflow-mgmt.status-invalid": "Use uppercase letters, digits, and underscores (max 30 chars)." / "Utilisez des lettres majuscules, chiffres et underscores (max 30 caractères)."
"workflow-mgmt.status-min": "At least one status is required." / "Au moins un statut est requis."
```

## Implementation Plan

### 1. Update template — edit mode status section

Replace the read-only `<ul class="status-flow">` with a conditional block:
- `@if (!isEditMode)` → existing read-only status flow
- `@else` → editable status list with remove buttons + add input

```html
<!-- Edit mode: editable statuses -->
<div class="edit-statuses" aria-label="Edit statuses">
  @for (status of editStatuses; track status) {
    <div class="edit-status-item">
      <span euiStatusBadge euiInfo euiSizeS>{{ status }}</span>
      <eui-icon-button icon="eui-close" size="s"
        [attr.aria-label]="'workflow-mgmt.remove-status' | translate:{ status: status }"
        (click)="removeStatus(status)"
        [euiDisabled]="editStatuses.length <= 1">
      </eui-icon-button>
    </div>
  }
  <div class="add-status-row">
    <label for="new-status-input" euiLabel>{{ 'workflow-mgmt.add-status' | translate }}</label>
    <input id="new-status-input" euiInput
      [(ngModel)]="newStatusName"
      [placeholder]="'workflow-mgmt.add-status-placeholder' | translate"
      (keydown.enter)="addStatus()"
      [attr.aria-describedby]="statusError ? 'status-error-msg' : null" />
    <button euiButton euiSecondary (click)="addStatus()"
      [disabled]="!newStatusName.trim()">
      {{ 'workflow-mgmt.add-status' | translate }}
    </button>
    @if (statusError) {
      <span id="status-error-msg" class="field-error" aria-live="polite">{{ statusError }}</span>
    }
  </div>
</div>
```

### 2. Update component class

```typescript
// New properties
newStatusName = '';
statusError = '';

// New methods
addStatus(): void {
    const name = this.newStatusName.trim().toUpperCase();
    if (!name) return;

    // Validate format
    if (!/^[A-Z][A-Z0-9_]{0,29}$/.test(name)) {
        this.statusError = this.translate.instant('workflow-mgmt.status-invalid');
        return;
    }
    // Validate uniqueness
    if (this.editStatuses.includes(name)) {
        this.statusError = this.translate.instant('workflow-mgmt.status-duplicate');
        return;
    }

    this.editStatuses.push(name);
    this.editTransitions[name] = [];
    this.newStatusName = '';
    this.statusError = '';
    this.cdr.markForCheck();
}

removeStatus(status: string): void {
    if (this.editStatuses.length <= 1) return;

    this.editStatuses = this.editStatuses.filter(s => s !== status);
    delete this.editTransitions[status];
    // Remove from all transition targets
    for (const key of Object.keys(this.editTransitions)) {
        this.editTransitions[key] = this.editTransitions[key].filter(t => t !== status);
    }
    this.cdr.markForCheck();
}
```

### 3. Update styles

- `.edit-status-item`: inline-flex, gap, align-items center
- `.add-status-row`: flex row with input + button
- `.field-error`: red text, small font

### 4. Update i18n files

Add the new keys to EN and FR.

### 5. Unit tests (~10)

| # | Test |
|---|------|
| 1 | Should show editable status list in edit mode |
| 2 | Should show remove button per status |
| 3 | Should disable remove when only 1 status |
| 4 | Should remove status from editStatuses |
| 5 | Should remove status from editTransitions keys |
| 6 | Should remove status from transition targets |
| 7 | Should add valid status |
| 8 | Should reject duplicate status |
| 9 | Should reject invalid format |
| 10 | Should clear input after successful add |

## Files Modified

| File | Modification |
|------|----|
| `src/app/features/projects/settings/settings.component.ts` | Add `addStatus()`, `removeStatus()`, `newStatusName`, `statusError` |
| `src/app/features/projects/settings/settings.component.html` | Add edit mode status section |
| `src/app/features/projects/settings/settings.component.scss` | Add edit status styles |
| `src/app/features/projects/settings/settings.component.spec.ts` | Add ~10 tests |
| `src/assets/i18n/en.json` | Add status editing keys |
| `src/assets/i18n/fr.json` | Add status editing keys |

## Acceptance Criteria

- [ ] Edit mode shows editable status list with remove buttons
- [ ] Remove button deletes status from list and cleans up transitions
- [ ] Remove button disabled when only 1 status remains
- [ ] Add input validates format (uppercase, alphanumeric + underscore, max 30)
- [ ] Add input rejects duplicates with error message
- [ ] Add input auto-uppercases the entered value
- [ ] New status gets an empty transitions entry
- [ ] Input clears after successful add
- [ ] Error messages announced via `aria-live`
- [ ] Remove buttons have `aria-label` with status name
- [ ] All interactive elements keyboard-navigable (Tab, Enter, Space)
- [ ] All existing tests still pass: `npm run test:ci`
- [ ] Build passes: `npx ng build --configuration=development`
