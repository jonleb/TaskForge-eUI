import { Component, signal } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_INPUT_TEXT, EuiIconDirective } from '@eui/components/eui-input-text';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';

@Component({
    // tslint:disable-next-line
    selector: 'password-field',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        ...EUI_INPUT_TEXT,
        EuiIconDirective,
        ...EUI_SLIDE_TOGGLE,
    ],
})
export class PasswordFieldComponent {
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

    iconClick() {
        this.change();
        this.type = this.type === 'text' ? 'password' : 'text';
    }

    changeClickable() {
        const clickable = !this.metadata().clickable;
        this.metadata.update( v => ({ ...v, clickable }) );
    }
}
