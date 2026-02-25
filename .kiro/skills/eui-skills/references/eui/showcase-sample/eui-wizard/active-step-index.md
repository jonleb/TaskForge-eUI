---
description: Programmatically sets the active step with activeStepIndex (1-based).
id: active-step-index
---

```html
<eui-wizard [activeStepIndex]="2">
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
    selector: 'active-step-index',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveStepIndexComponent {

}
```

