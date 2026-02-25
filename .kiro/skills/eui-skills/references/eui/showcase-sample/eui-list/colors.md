---
description: List items using base state variants to change color and emphasis.
id: colors
---

```html
<ul euiList>
    <li euiListItem euiPrimary>
        <eui-icon-svg icon="eui-star" />
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem euiSecondary>
        <eui-icon-svg icon="eui-star" />
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem euiInfo>
        <eui-icon-svg icon="eui-star" />
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem euiSuccess>
        <eui-icon-svg icon="eui-star" />
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem euiWarning>
        <eui-icon-svg icon="eui-star" />
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
    <li euiListItem euiDanger>
        <eui-icon-svg icon="eui-star" />
        <span euiLabel>Label</span>
        <span euiLabel euiSizeS>Sub-label</span>
    </li>
</ul>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [...EUI_LIST, ...EUI_ICON, ...EUI_LABEL],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {
}
```

