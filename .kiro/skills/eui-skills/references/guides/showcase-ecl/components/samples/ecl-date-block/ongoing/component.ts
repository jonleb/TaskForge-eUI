import { Component } from '@angular/core';
import { EUI_ECL_DATE_BLOCK } from '@eui/ecl/components/ecl-date-block';

@Component({
    // tslint:disable-next-line
    selector: 'ongoing',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_DATE_BLOCK],
})
export class OngoingComponent {
    date: Date = new Date();
}
