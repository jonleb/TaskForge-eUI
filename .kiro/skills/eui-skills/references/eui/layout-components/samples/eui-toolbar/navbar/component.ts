import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // eslint-disable-next-line
    selector: 'navbar',
    templateUrl: 'component.html',
    imports: [...EUI_LAYOUT, ...EUI_ALERT, ...EUI_BUTTON],
})
export class NavbarComponent {

    navbarItems = [
        { id: 'item_1', label: 'Item 1' },
        { id: 'item_2', label: 'Item 2' },
        { id: 'item_3', label: 'Item 3' },
        { id: 'item_4', label: 'Item 4' },
    ];
    navbarItemActive = this.navbarItems[0];

    navbarItemsLong = [
        { id: 'item_1', label: 'Item 1' },
        { id: 'item_2', label: 'Item 2' },
        { id: 'item_3', label: 'Item 3' },
        { id: 'item_4', label: 'Item 4' },
        { id: 'item_5', label: 'Item 5' },
        { id: 'item_6', label: 'Item 6' },
        { id: 'item_7', label: 'Item 7' },
        { id: 'item_8', label: 'Item 8 this is a very very very very very very long text very very very very very long' },
    ];

    navbarItemLongActive = this.navbarItemsLong[0];

    onClick(id: string) {
        console.log(`item clicked: ${id}`);
    }
}
