---
description: Makes the alert focusable for keyboard navigation and accessibility.
id: isFocusable
---

```html
<eui-alert isFocusable>Sample text</eui-alert>
```

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'isFocusable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsFocusableComponent {
}
```

