import { Component } from '@angular/core';

import { EUI_TIMEPICKER } from "@eui/components/eui-timepicker";

@Component({
    templateUrl: './component.html',
    selector: 'with-seconds',
    imports: [...EUI_TIMEPICKER]
})
export class WithSecondsComponent {
}
