import { Component } from '@angular/core';

import { EUI_OVERLAY } from '@eui/components/eui-overlay';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_SHOWCASE } from '@eui/showcase';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'header-title',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SHOWCASE,
        ...EUI_OVERLAY,
        ...EUI_BUTTON,
        ...EUI_ICON,
    ],
})
export class HeaderTitleComponent {
    public isOverlayActive = false;

    constructor() {
    }

    public closeOverlay(): void {
        this.isOverlayActive = false;
    }

    public toggleOverlay(): void {
        this.isOverlayActive = !this.isOverlayActive;
    }

    public onHidePanel(): void {
        this.isOverlayActive = false;
    }

    updateActiveState(event: boolean) {
        this.isOverlayActive = event;
    }
}
