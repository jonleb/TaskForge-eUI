# STORY-002 — Drag & Drop Reorder within Sprint

## Objective

Allow users with `canManage` permission to reorder issues within a sprint using drag & drop. Persist the new order via the existing reorder endpoint.

## Prerequisites

- STORY-001 (inline issue list) must be completed first.
- `@angular/cdk` must be installed (not currently in `package.json`).

## Dependency Install

```bash
npm install @angular/cdk
```

## eUI Reference Pattern

eUI does not have a native drag & drop component for lists. The official eUI showcase uses Angular CDK `DragDropModule` for table row reordering (`eui-table/re-order-rows-drag-n-drop`). Key patterns from the showcase:

- Import `DragDropModule` (the full module, not individual exports)
- Use `cdkDropList` on the container, `cdkDrag` on each item
- Drag handle: `<button cdkDragHandle euiButton euiRounded euiIconButton euiSizeS euiBasicButton>` with `dots-six-vertical:regular` icon
- Preview class: `cdkDragPreviewClass="eui-table__orderable-rows-preview"` (for tables; we'll use custom styles for list items)
- `moveItemInArray` from `@angular/cdk/drag-drop` for local reorder

Since this is a list (not a table), we adapt the pattern to `<ul>/<li>` elements. Comment in code: "No eUI drag & drop component for lists — using CDK DragDropModule per eUI showcase pattern."

## Changes

### Template (`sprints.component.html`)

Wrap the issue `<ul>` with CDK drop list directives when `canManage` is true and sprint is not CLOSED:

```html
<!-- No eUI drag & drop component for lists — using CDK DragDropModule per eUI showcase pattern -->
<ul class="sprint-issue-list"
    [attr.aria-label]="'sprint.issue-list-label' | translate:{ name: sprint.name }"
    cdkDropList
    [cdkDropListData]="getSprintItems(sprint.id)"
    [cdkDropListDisabled]="!canManage || sprint.status === 'CLOSED'"
    (cdkDropListDropped)="onIssueDrop($event, sprint)">
    @for (item of getSprintItems(sprint.id); track item.id) {
        <li class="sprint-issue-item"
            cdkDrag
            [cdkDragData]="item"
            [cdkDragDisabled]="!canManage || sprint.status === 'CLOSED'"
            [attr.aria-label]="'#' + item.ticket_number + ' — ' + item.title"
            tabindex="0">
            <!-- Drag handle — visible only when reorder is allowed -->
            @if (canManage && sprint.status !== 'CLOSED') {
                <button cdkDragHandle
                        euiButton euiRounded euiIconButton euiSizeS euiBasicButton
                        [attr.aria-label]="'sprint.drag-handle' | translate"
                        euiTooltip="sprint.drag-handle-tooltip">
                    <eui-icon-svg icon="dots-six-vertical:regular" aria-hidden="true"></eui-icon-svg>
                </button>
            }
            <!-- ... existing item content from STORY-001 ... -->
        </li>
    }
</ul>

<!-- Screen reader announcement region -->
<div class="eui-u-sr-only" aria-live="assertive" role="status">
    {{ reorderAnnouncement }}
</div>
```

### Component (`sprints.component.ts`)

Add imports:
```typescript
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EuiTooltipDirective } from '@eui/components/directives';
```

Add to component `imports` array: `DragDropModule, EuiTooltipDirective`.

Add reorder handler:
```typescript
reorderAnnouncement = '';

onIssueDrop(event: CdkDragDrop<BacklogItem[]>, sprint: Sprint): void {
    if (event.previousIndex === event.currentIndex || !this.project) return;

    const items = [...this.getSprintItems(sprint.id)];
    moveItemInArray(items, event.previousIndex, event.currentIndex);

    // Build reorder payload
    const reorderPayload = items.map((item, index) => ({
        ticket_number: item.ticket_number,
        position: index,
    }));

    // Announce to screen readers
    const movedItem = items[event.currentIndex];
    this.reorderAnnouncement = this.translate.instant('sprint.reorder-announcement', {
        ticket: '#' + movedItem.ticket_number,
        position: event.currentIndex + 1,
        total: items.length,
    });

    this.projectService.reorderBacklog(this.project.id, { items: reorderPayload }).pipe(
        takeUntil(this.destroy$),
    ).subscribe({
        next: () => {
            // Update local state
            reorderPayload.forEach(rp => {
                const item = this.allBacklogItems.find(i => i.ticket_number === rp.ticket_number);
                if (item) item.position = rp.position;
            });
            this.cdr.markForCheck();
            this.growlService.growl({
                severity: 'success',
                summary: this.translate.instant('sprint.growl.reorder-success'),
            });
        },
        error: () => {
            this.growlService.growl({
                severity: 'error',
                summary: this.translate.instant('sprint.growl.error-summary'),
                detail: this.translate.instant('sprint.growl.reorder-error'),
            });
            // Reload to restore server state
            this.loadSprints(this.project!.id);
        },
    });
}
```

### Styles (`sprints.component.scss`)

```scss
// CDK drag & drop styles (adapted from eUI table showcase pattern)
.sprint-issue-item.cdk-drag-preview {
    background: white;
    border: 1px solid var(--eui-color-primary, #004494);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 0.375rem 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.sprint-issue-item.cdk-drag-placeholder {
    background: var(--eui-color-grey-5, #f5f5f5);
    border: 2px dashed var(--eui-color-grey-25, #e0e0e0);
    border-radius: 4px;
    min-height: 2rem;
    opacity: 0.5;
}

.cdk-drop-list-dragging .sprint-issue-item:not(.cdk-drag-placeholder) {
    transition: transform 200ms ease;
}
```

### i18n

**en.json**:
```json
"sprint.drag-handle": "Drag to reorder",
"sprint.drag-handle-tooltip": "Drag to reorder",
"sprint.reorder-announcement": "{{ticket}} moved to position {{position}} of {{total}}",
"sprint.growl.reorder-success": "Issue order updated",
"sprint.growl.reorder-error": "Failed to save new order"
```

**fr.json**:
```json
"sprint.drag-handle": "Glisser pour réordonner",
"sprint.drag-handle-tooltip": "Glisser pour réordonner",
"sprint.reorder-announcement": "{{ticket}} déplacé en position {{position}} sur {{total}}",
"sprint.growl.reorder-success": "Ordre des tickets mis à jour",
"sprint.growl.reorder-error": "Échec de la sauvegarde du nouvel ordre"
```

## Accessibility

- CDK drag & drop provides keyboard support: Space/Enter to pick up, arrow keys to move, Space/Enter to drop.
- Drag handle is a proper `<button>` element (not a div) with `aria-label` and tooltip — matches eUI showcase pattern.
- `aria-live="assertive"` region announces reorder result (e.g. "#3 moved to position 2 of 5").
- Drag handle icon `dots-six-vertical:regular` is `aria-hidden="true"` (decorative — the button has its own label).
- When drag is disabled (no permission or CLOSED sprint), `cdkDragDisabled` and `cdkDropListDisabled` prevent interaction — the handle button is not rendered at all via `@if`.

## Unit Tests

- Drag handle button visible only when `canManage` is true and sprint is not CLOSED.
- Drag handle button not rendered for CLOSED sprints.
- `onIssueDrop` calls `reorderBacklog` with correct payload.
- No-op when `previousIndex === currentIndex`.
- Error growl shown on reorder failure.
- Success growl shown on reorder success.
- `reorderAnnouncement` updated after drop.
- `cdkDropList` disabled when `canManage` is false.
