import { Component } from '@angular/core';

import { EUI_OVERLAY } from '@eui/components/eui-overlay';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiResizableDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'resizable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_OVERLAY,
        ...EUI_BUTTON,
        EuiResizableDirective,
    ],
})
export class ResizableComponent {
    public isOverlayActive = false;
    
    public toggleOverlay(e: Event) {
        this.isOverlayActive = !this.isOverlayActive;
    }
    
    updateActiveState(event: boolean) {
        this.isOverlayActive = event;
    }
}
