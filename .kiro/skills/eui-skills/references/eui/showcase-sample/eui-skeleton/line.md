---
description: Displays the skeleton as a horizontal line placeholder.
id: line
---

```html
<eui-skeleton line />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SKELETON } from "@eui/components/eui-skeleton";

@Component({
    selector: 'line',
    templateUrl: 'component.html',
    imports: [...EUI_SKELETON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineComponent {

}
```

