import { Component } from '@angular/core';
import { EUI_ICON } from '@eui/components/eui-icon';

import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';

@Component({
    // eslint-disable-next-line
    selector: 'with-icon',
    templateUrl: 'component.html',
    imports: [
        ...EUI_STATUS_BADGE,
        ...EUI_ICON,
    ],
})
export class WithIconComponent {
}
