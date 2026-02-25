---
description: Shows outline button color variants inside dashboard cards.
id: button-colors
---

```html
<div class="eui-u-flex eui-u-flex-wrap eui-u-flex-gap-m">
    @for (color of colors; track color) {
        <eui-dashboard-card class="eui-u-width-18" iconSvgName="eui-home" label="LABEL">
            <button euiButton euiOutline euiSizeS
                    [euiSecondary]="color === 'secondary'"
                    [euiPrimary]="color === 'primary'"
                    [euiInfo]="color === 'info'"
                    [euiSuccess]="color === 'success'"
                    [euiWarning]="color === 'warning'"
                    [euiDanger]="color === 'danger'">eui{{ color | titlecase }}</button>
        </eui-dashboard-card>
    }
</div>
```

```typescript
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { TitleCasePipe } from "@angular/common";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'button-colors',
    templateUrl: 'component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [...EUI_DASHBOARD_CARD, ...EUI_BUTTON, TitleCasePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonColorsComponent {
    colors = ['secondary', 'primary', 'info', 'success', 'warning', 'danger'];
}
```

