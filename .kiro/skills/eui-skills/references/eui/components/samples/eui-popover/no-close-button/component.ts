import { Component, ViewChild } from "@angular/core";

import { EUI_POPOVER, EuiPopoverComponent } from "@eui/components/eui-popover";
import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'NoCloseButton',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDE_TOGGLE,
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_POPOVER,
    ],
})
export class NoCloseButtonComponent {
    public hasCloseButton = true;
    @ViewChild('popover') popover: EuiPopoverComponent;

    public openPopover(e: any) {
        this.popover.openPopover(e.target);
    }

    public onChangeCloseButton(e: boolean) {
        this.hasCloseButton = e;
    }
}
