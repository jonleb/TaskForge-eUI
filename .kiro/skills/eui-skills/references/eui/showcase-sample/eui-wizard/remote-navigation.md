---
description: Controls the wizard remotely by updating activeStepIndex with external Previous/Next buttons.
id: remote-navigation
---

```html
<eui-wizard (selectStep)="onSelectStepRemoteNav($event)" [activeStepIndex]="currentStepIndex" [isNavigationAllowed]="isNavigationAllowed">
    <eui-wizard-step label="STEP 1" isCompleted>
        step 1 content
    </eui-wizard-step>
    <eui-wizard-step label="STEP 2" isWarning>
        step 2 content
    </eui-wizard-step>
    <eui-wizard-step label="STEP 3" isWarning>
        step 3 content
    </eui-wizard-step>
</eui-wizard>

<div class="eui-u-text-center">
    <button euiButton euiSizeS euiPrimary [disabled]="currentStepIndex === 1 || !isNavigationAllowed" (click)="onNavigation(-1)">Previous</button>
    <button euiButton euiSizeS euiPrimary class="eui-u-ml-m" [disabled]="currentStepIndex === stepsCount || !isNavigationAllowed" (click)="onNavigation(+1)">Next</button>
</div>
```

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";

import { EUI_WIZARD, EuiWizardStep } from "@eui/components/eui-wizard";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'remoteNavigation',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD, ...EUI_BUTTON],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteNavigationComponent {
    stepSelected: any;
    isNavigationAllowed = true;
    currentStepIndex = 1;
    stepsCount = 3;

    onSelectStep(event: EuiWizardStep) {
        this.stepSelected = event;
    }

    onSelectStepRemoteNav(event: any) {
        this.currentStepIndex = event.index;
    }

    onNavigation(increment: number) {
        const newIndex: number = this.currentStepIndex + increment;
        if (newIndex >= 1 && newIndex <= this.stepsCount ) {
            this.currentStepIndex = newIndex;
        }
    }
}
```

