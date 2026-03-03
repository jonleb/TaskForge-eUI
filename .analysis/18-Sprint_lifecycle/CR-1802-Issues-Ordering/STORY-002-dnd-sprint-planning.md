# STORY-002 — Drag & Drop Reorder in Sprint Planning

## Objective

Add CDK drag & drop to the sprint tickets column in Sprint Planning, allowing users to reorder tickets within a sprint by dragging. Persists via the existing reorder API.

## Prerequisites

- STORY-001 (ordering fix) — sprint tickets must be sorted by position before drag & drop makes sense.

## Technical Approach

No eUI drag & drop component exists (confirmed via MCP search). Use `@angular/cdk/drag-drop` (`DragDropModule`) following the same pattern established in the Sprints view (CR-1801 STORY-002):

- `cdkDropList` on the container element
- `cdkDrag` on each draggable item
- `<button cdkDragHandle>` with `dots-six-vertical:regular` icon
- `moveItemInArray()` for local reorder
- `<output aria-live="assertive">` for screen reader announcements

## Changes

### Template (`sprint-planning.component.html`)

Wrap the sprint tickets `@for` loop in a `<div cdkDropList>`:

```html
<div cdkDropList
     [cdkDropListData]="sprintTickets"
     [cdkDropListDisabled]="isReadOnly"
     (cdkDropListDropped)="onSprintTicketDrop($event)"
     class="sprint-ticket-list">
    @for (ticket of sprintTickets; track ticket.id) {
        <eui-card class="ticket-card eui-u-mb-xs" isCompact
                  cdkDrag [cdkDragData]="ticket" [cdkDragDisabled]="isReadOnly">
            <eui-card-content>
                <div class="ticket-row">
                    @if (!isReadOnly) {
                        <button cdkDragHandle class="drag-handle"
                            [attr.aria-label]="'sprint.planning.drag-handle' | translate"
                            [euiTooltip]="'sprint.planning.drag-handle-tooltip' | translate">
                            <eui-icon-svg icon="dots-six-vertical:regular" aria-hidden="true"></eui-icon-svg>
                        </button>
                    }
                    <!-- existing ticket-info, badges, remove button -->
                </div>
            </eui-card-content>
        </eui-card>
    }
</div>
```

Add screen reader announcement region:

```html
<output class="eui-u-sr-only" aria-live="assertive">
    {{ reorderAnnouncement }}
</output>
```

### Component (`sprint-planning.component.ts`)

New imports:
```typescript
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiTooltipDirective } from '@eui/components/directives';
```

Add to `imports` array: `DragDropModule`, `...EUI_ICON`, `EuiTooltipDirective`.

New state:
```typescript
reorderAnnouncement = '';
```

New method:
```typescript
onSprintTicketDrop(event: CdkDragDrop<BacklogItem[]>): void {
    if (event.previousIndex === event.currentIndex || !this.project) return;

    moveItemInArray(this.sprintTickets, event.previousIndex, event.currentIndex);

    const reorderPayload = this.sprintTickets.map((item, index) => ({
        ticket_number: item.ticket_number,
        position: index,
    }));

    const movedItem = this.sprintTickets[event.currentIndex];
    this.reorderAnnouncement = this.translate.instant('sprint.planning.reorder-announcement', {
        ticket: '#' + movedItem.ticket_number,
        position: event.currentIndex + 1,
        total: this.sprintTickets.length,
    });

    this.projectService.reorderBacklog(this.project.id, { items: reorderPayload }).pipe(
        takeUntil(this.destroy$),
    ).subscribe({
        next: () => {
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
            if (this.project && this.sprint) {
                this.loadData(this.project.id, this.sprint.id);
            }
        },
    });
}
```

### Styles (`sprint-planning.component.scss`)

Add drag handle and CDK feedback styles (same pattern as `sprints.component.scss`):

```scss
.drag-handle {
    all: unset;
    cursor: grab;
    display: flex;
    align-items: center;
    padding: 0.125rem;
    border-radius: 2px;
    color: var(--eui-color-grey-50, #757575);

    &:hover { color: var(--eui-color-primary, #004494); }
    &:focus-visible {
        outline: 2px solid var(--eui-color-primary, #004494);
        outline-offset: 2px;
    }
    &:active { cursor: grabbing; }
}

.ticket-card.cdk-drag-preview {
    background: white;
    border: 1px solid var(--eui-color-primary, #004494);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.ticket-card.cdk-drag-placeholder {
    background: var(--eui-color-grey-5, #f5f5f5);
    border: 2px dashed var(--eui-color-grey-25, #e0e0e0);
    border-radius: 4px;
    min-height: 2rem;
    opacity: 0.5;
}

.cdk-drop-list-dragging .ticket-card:not(.cdk-drag-placeholder) {
    transition: transform 200ms ease;
}
```

### i18n

**en.json**:
```json
"sprint.planning.drag-handle": "Drag to reorder",
"sprint.planning.drag-handle-tooltip": "Drag to reorder",
"sprint.planning.reorder-announcement": "Ticket {{ticket}} moved to position {{position}} of {{total}}"
```

**fr.json**:
```json
"sprint.planning.drag-handle": "Glisser pour réordonner",
"sprint.planning.drag-handle-tooltip": "Glisser pour réordonner",
"sprint.planning.reorder-announcement": "Ticket {{ticket}} déplacé en position {{position}} sur {{total}}"
```

## Accessibility

- Drag handle `<button cdkDragHandle>` with `aria-label` and `euiTooltip`.
- CDK drag & drop supports keyboard natively: Enter to pick up, Arrow keys to move, Enter to drop.
- `<output aria-live="assertive">` announces position changes to screen readers.
- Drag disabled in read-only mode (`isReadOnly`).

## Unit Tests

- Drag handle visible when `canManage` is true and sprint is not closed.
- Drag handle hidden when `isReadOnly`.
- `onSprintTicketDrop` calls `reorderBacklog` with correct payload.
- No-op when `previousIndex === currentIndex`.
- Success growl on reorder.
- Error growl on reorder failure, triggers data reload.
- `reorderAnnouncement` updated after drop.
- `aria-live="assertive"` region present in template.

## Files

- `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.html`
- `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.ts`
- `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.scss`
- `src/app/features/projects/sprints/sprint-planning/sprint-planning.component.spec.ts`
- `src/assets/i18n/en.json`
- `src/assets/i18n/fr.json`
