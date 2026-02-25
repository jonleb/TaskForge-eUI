import { Component } from '@angular/core';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_LIST } from '@eui/components/eui-list';

import { ListItemsComponent } from '../../dummy-components/list-items.component';

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

    constructor(private euiDialogService: EuiDialogService) {}

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            height: 'auto',
            width: '15rem',
            hasNoBodyPadding: true,
            hasFooter: false,
            bodyComponent: {
                component: ListItemsComponent,
            },
        });

        this.euiDialogService.openDialog(config);
    }

    public onListItemClicked(id: number) {
        console.log('onItemClicked()', id);
        this.euiDialogService.closeDialog();
    }
}
