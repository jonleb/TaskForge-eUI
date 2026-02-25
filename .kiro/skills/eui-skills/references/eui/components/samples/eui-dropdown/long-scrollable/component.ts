import { Component, OnInit } from "@angular/core";

import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";

@Component({
    // eslint-disable-next-line
    selector: "long-scrollable",
    templateUrl: "component.html",
    imports: [
        ...EUI_ICON,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_DROPDOWN,
    ],
})
export class LongScrollableComponent implements OnInit {
    public dropdownItems = [];

    ngOnInit(): void {
        for (let i = 1; i <= 50; i++) {
            this.dropdownItems.push({ label: `Menu item from array ${i}` });
        }
    }

    public onClick(label: string) {
        console.log(label);
    }
}
