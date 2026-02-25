import { Component } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { EUI_CARD } from "@eui/components/eui-card";

@Component({
    // eslint-disable-next-line
    selector: 'with-card',
    templateUrl: 'component.html',
    imports: [
        ...EUI_PROGRESS_BAR,
        ...EUI_FEEDBACK_MESSAGE,
        ...EUI_CARD,
    ],
})
export class WithCardComponent {

}
