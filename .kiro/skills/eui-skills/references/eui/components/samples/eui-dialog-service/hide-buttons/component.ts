import { Component } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'hide-buttons',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, EUI_DIALOG],
})
export class HideButtonsComponent {

    constructor(private euiDialogService: EuiDialogService) {}

    public openNoDismissButtonWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasDismissButton: false,
        });

        this.euiDialogService.openDialog(config);
    }

    public openNoAcceptButtonWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasAcceptButton: false,
        });

        this.euiDialogService.openDialog(config);
    }

}
