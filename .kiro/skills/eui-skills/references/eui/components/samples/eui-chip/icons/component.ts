import { Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_ICON } from "@eui/components/eui-icon";

@Component({
    // eslint-disable-next-line
    selector: 'icons',
    templateUrl: 'component.html',
    imports: [...EUI_CHIP, ...EUI_ICON],
})
export class IconsComponent {
}
