---
description: Toggles the right-side value indicator display.
id: value-indicator
---

```html
<eui-slider [hasValueIndicator]="false" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    selector: 'value-indicator',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueIndicatorComponent {
    
}
```

