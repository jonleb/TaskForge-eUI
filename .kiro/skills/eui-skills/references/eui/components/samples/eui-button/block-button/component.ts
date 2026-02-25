import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CARD } from '@eui/components/eui-card';

@Component({
    // eslint-disable-next-line
    selector: 'block-button',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_CARD]
})
export class BlockButtonComponent {
}
