import { Component } from "@angular/core";

import { EuiMessageBoxConfig, EUI_MESSAGE_BOX, EuiMessageBoxService } from "@eui/components/eui-message-box";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'color',
    templateUrl: 'component.html',
    imports: [...EUI_MESSAGE_BOX, ...EUI_BUTTON], 
})
export class ColorComponent {

    constructor(private euiMessageBoxService: EuiMessageBoxService) {}

    public openWithService(variant: ('primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger')): void {
        const config = new EuiMessageBoxConfig({
            title: 'Message Box title',
            content: 'Message Box content',
            variant,
        });

        this.euiMessageBoxService.openMessageBox(config);
    }
}
