import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    // tslint:disable-next-line
    selector: 'readonly',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_TEXTAREA, ...EUI_INPUT_GROUP],
})
export class ReadOnlyComponent {

    public state: false | true = true;

    public changeState() {
        this.state = !this.state;
    }
}
