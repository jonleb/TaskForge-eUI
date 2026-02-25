import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'misc-options',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_BUTTON,
    ],
})
export class MiscOptionsComponent {
    variant = 'info';
    closeableState = false;
    mutedState = false;
    variantColor = 'info';

    onUpdateVariant(): void {
        if (this.variant === 'info') {
            this.variant = 'danger';
        } else {
            this.variant = 'info';
        }
    }

    onUpdateCloseable(): void {
        this.closeableState = !this.closeableState;
    }

    onUpdateMuted(): void {
        this.mutedState = !this.mutedState;
    }

    onUpdateColor(color: string): void {
        this.variantColor = color;
    }
}
