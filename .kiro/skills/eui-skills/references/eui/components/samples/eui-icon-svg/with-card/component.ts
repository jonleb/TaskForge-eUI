import { Component } from '@angular/core';

import { EUI_ICON } from '@eui/components/eui-icon';
import { EUI_BUTTON } from '@eui/components/eui-button';
import { EUI_LABEL } from '@eui/components/eui-label';
import { EUI_CARD } from '@eui/components/eui-card';
import { EUI_DROPDOWN } from '@eui/components/eui-dropdown';
import { EUI_LIST } from '@eui/components/eui-list';
import { EUI_CHIP } from '@eui/components/eui-chip';
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'with-card',
    templateUrl: 'component.html',
    imports: [
        ...EUI_ICON,
        ...EUI_BUTTON,
        ...EUI_LABEL,
        ...EUI_CARD,
        ...EUI_DROPDOWN,
        ...EUI_LIST,
        ...EUI_CHIP,
        EuiTooltipDirective,
    ],
    styleUrls: ['../../module.component.scss'],
})
export class WithCardComponent {

    public onAddButtonClick(event: Event) {
        // Do add actions here
        this._stopPropagation(event);
    }

    private _stopPropagation(event: Event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
            event.cancelBubble = true;
        }
    }
}
