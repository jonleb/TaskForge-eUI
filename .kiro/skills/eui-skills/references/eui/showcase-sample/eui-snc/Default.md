---
description: Shows the SNC wrapper hiding and revealing sensitive input and textarea content.
id: Default
---

```html
<div euiInputGroup>
    <label euiLabel for="default_snc">IBAN</label>
    <eui-snc>
        <input euiInputText id="default_snc" value="FR90 0000 0000 0000 0000 0000 000" />
    </eui-snc>
</div>

<div euiInputGroup>
    <label euiLabel for="default_snc">Sensitive Documentation</label>
    <eui-snc>
        <div>
            <textarea euiTextArea id="default_snc" rows="4">This is a sensitive document. Please handle with care.</textarea>
        </div>
    </eui-snc>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EuiInputTextComponent } from '@eui/components/eui-input-text';
import { EuiLabelComponent } from '@eui/components/eui-label';
import { EuiSncComponent } from '@eui/components/eui-snc';
import { EuiTextareaComponent } from '@eui/components/eui-textarea';
import { EuiInputGroupComponent } from '@eui/components/eui-input-group';

@Component({
	selector: 'Default',
	templateUrl: 'component.html',
	imports: [
		EuiInputTextComponent,
		EuiLabelComponent,
		EuiSncComponent,
		EuiTextareaComponent,
		EuiInputGroupComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
}
```

