import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_LIST } from '@eui/components/eui-list';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON_TOGGLE } from '@eui/components/eui-icon-toggle';

@Component({
    // eslint-disable-next-line
    selector: 'card-footer',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_BUTTON,
        EuiTooltipDirective,
        ...EUI_ICON,
        ...EUI_LIST,
        ...EUI_DROPDOWN,
        ...EUI_ICON_TOGGLE,
    ],
})
export class CardFooterComponent {
}
