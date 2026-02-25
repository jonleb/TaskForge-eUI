import { Component } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';

@Component({
    // eslint-disable-next-line
    selector: 'chips-not-removable',
    templateUrl: './component.html',
    imports: [...EUI_AUTOCOMPLETE],
})
export class ChipsNotRemovableComponent {

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

    public autocompleteData2: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Ananas' },
        { id: 2, label: 'Apple', isRemovable: false },
        { id: 3, label: 'Banana' },
        { id: 4, label: 'Blackberry' },
        { id: 5, label: 'Coconut' },
        { id: 6, label: 'Kiwi' },
        { id: 7, label: 'Lemon', isRemovable: false },
        { id: 8, label: 'Lime' },
        { id: 9, label: 'Lime' },
        { id: 10, label: 'Orange' },
        { id: 11, label: 'Strawberry' },
        { id: 12, label: 'Raspberry', isRemovable: false },
    ];

    public autocompleteDataSelected2: EuiAutoCompleteItem[] = [
        { id: 11, label: 'Strawberry' },
        { id: 7, label: 'Lemon', isRemovable: false },
        { id: 2, label: 'Apple', isRemovable: false },
        { id: 10, label: 'Orange' },
    ];

}
