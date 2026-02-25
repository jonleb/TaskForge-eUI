---
description: Displays the skeleton in a circular shape.
id: circle
---

```html
<eui-skeleton circle />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SKELETON } from "@eui/components/eui-skeleton";

@Component({
    selector: 'circle',
    templateUrl: 'component.html',
    imports: [...EUI_SKELETON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleComponent {

}
```

