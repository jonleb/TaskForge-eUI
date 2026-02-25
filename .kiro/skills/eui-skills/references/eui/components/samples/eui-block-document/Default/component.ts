import { Component, inject } from '@angular/core';

import { EuiAppShellService } from '@eui/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    templateUrl: 'component.html',
    selector: 'Default',
    imports: [
        ...EUI_BUTTON,
        ...EUI_ALERT,
    ]
})
export class DefaultComponent {
    private asService: EuiAppShellService = inject(EuiAppShellService);

    blockDocument() {
        this.asService.isBlockDocumentActive = true;
        setTimeout(() => {
            this.asService.isBlockDocumentActive = false;
        }, 2000);
    }
}
