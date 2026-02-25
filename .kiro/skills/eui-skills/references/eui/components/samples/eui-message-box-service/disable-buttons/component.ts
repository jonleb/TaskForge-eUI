import { Component } from "@angular/core";

import { EuiMessageBoxConfig, EUI_MESSAGE_BOX, EuiMessageBoxService } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'disable-buttons',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],    
})
export class DisableButtonsComponent {

    constructor(private euiMessageBoxService: EuiMessageBoxService) {}

    public openNoDismissButtonWithService(): void {
        const config = new EuiMessageBoxConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasDismissButton: false,
        });

        this.euiMessageBoxService.openMessageBox(config);
    }

    public openNoAcceptButtonWithService(): void {
        const config = new EuiMessageBoxConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            hasAcceptButton: false,
        });

        this.euiMessageBoxService.openMessageBox(config);
    }

}
