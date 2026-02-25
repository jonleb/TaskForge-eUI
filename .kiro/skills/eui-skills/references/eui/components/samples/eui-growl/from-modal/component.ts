import { Component } from "@angular/core";

import { EuiGrowlService, EuiAppShellService } from '@eui/core';

import { EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_GROWL } from "@eui/components/eui-growl";

import { EventCallbackComponent } from '../event-callback/component';

@Component({
    // eslint-disable-next-line
    selector: 'fromModal',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_GROWL],
})
export class FromModalComponent {
    isGrowlSticky = false;
    isGrowlMultiple = false;
    growlLife = 3000;
    position = 'bottom-right';

    constructor(
        public asService: EuiAppShellService,
        private euiDialogService: EuiDialogService,
        public growlService: EuiGrowlService,
    ) {}

    public openDialog() {
        const dialog = this.euiDialogService.openDialog(
            new EuiDialogConfig({
                title: 'Dialog title',
                height: '50vh',
                width: '50vw',
                bodyComponent: {
                    component: EventCallbackComponent,
                },
                dismiss: () => {
                    console.log('onDismiss');
                },
                accept: () => {
                    console.log('onAccept');
                },
                close: () => {
                    console.log('onClose');
                },
            }),
        );
    }

    showGrowl(type: string, inputMessage?: string) {
        if (!type) {
            type = 'info';
        }
        this.growlService.growl(
            {
                severity: type,
                summary: 'summary title',
                detail: inputMessage || 'details',
            },
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
        this.growlService.growl(
            {
                severity: type,
                summary: 'summary title',
                detail: inputMessage || 'details',
            },
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
