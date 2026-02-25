---
description: Demonstrates custom icons for ON and OFF states.
id: with-icon
---

```html
<div class="eui-u-flex eui-u-flex-wrap">
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        S
        <eui-slide-toggle iconSvgNameOn="moon:regular" iconSvgNameOff="sun:regular" euiSizeS />
    </div>
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        M (default)
        <eui-slide-toggle iconSvgNameOn="moon:regular" iconSvgNameOff="sun:regular" />
    </div>
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        L
        <eui-slide-toggle iconSvgNameOn="moon:regular" iconSvgNameOff="sun:regular" euiSizeL />
    </div>
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        XL
        <eui-slide-toggle iconSvgNameOn="moon:regular" iconSvgNameOff="sun:regular" euiSizeXL />
    </div>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";

@Component({
    selector: 'withIcon',
    templateUrl: 'component.html',
    imports: [...EUI_SLIDE_TOGGLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconComponent {
}
```

