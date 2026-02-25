import { Component } from '@angular/core';

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_CHIP_GROUP } from '@eui/components/eui-chip-group';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP,
        ...EUI_CHIP_GROUP,
    ],
})
export class DefaultComponent {
}
