---
description: Enables the seconds field to capture a full HH:MM:SS time.
id: with-seconds
---

```html
<eui-timepicker hasSeconds />
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_TIMEPICKER } from "@eui/components/eui-timepicker";

@Component({
    templateUrl: './component.html',
    selector: 'with-seconds',
    imports: [...EUI_TIMEPICKER],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithSecondsComponent {
}
```

