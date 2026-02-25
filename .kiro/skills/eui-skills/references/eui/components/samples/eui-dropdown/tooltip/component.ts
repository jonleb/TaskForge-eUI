import { Component } from "@angular/core";

import { EUI_DROPDOWN } from "@eui/components/eui-dropdown";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EuiTooltipDirective } from '@eui/components/directives';

@Component({
    // eslint-disable-next-line
    selector: 'tooltip',
    templateUrl: 'component.html',
    imports: [...EUI_DROPDOWN, ...EUI_BUTTON, EuiTooltipDirective],
})
export class TooltipComponent {
}
