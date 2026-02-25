---
description: Uses progress bars inside table cells to visualize proportions alongside numeric values.
id: with-table
---

```html

```

```typescript
// EXCLUDE_START
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";

@Component({
    selector: 'with-table',
    templateUrl: 'component.html',
    imports: [
        ...EUI_PROGRESS_BAR,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithTableComponent {

}
// EXCLUDE_START
```

