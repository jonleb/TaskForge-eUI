---
description: Default timepicker with separate hour and minute fields and increment/decrement controls.
id: Default
---

```html
<eui-timepicker />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TIMEPICKER } from "@eui/components/eui-timepicker";

@Component({
    templateUrl: './component.html',
    selector: 'Default',
    imports: [...EUI_TIMEPICKER],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
}
```

