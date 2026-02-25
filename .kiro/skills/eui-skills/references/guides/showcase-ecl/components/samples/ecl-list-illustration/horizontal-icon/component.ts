import { Component } from '@angular/core';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_LIST_ILUSTRATION } from '@eui/ecl/components/ecl-list-illustration';

@Component({
    // tslint:disable-next-line
    selector: 'horizontal-icon',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_ICON, ...EUI_ECL_LIST_ILUSTRATION],
})
export class HorizontalIconComponent {}
