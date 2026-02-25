import { Component } from "@angular/core";
import { JsonPipe } from "@angular/common";

import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_WIZARD_V2, EuiWizardStep } from "@eui/components/eui-wizard-v2";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD_V2, ...EUI_BUTTON, JsonPipe],
})
export class DefaultComponent {
    stepSelected: any;
    isNavigationAllowed = true;
    currentStepIndex = 1;
    stepsCount = 3;

    onSelectStepDefault(event: EuiWizardStep) {
        this.stepSelected = event;
    }
    
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
