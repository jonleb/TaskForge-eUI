import { Component, OnInit } from "@angular/core";

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_AVATAR } from "@eui/components/eui-avatar";

@Component({
    // eslint-disable-next-line
    selector: "Default",
    templateUrl: "component.html",
    imports: [
        ...EUI_DROPDOWN,
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_AVATAR,
    ],
})
export class DefaultComponent implements OnInit {
    public dropdownItems = [];

    ngOnInit(): void {
        for (let i = 1; i <= 10; i++) {
            this.dropdownItems.push({ label: `Menu item from array ${i}` });
        }
    }

    public onClick(label: string) {
        console.log(label + " selected");
    }
}
