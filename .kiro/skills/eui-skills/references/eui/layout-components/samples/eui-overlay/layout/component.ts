import { Component } from '@angular/core';

import { EUI_OVERLAY } from '@eui/components/eui-overlay';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_SHOWCASE } from '@eui/showcase';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'layout',
    templateUrl: 'component.html',
    imports: [
        ...EUI_OVERLAY,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_SHOWCASE,
    ],
})
export class LayoutComponent {
    public isOverlayActive = false;

    constructor() {
    }

    public closeOverlay(e: Event) {
        this.isOverlayActive = false;
    }

    public toggleOverlay(e: Event) {
        this.isOverlayActive = !this.isOverlayActive;
    }

    updateActiveState(event: boolean) {
        this.isOverlayActive = event;
    }
}
