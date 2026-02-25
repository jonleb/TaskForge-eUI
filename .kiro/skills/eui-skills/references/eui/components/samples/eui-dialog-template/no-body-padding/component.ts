import { Component, ViewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'no-body-padding',
    templateUrl: 'component.html',
    imports: [...EUI_DIALOG, ...EUI_BUTTON], 
})
export class NoBodyPaddingComponent {
    public dialogTitle = 'Dialog window title';
    public dialogContent = 'Dialog content with no padding option enabled...';
    @ViewChild('dialog') dialog: EuiDialogComponent;

    public openDialog(): void {
        this.dialog.openDialog();
    }
}
