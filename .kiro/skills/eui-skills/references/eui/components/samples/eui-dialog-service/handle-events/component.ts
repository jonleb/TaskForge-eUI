import { Component } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'handle-events',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, EUI_DIALOG],
})
export class HandleEventsComponent {

    constructor(private euiDialogService: EuiDialogService) {}

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasClosedOnClickOutside: true,
            isHandleCloseOnDismiss: true,
            isHandleCloseOnClose: true,
            isHandleCloseOnAccept: true,
            isHandleCloseOnClickOutside: true,
            isHandleCloseOnEscape: true,
            open: () => {
                console.log('open from user config');
            },
            clickOutside: (instances) => {
                console.log('clickOutside from user config');
                this.euiDialogService.closeDialog();
            },
            close: (instances) => {
                console.log('close from user config');
                this.euiDialogService.closeDialog();
            },
            escape: (instances) => {
                console.log('escape from user config');
                this.euiDialogService.closeDialog();
            },
            dismiss: (instances) => {
                console.log('dismiss from user config');
                this.euiDialogService.closeDialog();
            },
            accept: (instances) => {
                console.log('accept from user config');
                this.euiDialogService.closeDialog();
            },
        });

        this.euiDialogService.openDialog(config);
    }

}
