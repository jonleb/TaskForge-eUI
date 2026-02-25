import { Component } from '@angular/core';
import { EUI_ECL_NOTIFICATION } from '@eui/ecl/components/ecl-notification';

@Component({
    // tslint:disable-next-line
    selector: 'closeable',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_NOTIFICATION],
})
export class CloseableComponent {}
