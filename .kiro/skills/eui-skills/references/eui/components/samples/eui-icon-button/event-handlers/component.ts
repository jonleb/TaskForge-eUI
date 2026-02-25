import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";

@Component({
    // eslint-disable-next-line
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
        ...EUI_ALERT,
    ],
})
export class EventHandlersComponent {

    onClick(event: Event): void {
        console.log('button clicked', event);
    }

}
