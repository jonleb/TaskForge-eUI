import { Component } from '@angular/core';

import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'icon-set-custom',
    templateUrl: 'component.html',
    imports: [...EUI_ICON, ...EUI_ALERT],
    styleUrls: ['../../module.component.scss'],
})
export class CustomIconsSetsComponent {
}
