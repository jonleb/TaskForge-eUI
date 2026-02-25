import { Component } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    // eslint-disable-next-line
    selector: 'append-prepend',
    templateUrl: './component.html',
    imports: [
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_INPUT_GROUP,
        ...EUI_AUTOCOMPLETE,
    ],
})
export class AppendPrependComponent {

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
}
