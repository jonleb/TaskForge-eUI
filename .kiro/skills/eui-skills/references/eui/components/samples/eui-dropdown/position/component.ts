import { Component } from "@angular/core";

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_ALERT } from "@eui/components/eui-alert";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'position',
    templateUrl: 'component.html',
    imports: [...EUI_DROPDOWN, ...EUI_ALERT, ...EUI_BUTTON],
})
export class PositionComponent {

    public onClick(str: string): void {
        console.log(str);
    }

}
