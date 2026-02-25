import { Component } from "@angular/core";

import { EUI_CHIP_BUTTON } from "@eui/components/eui-chip-button";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'chip-button',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP_BUTTON,
        ...EUI_LABEL,
    ],
})
export class ChipButtonComponent {
}
