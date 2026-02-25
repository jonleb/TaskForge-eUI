import { Component } from '@angular/core';

import { EUI_AUTOCOMPLETE, EuiAutoCompleteItem } from '@eui/components/eui-autocomplete';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'is-force-selection',
    templateUrl: './component.html',
    imports: [
        ...EUI_AUTOCOMPLETE,
        ...EUI_ALERT,
    ],
})
export class IsForceSelectionComponent {

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

}
