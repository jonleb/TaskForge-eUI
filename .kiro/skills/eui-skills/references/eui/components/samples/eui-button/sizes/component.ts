import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_CARD } from '@eui/components/eui-card';

@Component({
    // eslint-disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_ICON, ...EUI_CARD]
})
export class SizesComponent {
}
