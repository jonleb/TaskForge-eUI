import { Component, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';

import { EUI_DIALOG, EuiDialogComponent } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SHOWCASE } from '@eui/showcase';

@Component({
    selector: 'change-title',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SHOWCASE,
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        AsyncPipe,
    ],  
})
export class ChangeTitleComponent {
    @ViewChild('dialog') dialog: EuiDialogComponent;

    dialogTitle$ = of('Title 1');

    public openDialog(): void {
        this.dialog.openDialog();
    }

    public changeDialogTitle(title: string) {
        this.dialogTitle$ = of(title);
    }
}
