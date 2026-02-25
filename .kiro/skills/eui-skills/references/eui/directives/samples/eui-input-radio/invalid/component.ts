import { Component } from '@angular/core';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'invalid',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_RADIO],
})
export class InvalidComponent {
}
