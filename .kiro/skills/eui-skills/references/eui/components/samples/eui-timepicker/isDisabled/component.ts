import { Component } from '@angular/core';

import { EUI_TIMEPICKER } from "@eui/components/eui-timepicker";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'isDisabled',
    templateUrl: './component.html',
    imports: [...EUI_TIMEPICKER],
})
export class IsDisabledComponent {
}
