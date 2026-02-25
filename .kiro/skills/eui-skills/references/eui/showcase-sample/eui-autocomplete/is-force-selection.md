---
description: Forces selection from list items, with and without chips.
id: is-force-selection
---

```html
<div class="doc-sample-section-title">With chips - Free chips not allowed + isForceSelection</div>
<eui-autocomplete (selectionChange)="onSelectionChanged1($event)" [autocompleteData]="autocompleteData"
                  hasChips [isFreeValueAllowed]="false"
                  isForceSelection />

<div class="doc-sample-section-title">Without chips + isForceSelection</div>
<eui-autocomplete (selectionChange)="onSelectionChanged2($event)" [autocompleteData]="autocompleteData" isForceSelection />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

@Component({
    // eslint-disable-next-line
    selector: 'is-force-selection',
    templateUrl: './component.html',
    imports: [
        ...EUI_AUTOCOMPLETE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsForceSelectionComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Lemon' },
        { id: 2, label: 'Lime' },
        { id: 3, label: 'Apple' },
        { id: 4, label: 'Orange' },
        { id: 5, label: 'Strawberry' },
    ];

    onSelectionChanged1(e: any) {
        console.log(e);
    }

    onSelectionChanged2(e: any) {
        console.log(e);
    }

}
```

