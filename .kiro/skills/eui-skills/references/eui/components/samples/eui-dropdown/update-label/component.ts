import { Component } from "@angular/core";

import { EUI_ALERT } from "@eui/components/eui-alert";
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'update-label',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_DROPDOWN,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_BUTTON,
    ],
})
export class UpdateLabelComponent {

    public onClick(str: string): void {
        console.log(str);
    }

}
