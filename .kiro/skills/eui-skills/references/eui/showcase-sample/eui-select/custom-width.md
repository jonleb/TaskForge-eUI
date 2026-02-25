---
description: Width customization using eUI utility classes for vertical and horizontal layout configurations.
id: custom-width
---

```html
<p class="eui-u-text-paragraph">
    Adapt your layout to match select dropdown data and use the <code class="eui-u-text-code">eui-u-width-%</code> utility class to size the select dropdown.
    For more information, please refer to 
    <a class="eui-u-text-link" href="showcase-design-system/css-utilities#Width">Design Sytem Showcase utility classes</a>
</p>

<div class="doc-sample-section-title">Vertical layout (default)</div>
<div euiInputGroup>
    <label euiLabel for="assets-v">Frozen assets by Member State</label>
    <select euiSelect name="assets-v" id="assets-v" class="eui-u-width-4">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
    </select>
</div>

<div class="doc-sample-section-title">Horizontal layout</div>
<div euiInputGroup class="row">
    <div class="col-4">
        <label for="assets-h" euiLabel euiRequired>Frozen assets by Member State</label>
    </div>
    <div class="col-8">
        <select euiSelect name="assets-h" id="assets-h" class="eui-u-width-4">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';


@Component({
    selector: 'custom-width',
    templateUrl: 'component.html',
    imports: [FormsModule, ReactiveFormsModule, ...EUI_SELECT, ...EUI_LABEL, ...EUI_ALERT, ...EUI_INPUT_GROUP],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomWidthComponent {



}
```

