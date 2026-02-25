---
description: Basic autocomplete bound to a static list of items.
id: Default
---

```html
<eui-autocomplete [autocompleteData]="autocompleteData()" />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE } from '@eui/components/eui-autocomplete';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'default',
    templateUrl: './component.html',
    imports: [...EUI_AUTOCOMPLETE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
    faker = inject(FakerService).instance;
    autocompleteData = computed(() => this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
        .map(fruit => ({ label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
        .sort((a, b) => a.label.localeCompare(b.label))
    );
}
```

