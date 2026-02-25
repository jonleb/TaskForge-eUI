import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // eslint-disable-next-line
    selector: 'selector',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT, ...EUI_ALERT],
})
export class SelectorComponent {
    onClick() {
        console.log('selector clicked');
    }
}
