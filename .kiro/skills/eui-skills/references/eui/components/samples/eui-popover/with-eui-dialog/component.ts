import { Component, ViewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from "@eui/components/eui-dialog";
import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_SHOWCASE } from "@eui/showcase";

@Component({
    selector: 'with-eui-dialog',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_POPOVER,
        ...EUI_DIALOG,
        ...EUI_SHOWCASE,
    ],
    providers: [
        EuiDialogService,
    ],    
})
export class WithEuiDialogComponent {

    @ViewChild('popover') popover: EuiPopoverComponent;
    @ViewChild('dialog') dialog: EuiDialogComponent;

    public openPopover(e: any) {
        this.popover.openPopover(e.target);
    }

    public openDialog(): void {
        this.dialog.openDialog();
    }

}
