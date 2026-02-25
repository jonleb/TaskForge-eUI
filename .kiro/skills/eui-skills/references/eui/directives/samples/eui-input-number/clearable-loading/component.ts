import { Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    // tslint:disable-next-line
    selector: 'clearable-loading',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER, ...EUI_BUTTON, ...EUI_INPUT_GROUP],
})
export class ClearableLoadingComponent {

    public inputValue = 9999.99;
    public isLoadingToggle: false | true = true;

    public toggleState() {
        this.isLoadingToggle = !this.isLoadingToggle;
    }
}
