import { Component } from "@angular/core";

import { EUI_PROGRESS_BAR } from "@eui/components/eui-progress-bar";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_PROGRESS_BAR, ...EUI_BUTTON],
})
export class DefaultComponent {
    public progress1 = 50;
    public progress2 = 50;
    public variant = 'primary';
    public statusIcon = false;
    public indeterminate = false;
}
