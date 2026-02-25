import { Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    // eslint-disable-next-line
    selector: 'with-chip',
    templateUrl: 'component.html',
    imports: [
        ...EUI_AVATAR,
        ...EUI_CHIP,
        ...EUI_ICON,
        ...EUI_LABEL,
    ],
})
export class WithChipComponent {
}
