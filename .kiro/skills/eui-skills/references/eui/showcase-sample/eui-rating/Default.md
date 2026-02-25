---
description: Basic interactive rating with the default 5-star scale and no preset value.
id: Default
---

```html
<eui-rating/>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_RATING } from '@eui/components/eui-rating';

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_RATING,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

}
```

