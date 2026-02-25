---
description: Places the icon button inside toolbar items to match toolbar styling.
id: as-toolbar-item
---

```html
<eui-toolbar>
    <eui-toolbar-items>
        <eui-toolbar-item>
            <eui-icon-button icon="eui-state-info" ariaLabel="information"/>
        </eui-toolbar-item>
    </eui-toolbar-items>
</eui-toolbar>

<eui-toolbar euiSecondary>
    <eui-toolbar-items>
        <eui-toolbar-item>
            <eui-icon-button icon="eui-state-info" ariaLabel="information"/>
        </eui-toolbar-item>
    </eui-toolbar-items>
</eui-toolbar>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";
import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    selector: 'as-toolbar-item',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
        ...EUI_LAYOUT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsToolbarItemComponent {

}
```

