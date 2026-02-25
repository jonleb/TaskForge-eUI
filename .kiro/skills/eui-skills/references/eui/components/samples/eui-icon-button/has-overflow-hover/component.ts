import { Component } from '@angular/core';

import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";

@Component({
    // eslint-disable-next-line
    selector: 'has-overflow-hover',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON_BUTTON,
    ],
})
export class HasOverflowHoverComponent {

}
