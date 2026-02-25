---
description: Basic status badge with projected text content and default styling.
id: Default
---

```html
<eui-status-badge>Status</eui-status-badge>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_STATUS_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
}
```

