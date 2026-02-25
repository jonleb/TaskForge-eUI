---
description: Custom step sizes for hours, minutes, and seconds while showing the seconds field.
id: steps
---

```html
<div class="doc-sample-section-title">With defined steps of 10 for hours and 20 for minutes/seconds</div>
<eui-timepicker hasSeconds [stepHours]="10" [stepMinutes]="20" [stepSeconds]="20" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TIMEPICKER } from '@eui/components/eui-timepicker';

@Component({
    selector: 'steps',
    templateUrl: './component.html',
    imports: [...EUI_TIMEPICKER],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepsComponent {
}
```

