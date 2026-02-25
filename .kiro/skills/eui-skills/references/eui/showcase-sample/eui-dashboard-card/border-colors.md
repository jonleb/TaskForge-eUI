---
description: Applies border state utility classes together with card variants.
id: border-colors
---

```html
<div class="eui-u-flex eui-u-flex-wrap eui-u-flex-gap-m">
    @for (card of cards; track card.border) {
        <eui-dashboard-card [class]="`eui-u-border-state-${card.border}` + ' eui-u-width-18'"
                            [euiSecondary]="card.euiSecondary"
                            [euiInfo]="card.euiInfo"
                            [euiSuccess]="card.euiSuccess"
                            [euiWarning]="card.euiWarning"
                            [euiDanger]="card.euiDanger"
                            iconSvgName="eui-home"
                            [label]="`border state ${card.border}`" />
    }
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";

@Component({
    // eslint-disable-next-line
    selector: 'border-colors',
    templateUrl: 'component.html',
    imports: [...EUI_DASHBOARD_CARD ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BorderColorsComponent {
    cards = [
        { border: 'primary' },
        { border: 'secondary', euiSecondary: true },
        { border: 'info', euiInfo: true },
        { border: 'success', euiSuccess: true },
        { border: 'warning', euiWarning: true },
        { border: 'danger', euiDanger: true },
    ];
}
```

