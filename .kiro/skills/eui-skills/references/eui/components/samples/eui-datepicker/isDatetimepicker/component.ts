import { Component, Directive, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ReactiveFormsModule as NgReactiveFormsModule, FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

import { EUI_DATEPICKER } from "@eui/components/eui-datepicker";
import { EUI_SLIDE_TOGGLE } from "@eui/components/eui-slide-toggle";
import { EUI_BUTTON } from "@eui/components/eui-button";

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
    selector: 'isDatetimepicker',
    templateUrl: './component.html',
    imports: [
        NgReactiveFormsModule,
        ...EUI_DATEPICKER,
        ...EUI_SLIDE_TOGGLE,
        ...EUI_BUTTON,
        SecondsFormatDirective,
        JsonPipe,
    ],
    providers: [
        provideMomentDateAdapter(TIME_FORMAT),
    ],
})
export class IsDatetimepickerComponent implements OnInit {
    public form: FormGroup;
    public form1: FormGroup;
    public form2: FormGroup;
    public form3: FormGroup;
    public form4: FormGroup;
    public form5: FormGroup;
    public isClearable = false;
    fixedDate= new Date('06/08/1987');
    fiveDaysBefore = new Date('06/08/1987').setDate(new Date('06/08/1987').getDate() - 5);
    fiveDaysAfter = new Date('06/08/1987').setDate(new Date('06/08/1987').getDate() + 5);
    minDate = new Date(this.fiveDaysBefore);
    maxDate = new Date(this.fiveDaysAfter);
    public isReadonly = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            timepicker: [
                { value: new Date('06/08/1987'), disabled: false },
                [Validators.required],
            ],
        });

        this.form1 = this.fb.group({
            dateTimepickerOutputFormat: [
                { value: null, disabled: false },
                [Validators.required],
            ],
        });

        this.form2 = this.fb.group({
            withSeconds: [
                { value: new Date('06/08/1987'), disabled: false },
                [Validators.required],
            ],
        });
        this.form3 =this.fb.group({
            withOneInputField: new FormControl(new Date('06/08/1987'), [Validators.required]),
        });
        this.form4 =this.fb.group({
            withDateRanges: new FormControl(this.fixedDate, [Validators.required]),
        });
        this.form5 = this.fb.group({
            withSteps: [
                { value: new Date('06/08/1987'), disabled: false },
                [Validators.required],
            ],
        });
    }

    public onResetForm(event: any) {
        this.form.reset();
    }

    public onDisableField(event: any) {
        const formControl = this.form.get('timepicker');
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
        this.form.get('timepicker').setValue(this.maxDate);
    }
}
