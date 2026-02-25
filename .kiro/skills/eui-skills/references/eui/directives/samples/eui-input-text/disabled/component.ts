import { Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // tslint:disable-next-line
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_ICON,
    ],
})
export class DisabledComponent {
}
