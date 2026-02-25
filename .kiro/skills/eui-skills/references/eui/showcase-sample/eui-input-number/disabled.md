---
description: Input field with disabled attribute preventing user interaction while maintaining visual state.
id: disabled
---

```html
<input placeholder="please enter a number" euiInputNumber disabled value="9999" aria-label="Disabled Input Field"/>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';


@Component({
    // tslint:disable-next-line
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisabledComponent {
}
```

