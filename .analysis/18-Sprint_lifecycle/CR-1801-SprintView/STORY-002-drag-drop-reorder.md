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

No eUI drag & drop component exists — Angular CDK `DragDropModule` is the standard approach.

## Changes

### Template (`sprints.component.html`)

Wrap the issue `<ul>` with CDK drop list directives when `canManage` is true and sprint is not CLOSED:

```html
<ul class="sprint-issue-list"
    [attr.aria-label]="'sprint.issue-list-label' | translate:{ name: sprint.name }"
    [cdkDropList]="canManage && sprint.status !== 'CLOSED'"
    [cdkDropListData]="getSprintItems(sprint.id)"
    (cdkDropListDropped)="onIssueDrop($event, sprint)">
    @for (item of getSprintItems(sprint.id); track item.id) {
        <li class="sprint-issue-item"
            [cdkDrag]="canManage && sprint.status !== 'CLOSED'"
            [cdkDragData]="item"
            [attr.aria-roledescription]="canManage && sprint.status !== 'CLOSED' ? ('sprint.sortable-item' | translate) : null"
            [attr.aria-label]="'#' + item.ticket_number + ' — ' + item.title"
            tabindex="0">
            <!-- drag handle icon visible only when reorder is allowed -->
            @if (canManage && sprint.status !== 'CLOSED') {
                <eui-icon-svg icon="eui-drag-handle" aria-hidden="true" class="sprint-issue-item__drag-handle" cdkDragHandle></eui-icon-svg>
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
import { CdkDropList, CdkDrag, CdkDragDrop, CdkDragHandle, moveItemInArray } from '@angular/cdk/drag-drop';
```

Add to `imports` array: `CdkDropList, CdkDrag, CdkDragHandle`.

Add reorder handler:
```typescript
reorderAnnouncement = '';

onIssueDrop(event: CdkDragDrop<BacklogItem[]>, sprint: Sprint): void {
    if (event.previousIndex === event.currentIndex || !this.project) return;

    const items = [...this.getSprintItems(sprint.id)];
    moveItemInArray(items, event.previousIndex, event.currentIndex);

    // Update local positions
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
// CDK drag & drop styles
.cdk-drag-preview {
    background: white;
    border: 1px solid var(--eui-color-primary, #004494);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 0.375rem 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.cdk-drag-placeholder {
    background: var(--eui-color-grey-5, #f5f5f5);
    border: 2px dashed var(--eui-color-grey-25, #e0e0e0);
    border-radius: 4px;
    min-height: 2rem;
}

.cdk-drag-animating {
    transition: transform 200ms ease;
}

.sprint-issue-item__drag-handle {
    cursor: grab;
    color: var(--eui-color-grey-50, #999);

    &:active {
        cursor: grabbing;
    }
}
```

### i18n

**en.json**:
```json
"sprint.sortable-item": "Sortable item",
"sprint.reorder-announcement": "{{ticket}} moved to position {{position}} of {{total}}",
"sprint.growl.reorder-success": "Issue order updated",
"sprint.growl.reorder-error": "Failed to save new order"
```

**fr.json**:
```json
"sprint.sortable-item": "Élément triable",
"sprint.reorder-announcement": "{{ticket}} déplacé en position {{position}} sur {{total}}",
"sprint.growl.reorder-success": "Ordre des tickets mis à jour",
"sprint.growl.reorder-error": "Échec de la sauvegarde du nouvel ordre"
```

## Accessibility

- CDK drag & drop provides keyboard support: Space/Enter to pick up, arrow keys to move, Space/Enter to drop.
- `aria-roledescription="sortable item"` on each draggable `<li>`.
- `aria-live="assertive"` region announces reorder result (e.g. "#3 moved to position 2 of 5").
- Drag handle icon is `aria-hidden="true"` (decorative).
- When drag is disabled (no permission or CLOSED sprint), CDK directives are conditionally removed — no hidden interactive elements.

## Unit Tests

- Drag handle visible only when `canManage` is true and sprint is not CLOSED.
- `onIssueDrop` calls `reorderBacklog` with correct payload.
- No-op when `previousIndex === currentIndex`.
- Error growl shown on reorder failure.
- Success growl shown on reorder success.
- `reorderAnnouncement` updated after drop.
