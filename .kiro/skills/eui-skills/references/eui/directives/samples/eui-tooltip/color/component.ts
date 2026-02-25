import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'color',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_BUTTON,
    ],
})
export class ColorComponent {
}

