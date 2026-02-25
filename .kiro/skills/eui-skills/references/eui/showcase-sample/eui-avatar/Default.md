---
description: Basic avatar with an icon at the default size and circular shape.
id: Default
---

```html
<eui-avatar>
    <eui-avatar-icon>
        <eui-icon-svg icon="eui-user" />
    </eui-avatar-icon>
</eui-avatar>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_ICON } from '@eui/components/eui-icon';


@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent {
}
```

