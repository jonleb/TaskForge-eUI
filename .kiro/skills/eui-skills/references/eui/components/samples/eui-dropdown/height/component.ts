import { Component } from "@angular/core";

import { EUI_ALERT } from "@eui/components/eui-alert";
import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_ICON } from "@eui/components/eui-icon";

@Component({
    // eslint-disable-next-line
    selector: 'height',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ALERT,
        ...EUI_DROPDOWN,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_ICON,
    ],
})
export class HeightComponent {
    public dropdownItems = [];

    ngOnInit(): void {
        for (let i = 1; i <= 20; i++) {
            this.dropdownItems.push({ label: `Menu item from array ${i}` });
        }
    }
    public onClick(str: string): void {
        console.log(str);
    }
}
