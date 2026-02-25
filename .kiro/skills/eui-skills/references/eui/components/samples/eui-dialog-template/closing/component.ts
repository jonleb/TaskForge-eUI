import { Component, ViewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'closing',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON],
})
export class ClosingComponent {

    @ViewChild('dialog1') dialog1: EuiDialogComponent;
    @ViewChild('dialog2') dialog2: EuiDialogComponent;
    @ViewChild('dialog3') dialog3: EuiDialogComponent;

    public openDialog1(): void {
        this.dialog1.openDialog();
    }

    public openDialog2(): void {
        this.dialog2.openDialog();
    }

    public openDialog3(): void {
        this.dialog3.openDialog();
    }
}
