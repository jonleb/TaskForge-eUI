import { Component } from '@angular/core';

import { EUI_ACCORDION } from '@eui/components/eui-accordion';

@Component({
    // eslint-disable-next-line
    selector: 'event',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ACCORDION,
    ],
})
export class EventComponent {
    accordionId: number;
    accordionExpanded: boolean;

    onToggleItem(id: number, isExpanded: boolean): void {
        this.accordionId = id;
        this.accordionExpanded = isExpanded;
    }
}
