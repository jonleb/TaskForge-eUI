---
description: Shows size variants from S to XL (M is default).
id: sizes
---

```html
<div class="eui-u-flex eui-u-flex-wrap">
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        S
        <eui-slide-toggle euiSizeS />
    </div>
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        M (default)
        <eui-slide-toggle euiSizeM />
    </div>
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        L
        <eui-slide-toggle euiSizeL />
    </div>
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        XL
        <eui-slide-toggle euiSizeXL />
    </div>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";

@Component({
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [...EUI_SLIDE_TOGGLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesComponent {
}
```

