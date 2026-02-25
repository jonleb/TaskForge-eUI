import { Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_SLIDE_TOGGLE } from '@eui/components/eui-slide-toggle';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_CHECKBOX,
        ...EUI_CARD,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_INPUT_GROUP,
        ...EUI_ALERT,
    ],
})
export class DefaultComponent {

    public hasLabel = false;
    public checkboxes = [
        { value: 'one', label: 'One', checked: false },
        { value: 'two', label: 'Two', checked: true },
        { value: 'three', label: 'Three', checked: false },
    ];

    public onChange(e: boolean) {
        this.hasLabel = e;
    }
}
