import { Component, ViewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ALERT } from "@eui/components/eui-alert";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'event-handlers',
    templateUrl: 'component.html',
    imports: [...EUI_POPOVER, ...EUI_ICON, ...EUI_BUTTON, ...EUI_ALERT],
})
export class EventHandlersComponent {

    @ViewChild('popover') popover: EuiPopoverComponent;

    public openPopover(e: any) {
        this.popover.openPopover(e.target);
    }

    public onOpen() {
        console.log('open');
    }

    public onClose() {
        console.log('close');
    }

    public onOutsideClick() {
        console.log('outsideClick');
    }
}
