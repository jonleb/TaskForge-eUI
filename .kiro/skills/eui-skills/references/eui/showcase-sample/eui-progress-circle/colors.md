---
description: Uses colorType to force the ring state to info, success, warning, or danger regardless of value.
id: colors
---

```html
<div class="eui-u-flex eui-u-flex-gap-m">
    <div class="eui-u-inline-flex eui-u-flex-column">
        <eui-progress-circle [value]="12" colorType="info" />
        info
    </div>
    <div class="eui-u-inline-flex eui-u-flex-column">
        <eui-progress-circle [value]="44" colorType="success" />
        success
    </div>
    <div class="eui-u-inline-flex eui-u-flex-column">
        <eui-progress-circle [value]="52" colorType="warning" />
        warning
    </div>
    <div class="eui-u-inline-flex eui-u-flex-column">
        <eui-progress-circle [value]="85" colorType="danger" />
        danger
    </div>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EUI_PROGRESS_CIRCLE } from "@eui/components/eui-progress-circle";

@Component({
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_CIRCLE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {

}
```

