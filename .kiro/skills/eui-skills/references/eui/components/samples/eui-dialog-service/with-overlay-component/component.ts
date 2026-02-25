import { Component, ViewChild } from '@angular/core';

import { EUI_DIALOG, EuiDialogComponent, EuiDialogService } from '@eui/components/eui-dialog';
import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_POPOVER, EuiPopoverComponent } from '@eui/components/eui-popover';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_SHOWCASE } from '@eui/showcase';

@Component({
    selector: 'with-overlay-component',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SHOWCASE,
        ...EUI_BUTTON,
        ...EUI_DIALOG,
        ...EUI_POPOVER,
        ...EUI_ICON,
        ...EUI_AUTOCOMPLETE,
    ],  
})
export class WithOverlayComponentComponent {
    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple' },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry' },
        { id: 5, label: 'Coconut' },
        { id: 6, label: 'Kiwi' },
        { id: 7, label: 'Lemon' },
        { id: 8, label: 'Lime' },
        { id: 9, label: 'Lime' },
        { id: 10, label: 'Orange' },
        { id: 11, label: 'Strawberry' },
        { id: 12, label: 'Raspberry' },
    ];

    @ViewChild('dialog') dialog: EuiDialogComponent;
    @ViewChild('popover') popover: EuiPopoverComponent;

    public openDialog(): void {
        this.dialog.openDialog();
    }

    public openPopover(e: any) {
        this.popover.openPopover(e.target);
    }
}
