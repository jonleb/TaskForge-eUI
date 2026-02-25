import { Component, signal } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT, EuiIconDirective } from '@eui/components/eui-input-text';

@Component({
    // tslint:disable-next-line
    selector: 'clearable-loading',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
    ],
})
export class ClearableLoadingComponent {
    type = 'text';
    metadata = signal({
        icon: 'eye:filled',
        clickable: true
    })
    public inputValue = 'Input text sample';
    public isLoadingToggle: false | true = true;
    readonly: boolean;

    public toggleState() {
        this.isLoadingToggle = !this.isLoadingToggle;
    }

    change() {
        const icon = this.metadata().icon === 'eye:filled' ? 'eye-off:filled' : 'eye:filled';
        this.metadata.update( v => ({ ...v, icon }) );
    }
}
