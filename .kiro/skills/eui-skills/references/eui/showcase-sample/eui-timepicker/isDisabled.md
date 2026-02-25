---
description: Demonstrates the disabled state for the timepicker, with and without seconds.
id: isDisabled
---

```html
<div class="doc-sample-section-title">Disable the whole timepicker</div>
<eui-timepicker [isDisabled]="true" />

<div class="doc-sample-section-title">Disabled timepicker with seconds</div>
<eui-timepicker [isDisabled]="true" [hasSeconds]="true" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TIMEPICKER } from "@eui/components/eui-timepicker";

@Component({
    selector: 'isDisabled',
    templateUrl: './component.html',
    imports: [...EUI_TIMEPICKER],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsDisabledComponent {
}
```

