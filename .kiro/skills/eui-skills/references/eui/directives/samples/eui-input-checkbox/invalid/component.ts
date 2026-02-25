import { Component } from '@angular/core';

import { EUI_INPUT_CHECKBOX } from '@eui/components/eui-input-checkbox';

@Component({
    // tslint:disable-next-line
    selector: 'invalid',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_CHECKBOX],
})
export class InvalidComponent {
}
