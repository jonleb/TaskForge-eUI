---
description: Enables multi-select with chips and preselected values.
id: Chips
---

```html
<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected()"
                  [autocompleteData]="autocompleteData()"
                  hasChips />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'chips',
    templateUrl: './component.html',
    imports: [
        ...EUI_AUTOCOMPLETE
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent {
    private faker = inject(FakerService).instance;
    // TODO: ID on EuiAutoCompleteItem is optional, but it is required for the autocomplete to work. There's a bug.
    private fruit = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map((fruit, i) => ({ id: i, label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );

    autocompleteData = signal(this.fruit());
    autocompleteDataSelected = signal(this.fruit().slice(0, 4));
}
```

