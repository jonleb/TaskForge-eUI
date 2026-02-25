import { Component, Directive } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { EUI_DATE_RANGE_SELECTOR } from '@eui/components/eui-date-range-selector';
import { EUI_ALERT } from '@eui/components/eui-alert';


export const DATE_FORMAT_1 = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

export const DATE_FORMAT_2 = {
    parse: {
        dateInput: 'YYYY/MM/DD',
    },
    display: {
        dateInput: 'YYYY/MM/DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Directive({
    selector: '[appDateFormat1]',
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT_1 },
    ],
})
export class CustomDateFormat1Directive {
}

@Directive({
    selector: '[appDateFormat2]',
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT_2 },
    ],
})
export class CustomDateFormat2Directive {
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'dateRangeFormat',
    templateUrl: './component.html',
    imports: [
        ...EUI_DATE_RANGE_SELECTOR,
        ...EUI_ALERT,
        CustomDateFormat2Directive,
        CustomDateFormat1Directive,
    ],
})
export class DateRangeFormatComponent {
    public startDate = new Date('06/08/2023');
    public endDate = new Date('06/15/2023');
}
