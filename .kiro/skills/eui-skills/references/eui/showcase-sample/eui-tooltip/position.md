---
description: Illustrates explicit tooltip placement with the position input (above, below, left, right, before, after).
id: position
---

```html
<button euiButton euiPrimary euiTooltip="Info about the action" [position]="'above'">Above</button>&nbsp;&nbsp;
<button euiButton euiPrimary euiTooltip="Info about the action" [position]="'left'">Left</button>&nbsp;&nbsp;
<button euiButton euiPrimary euiTooltip="Info about the action" [position]="'before'">Before</button>&nbsp;&nbsp;
<button euiButton euiPrimary euiTooltip="Info about the action" [position]="'right'">Right</button>&nbsp;&nbsp;
<button euiButton euiPrimary euiTooltip="Info about the action" [position]="'after'">After</button>&nbsp;&nbsp;
<button euiButton euiPrimary euiTooltip="Info about the action" [position]="'below'">Below</button>&nbsp;&nbsp;
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    selector: 'position',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionComponent {
}
```

