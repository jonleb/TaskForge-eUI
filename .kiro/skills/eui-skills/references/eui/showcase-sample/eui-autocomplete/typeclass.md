---
description: Applies per-item visual variants so chips inherit contextual colors, with and without chips.
id: typeclass
---

```html
<div class="doc-sample-section-title">Without chips</div>
<eui-autocomplete [autocompleteData]="autocompleteData" />

<div class="doc-sample-section-title">With chips</div>
<eui-autocomplete [autocompleteData]="autocompleteData" hasChips />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

@Component({
    // eslint-disable-next-line
    selector: 'typeclass',
    templateUrl: './component.html',
    imports: [
        ...EUI_AUTOCOMPLETE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeClassComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Blackcurrant (primary)', variant: 'primary' },
        { id: 2, label: 'Truffle (secondary)', variant: 'secondary' },
        { id: 3, label: 'Blueberry (info)', variant: 'info' },
        { id: 4, label: 'Apple (success)', variant: 'success' },
        { id: 5, label: 'Orange (warning)', variant: 'warning' },
        { id: 6, label: 'Strawberry (danger)', variant: 'danger' },
    ];

}
```

