import { Component, ViewChild } from '@angular/core';

import {
    EuiMessageBoxComponent,
    EUI_MESSAGE_BOX,
    EuiMessageBoxService,
} from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'button-label',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],  
})
export class ButtonLabelComponent {

    @ViewChild('messageBox') messageBox: EuiMessageBoxComponent;

    constructor(private euiMessageBoxService: EuiMessageBoxService) {}

    public openMessageBox(): void {
        this.messageBox.openMessageBox();
    }

    public closeMessageBox(): void {
        this.euiMessageBoxService.closeMessageBox();
    }

    public onClose(): void {
        console.log('close from output');
    }

    public onOpen(): void {
        console.log('open from output');
    }

    public onAccept(): void {
        console.log('accept from output');
    }

    public onDismiss(): void {
        console.log('dismiss from output');
    }
}
