import { Component } from '@angular/core';

import { EUI_AVATAR } from '@eui/components/eui-avatar';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line
    selector: 'with-badge',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_AVATAR,
        ...EUI_BADGE,
        ...EUI_ICON,
    ],
})
export class WithBadgeComponent {

    tooltipNA = 'This composition is not available and is not recommended ! &#13; The icon is too small and will be fully covered by the badge.';

    sizes = [
        {
            size: 'xs', badgeSizes: [
                { s: 'dot', v: true }, { s: 's', v: true }, { s: 'm', v: true },
            ],
        },
        {
            size: 's', badgeSizes: [
                { s: 'dot', v: true }, { s: 's', v: true }, { s: 'm', v: true },
            ],
        },
        {
            size: 'm', badgeSizes: [
                { s: 'dot', v: true }, { s: 's', v: true }, { s: 'm', v: true },
            ],
        },
        {
            size: 'l', badgeSizes: [
                { s: 'dot', v: true }, { s: 's', v: true }, { s: 'm', v: true },
            ],
        },
        {
            size: 'xl', badgeSizes: [
                { s: 'dot', v: false }, { s: 's', v: false }, { s: 'm', v: true },
            ],
        },
        {
            size: '2xl', badgeSizes: [
                { s: 'dot', v: false }, { s: 's', v: false }, { s: 'm', v: false },
            ],
        },
    ];
}
