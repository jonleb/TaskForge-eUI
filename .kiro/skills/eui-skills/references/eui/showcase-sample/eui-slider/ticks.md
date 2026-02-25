---
description: Displays tick marks at each step interval.
id: ticks
---

```html
<eui-slider [step]="10" hasRange hasTicks [value]="{ start: 30, end: 70 }" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    selector: 'ticks',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicksComponent {
    
}
```

