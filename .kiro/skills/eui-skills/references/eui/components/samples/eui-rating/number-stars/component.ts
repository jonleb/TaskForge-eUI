import { Component } from '@angular/core';

import { EUI_RATING } from '@eui/components/eui-rating';

@Component({
    // eslint-disable-next-line
    selector: 'number-stars',
    templateUrl: 'component.html',
    imports: [
        ...EUI_RATING,
    ],
})
export class NumberStarsComponent {

}
