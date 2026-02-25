---
description: Demonstrates semantic color variants using base state inputs.
id: color-types
---

```html
<div class="eui-u-flex eui-u-flex-gap-l">
    <eui-status-badge euiSecondary>
        euiSecondary
    </eui-status-badge>

    <eui-status-badge euiPrimary>
        euiPrimary
    </eui-status-badge>
    
    <eui-status-badge euiInfo>
        euiInfo
    </eui-status-badge>

    <eui-status-badge euiSuccess>
        euiSuccess
    </eui-status-badge>

    <eui-status-badge euiWarning>
        euiWarning
    </eui-status-badge>

    <eui-status-badge euiDanger>
        euiDanger
    </eui-status-badge>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';

@Component({
    selector: 'color-types',
    templateUrl: 'component.html',
    imports: [
        ...EUI_STATUS_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorTypesComponent {
}
```

