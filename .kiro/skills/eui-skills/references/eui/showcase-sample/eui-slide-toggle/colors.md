---
description: Shows semantic color variants using base state inputs.
id: colors
---

```html
<div class="eui-u-flex eui-u-flex-wrap">
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        <div class="eui-u-text-small">euiPrimary</div>
        <eui-slide-toggle euiSizeM euiPrimary />
    </div>
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        <div class="eui-u-text-small">euiInfo</div>
        <eui-slide-toggle euiSizeM euiInfo />
    </div>
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        <div class="eui-u-text-small">euiSuccess</div>
        <eui-slide-toggle euiSizeM euiSuccess />
    </div>
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        <div class="eui-u-text-small">euiWarning</div>
        <eui-slide-toggle euiSizeM euiWarning />
    </div>
    <div class="eui-u-flex eui-u-flex-col eui-u-flex-column">
        <div class="eui-u-text-small">euiDanger</div>
        <eui-slide-toggle euiSizeM euiDanger />
    </div>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [...EUI_SLIDE_TOGGLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {
}
```

