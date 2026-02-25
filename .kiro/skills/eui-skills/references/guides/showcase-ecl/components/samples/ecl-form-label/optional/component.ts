import { Component } from '@angular/core';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';

@Component({
    // tslint:disable-next-line
    selector: 'optional',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_FORM_LABEL],
})
export class OptionalComponent {}
