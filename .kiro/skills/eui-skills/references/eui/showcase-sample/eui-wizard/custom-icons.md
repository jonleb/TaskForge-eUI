---
description: Replaces the step index with a custom SVG icon and shows multiple step states.
id: custom-icons
---

```html
<eui-wizard>
    <eui-wizard-step label="Creation" subLabel="completed" indexIconSvgName="circle-dashed:regular" [isCompleted]="true">
        STEP 1  - Creation content...
    </eui-wizard-step>
    <eui-wizard-step label="Family ties" subLabel="completed" indexIconSvgName="circle-dashed:regular" [isCompleted]="true">
        STEP 2  - Family ties content...
    </eui-wizard-step>
    <eui-wizard-step label="Property interests" indexIconSvgName="circle-dashed:regular" [isActive]="true">
        STEP 3  - Property interests content...
    </eui-wizard-step>
    <eui-wizard-step label="Civic rights" subLabel="warning" indexIconSvgName="circle-dashed:regular" isWarning>
        STEP 4  - Civic rights content...
    </eui-wizard-step>
    <eui-wizard-step label="Place of origin" subLabel="Invalid" indexIconSvgName="circle-dashed:regular" [isInvalid]="true">
        STEP 5  - Place of origin content...
    </eui-wizard-step>
    <eui-wizard-step label="Summary" subLabel="Not available yet" indexIconSvgName="circle-dashed:regular" [isDisabled]="true">
        STEP 6  - Summary content...
    </eui-wizard-step>
</eui-wizard>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_WIZARD } from "@eui/components/eui-wizard";
import { EUI_CARD } from "@eui/components/eui-card";

@Component({
    selector: 'custom-icons',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD, ...EUI_CARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomIconsComponent {
    
}
```

