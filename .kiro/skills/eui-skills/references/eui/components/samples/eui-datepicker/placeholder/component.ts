import { Component } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'placeholder',
    templateUrl: './component.html',
    imports: [...EUI_DATEPICKER],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
})
export class PlaceholderComponent {

}
