import { Component } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

import { ChangeLangServiceComponent } from '../../dummy-components/change-lang-service-component';

@Component({
    // eslint-disable-next-line
    selector: 'button-label',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
})
export class ButtonLabelComponent {

    constructor(private euiDialogService: EuiDialogService) {}

    public openWithService(): void {
        const config = new EuiDialogConfig({
            acceptLabel: 'eui.YES',
            dismissLabel: 'eui.NO',
            title: 'eui.languageSelector.modalTitle',
            bodyComponent: {
                component: ChangeLangServiceComponent,
            },
        });

        this.euiDialogService.openDialog(config);
    }

}
