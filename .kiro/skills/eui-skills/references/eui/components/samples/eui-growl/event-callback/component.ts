import { Component } from "@angular/core";

import { EuiGrowlService } from '@eui/core';

import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_GROWL } from "@eui/components/eui-growl";

@Component({
    // eslint-disable-next-line
    selector: 'eventCallback',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_GROWL],
})
export class EventCallbackComponent {

    isGrowlSticky = false;
    isGrowlMultiple = false;
    growlLife = 3000;
    position = 'bottom-right';
    messageDetail = 'Message details';

    constructor(public growlService: EuiGrowlService) { }

    showGrowl(type: string, inputMessage?: string) {
        if (!type) {
            type = 'info';
        }
        this.growlService.growl({
            severity: type,
            summary: 'summary title',
            detail: inputMessage || 'details' },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
        );
    }

    showGrowlHTML(type: string) {
        this.showGrowl(type, '<strong>BOLD</strong><br/><a>link</a>');
    }

    clearGrowl() {
        this.growlService.clearGrowl();
    }

    showGrowlCallback(type: string, inputMessage?: string) {
        if (!type) {
            type = 'info';
        }
        this.growlService.growl({
            severity: type,
            summary: 'summary title',
            detail: inputMessage || this.messageDetail },
            this.isGrowlSticky,
            this.isGrowlMultiple,
            this.growlLife,
            this.position,
            () => {
                alert('This is a click callback');
            },
        );
    }
}
