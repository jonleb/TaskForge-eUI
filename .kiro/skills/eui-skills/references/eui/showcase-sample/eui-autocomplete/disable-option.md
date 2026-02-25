---
description: Disables specific options via isDisabled on items.
id: disable-option
---

```html
<eui-autocomplete [autocompleteData]="autocompleteData" />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

@Component({
    // eslint-disable-next-line
    selector: 'disable-option',
    templateUrl: './component.html',
    imports: [...EUI_AUTOCOMPLETE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisableOptionComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple', isDisabled: true },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry', isDisabled: true },
        { id: 5, label: 'Coconut' },
        { id: 6, label: 'Kiwi' },
        { id: 7, label: 'Lemon' },
        { id: 8, label: 'Lime' },
        { id: 9, label: 'Lime' },
        { id: 10, label: 'Orange' },
        { id: 11, label: 'Strawberry' },
        { id: 12, label: 'Raspberry' },
    ];


}
```

