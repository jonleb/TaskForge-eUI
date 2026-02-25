import { Component } from '@angular/core';

import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';
import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // eslint-disable-next-line
    selector: 'notifications',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT, ...EUI_USER_PROFILE],
})
export class NotificationsComponent {
    notificationItemsMetadata = [
        {
            label: 'Notification label', subLabel: 'this is the description of the notification - subLabel - and this can be very huge too',
            metadata: {
                date: new Date(), read: false, important: true,
            },
        },
        {
            label: 'Notification label', subLabel: 'this is the description of the notification - subLabel - and this can be very huge too',
            metadata: {
                date: new Date(), read: true,
            },
        },
        {
            label: 'Notification label', subLabel: 'this is the description of the notification - subLabel - and this can be very huge too',
            metadata: {
                date: new Date(), read: true, important: true,
            },
        },
        {
            label: 'Notification label',
            subLabel: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            metadata: {
                date: new Date(),
            },
        },
    ];
}
