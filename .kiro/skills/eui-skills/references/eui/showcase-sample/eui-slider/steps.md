---
description: Snaps values to a fixed step interval.
id: steps
---

```html
<eui-slider [step]="10" hasRange [value]="{ start: 30, end: 70 }" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    selector: 'steps',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepsComponent {
    
}
```

