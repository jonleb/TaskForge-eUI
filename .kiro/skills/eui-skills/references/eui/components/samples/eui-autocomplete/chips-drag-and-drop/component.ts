import { Component } from '@angular/core';
import { DragDropModule, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem, EuiChipDragDrop } from '@eui/components/eui-autocomplete';
import { EUI_CHIP, EuiChip } from '@eui/components/eui-chip';
import { EUI_CHIP_LIST } from '@eui/components/eui-chip-list';

@Component({
    // eslint-disable-next-line
    selector: 'drag-and-drop',
    templateUrl: './component.html',
    imports: [
        ...EUI_CHIP_LIST,
        ...EUI_CHIP,
        ...EUI_AUTOCOMPLETE,
        DragDropModule,
    ],
})
export class DragAndDropComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple' },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry' },
        { id: 5, label: 'Coconut' },
        { id: 6, label: 'Kiwi' },
        { id: 7, label: 'Lemon' },
        { id: 8, label: 'Lime' },
        { id: 9, label: 'Pear' },
        { id: 10, label: 'Orange' },
        { id: 11, label: 'Strawberry' },
        { id: 12, label: 'Raspberry' },
    ];

    public autocompleteDataSelected1: EuiAutoCompleteItem[] = [
        { id: 11, label: 'Strawberry' },
        { id: 7, label: 'Lemon' },
        { id: 2, label: 'Apple' },
        { id: 10, label: 'Orange' },
    ];

    public autocompleteDataSelected2: EuiAutoCompleteItem[] = [
        { id: 11, label: 'Strawberry' },
        { id: 7, label: 'Lemon' },
        { id: 2, label: 'Apple' },
        { id: 10, label: 'Orange' },
    ];

    public autocompleteDataDropped: EuiAutoCompleteItem[] = [
        { id: 10, label: 'Orange' },
        { id: 8, label: 'Lime' },
    ];

    onChipDropped(e: EuiChipDragDrop): void {
        console.log(e);
    }

    onChipDragStarted(e: EuiChipDragDrop): void {
        console.log(e);
    }

    onChipDragReleased(e: EuiChipDragDrop): void {
        console.log(e);
    }

    onSelectionChange(e: EuiAutoCompleteItem[]): void {
        console.log('selectionChange', e);
        this.autocompleteDataSelected2 = e;
    }

    onChipDroppedChipList(e: CdkDragDrop<EuiChip[]>): void {
        console.log(e)
        if (e.container !== e.previousContainer) {
            transferArrayItem(
                e.previousContainer.data,
                e.container.data,
                e.previousIndex,
                e.currentIndex
            );

            this.autocompleteDataSelected2 = this.autocompleteDataSelected2.filter(a => a.id !== e.item.data.id);
        }
    }

    onChipRemoveChipList(e: EuiChip): void {
        this.autocompleteDataDropped = this.autocompleteDataDropped.filter((item) => item.id !== e.id);
    }

}
