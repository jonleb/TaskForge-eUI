---
description: Basic two-step wizard with default step indicators and inline content.
id: Default
---

```html
<eui-wizard>
    <eui-wizard-step label="STEP 1">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 1 title</div>
            Step 1 content...
        </div>
    </eui-wizard-step>
    <eui-wizard-step label="STEP 2">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 2 title</div>
            Step 2 content...
        </div>
    </eui-wizard-step>
</eui-wizard>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_WIZARD } from "@eui/components/eui-wizard";

@Component({
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

}
```

