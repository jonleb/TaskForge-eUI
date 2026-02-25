import { Component } from '@angular/core';

import { EUI_CONTENT_CARD } from '@eui/components/eui-content-card';

@Component({
    // eslint-disable-next-line
    selector: 'collapsible',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CONTENT_CARD,
    ],
})
export class CollapsibleComponent {
    isCardCollapsed = false;

    onCardCollapse(isCollapsed: boolean): void {
        this.isCardCollapsed = isCollapsed;
    }

}
