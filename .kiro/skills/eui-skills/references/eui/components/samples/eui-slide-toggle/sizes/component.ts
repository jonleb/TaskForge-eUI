import { Component } from '@angular/core';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";

@Component({
    // eslint-disable-next-line
    selector: 'sizes',
    templateUrl: 'component.html',
    imports: [...EUI_SLIDE_TOGGLE],
})
export class SizesComponent {
}
