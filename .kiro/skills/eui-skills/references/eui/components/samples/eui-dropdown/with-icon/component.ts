import { Component } from "@angular/core";

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_ALERT } from "@eui/components/eui-alert";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'with-icon',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_ALERT,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_BUTTON,
    ],
})
export class WithIconComponent {

    public onClick(str: string): void {
        console.log(str);
    }

}
