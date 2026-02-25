import { Component } from '@angular/core';

import { EUI_OVERLAY } from '@eui/components/eui-overlay';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'position',
    templateUrl: 'component.html',
    imports: [
        ...EUI_OVERLAY,
        ...EUI_BUTTON,
    ],
})
export class PositionComponent {
    public isOverlayActive = false;
    public overlayPosition = 'right';

    constructor() {
    }

    public toggleOverlay(e: Event) {
        this.isOverlayActive = !this.isOverlayActive;
    }

    updateActiveState(event: boolean) {
        this.isOverlayActive = event;
    }

    public closeOverlay(e: Event) {
        this.isOverlayActive = false;
    }

    public setOverlayPosition(position: string, e: Event) {
        this.overlayPosition = position;
        this.isOverlayActive = true;
    }
}
