---
description: Sets custom minimum and maximum bounds for the slider range.
id: min-max
---

```html
<eui-slider min="-1000" max="1000" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    selector: 'min-max',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinMaxComponent {
    
}
```

