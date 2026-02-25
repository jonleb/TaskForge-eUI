import { Component } from '@angular/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    // eslint-disable-next-line
    selector: 'tooltip',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
        ...EUI_ALERT,
    ],
})
export class TooltipComponent {
    
}
