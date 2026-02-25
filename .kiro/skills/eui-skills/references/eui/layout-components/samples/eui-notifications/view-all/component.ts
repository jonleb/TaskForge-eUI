import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // tslint:disable-next-line
    selector: 'view-all',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT, ...EUI_ALERT],
})
export class ViewAllComponent {
    items = [
        { id: 1, label: 'Notification 1', metadata: { date: new Date(), read: false, important: false }},
        { id: 1, label: 'Notification 2', metadata: { date: new Date(), read: true, important: true }},
        { id: 1, label: 'Notification 3', metadata: { date: new Date(), read: false, important: false }},
        { id: 1, label: 'Notification 4', metadata: { date: new Date(), read: true, important: true }},
        { id: 1, label: 'Notification 5', metadata: { date: new Date(), read: false, important: false }},
    ];
}
