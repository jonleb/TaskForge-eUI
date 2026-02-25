import { Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';

@Component({
    // tslint:disable-next-line
    selector: 'loading-indicator',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_GROUP,
        ...EUI_BUTTON,
        ...EUI_INPUT_TEXT,
    ],
})
export class LoadingIndicatorComponent {

    public isLoading: false | true = true;

    public changeState() {
        this.isLoading = !this.isLoading;
    }

}
