import { Component } from '@angular/core';

import { EUI_LAYOUT } from "@eui/components/layout";
import { EUI_ALERT } from "@eui/components/eui-alert";
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'with-header-right-content',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LAYOUT,
        ...EUI_ALERT,
        ...EUI_BUTTON,
    ],
    styleUrl: './component.scss'
})
export class WithHeaderRightContentComponent {
}
