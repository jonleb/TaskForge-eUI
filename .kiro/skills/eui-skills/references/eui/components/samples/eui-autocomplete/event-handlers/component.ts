import { Component, OnInit } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem, EuiChipDragDrop } from '@eui/components/eui-autocomplete';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'event-handlers',
    templateUrl: './component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_AUTOCOMPLETE,
    ],
})
export class EventHandlersComponent implements OnInit {

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

    public autocompleteDataSelected: EuiAutoCompleteItem[] = [
        { id: 11, label: 'Strawberry' },
        { id: 7, label: 'Lemon' },
        { id: 2, label: 'Apple' },
        { id: 10, label: 'Orange' },
    ];


    ngOnInit(): void {
    }

    public onSelectionChanged(e: EuiAutoCompleteItem[]): void {
        console.log('selectionChange', e);
    }

    public onItemAdded(e: EuiAutoCompleteItem): void {
        console.log('itemAdd', e);
    }

    public onItemRemoved(e: EuiAutoCompleteItem): void {
        console.log('itemRemove', e);
    }

    public onPanelClose(): void {
        console.log('panelClose');
    }

    public onPanelOpen(): void {
        console.log('panelOpen');
    }

    public onClear(): void {
        console.log('clear');
    }

    public onInputFocus(): void {
        console.log('inputFocus');
    }

    public onInputBlur(): void {
        console.log('inputBlur');
    }

    public onInputChanged(e: string): void {
        console.log('inputChange', e);
    }

    public onChipDragStart(e: EuiChipDragDrop): void {
        console.log('chipDragStart', e);
    }

    public onChipDragRelease(e: EuiChipDragDrop): void {
        console.log('chipDragRelease', e);
    }

    public onChipDrop(e: EuiChipDragDrop): void {
        console.log('chipDrop', e);
    }
}
