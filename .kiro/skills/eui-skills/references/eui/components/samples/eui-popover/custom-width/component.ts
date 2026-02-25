import { Component, ViewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'custom-width',
    templateUrl: 'component.html',
    imports: [...EUI_POPOVER, ...EUI_ICON, ...EUI_BUTTON],
})
export class CustomWidthComponent {

    @ViewChild('popover1') popover1: EuiPopoverComponent;
    @ViewChild('popover2') popover2: EuiPopoverComponent;
    @ViewChild('popover3') popover3: EuiPopoverComponent;
    @ViewChild('popover4') popover4: EuiPopoverComponent;
    @ViewChild('popover5') popover5: EuiPopoverComponent;
    @ViewChild('popover6') popover6: EuiPopoverComponent;
    @ViewChild('popover7') popover7: EuiPopoverComponent;

    public openPopover1(e: any) {
        this.popover1.openPopover(e.target);
    }

    public openPopover2(e: any) {
        this.popover2.openPopover(e.target);
    }

    public openPopover3(e: any) {
        this.popover3.openPopover(e.target);
    }

    public openPopover4(e: any) {
        this.popover4.openPopover(e.target);
    }

    public openPopover5(e: any) {
        this.popover5.openPopover(e.target);
    }

    public openPopover6(e: any) {
        this.popover6.openPopover(e.target);
    }

    public openPopover7(e: any) {
        this.popover7.openPopover(e.target);
    }
}
