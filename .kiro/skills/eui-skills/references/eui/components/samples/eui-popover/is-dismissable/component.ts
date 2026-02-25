import { Component, ViewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_ALERT } from "@eui/components/eui-alert";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'is-dismissable',
    templateUrl: 'component.html',
    imports: [...EUI_POPOVER, ...EUI_ICON, ...EUI_ALERT, ...EUI_BUTTON],
})
export class IsDismissableComponent {

    @ViewChild('popover') popover1: EuiPopoverComponent;

    public openPopover(e: any) {
        this.popover1.openPopover(e.target);
    }

}
