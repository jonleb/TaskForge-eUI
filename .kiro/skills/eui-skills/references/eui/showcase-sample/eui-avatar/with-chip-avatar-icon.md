---
description: Embeds a small icon avatar inside an eui-chip label.
id: with-chip-avatar-icon
---

```html
@for (variant of avatarVariants; track variant) {
    <eui-chip euiSecondary>
        <eui-avatar euiSizeXS
                    [euiSecondary]="variant === 'euiSecondary'"
                    [euiSuccess]="variant === 'euiSuccess'"
                    [euiWarning]="variant === 'euiWarning'"
                    [euiDanger]="variant === 'euiDanger'">
            <eui-avatar-icon>
                <eui-icon-svg icon="eui-user" />
            </eui-avatar-icon>
        </eui-avatar>
        Chip label
    </eui-chip>
}
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON } from '@eui/components/eui-icon';


@Component({
    // eslint-disable-next-line
    selector: 'with-chip-avatar-icon',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_CHIP,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithChipAvatarIconComponent {
    avatarVariants = [null, 'euiSecondary', 'euiSuccess', 'euiWarning', 'euiDanger'];
}
```

