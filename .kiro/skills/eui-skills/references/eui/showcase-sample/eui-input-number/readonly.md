---
description: readonly attribute prevents user input while maintaining focusability and formatted display.
id: readonly
---

```html
<input value="9999.02" euiInputNumber readonly aria-label="Readonly Input Field"/>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';


@Component({
    // tslint:disable-next-line
    selector: 'readonly',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadOnlyComponent {
}
```

