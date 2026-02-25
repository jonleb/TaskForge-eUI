import { Component, ViewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_SHOWCASE } from "@eui/showcase";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'in-dialog',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SHOWCASE,
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_LABEL,
    ],
    providers: [
        EuiDialogService,
    ],    
})
export class InDialogComponent {

    @ViewChild('dialog') dialog: EuiDialogComponent;

    public openDialog(): void {
        this.dialog.openDialog();
    }

    public onClick(str: string): void {
        console.log(str);
    }

}
