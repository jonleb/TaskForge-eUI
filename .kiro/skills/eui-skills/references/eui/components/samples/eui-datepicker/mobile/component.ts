import { Component } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'mobile',
    templateUrl: './component.html',
    imports: [...EUI_DATEPICKER, ...EUI_ALERT],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
})
export class MobileComponent {
}
