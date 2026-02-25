---
description: Customizes the automatic color thresholds with the colorSteps input.
id: colorSteps
---

```html
<div class="eui-u-flex">
    <eui-progress-circle [value]="20" colorSteps="20,80" />
    <eui-progress-circle [value]="50" colorSteps="20,80" />
    <eui-progress-circle [value]="75" colorSteps="20,70" />
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";

@Component({
    selector: 'colorSteps',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorStepsComponent {

}
```

