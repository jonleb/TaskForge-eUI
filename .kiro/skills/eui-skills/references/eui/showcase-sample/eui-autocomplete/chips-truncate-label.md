---
description: Truncates chip labels using chipsLabelTruncateCount.
id: chips-truncate-label
---

```html
<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected" [autocompleteData]="autocompleteData"
                  [chipsLabelTruncateCount]="5" hasChips />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

@Component({
    // eslint-disable-next-line
    selector: 'chips-truncate-label',
    templateUrl: './component.html',
    imports: [
        ...EUI_AUTOCOMPLETE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsTruncateLabelComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Banana' },
        { id: 3, label: 'Blackberry' },
        { id: 4, label: 'Coconut' },
        { id: 5, label: 'Kiwi' },
    ];

    public autocompleteDataSelected: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Banana' },
    ];

}
```

