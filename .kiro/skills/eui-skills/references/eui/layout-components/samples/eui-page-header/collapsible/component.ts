import { Component } from '@angular/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_PAGE } from '@eui/components/eui-page';

@Component({
    // eslint-disable-next-line
    selector: 'collapsible',
    templateUrl: 'component.html',
    imports: [
        ...EUI_PAGE,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_DROPDOWN,
        ...EUI_CHIP,
    ],
})
export class CollapsibleComponent {
}

