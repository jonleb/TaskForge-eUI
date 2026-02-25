import { Component, ViewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_TABS } from "@eui/components/eui-tabs";
import { EUI_BADGE } from "@eui/components/eui-badge";
import { EUI_LABEL } from "@eui/components/eui-label";

@Component({
    selector: 'with-eui-tabs',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_POPOVER,
        ...EUI_TABS,
        ...EUI_BADGE,
        ...EUI_LABEL,
    ],
})
export class WithEuiTabsComponent {

    @ViewChild('popover') popover: EuiPopoverComponent;

    public openPopover(e: any) {
        this.popover.openPopover(e.target);
    }

}
