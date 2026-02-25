import { Component } from '@angular/core';
import { UxLinkLegacy } from '@eui/base';
import { EUI_LAYOUT } from '@eui/components/layout';

import { NotificationMetadata } from '@eui/components/layout';

@Component({
    // tslint:disable-next-line
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT],
})
export class EventHandlersComponent {
    unreadCount = 0;
    unreadSinceLastCheckCount = 1;
    items = [
        { id: 1, label: 'Notification 1', metadata: { date: new Date(), read: false, important: false }},
        { id: 1, label: 'Notification 2', metadata: { date: new Date(), read: true, important: true }},
        { id: 1, label: 'Notification 3', metadata: { date: new Date(), read: false, important: false }},
        { id: 1, label: 'Notification 4', metadata: { date: new Date(), read: true, important: true }},
        { id: 1, label: 'Notification 5', metadata: { date: new Date(), read: false, important: false }},
    ];

    onRefreshClick() {
        console.log('onRefreshClick');
    }

    onNotificationsClick() {
        console.log('onNotificationsClick');
    }

    onViewAllClick() {
        console.log('onViewAllClick');
    }

    onSettingsClick() {
        console.log('onSettingsClick');
    }

    onMarkAllAsReadClick() {
        console.log('onMarkAllAsReadClick');
    }

    onNoNotificationFoundClick() {
        console.log('onNoNotificationFoundClick');
    }

    onItemClick(e: UxLinkLegacy<NotificationMetadata>) {
        console.log('onItemClick', e);
    }

    onItemMarkAsReadClick(e: UxLinkLegacy<NotificationMetadata>) {
        console.log('onItemMarkAsReadClick', e);
    }

}
