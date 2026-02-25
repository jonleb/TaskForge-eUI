import { Component } from '@angular/core';

import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_TEXT } from '@eui/components/eui-input-text';
import { EuiMaxLengthDirective } from '@eui/components/directives';
import { EUI_TEXTAREA } from '@eui/components/eui-textarea';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // tslint:disable-next-line
    selector: "Default",
    templateUrl: "component.html",
    imports: [
        ...EUI_LABEL,
        ...EUI_INPUT_TEXT,
        ...EUI_TEXTAREA,
        ...EUI_BUTTON,
        EuiMaxLengthDirective,
    ],
})
export class DefaultComponent {
    public isChecked: false | true = true;
    public show = false;
    public textMax = false;

    public toggleCheck(event: Event) {
        this.isChecked = !this.isChecked;
    }

    textMaxLengthReached(reached: boolean) {
        this.textMax = reached;
    }
}
