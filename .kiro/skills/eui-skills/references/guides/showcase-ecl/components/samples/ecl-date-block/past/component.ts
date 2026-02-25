import { Component } from '@angular/core';
import { EUI_ECL_DATE_BLOCK } from '@eui/ecl/components/ecl-date-block';

@Component({
    // tslint:disable-next-line
    selector: 'past',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_DATE_BLOCK],
})
export class PastComponent {
    date: Date = new Date();
}
