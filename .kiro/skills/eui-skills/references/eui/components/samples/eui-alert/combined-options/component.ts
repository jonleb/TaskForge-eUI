import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'combined-options',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_BUTTON,
    ],
})
export class CombinedOptionsComponent {
}
