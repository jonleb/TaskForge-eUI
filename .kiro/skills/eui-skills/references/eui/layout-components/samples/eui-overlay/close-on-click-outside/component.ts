import { Component } from '@angular/core';

import { EUI_OVERLAY } from '@eui/components/eui-overlay';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'close-on-click-outside',
    templateUrl: 'component.html',
    imports: [
        ...EUI_OVERLAY,
        ...EUI_BUTTON,
        ...EUI_ALERT,
        ...EUI_ICON,
    ],
})
export class CloseOnClickOutsideComponent {
    public isOverlay = false;

    constructor() {
    }

    public toggleOverlay(e: Event) {
        this.isOverlay = !this.isOverlay;
        e.stopPropagation();
    }

    updateActiveState(event: boolean) {
        this.isOverlay = event;
    }

    public closeOverlay(e: Event) {
        this.isOverlay = false;
    }
}
