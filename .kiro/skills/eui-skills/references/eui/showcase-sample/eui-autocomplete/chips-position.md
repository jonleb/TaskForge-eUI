---
description: Compares chips placement: top, bottom, and inside the input.
id: chips-position
---

```html
<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected()"
                  [autocompleteData]="autocompleteData()"
                  [chipsPosition]="'top'"
                  hasChips />

<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected()"
                  [autocompleteData]="autocompleteData()"
                  [chipsPosition]="'bottom'"
                  hasChips />

<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected()"
                  [autocompleteData]="autocompleteData()"
                  [chipsPosition]="'inside'"
                  hasChips />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'chips-position',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_AUTOCOMPLETE,
    ],
})
export class ChipsPositionComponent {
    private faker = inject(FakerService).instance;
    public autocompleteData = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map((fruit, i) => ({ id: i, label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );
    public autocompleteDataSelected = signal(this.autocompleteData().slice(0, 4));
}
```

