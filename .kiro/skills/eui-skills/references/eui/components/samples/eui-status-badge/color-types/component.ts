import { Component } from '@angular/core';

import { EUI_STATUS_BADGE } from '@eui/components/eui-status-badge';

@Component({
    // eslint-disable-next-line
    selector: 'color-types',
    templateUrl: 'component.html',
    imports: [
        ...EUI_STATUS_BADGE,
    ]
})
export class ColorTypesComponent {
}
