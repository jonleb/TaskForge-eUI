import { Component } from '@angular/core';

import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_BUTTON_GROUP } from '@eui/components/eui-button-group';

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON_GROUP, ...EUI_BUTTON]
})
export class DefaultComponent {
    public buttonItems = [
        { label: 'Button item 1', id: '25' },
        { label: 'Button item 2', id: '26' },
        { label: 'Button item 3', id:'27' },
        { label: 'Button item 4', id: '28', active: true },
    ];
}
