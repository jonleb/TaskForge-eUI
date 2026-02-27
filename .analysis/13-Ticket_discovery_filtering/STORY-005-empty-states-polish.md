# STORY-005: Frontend — Contextual Empty States & Polish

## Goal

Add contextual empty state messages that change based on active filters/search, add growl notification on load error, and polish the overall UX of the backlog discovery page.

## Existing Code

- `src/app/features/projects/backlog/backlog.component.ts` — async table with search, filters, pagination from STORY-003/004.
- `src/app/features/projects/portfolio/portfolio.component.ts` — reference: `emptyStateMessage` computed property, contextual messages based on `activeStatusFilter`, `hasError`.
- `src/app/features/admin/users/users.component.ts` — reference: contextual empty messages for active/inactive/search filters.

## Implementation Plan

### 1. Add computed empty state message

```typescript
get emptyStateMessage(): string {
    if (this.hasError) {
        return this.translate.instant('backlog.load-error');
    }
    if (this.params.q) {
        return this.translate.instant('backlog.no-match-search');
    }
    if (this.params.status || this.params.type) {
        return this.translate.instant('backlog.no-match-filter');
    }
    return this.translate.instant('backlog.no-items');
}
```

### 2. Add growl on load error

In `loadBacklog()` error handler:
```typescript
error: () => {
    this.items = [];
    this.total = 0;
    this.hasError = true;
    this.isLoading = false;
    this.growlService.growl({
        severity: 'error',
        summary: this.translate.instant('backlog.growl.load-failed-summary'),
        detail: this.translate.instant('backlog.growl.load-failed-detail'),
    });
    this.cdr.markForCheck();
},
```

### 3. Add retry in noData template

```html
<ng-template euiTemplate="noData">
    <tr>
        <td class="eui-u-text-center" colspan="6">
            {{ emptyStateMessage }}
            @if (hasError) {
                <button euiButton euiSecondary type="button"
                        class="eui-u-ml-m"
                        (click)="retry()">
                    {{ 'common.retry' | translate }}
                </button>
            }
        </td>
    </tr>
</ng-template>
```

### 4. Remove standalone error/empty blocks

The current template has separate `@if (hasError)` and `@else if (items.length === 0)` blocks outside the table. With async mode, these are handled by the `noData` template inside the table. Remove the standalone blocks and let the table handle empty/error states.

### 5. Add i18n keys

**en.json:**
```json
"backlog.no-match-search": "No tickets match your search.",
"backlog.no-match-filter": "No tickets match the selected filters.",
"backlog.growl.load-failed-summary": "Load failed",
"backlog.growl.load-failed-detail": "Could not load backlog. Please try again."
```

**fr.json:**
```json
"backlog.no-match-search": "Aucun ticket ne correspond à votre recherche.",
"backlog.no-match-filter": "Aucun ticket ne correspond aux filtres sélectionnés.",
"backlog.growl.load-failed-summary": "Échec du chargement",
"backlog.growl.load-failed-detail": "Impossible de charger le backlog. Veuillez réessayer."
```

### 6. Unit tests (~6 new)

| # | Test | Expected |
|---|------|----------|
| 1 | Should show "No backlog items yet" when no items and no filters | Default empty message |
| 2 | Should show "No tickets match your search" when search active | Search empty message |
| 3 | Should show "No tickets match the selected filters" when filter active | Filter empty message |
| 4 | Should show error message and retry button on load error | Error state |
| 5 | Should show growl on load error | Growl called |
| 6 | Should retry and reload on retry button click | `loadBacklog` called again |

## Files Changed

| File | Change |
|------|--------|
| `src/app/features/projects/backlog/backlog.component.ts` | Add `emptyStateMessage` getter, growl on error |
| `src/app/features/projects/backlog/backlog.component.html` | Update noData template, remove standalone error/empty blocks |
| `src/app/features/projects/backlog/backlog.component.spec.ts` | Add ~6 tests |
| `src/assets/i18n/en.json` | Add 4 i18n keys |
| `src/assets/i18n/fr.json` | Add 4 i18n keys |

## Acceptance Criteria

- [ ] Empty state shows "No backlog items yet" when no filters active
- [ ] Empty state shows "No tickets match your search" when search is active
- [ ] Empty state shows "No tickets match the selected filters" when status/type filter active
- [ ] Error state shows error message with retry button
- [ ] Growl notification on load error
- [ ] Retry button reloads backlog
- [ ] All unit tests pass
- [ ] Build passes
