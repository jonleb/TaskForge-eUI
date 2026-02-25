---
description: Groups options by a nested field using groupBy (for example, metadata.continent).
id: option-grouping
---

```html
<eui-autocomplete [autocompleteData]="autocompleteData" [groupBy]="'metadata.continent'" />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

@Component({
    // eslint-disable-next-line
    selector: 'option-grouping',
    templateUrl: './component.html',
    imports: [
        ...EUI_AUTOCOMPLETE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionGroupingComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'China', metadata: { continent: 'Asia' } },
        { id: 2, label: 'Japan', metadata: { continent: 'Asia' } },
        { id: 3, label: 'Thaïland', metadata: { continent: 'Asia' } },
        { id: 4, label: 'Belgium', metadata: { continent: 'Europa' } },
        { id: 5, label: 'France', metadata: { continent: 'Europa' } },
        { id: 6, label: 'Germany', metadata: { continent: 'Europa' } },
        { id: 7, label: 'South Africa', metadata: { continent: 'Africa' } },
        { id: 8, label: 'Kenya', metadata: { continent: 'Africa' } },
        { id: 9, label: 'Madagascar', metadata: { continent: 'Africa' } },
        { id: 10, label: 'Mexico', metadata: { continent: 'America' } },
        { id: 11, label: 'USA', metadata: { continent: 'America' } },
        { id: 12, label: 'Canada', metadata: { continent: 'America' } },
    ];

}
```

