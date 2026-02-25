---
description: digits property limits the maximum number of digits in the integer part of the number.
id: digits
---

```html
<div class="doc-sample-section-title">No Limit</div>
<input value="9999.500" euiInputNumber aria-label="with no limit" />

<div class="doc-sample-section-title">With digits=5</div>
<input value="9999.500" euiInputNumber [digits]="5" aria-label="with 5 digits"/>

<div class="doc-sample-section-title">With digits=5 and fractionDigits=2</div>
<input value="9999.500" euiInputNumber [digits]="5" [fractionDigits]="2" aria-label="with 5 digits and 2 fractiondigits"/>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';


@Component({
    // tslint:disable-next-line
    selector: 'digits',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitsComponent {
}
```

