---
description: Applies a custom class to the input and dropdown panel using classList to control styling such as width.
id: classList
---

```html
<eui-autocomplete [autocompleteData]="autocompleteData()" [classList]="'eui-u-width-10'" />
```

```text
.panel {
    width: 600px !important;
}

```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'classlist',
    templateUrl: './component.html',
    styleUrls: ['./component.scss'],
    imports: [
        ...EUI_AUTOCOMPLETE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassListComponent {
    faker = inject(FakerService).instance;
    autocompleteData = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map(fruit => ({ label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );
}
```

