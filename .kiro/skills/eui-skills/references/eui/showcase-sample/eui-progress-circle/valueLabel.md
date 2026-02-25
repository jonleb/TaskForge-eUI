---
description: Replaces the percentage with a custom label via valueLabel.
id: valueLabel
---

```html
<eui-progress-circle [value]="25" valueLabel="Label" />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";

@Component({
    selector: 'valueLabel',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueLabelComponent {

}
```

