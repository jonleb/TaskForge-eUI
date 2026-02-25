---
description: euiInputText with euiClearable directive that displays a clear icon when content is present, allowing users to reset the input value.
id: clearable
---

```html
<p class="eui-u-text-paragraph">The <code class="eui-u-text-code">euiClearable</code> input option displays a clear icon to the right of the form control when its content is not empty.
By clicking on the clear icon the form control is reset to an empty value and the focus is set back to the form control.</p>
<br>
<div euiInputGroup>
    <label euiLabel>This is the label</label>
    <input euiInputText euiClearable [value]="inputValue" placeholder="Type some text to enable the clear icon" aria-label="Input text sample with clear field icon" />
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';


@Component({
    // tslint:disable-next-line
    selector: 'clearable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClearableComponent {

    public inputValue = 'Input text sample';

}
```

