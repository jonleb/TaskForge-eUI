---
description: Sorts chips and option items in ASC or DESC order.
id: sorting
---

```html
<div class="doc-sample-section-title">Chips sorted ASC</div>
<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected" [autocompleteData]="autocompleteData"
                  [chipsSortOrder]="'ASC'" hasChips
                  isChipsSorted />

<div class="doc-sample-section-title">Chips sorted DESC</div>
<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected" [autocompleteData]="autocompleteData"
                  [chipsSortOrder]="'DESC'" hasChips
                  isChipsSorted />

<div class="doc-sample-section-title">Items sorted ASC</div>
<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected2" [autocompleteData]="autocompleteData2"
                  hasChips [itemsSortOrder]="'ASC'"
                  isItemsSorted />

<div class="doc-sample-section-title">Items sorted DESC</div>
<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected2" [autocompleteData]="autocompleteData2"
                  hasChips [itemsSortOrder]="'DESC'"
                  isItemsSorted />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

@Component({
    // eslint-disable-next-line
    selector: 'sorting',
    templateUrl: './component.html',
    imports: [...EUI_AUTOCOMPLETE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple' },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry' },
        { id: 5, label: 'Coconut' },
        { id: 6, label: 'Kiwi' },
        { id: 7, label: 'Lemon' },
        { id: 8, label: 'Lime' },
        { id: 9, label: 'Lime' },
        { id: 10, label: 'Orange' },
        { id: 11, label: 'Strawberry' },
        { id: 12, label: 'Raspberry' },
    ];

    public autocompleteDataSelected: EuiAutoCompleteItem[] = [
        { id: 11, label: 'Strawberry' },
        { id: 7, label: 'Lemon' },
        { id: 2, label: 'Apple' },
        { id: 10, label: 'Orange' },
    ];

    public autocompleteData2: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Lemon' },
        { id: 2, label: 'Lime' },
        { id: 3, label: 'Apple' },
        { id: 4, label: 'Orange' },
        { id: 5, label: 'Strawberry' },
    ];

    public autocompleteDataSelected2: EuiAutoCompleteItem[] = [];

}
```

