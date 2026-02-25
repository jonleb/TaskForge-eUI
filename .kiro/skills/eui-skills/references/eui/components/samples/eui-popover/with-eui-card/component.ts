import { Component, ViewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_CARD } from "@eui/components/eui-card";

@Component({
    selector: 'with-eui-card',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_POPOVER,
        ...EUI_CARD,
    ],
})
export class WithEuiCardComponent {

    @ViewChild('popover') popover: EuiPopoverComponent;

    public openPopover(e: any) {
        this.popover.openPopover(e.target);
    }

}
