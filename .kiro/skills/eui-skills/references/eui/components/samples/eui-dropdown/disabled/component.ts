import { Component } from "@angular/core";

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_ALERT } from "@eui/components/eui-alert";

@Component({
    // eslint-disable-next-line
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_ALERT,
    ],
})
export class DisabledComponent {

    public onClick(label: string, event: Event) {
        event.stopImmediatePropagation();
        console.log(label + ' selected,', 'event', event);
    }

}
