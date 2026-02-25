---
description: Shows card color variants using BaseStates directives (primary, secondary, info, success, warning, danger).
id: colors
---

```html
<div class="eui-u-flex eui-u-flex-wrap eui-u-flex-gap-m">
    @for (color of colors; track color) {
        <!-- TODO: fix the ChangeDetection Bug when ChangeDetection OnPush, migrate to signal -->
        <eui-dashboard-card class="eui-u-width-18"
                            [euiPrimary]="color === 'primary'"
                            [euiSecondary]="color === 'secondary'"
                            [euiInfo]="color === 'info'"
                            [euiSuccess]="color === 'success'"
                            [euiWarning]="color === 'warning'"
                            [euiDanger]="color === 'danger'"
                            iconSvgName="eui-home"
                            [label]="'eui' + (color | titlecase)" />
    }
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TitleCasePipe } from "@angular/common";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";


@Component({
    // eslint-disable-next-line
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [...EUI_DASHBOARD_CARD, TitleCasePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsComponent {
    colors = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'];
}
```

