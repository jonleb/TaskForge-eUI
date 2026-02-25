import { Component } from '@angular/core';

import { EUI_INPUT_GROUP } from '@eui/components/eui-input-group';
import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';
import { EUI_CARD } from '@eui/components/eui-card';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'responsive-layout',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_INPUT_CHECKBOX,
        ...EUI_INPUT_GROUP,
        ...EUI_ALERT,
        ...EUI_CARD,
    ],
})
export class ResponsiveLayoutComponent {
}
