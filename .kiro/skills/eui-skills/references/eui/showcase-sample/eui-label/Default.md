---
description: Default rendering of the label component and the euiLabel directive on a native label.
id: Default
---

```html
<eui-label>Sample label</eui-label>
<br/><br/>
<label euiLabel>Sample label</label>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
}
```

