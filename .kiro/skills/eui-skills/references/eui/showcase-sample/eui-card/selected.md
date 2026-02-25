---
description: This sample shows the selected visual state and a checkbox-driven selection binding.
id: selected
---

```html
<div class="doc-sample-section-title">Selected state visuals</div>
<eui-card euiSelected>
    <eui-card-header>
        <eui-card-header-title>
            Card Title
        </eui-card-header-title>
        <eui-card-header-subtitle>
            Card subtitle
        </eui-card-header-subtitle>
    </eui-card-header>
    <eui-card-content>
        Card content...
    </eui-card-content>
</eui-card>

<div class="doc-sample-section-title">With checkbox</div>
<eui-card [euiSelected]="isCardSelected">
    <eui-card-header >
        <eui-card-header-left-content>
            <input euiInputCheckBox id="checkbox-sample-1" name="checkbox-sample-1" [(ngModel)]="isCardSelected">
        </eui-card-header-left-content>

        <eui-card-header-title>
            Card Title
        </eui-card-header-title>
        <eui-card-header-subtitle>
            Card subtitle
        </eui-card-header-subtitle>
    </eui-card-header>
    <eui-card-content>
        Card content...
    </eui-card-content>
</eui-card>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';


@Component({
    // eslint-disable-next-line
    selector: 'selected',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_CARD,
        ...EUI_INPUT_CHECKBOX,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedComponent {

    public isCardSelected = true;

}
```

