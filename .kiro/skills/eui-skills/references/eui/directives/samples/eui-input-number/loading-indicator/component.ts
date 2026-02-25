import { Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';

@Component({
    // tslint:disable-next-line
    selector: 'loading-indicator',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER, ...EUI_BUTTON, ...EUI_LABEL, ...EUI_INPUT_GROUP],
})
export class LoadingIndicatorComponent {

    public isLoading: false | true = true;

    public changeState() {
        this.isLoading = !this.isLoading;
    }

}
