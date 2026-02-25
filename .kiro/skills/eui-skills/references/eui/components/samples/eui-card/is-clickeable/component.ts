import { Component } from '@angular/core';
import { EUI_ALERT } from '@eui/components/eui-alert';

import { EUI_CARD, EuiCardHeaderComponent } from '@eui/components/eui-card';

@Component({
    // eslint-disable-next-line
    selector: 'is-clickeable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_CARD,
    ],
})
export class IsClickeableComponent {
    onHeaderClick(event: EuiCardHeaderComponent) {
        console.log(event);
    }
}
