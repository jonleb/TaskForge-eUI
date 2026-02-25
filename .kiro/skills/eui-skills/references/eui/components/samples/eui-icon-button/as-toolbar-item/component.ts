import { Component } from '@angular/core';

import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";
import { EUI_LAYOUT } from '@eui/components/layout';

@Component({
    // eslint-disable-next-line
    selector: 'as-toolbar-item',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
        ...EUI_LAYOUT,
    ],
})
export class AsToolbarItemComponent {

}
