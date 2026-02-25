import { Component, inject, ViewEncapsulation } from "@angular/core";

import { EuiGrowlService } from '@eui/core';
import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";

@Component({
    // eslint-disable-next-line
    selector: 'disabled',
    templateUrl: 'component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [...EUI_DASHBOARD_CARD, ...EUI_BUTTON, ...EUI_SLIDE_TOGGLE],
})
export class DisabledComponent {
    isChecked = false;
    growlService: EuiGrowlService = inject(EuiGrowlService);

    public onCheckboxClicked(event: boolean) {
        this.isChecked = event;
    }

    public onCardNewClicked(event: Event) {
        this.growlService.growlSuccess('Clicked on New submission card...');
    }

    public onCardNResumeClicked(event: Event) {
        this.growlService.growlWarning('Clicked on Resume draft card...');
    }
}
