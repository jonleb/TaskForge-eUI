import { Component, ViewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_SELECT } from "@eui/components/eui-select";
import { EUI_SHOWCASE } from "@eui/showcase";

@Component({
    // eslint-disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        ...EUI_LABEL,
        ...EUI_SELECT,
        ...EUI_SHOWCASE,
        ...EUI_DIALOG,
    ],
    styles: ['ul li {list-style: initial}'],
})
export class SizesComponent {

    @ViewChild('dialog1') dialog1: EuiDialogComponent;
    @ViewChild('dialog2') dialog2: EuiDialogComponent;
    @ViewChild('dialog3') dialog3: EuiDialogComponent;
    @ViewChild('dialog4') dialog4: EuiDialogComponent;
    @ViewChild('dialog5') dialog5: EuiDialogComponent;

    public openDialog1(): void {
        this.dialog1.openDialog();
    }

    public openDialog2(): void {
        this.dialog2.openDialog();
    }

    public openDialog3(): void {
        this.dialog3.openDialog();
    }

    public openDialog4(): void {
        this.dialog4.openDialog();
    }

    public openDialog5(): void {
        this.dialog5.openDialog();
    }
    public onDialogLogin(): void {
        this.dialog4.closeDialog();
    }

}
