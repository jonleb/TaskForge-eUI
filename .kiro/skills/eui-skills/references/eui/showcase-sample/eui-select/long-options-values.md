---
description: Handling long option text values using euiTruncate pipe for improved display and placeholder truncation.
id: long-options-values
---

```html
<eui-alert>
    <eui-alert-title>Usage & recommendation when having long options values</eui-alert-title>
    Due to limitations when styling the drop-down options list which is <strong>OS-dependent</strong> and not part of the HTML/browser,
    it is recommended to use the <a class="eui-u-text-link" routerLink="/style-guide/pipes/eui-truncate">euiTruncate</a> pipe to "reduce" very long values.
    See the code source for example.
</eui-alert>
<br><br>

<form #myForm="ngForm" id="my-misc-form" novalidate>

    <label euiLabel for="long-value">Super long values</label>
    <select #mySelect euiSelect name="long-value" id="long-value" ngModel [placeholder]="superLongPlaceholder | euiTruncate:100">
        <option [value]="superLongText" selected>{{ superLongText }}</option>
        <option [value]="longValue">{{ longValue | euiTruncate:100 }}</option>
        <option [value]="longValue2">{{ longValue2 | euiTruncate:100 }}</option>
    </select>

</form>

<div class="eui-u-f-bold eui-u-mt-m">Selected value</div>
<div class="eui-showcase-demo eui-u-mt-m">
    <div class="code" style="overflow-y: auto;" tabindex="0">
        <pre class="eui-u-text-pre" tabindex="0">{{ myForm.value | json }}</pre>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { FormsModule } from '@angular/forms';
import { EuiTruncatePipe } from '@eui/components/pipes';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';


@Component({
    selector: 'long-options-values',
    templateUrl: 'component.html',
    imports: [FormsModule, ...EUI_SELECT, ...EUI_LABEL, ...EUI_ALERT, EuiTruncatePipe, ...EUI_INPUT_GROUP, JsonPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LongOptionsValuesComponent {

    public longValue = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar nulla nunc, a ultricies turpis hendrerit ut. Mauris consectetur sapien sapien, ut eleifend mi consectetur ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    public longValue2 = 'Morbi sollicitudin ante ac tortor condimentum convallis. Nullam aliquet finibus felis. Phasellus nec condimentum dolor. Pellentesque aliquet enim non tellus bibendum condimentum. Morbi sodales tincidunt purus, vitae eleifend nulla tempor vel.';

    get superLongText() {
        return 'Super long text '.repeat(20);
    }

    get superLongPlaceholder() {
        return 'Super long placeholder '.repeat(20);
    }
}
```

