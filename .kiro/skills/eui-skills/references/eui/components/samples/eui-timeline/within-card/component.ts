import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_TIMELINE } from '@eui/components/eui-timeline';

@Component({
    // eslint-disable-next-line
    selector: 'within-card',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_TIMELINE,
    ],
})
export class WithinCardComponent {

}
