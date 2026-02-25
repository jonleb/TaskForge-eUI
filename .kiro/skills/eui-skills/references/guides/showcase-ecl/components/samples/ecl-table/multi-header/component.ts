import { Component } from '@angular/core';
import { EUI_ECL_TABLE } from '@eui/ecl/components/ecl-table';

@Component({
    // tslint:disable-next-line
    selector: 'multi-header',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_TABLE],
})
export class MultiHeaderComponent {}
