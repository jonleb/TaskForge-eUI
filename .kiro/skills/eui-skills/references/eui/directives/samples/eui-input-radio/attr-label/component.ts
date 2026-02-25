/* eslint-disable max-len */
import { Component } from '@angular/core';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';
import { EUI_ALERT } from '@eui/components/eui-alert';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'attr-label',
    templateUrl: 'component.html',
    imports: [
        ...EUI_INPUT_RADIO,
        ...EUI_ALERT,
    ],
})
export class LabelComponent {
    public state: string[] = ['Label 1', 'Label 2'];
    public longText = `Long label - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas tincidunt aliquet. Pellentesque condimentum nec nibh in blandit. In nec tristique magna. Aliquam faucibus rhoncus nibh, id cursus turpis tincidunt id. Aenean a lorem lacus. Morbi mollis nibh nec fermentum consectetur.`;
    public longText2 = `Quisque libero urna, commodo eget libero at, convallis accumsan eros. Vivamus feugiat tempus felis, sed tincidunt eros porta a. Curabitur eget rutrum ipsum, vitae sagittis eros.`;
}
