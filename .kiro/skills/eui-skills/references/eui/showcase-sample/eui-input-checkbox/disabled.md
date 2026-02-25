---
description: Shows checkboxes in disabled state using the disabled attribute, making them non-focusable and non-interactive.
id: disabled
---

```html
<p class="eui-u-text-paragraph">Non focusable disabled state checkboxes</p>
<br>
<input id="unchecked"
       name="checkbox"
       euiInputCheckBox
       disabled />
<label for="unchecked">Unchecked</label>

<input id="checked"
       name="checkbox"
       euiInputCheckBox
       disabled
       checked />
<label for="checked">Checked</label>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';


@Component({
    // tslint:disable-next-line
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_CHECKBOX],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisabledComponent {
}
```

