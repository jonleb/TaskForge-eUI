---
description: Shows euiInputText with isInvalid property to display error state styling.
id: invalid
---

```html
<div euiInputGroup>
    <label euiLabel for="invalid_default">Label</label>
    <input euiInputText id="invalid_default" value="Input text sample" isInvalid />
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';


@Component({
    // tslint:disable-next-line
    selector: 'invalid',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        ...EUI_LABEL,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvalidComponent {
}
```

