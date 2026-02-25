import { Component, ElementRef, ViewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'open-to-other-target',
    templateUrl: 'component.html',
    imports: [...EUI_POPOVER, ...EUI_ICON, ...EUI_BUTTON],
})
export class OpenToOtherTargetComponent {

    @ViewChild('popover') popover: EuiPopoverComponent;
    @ViewChild('otherTarget') otherTarget: ElementRef;

    public openPopover(e: any) {
        this.popover.openPopover(this.otherTarget.nativeElement);
    }
}
