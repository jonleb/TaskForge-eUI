import { Component } from '@angular/core';

import { EUI_SELECT } from '@eui/components/eui-select';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ALERT} from '@eui/components/eui-alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    selector: 'custom-width',
    templateUrl: 'component.html',
    imports: [FormsModule, ReactiveFormsModule, ...EUI_SELECT, ...EUI_LABEL, ...EUI_ALERT, ...EUI_INPUT_GROUP],
})
export class CustomWidthComponent {


    
}
