---
description: Demonstrates indeterminate state using the indeterminate property, typically used for parent checkboxes when some but not all child items are selected.
id: indeterminate
---

```html
<input id="indeterminate-checkbox1"
       name="checkbox"
       euiInputCheckBox
       indeterminate />
<label for="indeterminate-checkbox1">Unchecked</label>

<input id="indeterminate-checkbox2"
       name="checkbox"
       euiInputCheckBox
       checked
       indeterminate />
<label for="indeterminate-checkbox2">Checked</label>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';


@Component({
    // tslint:disable-next-line
    selector: 'indeterminate',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_CHECKBOX],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndeterminateComponent {
}
```

