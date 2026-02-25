import { Component } from '@angular/core';

import { EUI_BUTTON, EuiButtonComponent } from '@eui/components/eui-button';
import { EUI_BUTTON_GROUP } from '@eui/components/eui-button-group';

@Component({
    // eslint-disable-next-line
    selector: 'eventClicked',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON_GROUP, ...EUI_BUTTON]
})
export class EventClickedComponent {

    clickedButton: EuiButtonComponent;

    onButtonClick(event: EuiButtonComponent) {
        this.clickedButton = event;
    }

}
