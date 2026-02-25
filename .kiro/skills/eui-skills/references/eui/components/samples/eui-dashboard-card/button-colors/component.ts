import { Component, ViewEncapsulation } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'button-colors',
    templateUrl: 'component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [...EUI_DASHBOARD_CARD, ...EUI_BUTTON],
})
export class ButtonColorsComponent {
}
