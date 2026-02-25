import { Component } from '@angular/core';

import { EUI_SLIDER } from '@eui/components/eui-slider';

@Component({
    // eslint-disable-next-line
    selector: 'ticks',
    templateUrl: 'component.html',
    imports: [
        ...EUI_SLIDER,
    ],
})
export class TicksComponent {
    
}
