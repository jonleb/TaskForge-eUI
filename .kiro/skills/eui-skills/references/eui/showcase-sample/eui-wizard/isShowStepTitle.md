---
description: Shows step titles under the indicators using isShowStepTitle.
id: isShowStepTitle
---

```html
<eui-wizard [isShowStepTitle]="true">
    <eui-wizard-step label="STEP 1" [isCompleted]="true">
        step 1 content
    </eui-wizard-step>
    <eui-wizard-step label="STEP 2" [isActive]="true">
        step 2 content
    </eui-wizard-step>
    <eui-wizard-step label="STEP 3">
        step 3 content
    </eui-wizard-step>
</eui-wizard>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_WIZARD } from "@eui/components/eui-wizard";

@Component({
    selector: 'isShowStepTitle',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsShowStepTitleComponent {
}
```

