import { Component } from "@angular/core";

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_LIST } from "@eui/components/eui-list";

@Component({
    // eslint-disable-next-line
    selector: 'isDropDownRightAligned',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_LIST,
    ],
})
export class IsDropDownRightAlignedComponent {

    public onClick(str: string): void {
        console.log(str);
    }

}
