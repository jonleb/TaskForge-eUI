import { Component } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    // eslint-disable-next-line
    selector: 'horizontal-layout',
    templateUrl: 'component.html',
    imports: [
        ...EUI_PROGRESS_BAR,
        ...EUI_LABEL,
    ],
})
export class HorizontalLayoutComponent {

}
