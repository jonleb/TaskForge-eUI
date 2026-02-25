import { Component } from "@angular/core";

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'closing',
    templateUrl: 'component.html',
    imports: [...EUI_DROPDOWN, ...EUI_BUTTON, ...EUI_LABEL],
})
export class ClosingComponent {
}
