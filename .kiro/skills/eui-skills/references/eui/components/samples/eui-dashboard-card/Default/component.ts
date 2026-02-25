import { Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_DASHBOARD_CARD, ...EUI_BUTTON],
})
export class DefaultComponent {
    onCardClick(event: Event): void {
        alert(`Card clicked : ${event}`);
    }
}
