import { Component } from "@angular/core";

import { EUI_DASHBOARD_CARD } from "@eui/components/eui-dashboard-card";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_AVATAR } from "@eui/components/eui-avatar";
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EUI_ICON_BUTTON } from "@eui/components/eui-icon-button";
import { EUI_STATUS_BADGE } from "@eui/components/eui-status-badge";

@Component({
    // eslint-disable-next-line
    selector: 'header-body-footer',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DASHBOARD_CARD,
        ...EUI_BUTTON,
        ...EUI_AVATAR,
        ...EUI_ICON,
        ...EUI_ICON_BUTTON,
        ...EUI_STATUS_BADGE,
        ...EUI_CHIP,
    ],
})
export class HeaderBodyFooterComponent {
}
