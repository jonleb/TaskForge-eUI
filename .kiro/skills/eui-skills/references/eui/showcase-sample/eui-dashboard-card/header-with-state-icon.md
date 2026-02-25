---
description: Header with state icon and action across color variants using header sub-components.
id: header-with-state-icon
---

```html
<div class="row">
    @for (color of colors; track color.label) {
    <div class="col-md-4">
        <eui-dashboard-card
            [euiSecondary]="color.attr === 'euiSecondary'"
            [euiInfo]="color.attr === 'euiInfo'"
            [euiSuccess]="color.attr === 'euiSuccess'"
            [euiWarning]="color.attr === 'euiWarning'"
            [euiDanger]="color.attr === 'euiDanger'">
            <eui-dashboard-card-content>
                <eui-dashboard-card-content-header>
                    <eui-dashboard-card-content-header-icon icon="circle-dashed:regular" />
                    <eui-dashboard-card-content-header-title>
                        {{color.label}}
                    </eui-dashboard-card-content-header-title>
                    <eui-dashboard-card-content-header-action>
                        <eui-icon-button icon="eui-ellipsis-vertical" euiRounded fillColor="primary" size="s"/>
                    </eui-dashboard-card-content-header-action>
                </eui-dashboard-card-content-header>
                <eui-dashboard-card-content-body>
                    Card body content
                </eui-dashboard-card-content-body>
            </eui-dashboard-card-content>
        </eui-dashboard-card>
    </div>
    }
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";


@Component({
    // eslint-disable-next-line
    selector: 'header-with-state-icon',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DASHBOARD_CARD,
        ...EUI_ICON_BUTTON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderWithStateIconComponent {
    colors = [
        { attr: null, label: 'euiPrimary (default)' },
        { attr: 'euiSecondary', label: 'euiSecondary' },
        { attr: 'euiInfo', label: 'euiInfo' },
        { attr: 'euiSuccess', label: 'euiSuccess' },
        { attr: 'euiWarning', label: 'euiWarning' },
        { attr: 'euiDanger', label: 'euiDanger' },
    ];
}
```

