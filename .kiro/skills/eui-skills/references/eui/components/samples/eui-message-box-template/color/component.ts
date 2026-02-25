import { Component, ViewChild } from "@angular/core";

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'color',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],     
})
export class ColorComponent {

    @ViewChild('messageBoxPrimary') messageBoxPrimary: EuiMessageBoxComponent;
    @ViewChild('messageBoxSecondary') messageBoxSecondary: EuiMessageBoxComponent;
    @ViewChild('messageBoxInfo') messageBoxInfo: EuiMessageBoxComponent;
    @ViewChild('messageBoxSuccess') messageBoxSuccess: EuiMessageBoxComponent;
    @ViewChild('messageBoxWarning') messageBoxWarning: EuiMessageBoxComponent;
    @ViewChild('messageBoxDanger') messageBoxDanger: EuiMessageBoxComponent;

    public openMessageBoxPrimary(): void {
        this.messageBoxPrimary.openMessageBox();
    }

    public openMessageBoxSecondary(): void {
        this.messageBoxSecondary.openMessageBox();
    }

    public openMessageBoxInfo(): void {
        this.messageBoxInfo.openMessageBox();
    }

    public openMessageBoxSuccess(): void {
        this.messageBoxSuccess.openMessageBox();
    }

    public openMessageBoxWarning(): void {
        this.messageBoxWarning.openMessageBox();
    }

    public openMessageBoxDanger(): void {
        this.messageBoxDanger.openMessageBox();
    }

}
