import { Component, ViewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'no-footer',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, EUI_DIALOG],
})
export class NoFooterComponent {

    @ViewChild('dialog') dialog: EuiDialogComponent;

    public openDialog(): void {
        this.dialog.openDialog();
    }

}
