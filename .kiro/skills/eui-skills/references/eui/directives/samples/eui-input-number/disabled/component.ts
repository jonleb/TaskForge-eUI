import { Component } from '@angular/core';

import { EUI_INPUT_NUMBER } from '@eui/components/eui-input-number';

@Component({
    // tslint:disable-next-line
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [...EUI_INPUT_NUMBER],
})
export class DisabledComponent {
}
