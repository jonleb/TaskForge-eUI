import { Component } from '@angular/core';

import { EUI_ICON } from "@eui/components/eui-icon";
import { EUI_BUTTON } from "@eui/components/eui-button";

@Component({
    // eslint-disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ICON, ...EUI_BUTTON],
    styleUrls: ['../../module.component.scss'],
})
export class DefaultComponent {
    dynamicIcon = 'eui-state-info';

    onIconChange(): void {
        if (this.dynamicIcon === 'eui-state-info') {
            this.dynamicIcon = 'eui-state-warning';
        } else {
            this.dynamicIcon = 'eui-state-info';
        }
    }
}
