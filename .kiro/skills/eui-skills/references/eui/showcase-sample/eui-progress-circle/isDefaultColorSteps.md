---
description: Disables the default color transitions with isDefaultColorSteps set to false.
id: isDefaultColorSteps
---

```html
<div class="eui-u-flex">
    <eui-progress-circle [value]="20" [isDefaultColorSteps]="false" />
    <eui-progress-circle [value]="50" [isDefaultColorSteps]="false" />
    <eui-progress-circle [value]="75" [isDefaultColorSteps]="false" />
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";

@Component({
    selector: 'isDefaultColorSteps',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsDefaultColorStepsComponent {

}
```

