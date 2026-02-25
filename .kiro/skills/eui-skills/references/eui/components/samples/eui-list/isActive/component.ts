import { Component } from '@angular/core';

import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_LABEL } from '@eui/components/eui-label';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'is-active',
    templateUrl: 'component.html',
    imports: [...EUI_LIST, ...EUI_LABEL],
})
export class IsActiveListItemComponent {

    public listItems: any [] = [
        { id: 'list_item_1', label: 'List Item 1', iconClass: 'eui-icon-home', active: false },
        { id: 'list_item_2', label: 'List Item 2', iconClass: 'eui-icon-ecl-book', active: false },
        { id: 'list_item_3', label: 'List Item 3', iconClass: 'eui-icon-ecl-livestreaming', active: true },
        { id: 'list_item_4', label: 'List Item 4 with very long label', iconClass: 'eui-icon-ecl-growth', active: false },
    ];

}
