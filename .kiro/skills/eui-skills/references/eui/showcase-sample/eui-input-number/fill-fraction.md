---
description: fillFraction option automatically pads decimal places with zeros to match fractionDigits configuration.
id: fill-fraction
---

```html
<div class="doc-sample-section-title">No fraction digits</div>
<input value="9999.500" euiInputNumber fillFraction aria-label="no fraction digits"/>

<div class="doc-sample-section-title">With fractionDigits=3</div>
<input value="9999.500" euiInputNumber fillFraction [fractionDigits]="3" aria-label="with fractionDigits=3" />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';


@Component({
    // tslint:disable-next-line
    selector: 'fill-fraction',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillFractionComponent {
}
```

