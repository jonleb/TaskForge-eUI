import { Component } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'free-chips',
    templateUrl: './component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_AUTOCOMPLETE,
    ],
})
export class FreeChipsComponent {

    public autocompleteData: EuiAutoCompleteItem[] = [
        { id: 1, label: 'Lemon' },
        { id: 2, label: 'Lime' },
        { id: 3, label: 'Apple' },
        { id: 4, label: 'Orange' },
        { id: 5, label: 'Strawberry' },
    ];

    onSelectionChanged1(e: any) {
        console.log(e);
    }

    onSelectionChanged2(e: any) {
        console.log(e);
    }

    onSelectionChanged3(e: any) {
        console.log(e);
    }

}
