---
description: Demonstrates free-text chips, add-on-blur behavior, and disabling free values.
id: chips-free-chips
---

```html
<eui-autocomplete (selectionChange)="onSelectionChanged1($event)"
                  [autocompleteData]="autocompleteData()"
                  hasChips />

<eui-autocomplete (selectionChange)="onSelectionChanged2($event)"
                  [autocompleteData]="autocompleteData()"
                  hasChips
                  isAddOnBlur />

<eui-autocomplete (selectionChange)="onSelectionChanged3($event)"
                  [autocompleteData]="autocompleteData()"
                  hasChips
                  [isFreeValueAllowed]="false" />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'free-chips',
    templateUrl: './component.html',
    imports: [
        ...EUI_AUTOCOMPLETE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FreeChipsComponent {
    faker = inject(FakerService).instance;
    autocompleteData = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map((fruit, i) => ({ id: i, label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );

    onSelectionChanged1(e: any) {
        console.log(e);
    }

    onSelectionChanged2(e: any) {
        console.log(e);
    }

    onSelectionChanged3(e: any) {
        console.log(e);
    }
}
```

