---
description: This sample combines icon-only chips with tooltips and a secondary value chip inside each group.
id: with-icon-tooltip
---

```html
<eui-chip-group>
    <eui-chip euiPrimary euiTooltip="Male">
        <eui-icon-svg icon="gender-male:regular" />
    </eui-chip>
    <eui-chip euiPrimary euiOutline>
        53%
    </eui-chip>
</eui-chip-group>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<eui-chip-group>
    <eui-chip euiPrimary euiTooltip="Female">
        <eui-icon-svg icon="gender-female:regular" />
    </eui-chip>
    <eui-chip euiPrimary euiOutline>
        47%
    </eui-chip>
</eui-chip-group>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_CHIP_GROUP } from '@eui/components/eui-chip-group';


@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'with-icon-tooltip',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP,
        ...EUI_ICON,
        EuiTooltipDirective,
        ...EUI_CHIP_GROUP,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithIconTooltipComponent {
}
```

