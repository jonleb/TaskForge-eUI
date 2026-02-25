import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'change-prop-dynamically',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_BUTTON,
    ],
})
export class ChangePropDynamicallyComponent {

    isCollapsible = false;
    isCollapsed = false;
    isUrgent = false;

    toggleCollapsible(): void {
        this.isCollapsible = !this.isCollapsible;
    }

    toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    toggleUrgent(): void {
        this.isUrgent = !this.isUrgent;
    }
}
