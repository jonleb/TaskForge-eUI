import { Component } from '@angular/core';

import { EUI_LAYOUT } from "@eui/components/layout";
import { EUI_ALERT } from "@eui/components/eui-alert";
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';

@Component({
    // eslint-disable-next-line
    selector: 'with-header-user-profile',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LAYOUT,
        ...EUI_ALERT,
        ...EUI_ICON,
        ...EUI_USER_PROFILE,
    ],
    styleUrl: './component.scss'
})
export class WithHeaderUserProfileComponent {
}
