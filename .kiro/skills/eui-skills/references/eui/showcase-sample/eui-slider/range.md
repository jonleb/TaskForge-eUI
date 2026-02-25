---
description: Enables range selection with start and end handles.
id: range
---

```html
<eui-slider [hasRange]="true" [value]="{ start: 10, end: 90 }" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    selector: 'range',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeComponent {
    
}
```

