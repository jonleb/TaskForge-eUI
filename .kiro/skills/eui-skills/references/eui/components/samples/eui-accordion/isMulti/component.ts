import { Component } from '@angular/core';

import { EUI_ACCORDION } from '@eui/components/eui-accordion';

@Component({
    // eslint-disable-next-line
    selector: 'isMulti',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ACCORDION,
    ],
})
export class IsMultiComponent {
}
