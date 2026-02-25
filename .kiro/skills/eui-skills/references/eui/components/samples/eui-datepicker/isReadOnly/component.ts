import { Component } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'isReadOnly',
    templateUrl: './component.html',
    imports: [...EUI_DATEPICKER, ...EUI_INPUT_GROUP, ...EUI_LABEL],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
})
export class IsReadOnlyComponent {
    value = new Date('06/08/1987');
}
