---
description: Chips positions with 2 layouts variants and readonly state.
id: chips-position-readonly
---

```html
<div class="doc-sample-section-title">Chips position top</div>
<div euiInputGroup>
    <label euiLabel for="autocomplete-1">Select fruits</label>
    <eui-autocomplete inputId="autocomplete-1"
                    [autocompleteDataSelected]="autocompleteDataSelected()"
                    [autocompleteData]="autocompleteData()"
                    [chipsPosition]="'top'"
                    hasChips
                    isReadonly />
</div>


<div euiInputGroup>
    <label euiLabel for="autocomplete-2">Select fruits</label>
    <eui-autocomplete inputId="autocomplete-2"
                    [autocompleteDataSelected]="autocompleteDataSelected()"
                    [autocompleteData]="autocompleteData()"
                    [chipsPosition]="'bottom'"
                    hasChips
                    isReadonly />
</div>

<div euiInputGroup>
    <label euiLabel for="autocomplete-3">Select fruits</label>
    <eui-autocomplete inputId="autocomplete-3"
                        [autocompleteDataSelected]="autocompleteDataSelected()"
                        [autocompleteData]="autocompleteData()"
                        [chipsPosition]="'inside'"
                        hasChips
                        isReadonly />
</div>


<div euiInputGroup class="row">
    <div class="col-md-3">
        <label euiLabel for="autocomplete-1h">Select fruits</label>
    </div>
    <div class="col-md-9">
        <eui-autocomplete inputId="autocomplete-1h"
                        [autocompleteDataSelected]="autocompleteDataSelected()"
                        [autocompleteData]="autocompleteData()"
                        [chipsPosition]="'top'"
                        hasChips
                        isReadonly />
    </div>
</div>


<div euiInputGroup class="row">
    <div class="col-md-3">
        <label euiLabel for="autocomplete-2h">Select fruits</label>
    </div>
    <div class="col-md-9">
        <eui-autocomplete inputId="autocomplete-2h"
                        [autocompleteDataSelected]="autocompleteDataSelected()"
                        [autocompleteData]="autocompleteData()"
                        [chipsPosition]="'bottom'"
                        hasChips
                        isReadonly />
    </div>
</div>


<div euiInputGroup class="row">
    <div class="col-md-3">
        <label euiLabel for="autocomplete-3h">Select fruits</label>
    </div>
    <div class="col-md-9">
        <eui-autocomplete inputId="autocomplete-3h"
                            [autocompleteDataSelected]="autocompleteDataSelected()"
                            [autocompleteData]="autocompleteData()"
                            [chipsPosition]="'inside'"
                            hasChips
                            isReadonly />
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { FakerService } from '../../../../faker.service';

@Component({
    // eslint-disable-next-line
    selector: 'chips-position-readonly',
    templateUrl: './component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ...EUI_AUTOCOMPLETE,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
    ],
})
export class ChipsPositionReadOnlyComponent {
    private faker = inject(FakerService).instance;
    public autocompleteData = computed<EuiAutoCompleteItem[]>(() =>
        this.faker().helpers.uniqueArray(() => this.faker().food.fruit(), 70)
            .map((fruit, i) => ({ id: i, label: fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase() }))
            .sort((a, b) => a.label.localeCompare(b.label))
    );
    public autocompleteDataSelected = signal<EuiAutoCompleteItem[]>([]);
}
```

