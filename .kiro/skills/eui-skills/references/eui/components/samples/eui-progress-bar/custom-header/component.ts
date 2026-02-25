import { Component } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";
import { EUI_ICON } from "@eui/components/eui-icon";

@Component({
    // eslint-disable-next-line
    selector: 'custom-header',
    templateUrl: 'component.html',
    imports: [
        ...EUI_PROGRESS_BAR,
        ...EUI_ICON,
    ],
})
export class CustomHeaderComponent {

}
