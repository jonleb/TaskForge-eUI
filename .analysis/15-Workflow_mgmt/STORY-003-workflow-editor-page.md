# STORY-003: Frontend — Workflow Editor Page

## Objective

Transform the existing read-only `SettingsComponent` into a workflow editor page where authorized users can select a workflow by ticket type and enter edit mode. This story sets up the page structure, workflow selection, and save/cancel flow. The actual status and transition editing controls are added in STORY-004 and STORY-005.

## Existing Code

- `src/app/features/projects/settings/settings.component.ts` — loads workflows via `ProjectService.getWorkflows()`, displays them read-only with status flow and transitions table.
- `src/app/features/projects/settings/settings.component.html` — uses `eui-page` > `eui-page-header` > `eui-page-content`. Iterates workflows with `@for`, shows status badges and transitions table per ticket type.
- `src/app/features/projects/settings/settings.component.scss` — styles for status flow and transitions table.
- `src/app/features/projects/settings/settings.component.spec.ts` — existing tests.
- Route: `:projectId/settings` loads `SettingsComponent` (lazy).
- Sidebar: "Settings" link visible to all project members.

### Current Template Structure

```html
<eui-page>
  <eui-page-header [label]="'settings.title' | translate"></eui-page-header>
  <eui-page-content>
    <!-- loading / error / empty states -->
    <h2>Workflows</h2>
    @for (workflow of workflows) {
      <section> <!-- status flow + transitions table per type --> </section>
    }
  </eui-page-content>
</eui-page>
```

## Analysis

### Page redesign approach

Rather than showing all 4 workflows at once, switch to a tab-based or selector-based layout:
1. A `eui-toggle-group` (or tab bar) at the top lets the user pick the ticket type (STORY, BUG, TASK, EPIC)
2. Below, the selected workflow's statuses and transitions are displayed
3. An "Edit" button (visible only to authorized roles — STORY-006) enters edit mode for the selected workflow
4. In edit mode: statuses become editable (STORY-004), transitions become editable (STORY-005), and Save/Cancel buttons appear
5. Save calls `ProjectService.updateWorkflow()`, shows growl, exits edit mode
6. Cancel reverts to the persisted state

### Component state

```typescript
// Selection
selectedWorkflow: Workflow | null = null;

// Edit mode
isEditMode = false;
editStatuses: string[] = [];
editTransitions: Record<string, string[]> = {};
isSaving = false;

// Permission (set in STORY-006, default false for now)
canManage = false;
```

### eUI components to use

- `eui-toggle-group` with `eui-toggle-group-item` for ticket type selector (override `width: auto` per pitfalls)
- `eui-page-header-action-items` for the Edit button (per pitfalls — never put action buttons in page content)
- `eui-feedback-message` for error/empty states
- `euiButton` directives for Save/Cancel
- `EuiGrowlService` for success/error notifications

### Save flow

1. Build `UpdateWorkflowPayload` from `editStatuses` and `editTransitions`
2. Call `projectService.updateWorkflow(projectId, workflowId, payload)`
3. On success: update local `workflows` array, exit edit mode, growl success
4. On error: growl error, stay in edit mode
5. On 409 (status in use): show specific error message from response

### i18n keys (EN + FR)

```
"workflow-mgmt.title": "Workflow Management" / "Gestion des workflows"
"workflow-mgmt.select-type": "Select ticket type" / "Sélectionner le type de ticket"
"workflow-mgmt.edit": "Edit workflow" / "Modifier le workflow"
"workflow-mgmt.save": "Save" / "Enregistrer"
"workflow-mgmt.cancel": "Cancel" / "Annuler"
"workflow-mgmt.saving": "Saving..." / "Enregistrement..."
"workflow-mgmt.growl.updated-summary": "Workflow updated" / "Workflow mis à jour"
"workflow-mgmt.growl.updated-detail": "Changes saved successfully." / "Modifications enregistrées."
"workflow-mgmt.growl.update-failed": "Failed to save workflow." / "Échec de la sauvegarde du workflow."
"workflow-mgmt.growl.conflict": "Cannot remove statuses in use by existing tickets." / "Impossible de supprimer des statuts utilisés par des tickets existants."
"workflow-mgmt.no-workflows": "No workflows configured for this project." / "Aucun workflow configuré pour ce projet."
"workflow-mgmt.error-loading": "Failed to load workflows." / "Impossible de charger les workflows."
```

## Implementation Plan

### 1. Refactor `SettingsComponent` template

- Replace the flat list of all workflows with a toggle-group selector + single workflow display
- Add Edit button in `eui-page-header-action-items`
- Add Save/Cancel buttons (visible in edit mode)
- Keep the existing status flow and transitions table as the read-only view

### 2. Update `SettingsComponent` class

- Add `selectedWorkflow`, `isEditMode`, `editStatuses`, `editTransitions`, `isSaving`, `canManage` properties
- Add `selectWorkflow(ticketType)` method
- Add `enterEditMode()` — copies current workflow data to edit state
- Add `cancelEdit()` — reverts edit state, exits edit mode
- Add `saveWorkflow()` — calls service, handles success/error/conflict
- Auto-select first workflow on load

### 3. Update styles

- Toggle group width override (`::ng-deep { width: auto }`)
- Edit mode visual distinction (subtle background or border)

### 4. Update i18n files

- Add new keys to `src/assets/i18n/en.json` and `src/assets/i18n/fr.json`
- Keep existing `settings.*` keys for backward compatibility (can coexist)

### 5. Unit tests (~12)

| # | Test |
|---|------|
| 1 | Should load workflows on init |
| 2 | Should auto-select first workflow |
| 3 | Should switch selected workflow on toggle click |
| 4 | Should display selected workflow statuses |
| 5 | Should display selected workflow transitions |
| 6 | Should enter edit mode on Edit click |
| 7 | Should copy workflow data to edit state on edit |
| 8 | Should exit edit mode on Cancel |
| 9 | Should revert edit state on Cancel |
| 10 | Should call updateWorkflow on Save |
| 11 | Should show growl on save success |
| 12 | Should show growl on save error |

## Files Modified

| File | Modification |
|------|----|
| `src/app/features/projects/settings/settings.component.ts` | Refactor to add selection, edit mode, save/cancel |
| `src/app/features/projects/settings/settings.component.html` | Refactor template with toggle group + edit mode |
| `src/app/features/projects/settings/settings.component.scss` | Add toggle group override, edit mode styles |
| `src/app/features/projects/settings/settings.component.spec.ts` | Update + add ~12 tests |
| `src/assets/i18n/en.json` | Add `workflow-mgmt.*` keys |
| `src/assets/i18n/fr.json` | Add `workflow-mgmt.*` keys |

## Acceptance Criteria

- [ ] Toggle group shows ticket types (STORY, BUG, TASK, EPIC)
- [ ] Selecting a type displays that workflow's statuses and transitions
- [ ] First workflow auto-selected on page load
- [ ] Edit button enters edit mode (copies data to edit state)
- [ ] Cancel button exits edit mode and reverts changes
- [ ] Save button calls `updateWorkflow()` with correct payload
- [ ] Growl shown on save success and error
- [ ] 409 conflict error displays meaningful message
- [ ] Loading, error, and empty states handled
- [ ] i18n keys added for EN and FR
- [ ] All interactive elements keyboard-navigable
- [ ] All existing tests still pass: `npm run test:ci`
- [ ] Build passes: `npx ng build --configuration=development`
