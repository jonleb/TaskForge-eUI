---
description: Required label indicator using the euiRequired input.
id: required
---

```html
<div euiLabel euiRequired>Sample label</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    selector: 'required',
    templateUrl: 'component.html',
    imports: [...EUI_LABEL],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequiredComponent {
}
```

