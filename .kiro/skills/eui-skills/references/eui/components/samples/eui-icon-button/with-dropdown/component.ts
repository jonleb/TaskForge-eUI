import { Component } from '@angular/core';

import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";

@Component({
    // eslint-disable-next-line
    selector: 'with-dropdown',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
        ...EUI_DROPDOWN,
    ],
})
export class WithDropdownComponent {

}
