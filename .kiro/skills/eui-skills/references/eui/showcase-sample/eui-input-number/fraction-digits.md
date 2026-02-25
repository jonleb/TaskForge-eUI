---
description: fractionDigits property controls the number of decimal places displayed in formatted numbers.
id: fraction-digits
---

```html
<div class="doc-sample-section-title">No fraction</div>
<input value="9999.500" euiInputNumber aria-label="with no fraction" />

<div class="doc-sample-section-title">With fractionDigits=3</div>
<input value="9999.500" euiInputNumber [fractionDigits]="3" aria-label="with 3 fraction digits" />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';


@Component({
    // tslint:disable-next-line
    selector: 'fraction-digits',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FractionDigitsComponent {
}
```

