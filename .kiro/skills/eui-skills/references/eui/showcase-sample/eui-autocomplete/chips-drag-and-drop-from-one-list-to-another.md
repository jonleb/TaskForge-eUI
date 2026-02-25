---
description: Drags chips between the autocomplete and an external chip list.
id: chips-drag-and-drop-from-one-list-to-another
---

```html
<div cdkDropListGroup>
    <eui-autocomplete (chipDragRelease)="onChipDragReleased($event)"
        (chipDragStart)="onChipDragStarted($event)"
        (chipDrop)="onChipDropped($event)"
        (selectionChange)="onSelectionChange($event)"
        [autocompleteDataSelected]="autocompleteDataSelected()"
        [autocompleteData]="autocompleteData()"
        hasChips
        isChipsDragAndDrop />

    <eui-chip-list cdkDropList [cdkDropListData]="autocompleteDataDropped" cdkDropListOrientation="horizontal" (cdkDropListDropped)="onChipDroppedChipList($event)" class="eui-u-mt-xs">
        @for (chip of autocompleteDataDropped(); track $index) {
            <eui-chip cdkDrag isChipRemovable [data]="chip" [euiVariant]="chip.variant" (remove)="onChipRemoveChipList($event)"><span euiLabel>{{ chip.label }}</span></eui-chip>
        }
    </eui-chip-list>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DragDropModule, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem, EuiChipDragDrop } from '@eui/components/eui-autocomplete';
import { EUI_CHIP, EuiChip } from '@eui/components/eui-chip';
import { EUI_CHIP_LIST } from '@eui/components/eui-chip-list';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'drag-and-drop-from-one-list-to-another',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_CHIP_LIST,
        ...EUI_CHIP,
        ...EUI_AUTOCOMPLETE,
        DragDropModule,
    ],
})
export class DragAndDropFromOneListToAnotherComponent {
    private faker = inject(FakerService).instance;
    private fruit = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map((fruit, i) => ({ id: i, label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );
    public autocompleteData = signal(this.fruit());
    public autocompleteDataSelected = signal(this.fruit().slice(0, 4));
    public autocompleteDataDropped = signal(this.fruit().slice(4, 8));

    onChipDropped(e: EuiChipDragDrop): void {
        console.log(e);
    }

    onChipDragStarted(e: EuiChipDragDrop): void {
        console.log(e);
    }

    onChipDragReleased(e: EuiChipDragDrop): void {
        console.log(e);
    }

    onSelectionChange(e: EuiAutoCompleteItem[]): void {
        this.autocompleteDataSelected.set(e);
    }

    onChipDroppedChipList(e: CdkDragDrop<EuiChip[]>): void {
        if (e.container !== e.previousContainer) {
            transferArrayItem(
                e.previousContainer.data,
                e.container.data,
                e.previousIndex,
                e.currentIndex
            );

            this.autocompleteDataSelected.update(selected =>
                selected.filter(a => a.id !== e.item.data.id)
            );
        }
    }

    onChipRemoveChipList(e: EuiChip): void {
        this.autocompleteDataDropped.update(dropped =>
            dropped.filter((item) => item.id !== e.id)
        );
    }

}
```

