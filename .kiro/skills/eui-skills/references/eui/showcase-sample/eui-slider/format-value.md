---
description: Formats the displayed value using custom formatter functions.
id: format-value
---

```html
<div class="doc-sample-section-title">Add label</div>
<eui-slider [formatValue]="addLabel" />

<div class="doc-sample-section-title">Decimal</div>
<eui-slider [formatValue]="decimal" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    selector: 'format-value',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormatValueComponent {

    addLabel(value: number): string {
        if (Math.abs(value) > 1) {
            return value + ' balloons';
        } else {
            return value + ' balloon';
        }
    }

    decimal(value: number): string {
        return (1 + (value / 100)).toFixed(2);
    }

}
```

