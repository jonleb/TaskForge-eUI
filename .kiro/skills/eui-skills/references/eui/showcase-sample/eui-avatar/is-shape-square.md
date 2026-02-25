---
description: Switches the avatar from circular to square shape for icon, image, and text.
id: is-shape-square
---

```html
<eui-avatar isShapeSquare>
    <eui-avatar-icon>
        <eui-icon-svg icon="eui-user" />
    </eui-avatar-icon>
</eui-avatar>

<br/><br/>

<eui-avatar isShapeSquare>
    <eui-avatar-image imageUrl="assets/images/profile-avatar.png" />
</eui-avatar>

<br/><br/>

<eui-avatar isShapeSquare>
    <eui-avatar-text>eUI</eui-avatar-text>
</eui-avatar>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_ICON } from '@eui/components/eui-icon';


@Component({
    // eslint-disable-next-line
    selector: 'is-shape-square',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_ICON
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IsShapeSquareComponent {
}
```

