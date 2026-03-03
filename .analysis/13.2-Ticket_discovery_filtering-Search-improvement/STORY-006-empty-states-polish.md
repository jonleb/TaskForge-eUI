# STORY-006: Frontend — Empty States, Error Handling & Polish

## Goal

Finalize contextual empty states for the card-based layout, preserve error handling with retry, and apply visual polish including card spacing, responsive behavior, and priority chip color variants.

## Existing Code

- `src/app/features/projects/backlog/backlog.component.ts` — fluid layout from STORY-003, checkbox filters from STORY-004, list header with sort/chips from STORY-005, `loadBacklog()`, `params`, `isLoading`, `hasError`, `emptyStateMessage` getter, `EuiGrowlService` injection, `isFilterCollapsed`.
- `src/app/features/projects/backlog/backlog.component.html` — eUI page-columns fluid layout with collapsible filter column, results column with list header, card list, paginator.
- `src/app/features/projects/backlog/backlog.component.scss` — empty state centering, filter fieldset styles.

## Implementation Plan

### 1. Contextual empty states

Update the `emptyStateMessage` getter to return context-aware messages for the card-based layout (no longer inside a table `noData` template):

```typescript
get emptyStateMessage(): string {
    if (this.hasError) {
        return this.translate.instant('backlog.load-error');
    }
    if (this.params.q) {
        return this.translate.instant('backlog.no-match-search');
    }
    if (this.hasActiveFilters) {
        return this.translate.instant('backlog.no-match-filter');
    }
    return this.translate.instant('backlog.no-items');
}

get emptyStateHint(): string | null {
    if (!this.hasError && !this.params.q && !this.hasActiveFilters) {
        return this.translate.instant('backlog.no-items-hint');
    }
    return null;
}
```

### 2. Empty state template

Replace the old table `noData` template with a centered block inside the results column's `eui-page-column-body`:

```html
@if (!isLoading && backlogItems.length === 0) {
    <div class="empty-state eui-u-d-flex eui-u-flex-direction-column eui-u-align-items-center eui-u-justify-content-center eui-u-pv-xl"
         role="status">
        <p class="eui-u-f-l eui-u-mb-s">{{ emptyStateMessage }}</p>
        @if (emptyStateHint) {
            <p class="eui-u-f-m eui-u-c-text-muted">{{ emptyStateHint }}</p>
        }
        @if (hasError) {
            <button euiButton euiSecondary euiSizeS
                    type="button"
                    class="eui-u-mt-m"
                    (click)="retryLoad()">
                {{ 'backlog.retry' | translate }}
            </button>
        }
    </div>
}
```

### 3. Error handling

Preserve existing error handling patterns:

```typescript
retryLoad(): void {
    this.hasError = false;
    if (this.project) {
        this.loadBacklog(this.project.id);
    }
}
```

- `loadBacklog()` error handler already calls `EuiGrowlService.showWarning()` and sets `hasError = true`.
- Retry button calls `retryLoad()` which clears the error flag and reloads.

### 4. Priority chip color variants

Apply color directives to priority chips on cards:

```typescript
getPriorityChipVariant(priority: TicketPriority | null): string {
    switch (priority) {
        case 'CRITICAL': return 'euiDanger';
        case 'HIGH': return 'euiWarning';
        case 'MEDIUM': return 'euiInfo';
        default: return '';
    }
}
```

Template usage on each card's priority chip:

```html
@if (item.priority) {
    <eui-chip euiSizeS
              [class.euiDanger]="item.priority === 'CRITICAL'"
              [class.euiWarning]="item.priority === 'HIGH'"
              [class.euiInfo]="item.priority === 'MEDIUM'"
              [ariaLabel]="'ticket.priority.' + item.priority | translate">
        {{ 'ticket.priority.' + item.priority | translate }}
    </eui-chip>
} @else {
    <span class="eui-u-c-text-muted">—</span>
}
```

Type and status chips remain neutral (no color variant).

### 5. Card spacing & visual polish

```scss
// Empty state
.empty-state {
    min-height: 200px;
    text-align: center;
}
```

### 6. Responsive behavior

Responsive behavior is handled natively by the `eui-page-column` component:
- The filter column uses `[isAutocloseOnMobile]="true"` (set in STORY-003), which auto-collapses the filter panel on mobile viewports.
- When collapsed, the filter column shows a vertical label tab that the user can tap to expand.
- No custom CSS media queries needed — the eUI page-column component manages the responsive layout.

### 7. i18n keys (EN + FR)

Reuse existing keys where available, add only what's new:

**en.json:**
```json
"backlog.no-items-hint": "Create your first ticket.",
"backlog.retry": "Retry"
```

**fr.json:**
```json
"backlog.no-items-hint": "Créez votre premier ticket.",
"backlog.retry": "Réessayer"
```

Existing keys reused (no changes needed):
- `backlog.no-match-search` — "No tickets match your search"
- `backlog.no-match-filter` — "No tickets match the selected filters"
- `backlog.no-items` — "No backlog items yet"
- `backlog.load-error` — "Failed to load backlog"

## Unit Tests (~6 new)

| # | Test | Expected |
|---|------|----------|
| 1 | Should show search empty state when `q` active and no results | "No tickets match your search" message |
| 2 | Should show filter empty state when filters active and no results | "No tickets match the selected filters" message |
| 3 | Should show default empty state when no filters and no results | "No backlog items yet" + hint |
| 4 | Should show error state with retry button | Error message + retry button present |
| 5 | Should call loadBacklog on retry | `loadBacklog` called, `hasError` reset to false |
| 6 | Should show growl on load error | `EuiGrowlService.showWarning` called |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Add `emptyStateHint` getter, `retryLoad()`, priority chip variant logic |
| `src/app/features/projects/backlog/backlog.component.html` | Empty state block in card list area, priority chip color classes |
| `src/app/features/projects/backlog/backlog.component.scss` | Empty state centering, chip color utility classes |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Add ~6 tests |
| `src/assets/i18n/en.json` | Add 2 i18n keys (`no-items-hint`, `retry`) |
| `src/assets/i18n/fr.json` | Add 2 i18n keys (`no-items-hint`, `retry`) |

## Acceptance Criteria

- [ ] Search active + no results → "No tickets match your search"
- [ ] Filters active + no results → "No tickets match the selected filters"
- [ ] No filters + no results → "No backlog items yet" + "Create your first ticket." hint
- [ ] Error state → "Failed to load backlog" + retry button
- [ ] Retry button clears error and reloads
- [ ] Growl notification shown on load error
- [ ] Priority chips: `euiDanger` for CRITICAL, `euiWarning` for HIGH, `euiInfo` for MEDIUM, neutral for LOW
- [ ] Type and status chips remain neutral
- [ ] Cards have consistent spacing (`eui-u-mb-s`)
- [ ] On mobile viewports, filter column auto-collapses via `isAutocloseOnMobile` (shows vertical label tab)
- [ ] Empty state is centered in the results column
- [ ] No color-only information — all chips include text labels
- [ ] All unit tests pass
- [ ] Build passes
