import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_AVATAR } from '@eui/components/eui-avatar';

@Component({
    // eslint-disable-next-line
    selector: 'card-container',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_AVATAR,
    ],
})
export class CardContainerComponent {
}
