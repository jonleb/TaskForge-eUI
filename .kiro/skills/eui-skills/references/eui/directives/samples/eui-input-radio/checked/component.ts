import { Component } from '@angular/core';

import { EUI_INPUT_RADIO } from '@eui/components/eui-input-radio';

@Component({
    // tslint:disable-next-line
    selector: 'checked',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_RADIO],
})
export class CheckedComponent {

}
