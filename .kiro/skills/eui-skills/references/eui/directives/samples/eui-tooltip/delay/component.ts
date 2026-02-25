import { Component, ViewChild } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'delay',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
        ...EUI_BADGE,
    ],
})
export class DelayComponent {

    public showDelay = 1000;
    public hideDelay = 1000 * 5;

    @ViewChild('euiTooltip') euiTooltip: any;

    public onTooltipShow(): void {
        this.euiTooltip.show();
    }

    public onTooltipHide(): void {
        this.euiTooltip.hide();
    }
}
