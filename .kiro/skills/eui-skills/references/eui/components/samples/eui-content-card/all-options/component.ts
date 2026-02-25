import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';

@Component({
    // eslint-disable-next-line
    selector: 'all-options',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
        ...EUI_BUTTON,
        ...EUI_ICON_BUTTON,
        ...EUI_ICON,
        ...EUI_CHIP,
        ...EUI_STATUS_BADGE,
    ],
})
export class AllOptionsComponent {

}
