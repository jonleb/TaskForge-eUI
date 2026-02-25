import { Component } from '@angular/core';

import { EUI_TEXTAREA } from '@eui/components/eui-textarea';

@Component({
    // tslint:disable-next-line
    selector: 'invalid',
    templateUrl: 'component.html',
    imports: [...EUI_TEXTAREA],
})
export class InvalidComponent {
}
