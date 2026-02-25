---
description: Demonstrates outlined cards with state color variants.
id: outline
---

```html
<!-- TODO: fix bug when changeDetection OnPUsh, migrate to signal -->
<div class="eui-u-flex eui-u-flex-gap-m">
@for (color of stateColors; track color) {
    <eui-dashboard-card euiOutline
        [euiPrimary]="color === 'euiPrimary'"
        [euiSuccess]="color === 'euiSuccess'"
        [euiWarning]="color === 'euiWarning'"
        [euiDanger]="color === 'euiDanger'">
        <eui-dashboard-card-content>
            {{color}}
        </eui-dashboard-card-content>
    </eui-dashboard-card>
}
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";


@Component({
    // eslint-disable-next-line
    selector: 'outline',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DASHBOARD_CARD,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutlineComponent {
    stateColors = ['euiPrimary', 'euiSuccess', 'euiWarning', 'euiDanger'];
}
```

