import { Component } from '@angular/core';

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_CHIP_GROUP } from '@eui/components/eui-chip-group';

@Component({
    // tslint:disable-next-line
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP,
        ...EUI_LABEL,
        ...EUI_CHIP_GROUP,
    ],
})
export class ColorsComponent {
}
