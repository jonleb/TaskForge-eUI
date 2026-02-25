import { Component } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";

@Component({
    // eslint-disable-next-line
    selector: 'with-feedback-message',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_BAR, ...EUI_FEEDBACK_MESSAGE],
})
export class WithFeedbackMessageComponent {

    public progress = 50;
    public status = 'success';

    public total = 10;
    public taskCompleted = 8;
    public test = ((this.taskCompleted/this.total)*10).toFixed(0);

    public processStart = 6;
    public processEnd = 10;
    public processCompleted = (this.processEnd/this.processStart)*100;

}
