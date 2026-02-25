import { Component, ViewChild } from '@angular/core';

import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_LIST } from '@eui/components/eui-list';

@Component({
    selector: 'with-eui-list',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_LIST,
    ], 
})
export class WithEuiListComponent {
    @ViewChild('dialog') dialog: EuiDialogComponent;

    constructor(private euiDialogService: EuiDialogService) {}

    public openDialog(): void {
        this.dialog.openDialog();
    }

    public onListItemClicked(id: number) {
        console.log('onItemClicked()', id);
        this.euiDialogService.closeDialog();
    }
}
