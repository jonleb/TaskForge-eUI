import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';

@Component({
    // eslint-disable-next-line
    selector: 'is-compact',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
    ],
})
export class IsCompactComponent {
}
