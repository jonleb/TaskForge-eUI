---
description: Overrides the label shown when the value is 0 using emptyLabel.
id: empty-label
---

```html
<eui-progress-circle [value]="0" emptyLabel="NONE" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";

@Component({
    selector: 'emptyLabel',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyLabelComponent {

}
```

