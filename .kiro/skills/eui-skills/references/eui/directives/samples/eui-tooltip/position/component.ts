import { Component } from '@angular/core';

import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'position',
    templateUrl: 'component.html',
    imports: [
        EuiTooltipDirective,
        ...EUI_ICON,
        ...EUI_BUTTON,
    ],
})
export class PositionComponent {
}
