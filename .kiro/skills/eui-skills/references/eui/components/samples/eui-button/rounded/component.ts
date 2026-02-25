import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'rounded',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_ICON]
})
export class RoundedComponent {
}
