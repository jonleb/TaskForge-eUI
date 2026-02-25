import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BUTTON_GROUP } from '@eui/components/eui-button-group';

@Component({
    // eslint-disable-next-line
    selector: 'radioButtons',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON_GROUP, ...EUI_BUTTON]
})
export class RadioButtonsComponent {
}
