import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';

@Component({
    // eslint-disable-next-line
    selector: 'selected',
    templateUrl: 'component.html',
    imports: [
        FormsModule,
        ...EUI_CARD,
        ...EUI_INPUT_CHECKBOX,
    ],
})
export class SelectedComponent {

    public isCardSelected = true;
    
}
