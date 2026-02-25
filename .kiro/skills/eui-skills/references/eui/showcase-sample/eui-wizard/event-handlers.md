---
description: Listens to the selectStep event to react when the user selects a step.
id: event-handlers
---

```html
<eui-wizard (selectStep)="onSelectStepDefault($event)">
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

import { EUI_WIZARD, EuiWizardStep } from "@eui/components/eui-wizard";

@Component({
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventHandlersComponent {

    onSelectStepDefault(event: EuiWizardStep) {
        console.log(event);
    }
    
}
```

