import { Component } from '@angular/core';

import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_SECTION_HEADER } from '@eui/components/eui-section-header';

@Component({
    // eslint-disable-next-line
    selector: 'with-badge',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SECTION_HEADER,
        ...EUI_BADGE,
    ],
})
export class WithBadgeComponent {
}
