import { Component, ViewChild } from "@angular/core";

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'disable-buttons',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],   
})
export class DisableButtonsComponent {

    @ViewChild('messageBoxNoDismissButton') messageBoxNoDismissButton: EuiMessageBoxComponent;
    @ViewChild('messageBoxNoAcceptButton') messageBoxNoAcceptButton: EuiMessageBoxComponent;

    public openMessageBoxNoDismissButton(): void {
        this.messageBoxNoDismissButton.openMessageBox();
    }

    public openMessageBoxNoAcceptButton(): void {
        this.messageBoxNoAcceptButton.openMessageBox();
    }

}
