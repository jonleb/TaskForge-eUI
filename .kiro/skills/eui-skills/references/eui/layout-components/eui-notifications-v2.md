# eui-notifications-v2

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | count | number | null |
| Input | unreadCount | number | null |
| Input | unreadSinceLastCheckCount | number | null |
| Input | items | unknown[] | [] |
| Input | unreadLabel | string | null |
| Input | totalLabel | string | null |
| Input | markAsReadLabel | string | null |
| Input | markAsUnReadLabel | string | null |
| Input | markAllAsReadLabel | string | null |
| Input | settingsLabel | string | null |
| Input | refreshLabel | string | null |
| Input | viewAllNotificationsLabel | string | null |
| Input | headerTitleLabel | string | null |
| Input | headerHideLabel | string | null |
| Input | headerUnreadSinceLastCheckCountLabel | string | null |
| Input | headerUnreadCountLabel | string | null |
| Input | noNotificationFoundLabel | string | null |
| Input | dateFormat | string | 'dd/MM/yyyy' |
| Input | noNotificationFoundLink | boolean | false |
| Input | isShowMarkAsRead | boolean | true |
| Input | isShowViewAllAction | boolean | true |
| Input | isHidePanelOnViewAllAction | boolean | true |
| Input | isShowMarkAllAsReadButton | boolean | true |
| Input | isShowSettingsButton | boolean | true |
| Input | isShowRefreshButton | boolean | true |
| Output | refreshClick | EventEmitter<Event> | new EventEmitter<Event>() |
| Output | notificationsClick | EventEmitter<KeyboardEvent \| MouseEvent> | new EventEmitter<KeyboardEvent \| MouseEvent>() |
| Output | viewAllClick | EventEmitter<Event> | new EventEmitter<Event>() |
| Output | markAllAsReadClick | EventEmitter<MouseEvent> | new EventEmitter<MouseEvent>() |
| Output | noNotificationFoundClick | EventEmitter<void> | new EventEmitter<void>() |
| Output | itemClick | EventEmitter<UxLinkLegacy> | new EventEmitter<UxLinkLegacy>() |
| Output | itemMarkAsReadClick | EventEmitter<UxLinkLegacy> | new EventEmitter<UxLinkLegacy>() |

## Samples

### [Default](samples/eui-notifications-v2/Default)

```html
<p style="background-color: grey;">
    <eui-notifications-v2
        [unreadSinceLastCheckCount]="unreadSinceLastCheckCount"
        [items]="items"
        [unreadCount]="unreadCount"
        [isShowSettingsButton]="false"
        [dateFormat]="'dd/MM/YYYY HH:mm:ss'"
        headerTitleLabel="My notifications"
        headerUnreadCountLabel="Unread notifications">
    </eui-notifications-v2>
</p>
```

```typescript
import { Component, OnInit } from '@angular/core';

import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT],
})
export class DefaultComponent implements OnInit {
    unreadCount = 0;
    unreadSinceLastCheckCount = 1;
    items = [
        { id: 1, label: 'Notification 1', metadata: { date: new Date(), read: false, important: false }},
        { id: 1, label: 'Notification 2', metadata: { date: new Date(), read: true, important: true }},
        { id: 1, label: 'Notification 3', metadata: { date: new Date(), read: false, important: false }},
        { id: 1, label: 'Notification 4', metadata: { date: new Date(), read: true, important: true }},
        { id: 1, label: 'Notification 5', metadata: { date: new Date(), read: false, important: false }},
    ]

    ngOnInit(): void {
        this.unreadCount = this.items.filter(item => !item.metadata.read).length;
    }
}
```

## Accessibility

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
