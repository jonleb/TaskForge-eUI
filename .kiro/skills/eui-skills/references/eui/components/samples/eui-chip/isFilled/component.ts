import { Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'isFilled',
    templateUrl: 'component.html',
    imports: [...EUI_CHIP, ...EUI_LABEL],
})
export class IsFilledComponent {
}
