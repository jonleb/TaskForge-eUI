import { Component } from '@angular/core';

import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'badge-icons',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BADGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
    ]
})
export class BadgeIconsComponent {

    public badgeLabel = '9';
    public tooltipNA = 'This composition is not available and is not recommended ! &#13; The icon is too small and will be fully covered by the badge.';

}
