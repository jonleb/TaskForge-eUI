---
description: Shows globally non-removable chips and per-item removable overrides.
id: Chips-not-removable
---

```html
<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected()"
                  [autocompleteData]="autocompleteData()"
                  hasChips
                  [isChipsRemovable]="false" />

<eui-autocomplete [autocompleteDataSelected]="removableFruitSelected()"
                  [autocompleteData]="removableFruit()"
                  hasChips />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'chips-not-removable',
    templateUrl: './component.html',
    imports: [...EUI_AUTOCOMPLETE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsNotRemovableComponent {
    faker = inject(FakerService).instance;
    private fruit = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map((fruit, i) => ({ id: i, label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );
    public autocompleteData = signal(this.fruit());
    public autocompleteDataSelected = signal(this.fruit().slice(0, 4));
    public removableFruit = signal(this.fruit().map((item, i) => ({ ...item, isRemovable: i % 2 === 0 })));
    public removableFruitSelected = signal(this.fruit().slice(4, 8).map((item, i) => ({ ...item, isRemovable: i < 2 })));
}
```

