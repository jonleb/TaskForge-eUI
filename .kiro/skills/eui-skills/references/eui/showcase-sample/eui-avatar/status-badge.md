---
description: Adds a status badge to the avatar while keeping name and email content.
id: status-badge
---

```html
<div class="eui-u-flex eui-u-flex-gap-xl">
    @for (variant of badgeVariants; track variant) {
        <eui-avatar>
            <eui-avatar-image />
            <eui-avatar-badge isPositionBottom>
                <eui-badge [euiSuccess]="variant === 'euiSuccess'"
                           [euiDanger]="variant === 'euiDanger'"
                           [euiSecondary]="variant === 'euiSecondary'" />
            </eui-avatar-badge>
            <eui-avatar-content>
                <eui-avatar-content-label>John Doe</eui-avatar-content-label>
                <eui-avatar-content-sublabel>john.doe&#64;ec.europa.eu</eui-avatar-content-sublabel>
            </eui-avatar-content>
        </eui-avatar>
    }
</div>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_BADGE } from '@eui/components/eui-badge';

@Component({
    // eslint-disable-next-line
    selector: 'status-badge',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBadgeComponent {
    badgeVariants = ['euiSuccess', 'euiDanger', 'euiSecondary'];
}
```

