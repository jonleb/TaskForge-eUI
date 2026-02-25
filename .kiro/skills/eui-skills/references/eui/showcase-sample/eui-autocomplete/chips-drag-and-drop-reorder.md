---
description: Enables chip drag-and-drop to reorder the selection.
id: chips-drag-and-drop-reorder
---

```html
<eui-autocomplete (chipDragRelease)="onChipDragReleased($event)"
    (chipDragStart)="onChipDragStarted($event)"
    (chipDrop)="onChipDropped($event)"
    [autocompleteDataSelected]="autocompleteDataSelected()"
    [autocompleteData]="autocompleteData()"
    hasChips
    isChipsDragAndDrop />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem, EuiChipDragDrop } from '@eui/components/eui-autocomplete';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'drag-and-drop-reorder',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_AUTOCOMPLETE,
        DragDropModule,
    ],
})
export class DragAndDropReorderComponent {
    private faker = inject(FakerService).instance;
    private fruit = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map((fruit, i) => ({ id: i, label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );
    public autocompleteData = signal(this.fruit());
    public autocompleteDataSelected = signal(this.fruit().slice(0, 4));

    onChipDropped(e: EuiChipDragDrop): void {
        console.log(e);
    }

    onChipDragStarted(e: EuiChipDragDrop): void {
        console.log(e);
    }

    onChipDragReleased(e: EuiChipDragDrop): void {
        console.log(e);
    }

}
```

