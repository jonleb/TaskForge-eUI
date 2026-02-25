import { Component } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
        ...EUI_SLIDE_TOGGLE,
    ],
})
export class DisabledComponent {

    isDisabled = true;

    public onChange(): void {
        this.isDisabled = !this.isDisabled;
    }
}
