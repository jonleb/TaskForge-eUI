import { Component } from '@angular/core';

import { EUI_TIMEPICKER } from '@eui/components/eui-timepicker';

@Component({
    // eslint-disable-next-line
    selector: 'steps',
    templateUrl: './component.html',
    imports: [...EUI_TIMEPICKER]
})
export class StepsComponent {
}
