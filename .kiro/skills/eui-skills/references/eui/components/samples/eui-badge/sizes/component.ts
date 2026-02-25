import { Component } from '@angular/core';

import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BADGE,
        ...EUI_ICON,
    ]
})
export class SizesComponent {
}
