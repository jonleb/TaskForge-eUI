import { Component } from '@angular/core';

import { EUI_LIST } from "@eui/components/eui-list";

@Component({
    // eslint-disable-next-line
    selector: 'action-list',
    templateUrl: 'component.html',
    imports: [...EUI_LIST]
})
export class ActionListComponent {
    onClick(event: Event) {
        console.log('event', event);
    }
}
