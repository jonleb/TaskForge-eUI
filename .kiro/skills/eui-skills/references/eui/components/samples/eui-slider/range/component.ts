import { Component } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    // eslint-disable-next-line
    selector: 'range',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
})
export class RangeComponent {
    
}
