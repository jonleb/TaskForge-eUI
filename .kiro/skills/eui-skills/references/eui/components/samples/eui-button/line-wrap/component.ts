import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'line-wrap',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON]
})
export class LineWrapComponent {
}
