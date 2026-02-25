---
description: Shows semantic color variants using base state inputs.
id: colors
---

```html
<div class="doc-sample-section-title">euiPrimary (default)</div>
<eui-slider euiPrimary />

<div class="doc-sample-section-title">euiDanger</div>
<eui-slider euiDanger />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {
    
}
```

