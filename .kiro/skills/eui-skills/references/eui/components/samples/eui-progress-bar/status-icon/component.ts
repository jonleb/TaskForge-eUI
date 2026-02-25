import { Component } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";

@Component({
    // eslint-disable-next-line
    selector: 'status-icon',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_BAR, ...EUI_FEEDBACK_MESSAGE],
})
export class StatusIconComponent {

    public taskTotal = 10;
    public taskCompleted = 6;
    public taskProgress = (this.taskCompleted / this.taskTotal) * 100;

    public uploadStart = 0;
    public uploadEnd = 100;

}
