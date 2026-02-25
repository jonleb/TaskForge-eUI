---
description: Prevents user navigation with isNavigationAllowed while showing various step states.
id: is-navigation-allowed
---

```html
<eui-wizard isNavigationAllowed="false">
    <eui-wizard-step label="STEP 1" subLabel="completed" [isCompleted]="true">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 1 title</div>
            Step 1 content...
        </div>
    </eui-wizard-step>
    <eui-wizard-step label="STEP 2" subLabel="active" [isActive]="true">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 2 title</div>
            Step 2 content...
        </div>
    </eui-wizard-step>
    <eui-wizard-step label="STEP 3" subLabel="default">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 3 title</div>
            Step 3 content...
        </div>
    </eui-wizard-step>
    <eui-wizard-step label="STEP 4" subLabel="invalid" [isInvalid]="true">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 4 title</div>
            Step 4 content...
        </div>
    </eui-wizard-step>
    <eui-wizard-step label="STEP 5" subLabel="warning" [isWarning]="true">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 5 title</div>
            Step 5 content...
        </div>
    </eui-wizard-step>
    <eui-wizard-step label="STEP 6" subLabel="disabled" [isDisabled]="true">
        <div class="eui-u-pv-m">
            <div class="eui-u-text-h5">STEP 6 title</div>
            Step 6 content...
        </div>
    </eui-wizard-step>
</eui-wizard>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_WIZARD } from "@eui/components/eui-wizard";

@Component({
    selector: 'is-navigation-allowed',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsNavigationAllowedComponent {

}
```

