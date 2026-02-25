import { Component } from '@angular/core';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'readonly',
    templateUrl: 'component.html',
    imports: [...EUI_LABEL, ...EUI_INPUT_RADIO, ...EUI_INPUT_GROUP, ...EUI_BUTTON],
})
export class ReadOnlyComponent {

    public isReadOnly = true;

    public onToggleReadOnly(): void {
        this.isReadOnly = !this.isReadOnly;
    }
}
