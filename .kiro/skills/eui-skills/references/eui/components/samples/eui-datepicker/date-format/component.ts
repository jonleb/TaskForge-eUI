import { Component, Directive } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { DEFAULT_FORMATS, EUI_DATEPICKER } from "@eui/components/eui-datepicker";
import { EUI_ALERT } from '@eui/components/eui-alert';

export const DATE_FORMAT_1 = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

export const DATE_FORMAT_2 = {
    parse: {
        dateInput: 'YYYY.MM.DD',
    },
    display: {
        dateInput: 'YYYY.MM.DD',
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
    selector: 'dateFormat',
    templateUrl: './component.html',
    imports: [
        ...EUI_DATEPICKER,
        ...EUI_ALERT,
        CustomDateFormat2Directive,
        CustomDateFormat1Directive,
    ],
    providers: [
       provideMomentDateAdapter(DEFAULT_FORMATS),
    ],    
})
export class DateFormatComponent {
    public value = new Date('2019-09-10T12:07:32.064Z');
}
