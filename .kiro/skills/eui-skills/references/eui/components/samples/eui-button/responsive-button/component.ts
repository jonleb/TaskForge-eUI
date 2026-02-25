import { Component } from '@angular/core';

import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'responsive-button',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_ICON,
    ]
})
export class ResponsiveButtonComponent {

}
