---
description: Shows the eui-icon-state component using semantic state variants (info, success, warning, danger) to display status icons.
id: Default
---

```html
<div class="doc-sample-section-title">euiInfo</div>
<eui-icon-state euiInfo />

<div class="doc-sample-section-title">euiSuccess</div>
<eui-icon-state euiSuccess />

<div class="doc-sample-section-title">euiWarning</div>
<eui-icon-state euiWarning />

<div class="doc-sample-section-title">euiDanger</div>
<eui-icon-state euiDanger />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_STATE } from '@eui/components/eui-icon-state';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_STATE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
    onSearch(event: Event): void {
        console.log(event);
    }
}
```

