---
description: Shows radio buttons with invalid state using isInvalid property to indicate validation errors.
id: invalid
---

```html
<input id="invalid1" name="radioInvalidOnly"
       type="radio"
       euiInputRadio
       isInvalid />
<label euiLabel for="invalid1">Unchecked</label>

<input id="invalid2" name="radioInvalidOnly"
       type="radio"
       euiInputRadio
       checked
       isInvalid />
<label euiLabel for="invalid2">Checked</label>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'invalid',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_RADIO],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvalidComponent {
}
```

