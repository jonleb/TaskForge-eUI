---
description: Enables the close button so the alert can be dismissed.
id: isCloseable
---

```html
<eui-alert isCloseable>
    Sample text
</eui-alert>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'isCloseable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsCloseableComponent {
}
```

