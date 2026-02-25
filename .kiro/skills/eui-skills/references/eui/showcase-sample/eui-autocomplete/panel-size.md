---
description: Overrides the dropdown panel width with panelWidth in px and vw units.
id: panel-size
---

```html
<!-- panelWidth can be defined in px -->
<div class="doc-sample-section-title">Dropdown panelWidth=450px</div>
<eui-autocomplete [autocompleteData]="autocompleteData" panelWidth="450px" />

<!-- panelWidth can be defined in vw -->
<div class="doc-sample-section-title">Dropdown panelWidth=50vw</div>
<eui-autocomplete [autocompleteData]="autocompleteData" panelWidth="50vw" />
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

@Component({
    // eslint-disable-next-line
    selector: 'panel-size',
    templateUrl: './component.html',
    imports: [...EUI_AUTOCOMPLETE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelSizeComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple' },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry' },
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

