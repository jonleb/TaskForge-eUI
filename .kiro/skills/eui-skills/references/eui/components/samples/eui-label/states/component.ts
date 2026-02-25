import { Component } from '@angular/core';

import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'states',
    templateUrl: 'component.html',
    imports: [...EUI_LABEL, ...EUI_ALERT],
})
export class StatesComponent {
}
