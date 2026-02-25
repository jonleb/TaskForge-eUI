import { Component, OnInit } from '@angular/core';

import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // tslint:disable-next-line
    selector: 'unread-count',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT],
})
export class UnreadCountComponent implements OnInit {
    unreadCount = 0;
    items = [
        { id: 1, label: 'Notification 1', metadata: { date: new Date(), read: false, important: false }},
        { id: 1, label: 'Notification 2', metadata: { date: new Date(), read: true, important: true }},
        { id: 1, label: 'Notification 3', metadata: { date: new Date(), read: false, important: false }},
        { id: 1, label: 'Notification 4', metadata: { date: new Date(), read: true, important: true }},
        { id: 1, label: 'Notification 5', metadata: { date: new Date(), read: false, important: false }},
    ];

    ngOnInit(): void {
        this.unreadCount = this.items.filter(item => !item.metadata.read).length;
    }
}
