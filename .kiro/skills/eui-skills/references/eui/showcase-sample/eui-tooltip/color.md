---
description: Showcases semantic color variants using euiTooltipPrimary/Secondary/Info/Success/Warning/Danger.
id: color
---

```html
<button euiButton euiPrimary euiTooltip="euiTooltipPrimary" euiTooltipPrimary>Primary</button>&nbsp;&nbsp;
<button euiButton euiSecondary euiTooltip="euiTooltipSecondary (default)" euiTooltipSecondary>Secondary</button>&nbsp;&nbsp;
<button euiButton euiInfo euiTooltip="euiTooltipInfo" euiTooltipInfo>Info</button>&nbsp;&nbsp;
<button euiButton euiSuccess euiTooltip="euiTooltipSuccess" euiTooltipSuccess>Success</button>&nbsp;&nbsp;
<button euiButton euiWarning euiTooltip="euiTooltipWarning" euiTooltipWarning>Warning</button>&nbsp;&nbsp;
<button euiButton euiDanger euiTooltip="euiTooltipDanger" euiTooltipDanger>Danger</button>&nbsp;&nbsp;
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    selector: 'color',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorComponent {
}
```

