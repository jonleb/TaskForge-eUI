---
description: Uses eui-avatar-icon to render an icon inside the avatar.
id: avatar-icon
---

```html
@for (variant of variants; track variant) {
    <eui-avatar [euiPrimary]="variant === 'euiPrimary'"
                [euiSecondary]="variant === 'euiSecondary'"
                [euiInfo]="variant === 'euiInfo'"
                [euiSuccess]="variant === 'euiSuccess'"
                [euiWarning]="variant === 'euiWarning'"
                [euiDanger]="variant === 'euiDanger'">
        <eui-avatar-icon>
            <eui-icon-svg icon="eui-user" />
        </eui-avatar-icon>
    </eui-avatar>
}
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'avatar-icon',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_ICON
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarIconComponent {
    variants = ['euiPrimary', 'euiSecondary', 'euiInfo', 'euiSuccess', 'euiWarning', 'euiDanger'];
}
```

