# STORY-003 — Drag & Drop Reorder in Backlog

## Objective

Add CDK drag & drop to the backlog card list, allowing users to reorder tickets by dragging. Works alongside the existing arrow-button reorder and uses the same save/discard bar pattern.

## Technical Approach

No eUI drag & drop component exists. Use `@angular/cdk/drag-drop` (`DragDropModule`) following the project-wide pattern:

- `cdkDropList` on the card list container
- `cdkDrag` on each `.card-row`
- `<button cdkDragHandle>` with `dots-six-vertical:regular` icon
- `moveItemInArray()` for local reorder
- `<output aria-live="assertive">` for screen reader announcements
- Does NOT auto-save — uses existing save/discard bar (user clicks "Save" to persist)

## Changes

### Template (`backlog.component.html`)

Wrap the card list `@for` in a `<div cdkDropList>`:

```html
<div cdkDropList
     [cdkDropListData]="items"
     [cdkDropListDisabled]="!isReorderMode"
     (cdkDropListDropped)="onBacklogDrop($event)"
     class="backlog-card-list">
    @for (item of items; track item.id; let i = $index; let first = $first; let last = $last) {
        <div class="card-row" cdkDrag [cdkDragData]="item" [cdkDragDisabled]="!isReorderMode">
            @if (isReorderMode) {
                <div class="reorder-controls">
                    <button cdkDragHandle class="drag-handle"
                        [attr.aria-label]="'backlog.reorder.drag-handle' | translate"
                        [euiTooltip]="'backlog.reorder.drag-handle-tooltip' | translate">
                        <eui-icon-svg icon="dots-six-vertical:regular" aria-hidden="true"></eui-icon-svg>
                    </button>
                    <span class="position-badge eui-u-f-s">{{ item.position }}</span>
                    <eui-icon-button icon="arrow-up:regular" size="s"
                        [euiDisabled]="first"
                        [ariaLabel]="'backlog.reorder.move-up' | translate"
                        (buttonClick)="moveUp(i)">
                    </eui-icon-button>
                    <eui-icon-button icon="arrow-down:regular" size="s"
                        [euiDisabled]="last"
                        [ariaLabel]="'backlog.reorder.move-down' | translate"
                        (buttonClick)="moveDown(i)">
                    </eui-icon-button>
                </div>
            }
            <!-- existing card-link + eui-content-card -->
        </div>
    }
</div>
```

Add screen reader announcement region:

```html
<output class="eui-u-sr-only" aria-live="assertive">
    {{ reorderAnnouncement }}
</output>
```

### Component (`backlog.component.ts`)

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
onBacklogDrop(event: CdkDragDrop<BacklogItem[]>): void {
    if (event.previousIndex === event.currentIndex) return;

    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.updateLocalPositions();

    const movedItem = this.items[event.currentIndex];
    this.reorderAnnouncement = this.translate.instant('backlog.reorder.announcement', {
        ticket: '#' + movedItem.ticket_number,
        position: event.currentIndex + 1,
        total: this.items.length,
    });
    this.cdr.markForCheck();
}
```

Note: This does NOT auto-save. The existing `hasReorderChanges` getter will detect the change and show the save/discard bar. The user clicks "Save" to persist via `saveReorder()`.

### Styles (`backlog.component.scss`)

Add drag handle and CDK feedback styles:

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

.card-row.cdk-drag-preview {
    background: white;
    border: 1px solid var(--eui-color-primary, #004494);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-row.cdk-drag-placeholder {
    background: var(--eui-color-grey-5, #f5f5f5);
    border: 2px dashed var(--eui-color-grey-25, #e0e0e0);
    border-radius: 4px;
    min-height: 3rem;
    opacity: 0.5;
}

.cdk-drop-list-dragging .card-row:not(.cdk-drag-placeholder) {
    transition: transform 200ms ease;
}
```

### i18n

**en.json**:
```json
"backlog.reorder.drag-handle": "Drag to reorder",
"backlog.reorder.drag-handle-tooltip": "Drag to reorder",
"backlog.reorder.announcement": "Ticket {{ticket}} moved to position {{position}} of {{total}}"
```

**fr.json**:
```json
"backlog.reorder.drag-handle": "Glisser pour réordonner",
"backlog.reorder.drag-handle-tooltip": "Glisser pour réordonner",
"backlog.reorder.announcement": "Ticket {{ticket}} déplacé en position {{position}} sur {{total}}"
```

## Accessibility

- Drag handle `<button cdkDragHandle>` with `aria-label` and `euiTooltip`.
- CDK drag & drop supports keyboard natively: Enter to pick up, Arrow keys to move, Enter to drop.
- `<output aria-live="assertive">` announces position changes to screen readers.
- Existing arrow buttons kept as keyboard-friendly alternative.
- Drag disabled when `isReorderMode` is false (filters active or non-position sort).

## Unit Tests

- Drag handle visible when `isReorderMode` is true.
- Drag handle hidden when `isReorderMode` is false.
- `onBacklogDrop` calls `moveItemInArray` and `updateLocalPositions`.
- No-op when `previousIndex === currentIndex`.
- `hasReorderChanges` becomes true after drag reorder.
- `reorderAnnouncement` updated after drop.
- `aria-live="assertive"` region present in template.
- Existing arrow buttons still functional alongside drag & drop.
- Save/discard bar appears after drag reorder (same as arrow reorder).

## Files

- `src/app/features/projects/backlog/backlog.component.html`
- `src/app/features/projects/backlog/backlog.component.ts`
- `src/app/features/projects/backlog/backlog.component.scss`
- `src/app/features/projects/backlog/backlog.component.spec.ts`
- `src/assets/i18n/en.json`
- `src/assets/i18n/fr.json`
