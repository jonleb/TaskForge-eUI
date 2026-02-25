import { Component } from '@angular/core';

import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EuiTooltipDirective } from '@eui/components/directives';
import { EUI_BUTTON } from '@eui/components/eui-button';

@Component({
    // eslint-disable-next-line
    selector: 'full-title',
    templateUrl: 'component.html',
    imports: [
        ...EUI_CARD,
        ...EUI_ICON,
        ...EUI_DROPDOWN,
        EuiTooltipDirective,
        ...EUI_BUTTON,
    ],
})
export class FullTitleComponent {

    public dropdownClick(event: Event): void {
        event.stopPropagation();
    }

    public onAddButtonClick(event: Event): void {
        this._stopPropagation(event);
    }

    private _stopPropagation(event: Event): void {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            event.cancelBubble = true;
        }
    }
}
