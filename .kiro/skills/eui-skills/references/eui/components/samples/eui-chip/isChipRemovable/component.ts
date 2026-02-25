import { Component } from "@angular/core";

import { EUI_CHIP } from "@eui/components/eui-chip";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'isChipRemovable',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CHIP,
        ...EUI_ICON,
        ...EUI_BUTTON,
    ],
})
export class IsChipRemovableComponent {

    public isRemovable: (false | true) = true;

    public toggleRemovable(): void {
        this.isRemovable = !this.isRemovable;
    }
}
