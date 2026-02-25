---
description: Displays checkboxes with invalid state using isInvalid property to indicate validation errors.
id: invalid
---

```html
<input id="invalid-checkbox1"
       name="checkbox"
       euiInputCheckBox
       isInvalid />
<label for="invalid-checkbox1">Unchecked</label>

<input id="invalid-checkbox2"
       name="checkbox"
       euiInputCheckBox
       checked
       isInvalid />
<label for="invalid-checkbox2">Checked</label>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';


@Component({
    // tslint:disable-next-line
    selector: 'invalid',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_CHECKBOX],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvalidComponent {
}
```

