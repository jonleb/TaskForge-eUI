---
description: Applies state color variants to icon and text avatars.
id: colors
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
<br/><br/>
@for (variant of variants; track variant) {
    <eui-avatar [euiPrimary]="variant === 'euiPrimary'"
                [euiSecondary]="variant === 'euiSecondary'"
                [euiInfo]="variant === 'euiInfo'"
                [euiSuccess]="variant === 'euiSuccess'"
                [euiWarning]="variant === 'euiWarning'"
                [euiDanger]="variant === 'euiDanger'">
        <eui-avatar-text>eUI</eui-avatar-text>
    </eui-avatar>
}
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_ICON } from '@eui/components/eui-icon';


@Component({
    // eslint-disable-next-line
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_ICON
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsComponent {
    variants = ['euiPrimary', 'euiSecondary', 'euiInfo', 'euiSuccess', 'euiWarning', 'euiDanger'];
}
```

