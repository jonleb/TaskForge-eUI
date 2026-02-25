import { Component } from '@angular/core';

import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'with-button',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_BUTTON,
    ],
    styleUrls: ['../../module.component.scss'],
})
export class WithButtonComponent {

}
