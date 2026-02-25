import { Component } from '@angular/core';

import { EUI_OVERLAY } from '@eui/components/eui-overlay';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'width',
    templateUrl: 'component.html',
    imports: [
        ...EUI_OVERLAY,
        ...EUI_BUTTON,
    ],
})
export class WidthComponent {
    public isOverlayActive = false;
    public isOverlayFixedWidthActive = false;
    public overlayWidth = '33';
    public overlayFixedWidth = '33';

    constructor() {
    }

    public toggleOverlay(): void {
        this.isOverlayActive = !this.isOverlayActive;
        this.isOverlayFixedWidthActive = false;
    }

    public toggleFixedWidthOverlay(): void {
        this.isOverlayActive = false;
        this.isOverlayFixedWidthActive = !this.isOverlayFixedWidthActive;
    }

    public closeOverlay(): void {
        this.isOverlayActive = false;
    }

    updateActiveState(event: boolean) {
        this.isOverlayFixedWidthActive = event;
        this.isOverlayActive= event;
    }

    public closeFixedWidthOverlay(): void {
        this.isOverlayFixedWidthActive = false;
    }

    public setOverlayWidth(width: string): void {
        this.overlayWidth = width;
        this.isOverlayFixedWidthActive = false;
        this.isOverlayActive = true;
    }

    public setOverlayFixedWidth(width: string): void {
        this.overlayFixedWidth = width;
        this.isOverlayFixedWidthActive = true;
        this.isOverlayActive = false;
    }
}
