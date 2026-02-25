---
description: Shows projected icons inside the badge, including across color variants.
id: with-icon
---

```html
<div class="doc-sample-section-title">Default</div>

<eui-status-badge>
    <eui-icon-svg icon="circle-dashed:regular" size="s"/>
    status
</eui-status-badge>


<div class="doc-sample-section-title">Color variants with icon</div>

<div class="eui-u-flex eui-u-flex-gap-l">
    <eui-status-badge euiSecondary>
        <eui-icon-svg icon="circle-dashed:regular" size="s"/>
        euiSecondary
    </eui-status-badge>

    <eui-status-badge euiPrimary>
        <eui-icon-svg icon="circle-dashed:regular" size="s"/>
        euiPrimary
    </eui-status-badge>
    
    <eui-status-badge euiInfo>
        <eui-icon-svg icon="circle-dashed:regular" size="s"/>
        euiInfo
    </eui-status-badge>

    <eui-status-badge euiSuccess>
        <eui-icon-svg icon="circle-dashed:regular" size="s"/>
        euiSuccess
    </eui-status-badge>

    <eui-status-badge euiWarning>
        <eui-icon-svg icon="circle-dashed:regular" size="s"/>
        euiWarning
    </eui-status-badge>

    <eui-status-badge euiDanger>
        <eui-icon-svg icon="circle-dashed:regular" size="s"/>
        euiDanger
    </eui-status-badge>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';

@Component({
    selector: 'with-icon',
    templateUrl: 'component.html',
    imports: [
        ...EUI_STATUS_BADGE,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconComponent {
}
```

