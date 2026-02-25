import { Component } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";

@Component({
    // eslint-disable-next-line
    selector: 'labels',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_BAR, ...EUI_FEEDBACK_MESSAGE],
})
export class LabelsComponent {

    public progress = 50;
    public status = 'success';

}
