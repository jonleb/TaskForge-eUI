---
description: Minimal example of a circular skeleton placeholder.
id: Default
---

```html
<eui-skeleton circle />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SKELETON } from "@eui/components/eui-skeleton";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_SKELETON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {


}
```

