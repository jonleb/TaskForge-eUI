import { Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";

@Component({
    // eslint-disable-next-line
    selector: 'iconLabel',
    templateUrl: 'component.html',
    imports: [...EUI_DASHBOARD_CARD],
})
export class IconLabelComponent {
}
