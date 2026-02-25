import { Component } from '@angular/core';

import { EUI_BADGE } from '@eui/components/eui-badge';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'with-buttons',
    templateUrl: 'component.html',
    imports: [
        ...EUI_BADGE,
        ...EUI_LABEL,
        ...EUI_BUTTON,
    ]
})
export class WithButtonsComponent {

    public badgeLabel = '9';

}
