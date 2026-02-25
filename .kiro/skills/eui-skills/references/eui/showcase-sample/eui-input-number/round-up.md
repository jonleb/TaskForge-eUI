---
description: roundUp property applies mathematical rounding to specified decimal places on focus loss.
id: round-up
---

```html
<div class="doc-sample-section-title">With roundUp of value 5.549</div>
<input value="5.549" euiInputNumber fractionDigits=2 roundUp="2" aria-label="rounds decimal on focusout Up" />

<div class="doc-sample-section-title">With roundUp of value 10000.549 and fraction=4</div>
<input value="5.549" euiInputNumber fractionDigits=4 roundUp="2" aria-label="rounds decimal on focusout Up" />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';

@Component({
    // tslint:disable-next-line
    selector: 'round-up',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundUpComponent {
    in: any = 5.549;
}
```

