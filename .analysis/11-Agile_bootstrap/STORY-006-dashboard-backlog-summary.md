# STORY-006: Frontend — Dashboard Enhancement (backlog summary)

## Goal

Add a backlog summary section to the project dashboard showing the count of backlog items and the default maintenance epic, giving users immediate visibility into the project's agile baseline.

## Existing Code

- `src/app/features/projects/dashboard/dashboard.component.ts` — displays project details (name, key, description, created by). Uses `ProjectService` and `ProjectContextService`.
- `src/app/core/project/project.service.ts` — has `getBacklog()` (from STORY-004).
- `src/app/core/project/project.models.ts` — has `BacklogItem`.

## Implementation Plan

### 1. Update `DashboardComponent`

Add properties:
```typescript
backlogItems: BacklogItem[] = [];
backlogLoading = false;
```

In `ngOnInit` (or in the project subscription), after project is set, call `projectService.getBacklog(projectId)` to load backlog items.

### 2. Update template

Add a "Backlog" summary card below the existing project details:

```html
<h2>{{ 'dashboard.backlog-heading' | translate }}</h2>
@if (backlogLoading) {
    <p>{{ 'common.loading' | translate }}</p>
} @else if (backlogItems.length === 0) {
    <p>{{ 'dashboard.no-backlog-items' | translate }}</p>
} @else {
    <p aria-live="polite">
        {{ 'dashboard.backlog-count' | translate:{ count: backlogItems.length } }}
    </p>
    <ul>
        @for (item of backlogItems; track item.id) {
            <li>
                <eui-chip>{{ 'workflow.ticket-type.' + item.type | translate }}</eui-chip>
                {{ item.title }} — {{ 'workflow.status.' + item.status | translate }}
            </li>
        }
    </ul>
}
```

### 3. Add i18n keys

```json
"dashboard.backlog-heading": "Backlog" / "Backlog",
"dashboard.backlog-count": "{{count}} item(s) in backlog" / "{{count}} élément(s) dans le backlog",
"dashboard.no-backlog-items": "No backlog items yet" / "Aucun élément dans le backlog"
```

### 4. Unit tests (~6 tests)

| # | Test | Expected |
|---|------|----------|
| 1 | Loads backlog items when project is set | Service called |
| 2 | Displays backlog count | Count text visible |
| 3 | Displays maintenance epic title | "Maintenance" in list |
| 4 | Shows ticket type chip for each item | Chip rendered |
| 5 | Shows empty state when no backlog items | "No backlog items" message |
| 6 | Backlog heading uses i18n key | Correct key rendered |

## eUI Components

| Component | Usage |
|-----------|-------|
| `eui-chip` | Ticket type badge |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/dashboard/dashboard.component.ts` | Add backlog loading logic |
| `src/app/features/projects/dashboard/dashboard.component.html` | Add backlog summary section |
| `src/app/features/projects/dashboard/dashboard.component.spec.ts` | Add 6 tests |
| `src/assets/i18n/en.json` | Add dashboard backlog i18n keys |
| `src/assets/i18n/fr.json` | Add dashboard backlog i18n keys |

## Acceptance Criteria

- [ ] Dashboard loads backlog items when project is active
- [ ] Displays item count with `aria-live="polite"`
- [ ] Lists each backlog item with type chip, title, and status
- [ ] Shows empty state when no backlog items exist
- [ ] Loading state while fetching
- [ ] i18n keys for heading, count, and empty state (EN + FR)
- [ ] Unit tests pass
- [ ] Build passes (`npx ng build --configuration=development`)
