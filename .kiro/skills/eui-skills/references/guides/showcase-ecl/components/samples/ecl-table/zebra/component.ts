import { Component } from '@angular/core';
import { EUI_ECL_TABLE } from '@eui/ecl/components/ecl-table';

@Component({
    selector: 'zebra',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_TABLE],
})
export class ZebraComponent {}