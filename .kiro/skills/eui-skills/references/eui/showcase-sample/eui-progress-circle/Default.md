---
description: Basic progress circle rendering with fractional values, rounded to a percentage.
id: Default
---

```html
<div class="eui-u-flex">
    <eui-progress-circle [value]="25.5" />
    <eui-progress-circle [value]="51.2" />
    <eui-progress-circle [value]="75.87" />
    <eui-progress-circle [value]="99.9" />
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

}
```

