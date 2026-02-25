---
description: Combines an avatar image with a content label and sublabel.
id: label
---

```html
<eui-avatar>
    <eui-avatar-image />
    <eui-avatar-content>
        <eui-avatar-content-label>
            John Doe
        </eui-avatar-content-label>
        <eui-avatar-content-sublabel>
            john.doe&#64;ec.europa.eu
        </eui-avatar-content-sublabel>
    </eui-avatar-content>
</eui-avatar>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';


@Component({
    // eslint-disable-next-line
    selector: 'label',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent {
}
```

