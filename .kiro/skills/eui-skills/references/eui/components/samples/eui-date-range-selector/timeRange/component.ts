import { Component, Directive, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ReactiveFormsModule as NgReactiveFormsModule, FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_DATE_RANGE_SELECTOR, EuiDateRangeSelectorDates } from '@eui/components/eui-date-range-selector';

export const TIME_FORMAT = {
    parse: {
        dateInput: 'DD/MM/YYYY HH:mm',
    },
    display: {
        dateInput: 'DD/MM/YYYY HH:mm',
        monthYearLabel: 'DD/MM/YYYY HH:mm',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'DD/MM/YYYY HH:mm',
    },
};

export const TIME_FORMAT_SECS = {
    parse: {
        dateInput: 'DD/MM/YYYY HH:mm:ss',
    },
    display: {
        dateInput: 'DD/MM/YYYY HH:mm:ss',
        monthYearLabel: 'DD/MM/YYYY HH:mm:ss',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'DD/MM/YYYY HH:mm:ss',
    },
};
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[secondsFormat]',
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: TIME_FORMAT_SECS },
    ],
})
export class SecondsFormatDirective {
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'isTimeRange',
    templateUrl: './component.html',
    imports: [
        NgReactiveFormsModule,
        ...EUI_DATE_RANGE_SELECTOR,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_BUTTON,
        SecondsFormatDirective,
        JsonPipe,
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: TIME_FORMAT },
    ],
})
export class TimeRangeComponent implements OnInit {
    public form: FormGroup;
    public form2: FormGroup;
    public form5: FormGroup;
    public isClearable = false;
    fixedDate= new Date('06/08/1987');
    fiveDaysBefore = new Date('06/08/1987').setDate(new Date('06/08/1987').getDate() - 5);
    fiveDaysAfter = new Date('06/08/1987').setDate(new Date('06/08/1987').getDate() + 5);
    public isReadonly = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            timerange: new FormControl<EuiDateRangeSelectorDates>({
                value: {
                    startRange: new Date('06/08/2023'),
                    endRange: new Date('06/15/2023') },
                disabled: false },
                [Validators.required]),
        });

        this.form2 = this.fb.group({
            withSeconds: new FormControl<EuiDateRangeSelectorDates>({
                value: {
                    startRange: new Date('06/08/2023'),
                    endRange: new Date('06/15/2023') },
                disabled: false },
                [Validators.required]),
        });
        this.form5 = this.fb.group({
            withSteps: new FormControl<EuiDateRangeSelectorDates>({
                value: {
                    startRange: new Date('06/08/2023'),
                    endRange: new Date('06/15/2023') },
                disabled: false },
                [Validators.required]),
        });
    }

    public onResetForm(event: any) {
        this.form.reset();
    }

    public onDisableField(event: any) {
        const formControl = this.form.get('timerange');
        if(formControl.disabled) {
            formControl.enable();
        } else {
            formControl.disable();
        }
    }

    public onClearToggle() {
        this.isClearable = !this.isClearable;
    }

    public onChangeValue() {
        const value: EuiDateRangeSelectorDates = {
            startRange: new Date(this.fiveDaysBefore),
            endRange: new Date(this.fiveDaysAfter) };
        this.form.get('timerange').setValue(value);
    }
}
