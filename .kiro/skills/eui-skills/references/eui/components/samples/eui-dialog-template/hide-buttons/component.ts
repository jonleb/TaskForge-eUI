import { Component, ViewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'hide-buttons',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, EUI_DIALOG],
})
export class HideButtonsComponent {

    @ViewChild('dialogNoDismissButton') dialogNoDismissButton: EuiDialogComponent;
    @ViewChild('dialogNoAcceptButton') dialogNoAcceptButton: EuiDialogComponent;

    public openDialogNoDismissButton(): void {
        this.dialogNoDismissButton.openDialog();
    }

    public openDialogNoAcceptButton(): void {
        this.dialogNoAcceptButton.openDialog();
    }

}
