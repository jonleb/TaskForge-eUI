import { Component } from '@angular/core';

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_SPLIT_BUTTON } from '@eui/components/eui-split-button';

@Component({
    // tslint:disable-next-line
    selector: 'outline',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_SPLIT_BUTTON,
    ],
})
export class OutlineComponent {

    listItems = [
        { id: '1', label: 'Secondary action 1' },
        { id: '2', label: 'Secondary action 2' },
        { id: '3', label: 'Secondary action 3' },
        { id: '4', label: 'Secondary action 4', disabled: true },
    ];

    public onButtonClicked(event: Event) {
        console.log('Button clicked')
    }

    public onListItemClicked(event: any) {
        console.log('List item clicked')
    }

}
