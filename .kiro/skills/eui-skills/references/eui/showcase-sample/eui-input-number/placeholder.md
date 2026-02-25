---
description: placeholder attribute supports both text strings and numeric values with locale-aware formatting.
id: placeholder
---

```html
<div class="doc-sample-section-title">Text</div>
<input [placeholder]="'Please enter a number'" euiInputNumber aria-label="Input field with placeholder"/>


<div class="doc-sample-section-title">Number</div>
Placeholder adapts to locale changes
<input [placeholder]="123456789.01234" [fractionDigits]="5" euiInputNumber aria-label="Input field with placeholder"/>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';


@Component({
    // tslint:disable-next-line
    selector: 'placeholder',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderComponent {
}
```

