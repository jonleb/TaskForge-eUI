---
description: Clickable custom card content combining an avatar and text block.
id: with-avatar-clickable
---

```html
<eui-dashboard-card isClickeable>
    <eui-dashboard-card-content class="eui-u-flex">
        <eui-avatar euiOutline euiPrimary>
            <eui-avatar-icon>
                <eui-icon-svg icon="eui-flash" />
            </eui-avatar-icon>
        </eui-avatar>

        <div class="eui-u-display-flex eui-u-flex-column eui-u-flex-align-items-start eui-u-ml-m">
            <strong>Label</strong>
            <div class="eui-u-mt-2xs">
                Sub label
            </div>
        </div>
    </eui-dashboard-card-content>
</eui-dashboard-card>
```

```typescript
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_AVATAR } from "@eui/components/eui-avatar";
import { EUI_ICON } from '@eui/components/eui-icon';


@Component({
    // eslint-disable-next-line
    selector: 'with-avatar-clickable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DASHBOARD_CARD,
        ...EUI_AVATAR,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithAvatarClickableComponent {

}
```

