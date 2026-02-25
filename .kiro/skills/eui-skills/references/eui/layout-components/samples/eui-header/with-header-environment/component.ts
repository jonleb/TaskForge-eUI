import { Component } from '@angular/core';

import { EUI_LAYOUT } from "@eui/components/layout";
import { EUI_ALERT } from "@eui/components/eui-alert";

@Component({
    // eslint-disable-next-line
    selector: 'with-header-environment',
    templateUrl: 'component.html',
    imports: [
        ...EUI_LAYOUT,
        ...EUI_ALERT,
    ],
    styleUrl: './component.scss'
})
export class WithHeaderEnvironmentComponent {
    
}
