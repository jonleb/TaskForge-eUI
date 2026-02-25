import { Component } from '@angular/core';

import { EUI_OVERLAY } from '@eui/components/eui-overlay';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_OVERLAY,
        ...EUI_BUTTON,
    ],
})
export class DefaultComponent {
    public isOverlayActive = false;
    public isOverlayActiveCustom = false;

    public toggleOverlay(e: Event) {
        this.isOverlayActive = !this.isOverlayActive;
    }
    public toggleOverlayCustom(e: Event) {
        this.isOverlayActiveCustom = !this.isOverlayActiveCustom;
    }

    updateActiveState(event: boolean) {
        this.isOverlayActive = event;
    }
    updateActiveStateCustom(event: boolean) {
        this.isOverlayActiveCustom = event;
    }
}
