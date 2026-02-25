import { Component } from '@angular/core';

import { EUI_LIST } from "@eui/components/eui-list";

@Component({
    // eslint-disable-next-line
    selector: 'navigation-list',
    templateUrl: 'component.html',
    imports: [...EUI_LIST],
})
export class NavigationListComponent {

    public onListItemClicked(label: string) {
        console.log('Selected item:', label);
    }

}
