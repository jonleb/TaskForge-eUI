---
description: Shows a clickable card in disabled state, preventing interaction.
id: disabled
---

```html
<eui-dashboard-card euiSuccess
    isClickeable
    iconSvgName="eui-close"
    label="New submission"
    subLabel="This is the sub label of the card"
    euiDisabled />
```

```typescript
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";


@Component({
    // eslint-disable-next-line
    selector: 'disabled',
    templateUrl: 'component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [...EUI_DASHBOARD_CARD],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisabledComponent {

}
```

