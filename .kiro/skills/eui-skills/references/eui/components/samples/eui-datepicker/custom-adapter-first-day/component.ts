import { Component, Injectable, inject } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import { EUI_ALERT } from '@eui/components/eui-alert';
import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";

@Injectable()
export class FirstDayOfWeekMomentDateAdapter extends MomentDateAdapter {
    getFirstDayOfWeek(): number {
        return 1; // Represents Monday (returns numbers from 0-6)
    }
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'first-week-day',
    templateUrl: './component.html',
    imports: [...EUI_DATEPICKER, ...EUI_ALERT],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMATS },
        { provide: DateAdapter, useClass: FirstDayOfWeekMomentDateAdapter },
    ],
})
export class FirstDayofTheWeekComponent {
}
