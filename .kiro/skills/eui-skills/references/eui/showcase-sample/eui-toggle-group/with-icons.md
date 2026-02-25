---
description: Toggle items can include icons alongside text for clearer choices.
id: with-icons
---

```html
<eui-toggle-group>
    <eui-toggle-group-item isChecked id="1">
        <eui-icon-svg icon="eui-clock" size="s"/>
        item 1
    </eui-toggle-group-item>
    <eui-toggle-group-item id="2">
        <eui-icon-svg icon="eui-menu" size="s"/>
        item 2
    </eui-toggle-group-item>
    <eui-toggle-group-item id="3">
        <eui-icon-svg icon="eui-email" size="s"/>
        item 3
    </eui-toggle-group-item>
</eui-toggle-group>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_TOGGLE_GROUP } from '@eui/components/eui-toggle-group';

@Component({
    selector: 'with-icons',
    templateUrl: 'component.html',
    imports: [
        ...EUI_TOGGLE_GROUP,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconsComponent {

}
```

