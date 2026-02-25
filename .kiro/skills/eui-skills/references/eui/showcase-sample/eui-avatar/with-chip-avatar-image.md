---
description: Embeds a small image avatar inside an eui-chip label.
id: with-chip-avatar-image
---

```html
@for (item of defaultImages; track item.url) {
    <eui-chip>
        <eui-avatar euiSizeXS>
            <eui-avatar-image [imageUrl]="item.url" />
        </eui-avatar>
        Chip label
    </eui-chip>
}

<br><br>

@for (animal of animals; track animal.label) {
    <eui-chip euiSecondary>
        <eui-avatar euiSizeXS>
            <eui-avatar-image [imageUrl]="animal.url" />
        </eui-avatar>
        {{ animal.label }}
    </eui-chip>
}
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';


@Component({
    // eslint-disable-next-line
    selector: 'with-chip-avatar-image',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_CHIP,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithChipAvatarImageComponent {
    defaultImages = [
        { url: null },
        { url: 'assets/images/profile-avatar.png' },
        { url: 'assets/images/sass.png' },
    ];
    animals = [
        { url: 'assets/images/avatars/small/panda.png', label: 'Panda' },
        { url: 'assets/images/avatars/small/bear.png', label: 'Bear' },
        { url: 'assets/images/avatars/small/cat.png', label: 'Cat' },
        { url: 'assets/images/avatars/small/chicken.png', label: 'Chicken' },
        { url: 'assets/images/avatars/small/rabbit.png', label: 'Rabbit' },
    ];
}
```

