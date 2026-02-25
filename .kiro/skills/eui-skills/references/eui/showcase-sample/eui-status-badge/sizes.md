---
description: Shows size variants using euiSizeS and euiSizeM to change badge dimensions.
id: sizes
---

```html
<div class="eui-u-flex eui-u-flex-gap-l">
    <div>
        <div>euiSizeS</div>
        <eui-status-badge euiSizeS>
            Status label
        </eui-status-badge>
    </div>
    <div>
        <div>euiSizeM</div>
        <eui-status-badge euiSizeM>
            Status label
        </eui-status-badge>
    </div>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';

@Component({
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [
        ...EUI_STATUS_BADGE,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesComponent {
}
```

