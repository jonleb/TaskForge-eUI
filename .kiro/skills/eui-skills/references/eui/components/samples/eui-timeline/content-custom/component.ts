import { Component } from "@angular/core";

import { EUI_TIMELINE } from "@eui/components/eui-timeline";
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_ICON } from "@eui/components/eui-icon";

@Component({
    // eslint-disable-next-line
    selector: 'contentCustom',
    templateUrl: 'component.html',
    imports: [...EUI_TIMELINE, ...EUI_CHIP, ...EUI_ICON],
})
export class ContentCustomComponent {
}
