import { Component, ViewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ALERT } from "@eui/components/eui-alert";

@Component({
    // eslint-disable-next-line
    selector: 'classlist',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON, ...EUI_ALERT],
})
export class ClasslistComponent {

    @ViewChild('dialog') dialog: EuiDialogComponent;

    constructor(private euiDialogService: EuiDialogService) {}

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            classList: 'eui-u-width-20',
            open: () => {
                console.log('open from user config');
            },
            clickOutside: (instances) => {
                console.log('instances', instances);
                console.log('clickOutside from user config');
            },
            close: (instances) => {
                console.log('instances', instances);
                console.log('close from user config');
            },
            dismiss: (instances) => {
                console.log('instances', instances);
                console.log('dismiss from user config');
            },
            accept: (instances) => {
                console.log('instances', instances);
                console.log('accept from user config');
            },
        });

        this.euiDialogService.openDialog(config);
    }
}
