import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_BUTTON,
    ],
})
export class EventHandlersComponent {
    isAlertVisible = true;

    onCloseAlertOne(): void {
        alert('alert closed');
    }

    onCloseAlertTwo(isVisible: boolean): void {
        this.isAlertVisible = isVisible;
    }

    onVisible(): void {
        this.isAlertVisible = true;
    }
}
