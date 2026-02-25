import { Component } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_CHIP_GROUP } from '@eui/components/eui-chip-group';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'with-icon-tooltip',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP,
        ...EUI_ICON,
        EuiTooltipDirective,
        ...EUI_CHIP_GROUP,
    ],
})
export class WithIconTooltipComponent {
}
