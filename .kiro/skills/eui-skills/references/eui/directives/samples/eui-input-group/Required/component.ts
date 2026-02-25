import { Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // tslint:disable-next-line
    selector: 'Required',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        ...EUI_INPUT_NUMBER,
    ],
})
export class RequiredComponent {

    public isRequired = true;

    public onToggleRequired() {
        this.isRequired = !this.isRequired;
    }
}
