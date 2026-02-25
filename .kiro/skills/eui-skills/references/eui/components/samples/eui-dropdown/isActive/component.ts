import { Component } from "@angular/core";

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'isActive',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
    ],
})
export class IsActiveComponent {

    public onClick(str: string): void {
        console.log(str);
    }

}
