import { Component, ViewChild } from "@angular/core";

import { EuiMessageBoxComponent, EUI_MESSAGE_BOX } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'draggable',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],     
})
export class DraggableComponent {

    @ViewChild('messageBox') messageBox: EuiMessageBoxComponent;

    public openMessageBox(): void {
        this.messageBox.openMessageBox();
    }
}
