import { Component } from '@angular/core';

import { EUI_SELECT } from '@eui/components/eui-select';

@Component({
    // tslint:disable-next-line
    selector: 'disabled',
    templateUrl: 'component.html',
    imports: [...EUI_SELECT],
})
export class DisabledComponent {
}
