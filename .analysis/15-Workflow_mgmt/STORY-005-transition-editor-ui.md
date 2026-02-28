# STORY-005: Frontend — Transition Editor UI

## Objective

In edit mode, allow the user to view and modify transitions for each status in the selected workflow. Each status row shows its allowed target statuses as checkboxes, enabling intuitive toggle-based editing.

## Existing Code (after STORY-004)

- `SettingsComponent` has `editStatuses: string[]`, `editTransitions: Record<string, string[]>`, `isEditMode`
- Read-only view shows a transitions table with "From" and "To" columns
- `addStatus()` and `removeStatus()` manage the status list and clean up transitions
- `saveWorkflow()` sends the full `{ statuses, transitions }` payload to the backend

### Current Transitions Table (read-only)

```html
<table class="transitions-table">
  <thead><tr><th>From</th><th>To</th></tr></thead>
  <tbody>
    @for (status of workflow.statuses) {
      @if (getTransitionTargets(workflow, status).length > 0) {
        <tr>
          <td>{{ status }}</td>
          <td>{{ targets joined by comma }}</td>
        </tr>
      }
    }
  </tbody>
</table>
```

## Analysis

### Transition editor approach: checkbox matrix

The most intuitive way to edit transitions is a matrix/grid:
- Rows = source statuses (from)
- Columns = target statuses (to)
- Each cell is a checkbox: checked = transition allowed
- Diagonal cells (self-transitions) are disabled (backend rejects self-transitions)

This gives a clear visual of the entire transition graph at a glance.

For small status counts (4–6), this works well. For larger counts, the table scrolls horizontally.

### Alternative: per-row multi-select

For each status, show a multi-select or chip list of allowed targets. This is more compact but less visual. Given that workflows typically have 3–6 statuses, the matrix approach is better for clarity.

### Decision: checkbox matrix

### eUI components

- Standard `<table>` with `<th scope="col">` and `<th scope="row">` for accessibility
- `<input type="checkbox">` for each transition cell — eUI doesn't have a standalone checkbox component that fits a matrix layout, so we use native checkboxes with eUI styling classes
- `aria-label` on each checkbox: "Allow transition from X to Y"
- `<caption>` for the table (screen-reader only via `eui-u-sr-only`)

### i18n keys (EN + FR)

```
"workflow-mgmt.transitions-heading": "Transitions" / "Transitions"
"workflow-mgmt.transition-from": "From" / "De"
"workflow-mgmt.transition-to": "To" / "Vers"
"workflow-mgmt.transition-label": "Allow transition from {{from}} to {{to}}" / "Autoriser la transition de {{from}} vers {{to}}"
"workflow-mgmt.transition-self": "Self-transition (not allowed)" / "Auto-transition (non autorisée)"
"workflow-mgmt.no-transitions": "No transitions defined. Check at least one target per status." / "Aucune transition définie. Cochez au moins une cible par statut."
```

## Implementation Plan

### 1. Update template — edit mode transitions section

Replace the read-only transitions table with a conditional block:

```html
@if (!isEditMode) {
  <!-- existing read-only transitions table -->
} @else {
  <h3>{{ 'workflow-mgmt.transitions-heading' | translate }}</h3>
  <div class="transition-matrix-wrapper">
    <table class="transition-matrix"
           [attr.aria-label]="'workflow-mgmt.transitions-heading' | translate">
      <caption class="eui-u-sr-only">
        {{ 'workflow-mgmt.transitions-heading' | translate }}
      </caption>
      <thead>
        <tr>
          <th scope="col">{{ 'workflow-mgmt.transition-from' | translate }} / {{ 'workflow-mgmt.transition-to' | translate }}</th>
          @for (status of editStatuses; track status) {
            <th scope="col">{{ status }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (fromStatus of editStatuses; track fromStatus) {
          <tr>
            <th scope="row">{{ fromStatus }}</th>
            @for (toStatus of editStatuses; track toStatus) {
              <td [attr.data-col-label]="toStatus">
                @if (fromStatus === toStatus) {
                  <input type="checkbox" disabled
                    [attr.aria-label]="'workflow-mgmt.transition-self' | translate"
                    aria-hidden="true" />
                } @else {
                  <input type="checkbox"
                    [checked]="hasTransition(fromStatus, toStatus)"
                    (change)="toggleTransition(fromStatus, toStatus)"
                    [attr.aria-label]="'workflow-mgmt.transition-label' | translate:{ from: fromStatus, to: toStatus }" />
                }
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
  </div>
}
```

### 2. Update component class

```typescript
hasTransition(from: string, to: string): boolean {
    return (this.editTransitions[from] ?? []).includes(to);
}

toggleTransition(from: string, to: string): void {
    if (!this.editTransitions[from]) {
        this.editTransitions[from] = [];
    }
    const targets = this.editTransitions[from];
    const index = targets.indexOf(to);
    if (index >= 0) {
        targets.splice(index, 1);
    } else {
        targets.push(to);
    }
    this.cdr.markForCheck();
}
```

### 3. Update styles

```scss
.transition-matrix-wrapper {
    overflow-x: auto;
    margin-top: 1rem;
}

.transition-matrix {
    border-collapse: collapse;
    width: auto;

    th, td {
        padding: 0.5rem;
        text-align: center;
        border: 1px solid var(--eui-color-grey-25);
    }

    th[scope="row"] {
        text-align: left;
        font-weight: 600;
    }

    input[type="checkbox"] {
        width: 1.25rem;
        height: 1.25rem;
        cursor: pointer;

        &:disabled {
            cursor: not-allowed;
            opacity: 0.3;
        }
    }
}
```

### 4. Update i18n files

Add the new keys to EN and FR.

### 5. Unit tests (~8)

| # | Test |
|---|------|
| 1 | Should show transition matrix in edit mode |
| 2 | Should show checkbox for each non-diagonal cell |
| 3 | Should disable diagonal (self-transition) checkboxes |
| 4 | Should check boxes for existing transitions |
| 5 | Should toggle transition on checkbox click (add) |
| 6 | Should toggle transition on checkbox click (remove) |
| 7 | Should have aria-label on each checkbox |
| 8 | Should show read-only table when not in edit mode |

## Files Modified

| File | Modification |
|------|----|
| `src/app/features/projects/settings/settings.component.ts` | Add `hasTransition()`, `toggleTransition()` |
| `src/app/features/projects/settings/settings.component.html` | Add transition matrix in edit mode |
| `src/app/features/projects/settings/settings.component.scss` | Add matrix styles |
| `src/app/features/projects/settings/settings.component.spec.ts` | Add ~8 tests |
| `src/assets/i18n/en.json` | Add transition editing keys |
| `src/assets/i18n/fr.json` | Add transition editing keys |

## Acceptance Criteria

- [ ] Edit mode shows a checkbox matrix for transitions
- [ ] Rows = source statuses, columns = target statuses
- [ ] Diagonal cells (self-transitions) are disabled
- [ ] Checking a box adds the transition to `editTransitions`
- [ ] Unchecking a box removes the transition from `editTransitions`
- [ ] Existing transitions are pre-checked when entering edit mode
- [ ] Matrix updates when statuses are added/removed (STORY-004)
- [ ] Table has `<caption>`, `scope="col"`, `scope="row"` for accessibility
- [ ] Each checkbox has descriptive `aria-label`
- [ ] Matrix scrolls horizontally if many statuses
- [ ] All interactive elements keyboard-navigable
- [ ] All existing tests still pass: `npm run test:ci`
- [ ] Build passes: `npx ng build --configuration=development`
