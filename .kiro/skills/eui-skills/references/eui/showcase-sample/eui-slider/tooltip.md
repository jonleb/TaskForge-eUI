---
description: Shows how to disable the hover tooltip for current values.
id: tooltip
---

```html
<eui-slider [hasTooltip]="false" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    selector: 'tooltip',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
    
}
```

