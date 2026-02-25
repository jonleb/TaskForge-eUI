import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // tslint:disable-next-line
    selector: 'no-notification-link',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT, ...EUI_ALERT],
})
export class NoNotificationLinkComponent {
    items = [];

    onNoNotificationFoundClick() {
        console.log('onNoNotificationFoundClick');
    }
}
