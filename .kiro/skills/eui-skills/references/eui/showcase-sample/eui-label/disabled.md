---
description: Disabled label state using the euiDisabled base state for muted styling.
id: disabled
---

```html
<div euiLabel euiDisabled>Sample label</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [...EUI_LABEL],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledComponent {
}
```

