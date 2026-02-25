---
description: Combines chips positions with prepend and append input addons.
id: chips-position-addons
---

```html
<div class="doc-sample-section-title">Chips position top with append & prepend addons</div>

<div euiInputGroup>
    <div euiInputGroupAddOn>
        <div euiInputGroupAddOnItem>
            <eui-icon-svg icon="shopping-cart-simple:regular" />
        </div>
        <eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected()"
                          [autocompleteData]="autocompleteData()"
                          [chipsPosition]="'top'"
                          hasChips />
        <button euiButton euiIconButton type="button" aria-label="Search">
            <eui-icon-svg icon="eui-search" />
        </button>
    </div>
</div>


<div class="doc-sample-section-title">Chips position bottom with append & prepend addons</div>

<div euiInputGroup>
    <div euiInputGroupAddOn>
        <div euiInputGroupAddOnItem>
            <eui-icon-svg icon="shopping-cart-simple:regular" />
        </div>
        <eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected()"
                          [autocompleteData]="autocompleteData()"
                          [chipsPosition]="'bottom'"
                          hasChips />
        <div euiInputGroupAddOnItem>
            <eui-icon-svg icon="eui-search" />
        </div>
    </div>
</div>


<div class="doc-sample-section-title">Chips position inside with append & prepend addons</div>

<div euiInputGroup>
    <div euiInputGroupAddOn>
        <div euiInputGroupAddOnItem>
            <eui-icon-svg icon="shopping-cart-simple:regular" />
        </div>
        <eui-autocomplete [autocompleteDataSelected]="autocompleteDataSelected()"
                          [autocompleteData]="autocompleteData()"
                          [chipsPosition]="'inside'"
                          hasChips />
        <div euiInputGroupAddOnItem>
            <eui-icon-svg icon="eui-search" />
        </div>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'chips-position-addons',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_AUTOCOMPLETE,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_INPUT_GROUP,

    ],
})
export class ChipsPositionAddonsComponent {
    private faker = inject(FakerService).instance;
    public autocompleteData = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map((fruit, i) => ({ id: i, label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );
    public autocompleteDataSelected = signal<EuiAutoCompleteItem[]>([]);
}
```

