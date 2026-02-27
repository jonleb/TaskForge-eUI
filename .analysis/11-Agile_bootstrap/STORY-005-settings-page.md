# STORY-005: Frontend — Project Settings Page (workflow display)

## Goal

Create a Settings page under the project shell that displays the project's workflows per ticket type, showing statuses and allowed transitions. This gives content to the existing "Settings" sidebar entry.

## Existing Code

- `src/app/features/projects/project-shell/` — project shell with child routes (dashboard, members). Sidebar already has a "Settings" entry pointing to `${base}/settings`.
- `src/app/core/project/project.service.ts` — has `getWorkflows()` (from STORY-004).
- `src/app/core/project/project.models.ts` — has `Workflow`, `TicketType`, `WorkflowStatus`.
- Route pattern: `projects.routes.ts` defines child routes under the project shell.

## Implementation Plan

### 1. Create `SettingsComponent`

Path: `src/app/features/projects/settings/settings.component.ts`

Standalone, OnPush. Loads workflows from `ProjectService.getWorkflows()` using the project ID from `ProjectContextService`.

Displays one section per ticket type (STORY, BUG, TASK, EPIC) with:
- Ticket type name (translated via i18n)
- Status flow as a horizontal list of chips with arrow separators
- Transitions table: From → To columns

### 2. Template structure

```html
<eui-page>
    <eui-page-header [label]="'settings.title' | translate"></eui-page-header>
    <eui-page-content>
        @if (isLoading) { <eui-loader /> }
        @else if (hasError) { error state }
        @else {
            @for (workflow of workflows; track workflow.id) {
                <h2>{{ 'workflow.ticket-type.' + workflow.ticketType | translate }}</h2>
                <!-- Status flow chips -->
                <!-- Transitions table -->
            }
        }
    </eui-page-content>
</eui-page>
```

### 3. Register route

In `projects.routes.ts`, add `settings` child route under the project shell:

```typescript
{ path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent) }
```

### 4. Add i18n keys

```json
"settings.title": "Project Settings" / "Paramètres du projet",
"settings.workflows-heading": "Workflows" / "Flux de travail",
"settings.status-flow": "Status Flow" / "Flux de statuts",
"settings.transitions": "Transitions" / "Transitions",
"settings.from": "From" / "De",
"settings.to": "To" / "Vers",
"settings.no-workflows": "No workflows configured" / "Aucun flux de travail configuré"
```

### 5. Unit tests (~10 tests)

| # | Test | Expected |
|---|------|----------|
| 1 | Component creates | Truthy |
| 2 | Loads workflows on init | Service called with project ID |
| 3 | Displays 4 workflow sections for standard project | 4 headings |
| 4 | Shows correct statuses for STORY workflow | 4 status chips |
| 5 | Shows correct statuses for EPIC workflow | 3 status chips |
| 6 | Shows loading state | Loader visible |
| 7 | Shows error state on failure | Error message visible |
| 8 | Shows empty state when no workflows | "No workflows" message |
| 9 | Page header has correct label | i18n key rendered |
| 10 | Table has aria-label | Accessible |

## eUI Components

| Component | Usage |
|-----------|-------|
| `eui-page`, `eui-page-header`, `eui-page-content` | Page structure |
| `eui-chip` | Status badges in flow display |
| `eui-loader` | Loading state |
| `eui-feedback-message` | Error state |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/settings/settings.component.ts` | New component |
| `src/app/features/projects/settings/settings.component.html` | New template |
| `src/app/features/projects/settings/settings.component.scss` | New styles |
| `src/app/features/projects/settings/settings.component.spec.ts` | New — 10 tests |
| `src/app/features/projects/projects.routes.ts` | Add `settings` child route |
| `src/assets/i18n/en.json` | Add settings i18n keys |
| `src/assets/i18n/fr.json` | Add settings i18n keys |

## Acceptance Criteria

- [ ] Settings page accessible via `/screen/projects/:projectId/settings`
- [ ] Displays one section per ticket type with translated name
- [ ] Shows status flow as chips for each workflow
- [ ] Shows transitions (from → to) for each workflow
- [ ] Loading state with `eui-loader`
- [ ] Error state with retry option
- [ ] Empty state when no workflows exist
- [ ] Page header uses `eui-page-header` with i18n label
- [ ] Accessible markup (aria-label on tables, scope on headers)
- [ ] Unit tests pass
- [ ] Build passes (`npx ng build --configuration=development`)
