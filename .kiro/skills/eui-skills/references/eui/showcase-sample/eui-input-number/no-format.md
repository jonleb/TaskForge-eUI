---
description: noFormat option disables thousand separators and locale-specific number formatting.
id: no-format
---

```html
<div class="doc-sample-section-title">With no thousand grouping</div>
<label euiLabel for="noFormat">without format</label>
<input euiInputNumber noFormat value="9999" id="noFormat" />
<br/>
<label euiLabel for="noFormatDecimal">without format and decimal</label>
<input euiInputNumber noFormat value="9999.999" [fractionDigits]="3" id="noFormatDecimal" />
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';


@Component({
    // tslint:disable-next-line
    selector: 'no-format',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoFormatComponent {
}
```

