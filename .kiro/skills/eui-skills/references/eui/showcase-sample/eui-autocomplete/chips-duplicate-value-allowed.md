---
description: Allows duplicate chips and adds values on blur.
id: chips-duplicate-value-allowed
---

```html
<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected()"
    [autocompleteData]="autocompleteData()"
    hasChips
    isDuplicateValueAllowed
    addOnBlur />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'duplicate-value-allowed',
    templateUrl: './component.html',
    imports: [...EUI_AUTOCOMPLETE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DuplicateValueAllowedComponent {
    faker = inject(FakerService).instance;
    private fruit = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map((fruit, i) => ({ id: i, label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );
    public autocompleteData = signal(this.fruit());
    public autocompleteDataSelected = signal(this.fruit().slice(0, 4));
}
```

