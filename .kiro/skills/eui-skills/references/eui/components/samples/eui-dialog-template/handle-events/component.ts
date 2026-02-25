import { Component, ViewChild } from "@angular/core";

import { EUI_DIALOG, EuiDialogComponent } from "@eui/components/eui-dialog";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'handle-events',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, EUI_DIALOG],
})
export class HandleEventsComponent {

    @ViewChild('dialog') dialog: EuiDialogComponent;

    public openDialog(): void {
        this.dialog.openDialog();
    }

    public onClickOutside(): void {
        console.log('clickOutside from output');
        this.dialog.closeDialog();
    }

    public onClose(): void {
        console.log('close from output');
        this.dialog.closeDialog();
    }

    public onEscape(): void {
        console.log('escape from output');
        this.dialog.closeDialog();
    }

    public onOpen(): void {
        console.log('open from output');
    }

    public onAccept(): void {
        console.log('accept from output');
        this.dialog.closeDialog();
    }

    public onDismiss(): void {
        console.log('dismiss from output');
        this.dialog.closeDialog();
    }
}
