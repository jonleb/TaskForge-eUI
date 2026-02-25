import { Component, ViewChild } from '@angular/core';

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'alignment',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
})
export class AlignmentComponent {
    @ViewChild('dialogTop') dialogTop: EuiDialogComponent;

    public openTop(): void {
        this.dialogTop.openDialog();
    }
}
