---
description: Shows checkboxes in readonly mode using readonly attribute, allowing users to see the state but not modify it.
id: readonly
---

```html
<input id="readonly_unchecked"
       name="checkbox"
       euiInputCheckBox
       readonly />
<label for="readonly_unchecked">Unchecked</label>

<input id="readonly_checked"
       name="checkbox"
       euiInputCheckBox
       readonly
       checked="true" />
<label for="readonly_checked">Checked</label>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';


@Component({
    // tslint:disable-next-line
    selector: 'readonly',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_CHECKBOX],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadOnlyComponent {
}
```

