import { Component } from '@angular/core';

import { EuiGrowlService } from '@eui/core';
import { EUI_CARD } from '@eui/components/eui-card';


@Component({
    // eslint-disable-next-line
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
    ],
})
export class EventHandlersComponent {
    public collapsed = false;

    constructor(public growlService: EuiGrowlService) {}

    public onCollapsed(event: boolean): void {
        // console.log(event);
        this.collapsed = event;
        this.growlService.growl({
            severity: 'info',
            summary: 'Card header state',
            detail: 'collapsed : ' + this.collapsed,
        });
    }
}
