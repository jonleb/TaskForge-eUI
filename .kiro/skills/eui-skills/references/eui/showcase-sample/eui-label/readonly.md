---
description: Readonly label styling using the euiReadonly input.
id: readonly
---

```html
<div euiLabel euiReadonly>Sample label</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    selector: 'readonly',
    templateUrl: 'component.html',
    imports: [...EUI_LABEL],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyComponent {
}
```

