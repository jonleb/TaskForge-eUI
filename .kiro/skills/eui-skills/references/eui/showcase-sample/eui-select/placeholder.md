---
description: Custom placeholder implementation using euiSelect directive placeholder attribute and manual inline templating approaches.
id: placeholder
---

```html
<eui-alert>
    <eui-alert-title>Important remark about the placeholder</eui-alert-title>
    <p class="eui-u-text-paragraph">There does not exist a placeholder attribute for the <code class="eui-u-text-code">&lt;select&gt;</code> tag.
    However, the <code class="eui-u-text-code"><strong>euiSelect</strong></code> directive allows it as an input option in order to display a custom placeholder text in the select input box.
    </p>
</eui-alert>
<br>
<div class="doc-sample-section-title">euiSelect with placeholder</div>
<select euiSelect name="drinks" aria-label="Choose a drink with placeholder" placeholder="Choose a drink">
    <option value="coffee">Coffee</option>
    <option value="tea">Tea</option>
    <option value="milk">Milk</option>
    <option value="water">Water</option>
</select>

<div class="doc-sample-section-title">Manual inline templating placeholder</div>
<select euiSelect name="drinks" aria-label="Choose a drink with placeholder">
    <option value="" selected>Choose a drink</option>
    <option value="coffee">Coffee</option>
    <option value="tea">Tea</option>
    <option value="milk">Milk</option>
    <option value="water">Water</option>
</select>

<div class="doc-sample-section-title">Using the placeholder with selected and disabled options</div>
<select euiSelect name="framework" aria-label="Select a framework with placeholder" placeholder="--select a framework--">
    @for (option of options; let i = $index; track $index) {
        <option [ngValue]="option.value" [attr.disabled]="option?.disabled" [attr.selected]="option?.selected">{{option.label}}</option>
    }
</select>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_ALERT } from '@eui/components/eui-alert';


@Component({
    // tslint:disable-next-line
    selector: 'placeholder',
    templateUrl: 'component.html',
    imports: [FormsModule, ...EUI_SELECT, ...EUI_ALERT],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderComponent {
    public options: {value: string; label: string; selected?: boolean; disabled?: boolean}[] = [
        { value: 'angular', label: 'Angular', selected: true },
        { value: 'react', label: 'React', disabled: true },
        { value: 'vue', label: 'Vue' },
    ];
}
```

