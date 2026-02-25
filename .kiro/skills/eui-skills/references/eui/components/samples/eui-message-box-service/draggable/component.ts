import { Component } from "@angular/core";

import { EuiMessageBoxConfig, EUI_MESSAGE_BOX, EuiMessageBoxService } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'draggable',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON],    
})
export class DraggableComponent {

    constructor(private euiMessageBoxService: EuiMessageBoxService) {}

    public openWithService(): void {
        const config = new EuiMessageBoxConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            isDraggable: true,
        });

        this.euiMessageBoxService.openMessageBox(config);
    }

}
