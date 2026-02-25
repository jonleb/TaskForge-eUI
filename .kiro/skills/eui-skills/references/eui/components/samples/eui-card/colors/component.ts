import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'colors',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_BUTTON,
    ],
})
export class ColorsComponent {

}
