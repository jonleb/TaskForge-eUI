---
description: isInvalid property applies error styling to indicate validation failure state.
id: invalid
---

```html
<label euiLabel for="isInvalid">Invalid</label>
<input euiInputNumber value="9999" id="isInvalid" isInvalid />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';


@Component({
    // tslint:disable-next-line
    selector: 'invalid',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvalidComponent {
}
```

