import { Component, ViewChild } from "@angular/core";

import { EUI_SHOWCASE } from "@eui/showcase";
import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'scrolling',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_DIALOG, ...EUI_SHOWCASE],
})
export class ScrollingComponent {

    @ViewChild('dialog') dialog: EuiDialogComponent;

    public openDialog(): void {
        this.dialog.openDialog();
    }
}
