import { Component } from '@angular/core';

import { EUI_DIALOG, EuiDialogConfig, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';

import { RadioListComponent } from '../../dummy-components/radio-list.component';

@Component({
    selector: 'with-selectable-options',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_INPUT_RADIO,
    ],
})
export class WithSelectableOptionsComponent {

    constructor(private euiDialogService: EuiDialogService) {}

    public openWithService(): void {
        const config = new EuiDialogConfig({
            title: 'Dialog title',
            content: 'Dialog content',
            height: 'auto',
            width: '15rem',
            bodyComponent: {
                component: RadioListComponent,
            },
        });

        this.euiDialogService.openDialog(config);
    }

}
