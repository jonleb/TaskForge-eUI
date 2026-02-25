import { Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';

@Component({
    // tslint:disable-next-line
    selector: 'fill-fraction',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
})
export class FillFractionComponent {
}
