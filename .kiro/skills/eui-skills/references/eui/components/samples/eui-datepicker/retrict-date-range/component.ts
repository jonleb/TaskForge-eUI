import { Component } from '@angular/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'retrictDateRange',
    templateUrl: './component.html',
    imports: [...EUI_DATEPICKER],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
})
export class RetrictDateRangeComponent {

    fiveDaysBefore = new Date().setDate(new Date().getDate() - 5);
    fiveDaysAfter = new Date().setDate(new Date().getDate() + 5);
    minDate = new Date(this.fiveDaysBefore);
    maxDate = new Date(this.fiveDaysAfter);

    myFilter = (d: any): boolean => {
        const day = d?.day();
        return day !== 0 && day !== 6;
    };
}
