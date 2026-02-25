---
description: Shows size variants via euiSizeS, euiSizeM, and euiSizeL inputs.
id: sizes
---

```html
<div class="eui-u-flex">
    <eui-progress-circle [value]="25" euiSizeS />
    <eui-progress-circle [value]="25" euiSizeM />
    <eui-progress-circle [value]="25" euiSizeL />
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";

@Component({
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesComponent {

}
```

