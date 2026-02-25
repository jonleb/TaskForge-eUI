import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';

@Component({
    // eslint-disable-next-line
    selector: 'is-reverse',
    templateUrl: 'component.html',
    imports: [...EUI_USER_PROFILE, ...EUI_ALERT],
})
export class IsReverseComponent {
}
