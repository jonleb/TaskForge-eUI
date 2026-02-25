# eui-notifications

## Overview

<p class="eui-u-text-paragraph"><code class="eui-u-text-code">eui-notifications</code> displays user notifications in an overlay that slides in from the right side of the screen. The overlay is triggered by clicking on a notification icon located in the application header. It provides a convenient and non-intrusive way for users to view recent updates or alerts without navigating away from their current view.</p>

## API Contract

| Direction | Name | Type | Default |
| --- | --- | --- | --- |
| Input | count | number | null |
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
| Input | noNotificationFoundLabel | string | null |
| Input | nbUnreadCount | number | null |
| Input | dateFormat | string | 'dd/MM/YYYY' |
| Input | noNotificationFoundLink | boolean | false |
| Input | isShowMarkAsRead | boolean | true |
| Input | isShowViewAllAction | boolean | true |
| Input | isHidePanelOnViewAllAction | boolean | true |
| Input | customUnreadCount | boolean | false |
| Input | isShowMarkAllAsReadButton | boolean | true |
| Input | isShowSettingsButton | boolean | true |
| Input | isShowRefreshButton | boolean | true |
| Output | refreshClick | EventEmitter<void> | new EventEmitter<void>() |
| Output | notificationsClick | EventEmitter<void> | new EventEmitter<void>() |
| Output | viewAllClick | EventEmitter<void> | new EventEmitter<void>() |
| Output | settingsClick | EventEmitter<MouseEvent> | new EventEmitter<MouseEvent>() |
| Output | markAllAsReadClick | EventEmitter<MouseEvent> | new EventEmitter<MouseEvent>() |
| Output | noNotificationFoundClick | EventEmitter<void> | new EventEmitter<void>() |
| Output | itemClick | EventEmitter<UxLinkLegacy<NotificationMetadata>> | new EventEmitter<UxLinkLegacy<NotificationMetadata>>() |
| Output | itemMarkAsReadClick | EventEmitter<UxLinkLegacy<NotificationMetadata>> | new EventEmitter<UxLinkLegacy<NotificationMetadata>>() |

## Samples

### [Default](samples/eui-notifications/Default)

```html
<eui-toolbar>
    <eui-toolbar-items>
        <eui-toolbar-item>
            <eui-notifications [items]="items"/>
        </eui-toolbar-item>
    </eui-toolbar-items>
</eui-toolbar>
```

```typescript
import { Component } from '@angular/core';

import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT],
})
export class DefaultComponent {
    items = [
        { id: 1, label: 'Notification 1', metadata: { date: new Date(), read: false, important: false }},
        { id: 1, label: 'Notification 2', metadata: { date: new Date(), read: true, important: true }},
        { id: 1, label: 'Notification 3', metadata: { date: new Date(), read: false, important: false }},
        { id: 1, label: 'Notification 4', metadata: { date: new Date(), read: true, important: true }},
        { id: 1, label: 'Notification 5', metadata: { date: new Date(), read: false, important: false }},
    ];
}
```

### Other examples

- [Options: Labels](samples/eui-notifications/labels)
- [Main Features: Item mark as read link](samples/eui-notifications/item-mark-as-read)
- [Main Features: Mark all as read](samples/eui-notifications/mark-as-read)
- [Main Features: No notifications as link](samples/eui-notifications/no-notification-link)
- [Main Features: Refresh button](samples/eui-notifications/refresh-button)
- [Main Features: Settings button](samples/eui-notifications/settings-button)
- [Main Features: Unread count](samples/eui-notifications/unread-count)
- [Main Features: View all link](samples/eui-notifications/view-all)
- [Event Handlers: Events](samples/eui-notifications/event-handlers)

## Accessibility

<!-- LEFT blank showcase central link provided in showcase doc-page component -->
