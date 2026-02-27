# STORY-006: Frontend — Dashboard Backlog Summary Enhancement

## Goal

Update the dashboard backlog summary to show ticket numbers (KEY-N format), priority chips, and a "View Backlog" link that navigates to the Backlog page. This makes the summary more informative now that tickets have richer taxonomy.

## Existing Code

- `src/app/features/projects/dashboard/dashboard.component.ts` — `backlogItems: BacklogItem[]`, `backlogLoading`, `loadBacklog()`. Shows count, type chip, title, status text.
- `src/app/features/projects/dashboard/dashboard.component.html` — `.backlog-summary` section with `<ul class="backlog-list">`.
- `src/app/core/project/project.models.ts` — `BacklogItem` now has `priority`, `ticket_number` (from STORY-003).
- `src/app/features/projects/projects.routes.ts` — `/backlog` route registered (from STORY-004).

## Implementation Plan

### 1. Update dashboard template

Enhance the backlog list items to show:
- Ticket number in `KEY-N` format (e.g. `TF-2`)
- Priority chip (same severity mapping as Backlog page: CRITICAL=danger, HIGH=warning, MEDIUM=info, LOW=neutral)
- "View Backlog" link at the bottom of the section

```html
<section class="backlog-summary" [attr.aria-label]="'dashboard.backlog-heading' | translate">
    <h2>{{ 'dashboard.backlog-heading' | translate }}</h2>
    @if (backlogLoading) {
        <p>{{ 'common.loading' | translate }}</p>
    } @else if (backlogItems.length === 0) {
        <p>{{ 'dashboard.no-backlog-items' | translate }}</p>
    } @else {
        <p aria-live="polite">
            {{ 'dashboard.backlog-count' | translate:{ count: backlogItems.length } }}
        </p>
        <ul class="backlog-list">
            @for (item of backlogItems; track item.id) {
                <li>
                    <span class="ticket-number">{{ project?.key }}-{{ item.ticket_number }}</span>
                    <eui-chip euiSizeS [ariaLabel]="'workflow.ticket-type.' + item.type | translate">
                        {{ 'workflow.ticket-type.' + item.type | translate }}
                    </eui-chip>
                    @if (item.priority) {
                        <eui-chip euiSizeS
                            [class.eui-chip--danger]="item.priority === 'CRITICAL'"
                            [class.eui-chip--warning]="item.priority === 'HIGH'"
                            [class.eui-chip--info]="item.priority === 'MEDIUM'"
                            [ariaLabel]="'ticket.priority.' + item.priority | translate">
                            {{ 'ticket.priority.' + item.priority | translate }}
                        </eui-chip>
                    }
                    <span class="ticket-title">{{ item.title }}</span>
                    <span class="backlog-status">{{ 'workflow.status.' + item.status | translate }}</span>
                </li>
            }
        </ul>
        <a [routerLink]="['backlog']" class="view-backlog-link">
            {{ 'dashboard.view-backlog' | translate }}
        </a>
    }
</section>
```

### 2. Update component class

- Import `RouterLink` in the component imports.
- No new service calls needed — `BacklogItem` already has the new fields from the API.

### 3. Update SCSS

Add styles for `.ticket-number` (monospace, muted color) and `.view-backlog-link`.

### 4. Add i18n keys

**en.json:**
```json
"dashboard.view-backlog": "View full backlog →"
```

**fr.json:**
```json
"dashboard.view-backlog": "Voir le backlog complet →"
```

### 5. Unit tests

| # | Test | Expected |
|---|------|----------|
| 1 | Should display ticket number in KEY-N format | `TF-1` visible |
| 2 | Should display priority chip for items with priority | Chip visible |
| 3 | Should not display priority chip for items with null priority | No chip |
| 4 | Should display "View full backlog" link | Link visible |
| 5 | Should link to backlog route | `routerLink` correct |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/dashboard/dashboard.component.ts` | Add `RouterLink` import |
| `src/app/features/projects/dashboard/dashboard.component.html` | Add ticket number, priority chip, view link |
| `src/app/features/projects/dashboard/dashboard.component.scss` | Add `.ticket-number`, `.view-backlog-link` styles |
| `src/app/features/projects/dashboard/dashboard.component.spec.ts` | Add 5 unit tests |
| `src/assets/i18n/en.json` | Add 1 i18n key |
| `src/assets/i18n/fr.json` | Add 1 i18n key |

## Acceptance Criteria

- [ ] Backlog summary shows ticket number in `KEY-N` format
- [ ] Priority chips displayed with correct severity colors
- [ ] Null priority (EPIC items) shows no priority chip
- [ ] "View full backlog →" link navigates to `/projects/:id/backlog`
- [ ] Existing backlog summary functionality preserved (count, type chip, title, status)
- [ ] All unit tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
