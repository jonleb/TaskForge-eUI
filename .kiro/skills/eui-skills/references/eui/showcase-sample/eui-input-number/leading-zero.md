---
description: leadingZero property pads numbers with leading zeros to achieve specified minimum digit count.
id: leading-zero
---

```html
<input value="9" euiInputNumber [leadingZero]="3" aria-label="with 3 leading zero" />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';


@Component({
    // tslint:disable-next-line
    selector: 'leading-zero',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadingZeroComponent {
}
```

