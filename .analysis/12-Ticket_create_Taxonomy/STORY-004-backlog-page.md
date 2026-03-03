# STORY-004: Frontend — Backlog Page with Ticket Table

## Goal

Create a Backlog page under the project shell that displays all backlog items in an `eui-table` with columns for ticket number, type, title, priority, status, and assignee. Register the route and connect the existing sidebar link.

## Existing Code

- `src/app/features/projects/projects.routes.ts` — no `/backlog` route registered. Sidebar link exists in `layout.component.ts` pointing to `{base}/backlog`.
- `src/app/core/project/project.service.ts` — `getBacklog(projectId, type?)` returns `BacklogItem[]`.
- `src/app/core/project/project.models.ts` — `BacklogItem` with `priority`, `assignee_id`, `epic_id`, `ticket_number` (from STORY-003).
- `src/app/features/projects/members/members.component.ts` — reference for table + page pattern.
- `src/app/features/projects/dashboard/dashboard.component.ts` — reference for `ProjectContextService` subscription pattern.

## Implementation Plan

### 1. Create `BacklogComponent` at `src/app/features/projects/backlog/`

Standalone component, `OnPush` change detection.

**Component class:**

```typescript
@Component({
    selector: 'app-backlog',
    templateUrl: './backlog.component.html',
    styleUrls: ['./backlog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_PAGE, ...EUI_TABLE, ...EUI_CHIP,
        ...EUI_FEEDBACK_MESSAGE, ...EUI_BUTTON,
        TranslateModule,
    ],
})
export class BacklogComponent implements OnInit, OnDestroy {
    // Injections: ProjectContextService, ProjectService, PermissionService, cdr, translate, destroy$

    items: BacklogItem[] = [];
    isLoading = true;
    hasError = false;
    canCreate = false; // true if user is not VIEWER

    ngOnInit(): void {
        // Subscribe to currentProject$, load backlog items
        // Determine canCreate from PermissionService (isSuperAdmin or project role != VIEWER)
    }

    loadItems(projectId: string): void {
        // Call projectService.getBacklog(projectId)
        // Sort by ticket_number descending (newest first)
    }

    retry(): void { /* re-fetch */ }

    getAssigneeName(item: BacklogItem): string {
        // Return assignee display name from a local cache, or '—' if null
    }

    getPriorityClass(priority: string | null): string {
        // Return chip severity class based on priority
    }
}
```

**Template structure:**

```html
<eui-page>
    <eui-page-header [label]="'backlog.page-title' | translate">
        <!-- Create button goes here in STORY-005 -->
    </eui-page-header>
    <eui-page-content>
        @if (isLoading) {
            <output aria-live="polite">{{ 'common.loading' | translate }}</output>
        } @else if (hasError) {
            <eui-feedback-message euiDanger aria-live="polite">
                {{ 'backlog.load-error' | translate }}
            </eui-feedback-message>
            <button euiButton euiSecondary (click)="retry()">{{ 'common.retry' | translate }}</button>
        } @else if (items.length === 0) {
            <eui-feedback-message euiInfo>
                {{ 'backlog.no-items' | translate }}
            </eui-feedback-message>
        } @else {
            <p aria-live="polite">{{ 'backlog.showing-count' | translate:{ count: items.length } }}</p>
            <table eui-table [attr.aria-label]="'backlog.table-label' | translate">
                <caption class="eui-u-sr-only">{{ 'backlog.table-label' | translate }}</caption>
                <thead>
                    <tr>
                        <th scope="col">{{ 'ticket.field.ticket-number' | translate }}</th>
                        <th scope="col">{{ 'ticket.field.type' | translate }}</th>
                        <th scope="col">{{ 'ticket.field.title' | translate }}</th>
                        <th scope="col">{{ 'ticket.priority.label' | translate }}</th>
                        <th scope="col">{{ 'common.field.status' | translate }}</th>
                        <th scope="col">{{ 'ticket.field.assignee' | translate }}</th>
                    </tr>
                </thead>
                <tbody>
                    @for (item of items; track item.id) {
                        <tr>
                            <td data-col-label="Ticket #">{{ projectKey }}-{{ item.ticket_number }}</td>
                            <td data-col-label="Type">
                                <eui-chip euiSizeS>{{ 'workflow.ticket-type.' + item.type | translate }}</eui-chip>
                            </td>
                            <td data-col-label="Title">{{ item.title }}</td>
                            <td data-col-label="Priority">
                                @if (item.priority) {
                                    <!-- CRITICAL=euiDanger, HIGH=euiWarning, MEDIUM=euiInfo, LOW=default -->
                                    <eui-chip euiSizeS ...>{{ 'ticket.priority.' + item.priority | translate }}</eui-chip>
                                } @else { — }
                            </td>
                            <td data-col-label="Status">{{ 'workflow.status.' + item.status | translate }}</td>
                            <td data-col-label="Assignee">{{ getAssigneeName(item) }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        }
    </eui-page-content>
</eui-page>
```

