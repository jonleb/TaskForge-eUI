import { Component } from '@angular/core';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'alignment',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
})
export class AlignmentComponent {

    constructor(private euiDialogService: EuiDialogService) {}

    public openTopWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog (aligned to top)',
            content: 'Dialog content',
            verticalPosition: 'top',
        });

        this.euiDialogService.openDialog(config);
    }

}
