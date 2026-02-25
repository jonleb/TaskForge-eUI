import { Component } from "@angular/core";

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_ALERT } from "@eui/components/eui-alert";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";

@Component({
    // eslint-disable-next-line
    selector: 'children-position',
    templateUrl: 'component.html',
    imports: [...EUI_DROPDOWN, ...EUI_ALERT, ...EUI_BUTTON, ...EUI_ICON],
})
export class ChildrenPositionComponent {

    public onClickItem(str: string): void {
        console.log(str);
    }

}
