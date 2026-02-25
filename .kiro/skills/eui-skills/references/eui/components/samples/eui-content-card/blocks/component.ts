import { Component } from '@angular/core';

import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON_BUTTON } from '@eui/components/eui-icon-button';
import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';

@Component({
    // eslint-disable-next-line
    selector: 'blocks',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
        ...EUI_ICON_BUTTON,
        ...EUI_CHIP,
        ...EUI_STATUS_BADGE,
    ],
})
export class BlocksComponent {

}
