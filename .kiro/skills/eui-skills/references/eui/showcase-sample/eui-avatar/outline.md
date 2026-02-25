---
description: Shows outline styling combined with color variants on icon and text avatars.
id: outline
---

```html
@for (variant of variants; track variant) {
    <eui-avatar euiOutline
                [euiPrimary]="variant === 'euiPrimary'"
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
    <eui-avatar euiOutline
                [euiPrimary]="variant === 'euiPrimary'"
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
    selector: 'outline',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_ICON
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutlineComponent {
    variants = ['euiPrimary', 'euiSecondary', 'euiInfo', 'euiSuccess', 'euiWarning', 'euiDanger'];
}
```

