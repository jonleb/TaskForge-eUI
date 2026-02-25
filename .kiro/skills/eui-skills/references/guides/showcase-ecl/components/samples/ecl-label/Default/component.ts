import { Component } from '@angular/core';
import { EUI_ECL_LABEL } from '@eui/ecl/components/ecl-label';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_LABEL],
})
export class DefaultComponent {}
