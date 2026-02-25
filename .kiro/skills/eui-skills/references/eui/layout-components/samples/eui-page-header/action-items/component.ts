import { Component } from '@angular/core';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_PAGE } from '@eui/components/eui-page';

@Component({
    // eslint-disable-next-line
    selector: 'action-items',
    templateUrl: 'component.html',
    imports: [
        ...EUI_PAGE,
        ...EUI_BUTTON,
        ...EUI_ICON,
        ...EUI_DROPDOWN,
    ],
})
export class ActionItemsComponent {
}

