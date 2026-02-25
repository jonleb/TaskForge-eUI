---
description: Custom content with metric body and footer actions (icon button and link).
id: footer-with-icon
---

```html
<div class="row">
    <div class="col-md-4">
        <eui-dashboard-card>
            <eui-dashboard-card-content>
                <eui-dashboard-card-content-body>
                    <div class="eui-u-f-2xl-bold">2,000</div>
                    <div class="eui-u-flex">
                        <eui-icon-svg icon="arrow-up:regular" fillColor="success" size="xs"/>
                        <span class="eui-u-c-s-success eui-u-f-s">
                            100% vs last month
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
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";


@Component({
    // eslint-disable-next-line
    selector: 'footer-with-icon',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DASHBOARD_CARD,
        ...EUI_ICON_BUTTON,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterWithIconComponent {
}
```

