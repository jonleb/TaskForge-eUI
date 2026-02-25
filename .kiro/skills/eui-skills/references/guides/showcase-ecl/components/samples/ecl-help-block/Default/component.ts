import { Component } from '@angular/core';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_HELP_BLOCK],
})
export class DefaultComponent {}
