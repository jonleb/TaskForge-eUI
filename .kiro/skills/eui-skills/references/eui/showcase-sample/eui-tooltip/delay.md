---
description: Configures showDelay and hideDelay to control tooltip timing and demonstrate delayed visibility.
id: delay
---

```html
<div class="doc-sample-section-title">Delay before showing &mdash; showDelay={{ showDelay }} (in ms)</div>
<button euiButton euiPrimary euiTooltip="Info about the action" [showDelay]="showDelay">Action</button>


<div class="doc-sample-section-title">Delay before hiding &mdash; hideDelay={{ hideDelay }} (in ms)</div>
<button euiButton euiPrimary euiTooltip="Info about the action" [hideDelay]="hideDelay" position="above">Action</button>
```

```typescript
import { Component, ChangeDetectionStrategy, viewChild } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    selector: 'delay',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
        ...EUI_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelayComponent {

    public showDelay = 1000;
    public hideDelay = 1000 * 5;

    
}
```

