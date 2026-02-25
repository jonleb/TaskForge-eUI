---
description: Limits visible chips and adds more/less toggles with custom labels.
id: chips-max-visible
---

```html
<eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected()"
    [autocompleteData]="autocompleteData()"
    hasChips
    isMaxVisibleChipsOpened
    [maxVisibleChipsCount]="2"
    [toggleLinkLessLabel]="'Custom less label'"
    [toggleLinkMoreLabel]="'Custom more label'" />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'chips-max-visible',
    templateUrl: './component.html',
    imports: [
        ...EUI_AUTOCOMPLETE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsMaxVisibleComponent {
    faker = inject(FakerService).instance;
    private fruit = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map((fruit, i) => ({ id: i, label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );
    public autocompleteData = signal(this.fruit());
    public autocompleteDataSelected = signal(this.fruit().slice(0, 5));
}
```

