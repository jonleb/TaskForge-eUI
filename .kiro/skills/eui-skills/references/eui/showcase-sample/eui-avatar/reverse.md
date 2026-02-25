---
description: Reverses the layout order when avatar content (label and sublabel) is used.
id: reverse
---

```html
<eui-avatar isReverse>
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
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';


@Component({
    // eslint-disable-next-line
    selector: 'reverse',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReverseComponent {
}
```

