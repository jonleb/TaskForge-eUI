import { Component } from "@angular/core";

import { EUI_WIZARD, EuiWizardStep } from "@eui/components/eui-wizard";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'remoteNavigation',
    templateUrl: 'component.html',
    imports: [...EUI_WIZARD, ...EUI_BUTTON],
})
export class RemoteNavigationComponent {
    stepSelected: any;
    isNavigationAllowed = true;
    currentStepIndex = 1;
    stepsCount = 3;

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
