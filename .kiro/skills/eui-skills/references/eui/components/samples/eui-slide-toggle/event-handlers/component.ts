import { Component } from '@angular/core';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";

@Component({
    // eslint-disable-next-line
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [...EUI_SLIDE_TOGGLE],
})
export class EventHandlersComponent {

    public value = false;

    public onChange(e: boolean) {
        this.value = e;
    }
}
