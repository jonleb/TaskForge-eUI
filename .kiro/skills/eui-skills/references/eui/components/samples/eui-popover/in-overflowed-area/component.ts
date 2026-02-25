import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    selector: 'in-overflowed-area',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_POPOVER,
    ],
})
export class InOverflowedAreaComponent {

    @ViewChild('popover') popover: EuiPopoverComponent;

    constructor(private cd: ChangeDetectorRef) {}

    public openPopover(e: any) {
        this.popover.openPopover(e.target);
    }

    public onScroll(): void {
        this.cd.detectChanges();
    }

}
