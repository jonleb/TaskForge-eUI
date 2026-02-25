import { Component } from '@angular/core';

import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_LIST } from "@eui/components/eui-list";
import { EUI_ICON } from '@eui/components/eui-icon';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'default',
    templateUrl: 'component.html',
    imports: [...EUI_LIST, ...EUI_LABEL, ...EUI_ICON],
})
export class DefaultComponent {

    public onListItemClicked(label: string) {
        console.log('Selected item:', label);
    }
}
