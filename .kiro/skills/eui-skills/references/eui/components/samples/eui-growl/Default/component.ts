import { Component } from "@angular/core";

import { EuiGrowlService } from '@eui/core';

import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
    ],
})
export class DefaultComponent {

    isGrowlSticky = false;
    isGrowlMultiple = false;
    growlLife = 3000;
    position = 'bottom-right';
    summaryTitle = 'Summary title';

    constructor(
        private euiGrowlService: EuiGrowlService,
    ) { }

    public showGrowl(type: string, summary?: string, inputMessage: string = 'Message details') {
        if (!type) {
            type = 'info';
        }
        this.euiGrowlService.growl({
            severity: type,
            summary: summary || this.summaryTitle,
            detail: inputMessage },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
        );
    }
}
