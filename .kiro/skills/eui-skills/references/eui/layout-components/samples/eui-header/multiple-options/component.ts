import { Component } from '@angular/core';

import { EUI_LAYOUT } from "@eui/components/layout";
import { EUI_USER_PROFILE } from '@eui/components/eui-user-profile';
import { EUI_LANGUAGE_SELECTOR } from '@eui/components/eui-language-selector';
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line
    selector: 'multiple-options',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LAYOUT,
        ...EUI_USER_PROFILE,
        ...EUI_LANGUAGE_SELECTOR,
        ...EUI_ICON,
    ],
    styleUrl: './component.scss'
})
export class MultipleOptionsComponent {
}
