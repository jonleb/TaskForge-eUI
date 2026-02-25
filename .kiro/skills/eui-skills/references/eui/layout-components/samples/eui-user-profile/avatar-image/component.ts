import { Component } from '@angular/core';
import { EUI_ALERT } from '@eui/components/eui-alert';

import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';

@Component({
    // eslint-disable-next-line
    selector: 'avatar-image',
    templateUrl: 'component.html',
    imports: [...EUI_USER_PROFILE, ...EUI_ICON, ...EUI_ALERT],
})
export class AvatarImageComponent {
}
