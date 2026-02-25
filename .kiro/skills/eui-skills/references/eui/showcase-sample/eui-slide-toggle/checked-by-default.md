---
description: Initializes the toggle in the checked state.
id: checked-by-default
---

```html
<eui-slide-toggle isChecked />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";

@Component({
    selector: 'checked-by-default',
    templateUrl: 'component.html',
    imports: [...EUI_SLIDE_TOGGLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckedByDefaultComponent {
}
```

