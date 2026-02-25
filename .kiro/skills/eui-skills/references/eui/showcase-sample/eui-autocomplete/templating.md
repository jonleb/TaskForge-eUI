---
description: Customizes option groups and options with euiTemplate slots.
id: templating
---

```html
<div class="doc-sample-section-title">Group templating</div>
<eui-autocomplete [autocompleteData]="autocompleteData" [groupBy]="'metadata.continent'">
    <ng-template euiTemplate="dropdownOptGroup" let-optgroup>
        <eui-icon-svg icon="eui-language-selector" />
        <span>{{ optgroup.label }}</span>
    </ng-template>
</eui-autocomplete>

<div class="doc-sample-section-title">Option templating</div>
<eui-autocomplete [autocompleteData]="autocompleteData">
    <ng-template euiTemplate="dropdownOption" let-option>
        <div class="eui-u-flex">
            <eui-icon-svg icon="eui-chevron-right" />
            {{ option.id }} - {{ option.label }}
        </div>
    </ng-template>
</eui-autocomplete>

<div class="doc-sample-section-title">Both templating</div>
<eui-autocomplete [autocompleteData]="autocompleteData" [groupBy]="'metadata.continent'">
    <ng-template euiTemplate="dropdownOptGroup" let-optgroup>
        <eui-icon-svg icon="eui-language-selector" />
        <span>{{ optgroup.label }}</span>
    </ng-template>
    <ng-template euiTemplate="dropdownOption" let-option>
        <div class="eui-u-flex">
            <eui-icon-svg icon="eui-chevron-right" />
            {{ option.id }} - {{ option.label }}
        </div>
    </ng-template>
</eui-autocomplete>
```

```typescript
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiTemplateDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line
    selector: 'templating',
    templateUrl: './component.html',
    imports: [
        EuiTemplateDirective,
        ...EUI_AUTOCOMPLETE,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatingComponent {

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

