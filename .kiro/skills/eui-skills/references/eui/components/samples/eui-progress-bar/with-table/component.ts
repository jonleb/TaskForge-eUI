import { Component } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";

@Component({
    // eslint-disable-next-line
    selector: 'with-table',
    templateUrl: 'component.html',
    imports: [
        ...EUI_PROGRESS_BAR,
    ],
})
export class WithTableComponent {

}
