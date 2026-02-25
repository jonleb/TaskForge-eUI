import { Component } from '@angular/core';
import { EUI_ECL_LIST } from '@eui/ecl/components/ecl-list';
import { EUI_ECL_DIVIDER } from '@eui/ecl/components/ecl-divider';

@Component({
    // tslint:disable-next-line
    selector: 'Default',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_DIVIDER, ...EUI_ECL_LIST],
})
export class DefaultComponent {}