**Assignee resolution:**
- On load, collect unique `assignee_id` values from items.
- Batch-fetch user info using `ProjectService.getProjectMembers(projectId)` (already returns enriched members with firstName/lastName).
- Build a local `Map<string, string>` of userId → display name.
- `getAssigneeName(item)` looks up from the map, returns `'—'` for null.

**Priority chip severity mapping:**

| Priority | Chip directive |
|----------|---------------|
| CRITICAL | `euiDanger` |
| HIGH | `euiWarning` |
| MEDIUM | `euiInfo` |
| LOW | (no severity — default neutral) |

### 2. Register route in `projects.routes.ts`

```typescript
{ path: 'backlog', component: BacklogComponent },
```

Add import for `BacklogComponent`.

### 3. Add i18n keys

**en.json:**
```json
"backlog.page-title": "Backlog",
"backlog.table-label": "Project backlog items",
"backlog.showing-count": "{{count}} item(s)",
"backlog.no-items": "No backlog items yet. Create a ticket to get started.",
"backlog.load-error": "Could not load backlog. Please try again."
```

**fr.json:**
```json
"backlog.page-title": "Backlog",
"backlog.table-label": "Éléments du backlog du projet",
"backlog.showing-count": "{{count}} élément(s)",
"backlog.no-items": "Aucun élément dans le backlog. Créez un ticket pour commencer.",
"backlog.load-error": "Impossible de charger le backlog. Veuillez réessayer."
```

### 4. Unit tests

| # | Test | Expected |
|---|------|----------|
| 1 | Should create the component | Component exists |
| 2 | Should display loading state initially | `common.loading` visible |
| 3 | Should display backlog items in table after load | Table rows match items |
| 4 | Should display ticket number as `KEY-N` format | e.g. `TF-1` |
| 5 | Should display type chip with i18n key | `workflow.ticket-type.STORY` |
| 6 | Should display priority chip with correct severity | CRITICAL → euiDanger |
| 7 | Should display `—` for null priority (EPIC items) | Dash shown |
| 8 | Should display assignee name from member lookup | Name shown |
| 9 | Should display `—` for null assignee | Dash shown |
| 10 | Should display error state with retry button | Error message + button |
| 11 | Should display empty state when no items | Info message |
| 12 | Should call retry and reload items | Service called again |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | New component |
| `src/app/features/projects/backlog/backlog.component.html` | New template |
| `src/app/features/projects/backlog/backlog.component.scss` | New styles |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | 12 unit tests |
| `src/app/features/projects/projects.routes.ts` | Add backlog route |
| `src/assets/i18n/en.json` | Add 5 i18n keys |
| `src/assets/i18n/fr.json` | Add 5 i18n keys |

## Acceptance Criteria

- [ ] Backlog page renders at `/projects/:projectId/backlog`
- [ ] Sidebar "Backlog" link navigates to the page
- [ ] Table displays ticket number (KEY-N format), type, title, priority, status, assignee
- [ ] Priority chips use correct severity colors (CRITICAL=danger, HIGH=warning, MEDIUM=info, LOW=neutral)
- [ ] Null priority shows dash (for EPIC items)
- [ ] Assignee names resolved from project members
- [ ] Loading, error (with retry), and empty states work correctly
- [ ] `aria-label` on table, `scope="col"` on headers, `data-col-label` on cells
- [ ] `aria-live="polite"` on dynamic count and loading/error states
- [ ] All unit tests pass (`npm run test:ci`)
- [ ] Build passes (`npx ng build --configuration=development`)
