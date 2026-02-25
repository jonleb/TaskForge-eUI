---
description: Uses eui-avatar-image to display user photos or illustrations.
id: avatar-image
---

```html
@for (image of images; track image) {
    <eui-avatar>
        <eui-avatar-image [imageUrl]="image" />
    </eui-avatar>
}
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EUI_AVATAR } from '@eui/components/eui-avatar';

@Component({
    // eslint-disable-next-line
    selector: 'avatar-image',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarImageComponent {
    images = [
        'assets/images/sass.png',
        'assets/images/profile-avatar.png',
        'assets/images/avatars/small/panda.png',
        'assets/images/avatars/small/cat.png',
        'assets/images/avatars/small/bear.png',
        'assets/images/avatars/small/chicken.png',
        'assets/images/avatars/small/rabbit.png',
    ];
}
```

