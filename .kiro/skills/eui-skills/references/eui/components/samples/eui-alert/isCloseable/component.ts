import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line
    selector: 'isCloseable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
    ],
})
export class IsCloseableComponent {
}
