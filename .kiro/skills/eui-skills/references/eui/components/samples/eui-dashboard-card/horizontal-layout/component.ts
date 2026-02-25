import { Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'horizontal-layout',
    templateUrl: 'component.html',
    imports: [...EUI_DASHBOARD_CARD, ...EUI_BUTTON],
})
export class HorizontalLayoutComponent {
}
