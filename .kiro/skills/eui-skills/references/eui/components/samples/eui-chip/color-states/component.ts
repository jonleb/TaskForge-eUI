import { Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'color-states',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP,
        ...EUI_LABEL,
    ],
})
export class ColorStatesComponent {
}
