import { Component } from '@angular/core';

import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';

@Component({
    // eslint-disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [
        ...EUI_STATUS_BADGE,
    ]
})
export class SizesComponent {
}
