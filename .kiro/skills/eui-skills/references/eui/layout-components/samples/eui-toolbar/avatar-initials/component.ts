import { Component } from '@angular/core';

import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';
import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // eslint-disable-next-line
    selector: 'avatar-initials',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT, ...EUI_ICON, ...EUI_USER_PROFILE],
})
export class AvatarInitialsComponent {
}
