import { Component } from '@angular/core';

import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';

@Component({
    // eslint-disable-next-line
    selector: 'no-welcome-label',
    templateUrl: 'component.html',
    imports: [...EUI_USER_PROFILE],
})
export class NoWelcomeLabelComponent {
}
