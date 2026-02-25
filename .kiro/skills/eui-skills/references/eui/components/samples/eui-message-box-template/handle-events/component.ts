import { Component, ViewChild } from "@angular/core";

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'handle-events',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],     
})
export class HandleEventsComponent {

    @ViewChild('messageBox') messageBox: EuiMessageBoxComponent;

    public openMessageBox(): void {
        this.messageBox.openMessageBox();
    }

    public onClose(): void {
        console.log('close from output');
        this.messageBox.closeMessageBox();
    }

    public onOpen(): void {
        console.log('open from output');
    }

    public onAccept(): void {
        console.log('accept from output');
        this.messageBox.closeMessageBox();
    }

    public onDismiss(): void {
        console.log('dismiss from output');
        this.messageBox.closeMessageBox();
    }
}
