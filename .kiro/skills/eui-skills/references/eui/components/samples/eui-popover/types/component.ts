import { Component, ViewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ICON } from "@eui/components/eui-icon";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'type',
    templateUrl: 'component.html',
    imports: [...EUI_BUTTON, ...EUI_ICON, ...EUI_POPOVER],
})
export class TypeComponent {

    @ViewChild('popover1') popover1: EuiPopoverComponent;
    @ViewChild('popover2') popover2: EuiPopoverComponent;
    @ViewChild('popover3') popover3: EuiPopoverComponent;
    @ViewChild('popover3b') popover3b: EuiPopoverComponent;
    @ViewChild('popover4') popover4: EuiPopoverComponent;

    public openPopover1(e: any) {
        this.popover1.openPopover(e.target);
    }

    public openPopover2(e: any) {
        this.popover2.openPopover(e.target);
    }

    public openPopover3(e: any) {
        this.popover3.openPopover(e.target);
    }

    public openPopover3b(e: any) {
        this.popover3b.openPopover(e.target);
    }

    public openPopover4(e: any) {
        this.popover4.openPopover(e.target);
    }
}
