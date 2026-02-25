---
description: Stacked card with a status badge in the body to indicate trend.
id: with-status-badge
---

```html
<div class="eui-u-flex eui-u-flex-gap-m">
@for (card of cards; track card.icon) {
    <eui-dashboard-card isStacked>
        <eui-dashboard-card-content>
            <eui-dashboard-card-content-header>
                <eui-dashboard-card-content-header-icon icon="circle-dashed:regular"/>
                <eui-dashboard-card-content-header-title>
                    Card title
                </eui-dashboard-card-content-header-title>
            </eui-dashboard-card-content-header>
            <eui-dashboard-card-content-body>
                <div class="eui-u-flex">
                    <span class="eui-u-f-2xl-bold">2,000</span>
                    <span class="eui-u-ml-auto">
                        <eui-status-badge euiSecondary euiSizeS>
                            <eui-icon-svg [icon]="card.icon" [fillColor]="card.fillColor" size="s"/>
                            100%
                        </eui-status-badge>
                    </span>
                </div>
            </eui-dashboard-card-content-body>
            <eui-dashboard-card-content-footer>
                <div class="eui-u-flex">
                    <eui-icon-button icon="eui-settings" euiRounded size="s"/>
                    <span class="eui-u-ml-auto">
                        <a class="eui-u-text-link" href="javascript:void(0)">View report</a>
                    </span>
                </div>
            </eui-dashboard-card-content-footer>
        </eui-dashboard-card-content>
    </eui-dashboard-card>
}
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";
import { EUI_STATUS_BADGE } from "@eui/components/eui-status-badge";


@Component({
    // eslint-disable-next-line
    selector: 'with-status-badge',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DASHBOARD_CARD,
        ...EUI_ICON,
        ...EUI_STATUS_BADGE,
        ...EUI_ICON_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithStatusBadgeComponent {
    cards = [
        { icon: 'arrow-up-right:regular', fillColor: 'success' },
        { icon: 'arrow-down-right:regular', fillColor: 'danger' },
    ];
}
```

