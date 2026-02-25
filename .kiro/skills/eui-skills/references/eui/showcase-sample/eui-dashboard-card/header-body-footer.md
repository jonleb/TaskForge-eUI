---
description: Custom content layout with header, body, and optional actions, plus clickable/flat variants.
id: header-body-footer
---

```html
<div class="row">
    <div class="col-md-3">
        <div class="doc-sample-section-title">Simple</div>

        <eui-dashboard-card>
            <eui-dashboard-card-content>
                <eui-dashboard-card-content-header>
                    <eui-dashboard-card-content-header-title>
                        Card title
                    </eui-dashboard-card-content-header-title>
                    <eui-dashboard-card-content-header-action>
                        <eui-icon-button icon="eui-ellipsis-vertical" euiRounded fillColor="primary" size="s"/>
                    </eui-dashboard-card-content-header-action>
                </eui-dashboard-card-content-header>
                <eui-dashboard-card-content-body>
                    <span class="eui-u-f-2xl-bold">2,000</span>
                </eui-dashboard-card-content-body>
            </eui-dashboard-card-content>
        </eui-dashboard-card>
    </div>

    <div class="col-md-3">
        <div class="doc-sample-section-title">isClickeable</div>

        <eui-dashboard-card isClickeable>
            <eui-dashboard-card-content>
                <eui-dashboard-card-content-header>
                    <eui-dashboard-card-content-header-title>
                        Card title
                    </eui-dashboard-card-content-header-title>
                </eui-dashboard-card-content-header>
                <eui-dashboard-card-content-body>
                    <span class="eui-u-f-2xl-bold">2,000</span>
                </eui-dashboard-card-content-body>
            </eui-dashboard-card-content>
        </eui-dashboard-card>
    </div>

    <div class="col-md-3">
        <div class="doc-sample-section-title">isFlat</div>

        <eui-dashboard-card isFlat>
            <eui-dashboard-card-content>
                <eui-dashboard-card-content-header>
                    <eui-dashboard-card-content-header-title>
                        Card title
                    </eui-dashboard-card-content-header-title>
                    <eui-dashboard-card-content-header-action>
                        <eui-icon-button icon="eui-ellipsis-vertical" euiRounded fillColor="primary" size="s"/>
                    </eui-dashboard-card-content-header-action>
                </eui-dashboard-card-content-header>
                <eui-dashboard-card-content-body>
                    <span class="eui-u-f-2xl-bold">2,000</span>
                </eui-dashboard-card-content-body>
            </eui-dashboard-card-content>
        </eui-dashboard-card>
    </div>

    <div class="col-md-3">
        <div class="doc-sample-section-title">isFlat & isClickeable</div>

        <eui-dashboard-card isFlat isClickeable>
            <eui-dashboard-card-content>
                <eui-dashboard-card-content-header>
                    <eui-dashboard-card-content-header-title>
                        Card title
                    </eui-dashboard-card-content-header-title>
                </eui-dashboard-card-content-header>
                <eui-dashboard-card-content-body>
                    <span class="eui-u-f-2xl-bold">2,000</span>
                </eui-dashboard-card-content-body>
            </eui-dashboard-card-content>
        </eui-dashboard-card>
    </div>
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_AVATAR } from "@eui/components/eui-avatar";
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";
import { EUI_STATUS_BADGE } from "@eui/components/eui-status-badge";


@Component({
    // eslint-disable-next-line
    selector: 'header-body-footer',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DASHBOARD_CARD,
        ...EUI_ICON_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderBodyFooterComponent {
}
```

