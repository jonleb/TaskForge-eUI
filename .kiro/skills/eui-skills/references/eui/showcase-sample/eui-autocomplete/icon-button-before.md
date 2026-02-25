---
description: Places icons and buttons before the field using input-group addons.
id: icon-button-before
---

```html
<div euiInputGroup>
    <div euiInputGroupAddOn>
        <button euiButton euiIconButton euiPrimary euiOutline type="button" aria-label="Search">
            <eui-icon-svg icon="eui-search"/>
        </button>
        <eui-autocomplete [autocompleteData]="autocompleteData" />
    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <div euiInputGroup>
            <div euiInputGroupAddOn>
                <button euiButton euiPrimary euiOutline type="button">Search fruit</button>
                <eui-autocomplete [autocompleteData]="autocompleteData" />
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div euiInputGroup>
            <div euiInputGroupAddOn>
                <div euiInputGroupAddOnItem>
                    <eui-icon-svg icon="eui-search"/>
                </div>
                <eui-autocomplete [autocompleteData]="autocompleteData" />
            </div>
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    // eslint-disable-next-line
    selector: 'icon-button-before',
    templateUrl: './component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_INPUT_GROUP,
        ...EUI_AUTOCOMPLETE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonBeforeComponent {

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

