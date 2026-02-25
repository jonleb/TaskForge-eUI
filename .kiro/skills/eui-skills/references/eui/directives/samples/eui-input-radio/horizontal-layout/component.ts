import { Component } from '@angular/core';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'horizontal-layout',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_RADIO,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_CARD,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_ICON,
        ...EUI_ALERT,
    ],
})
export class HorizontalLayoutComponent {
    public hasLabel = false;
    public radioOptions = [
        { value: '1', label: 'One', checked: false },
        { value: '2', label: 'Two', checked: true },
        { value: '3', label: 'Three', checked: false },
    ];

    public onChange(e: boolean) {
        this.hasLabel = e;
    }
}
