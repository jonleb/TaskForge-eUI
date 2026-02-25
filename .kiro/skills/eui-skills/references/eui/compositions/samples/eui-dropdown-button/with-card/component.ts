import { Component } from '@angular/core';

import { EUI_CARD } from "@eui/components/eui-card";
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EuiTooltipDirective } from "@eui/components/directives";

@Component({
    // eslint-disable-next-line
    selector: 'with-card',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_ICON,
        EuiTooltipDirective,
    ],
})
export class WithCardComponent {

    listItems = [
        { id: '1', label: 'Secondary action 1' },
        { id: '2', label: 'Secondary action 2' },
        { id: '3', label: 'Secondary action 3' },
    ];

    public onListItemClicked(event: any) {
    }

}
