---
description: Attaches a badge to an icon for notification counts.
id: with-icon
---

```html
<eui-icon-svg icon="eui-email">
    <eui-badge euiDanger euiSizeS>9</eui-badge>
</eui-icon-svg>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_ICON } from '@eui/components/eui-icon';


@Component({
    // eslint-disable-next-line
    selector: 'with-icon',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_BADGE,
        ...EUI_ICON,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithIconComponent {
}
```

