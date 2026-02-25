import { Component } from "@angular/core";

import { EUI_WIZARD, EuiWizardStep } from "@eui/components/eui-wizard";
import { EUI_CARD } from "@eui/components/eui-card";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'custom-icons',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD, ...EUI_CARD],
})
export class CustomIconsComponent {
    stepSelected: any;
    isNavigationAllowed = true;
    currentStepIndex = 1;
    stepsCount = 6;

    onSelectStep(event: EuiWizardStep) {
        this.stepSelected = event;
    }

    onToggleNavigation(event: any) {
        this.isNavigationAllowed = !this.isNavigationAllowed;
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
