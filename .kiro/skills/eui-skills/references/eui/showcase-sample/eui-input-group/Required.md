---
description: Demonstrates required field indicator using euiRequired attribute on label elements, with dynamic toggling of the required state.
id: Required
---

```html
<p class="eui-u-text-paragraph">The required feature is achieved by using the <code class="eui-u-text-code">euiRequired</code> option with the <strong>label</strong> tag.</p>
Example: <code class="eui-u-text-code">&lt;label euiLabel euiRequired&gt;First name&lt;/label&gt;</code>
<br><br>

<div euiInputGroup>
    <label euiLabel [euiRequired]="isRequired">First name</label>
    <input euiInputText placeholder="Enter your first name" />
</div>

<div euiInputGroup>
    <label euiLabel [euiRequired]="isRequired">Age</label>
    <input euiInputNumber placeholder="Enter your age"/>
</div>

<br>
<button euiButton euiOutline euiPrimary (click)="onToggleRequired()">Toggle Required</button>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_BUTTON } from '@eui/components/eui-button';


@Component({
    // tslint:disable-next-line
    selector: 'Required',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_NUMBER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequiredComponent {

    public isRequired = true;

    public onToggleRequired() {
        this.isRequired = !this.isRequired;
    }
}
```

