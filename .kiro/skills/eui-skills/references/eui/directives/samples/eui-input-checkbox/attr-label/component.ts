/* eslint-disable max-len */
import { Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'attr-label',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_CHECKBOX,
        ...EUI_LABEL,
        ...EUI_ALERT,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        ...EUI_ICON,
    ],
})
export class AttrLabelComponent {
    public state = 'Label';
    public state2 = 'Other label';
    public longText = `Long label - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas tincidunt aliquet. Pellentesque condimentum nec nibh in blandit. In nec tristique magna. Aliquam faucibus rhoncus nibh, id cursus turpis tincidunt id. Aenean a lorem lacus. Morbi mollis nibh nec fermentum consectetur. Fusce ut feugiat nulla.`;
    public longText2 = `Quisque libero urna, commodo eget libero at, convallis accumsan eros. Vivamus feugiat tempus felis, sed tincidunt eros porta a. Curabitur eget rutrum ipsum, vitae sagittis eros.`;
}
