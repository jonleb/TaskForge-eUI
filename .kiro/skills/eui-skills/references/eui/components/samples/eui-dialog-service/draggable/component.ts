import { Component } from "@angular/core";

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'draggable',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
})
export class DraggableComponent {

    constructor(private euiDialogService: EuiDialogService) {}

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            isDraggable: true,
        });

        this.euiDialogService.openDialog(config);
    }

}
