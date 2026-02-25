import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule as NgReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import moment from 'moment';
import { DatePipe, JsonPipe } from '@angular/common';

import { markFormGroupTouched } from '@eui/core';
import { dateInputValidator, DEFAULT_FORMATS, EUI_DATEPICKER, EuiDatepickerComponent } from "@eui/components/eui-datepicker";
import { EUI_LABEL } from "@eui/components/eui-label";
import { EUI_BUTTON } from "@eui/components/eui-button";
import { EUI_INPUT_GROUP } from "@eui/components/eui-input-group";
import { EUI_FEEDBACK_MESSAGE } from "@eui/components/eui-feedback-message";
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'reactiveForms',
    templateUrl: './component.html',
    imports: [
        NgReactiveFormsModule,
        ...EUI_DATEPICKER,
        ...EUI_LABEL,
        ...EUI_BUTTON,
        ...EUI_INPUT_GROUP,
        ...EUI_FEEDBACK_MESSAGE,
        JsonPipe,
        DatePipe,
    ],
    providers: [
        provideMomentDateAdapter(DEFAULT_FORMATS),
    ],
})
export class RactiveFormsComponent implements OnInit {

    public form: FormGroup;
    public form2: FormGroup;
    public form3: FormGroup;
    public form4: FormGroup;
    public form5: FormGroup;
    public form6: FormGroup;
    public form7: FormGroup;
    public isReadonly = false;

    ngOnInit() {
        this.form = new FormGroup({
            datepicker: new FormControl({ value: new Date('06/08/1987'), disabled: false }, [Validators.required]),
        });

        this.form2 = new FormGroup({
            datepicker: new FormControl({ value: new Date('06/08/1987'), disabled: false }, [Validators.required]),
        });

        this.form3 = new FormGroup({
            datepickerOutputFormat: new FormControl(null, [Validators.required]),
        });

        this.form4 = new FormGroup({
            datepickerMomentValue: new FormControl( moment('2021-01-01'), [Validators.required]),
        });

        this.form5 = new FormGroup({
            datepickerStringValue: new FormControl( new Date('06/08/1987').toISOString(), [Validators.required]),
        });

        this.form6 = new FormGroup({
            customValidatorValue: new FormControl( null, dateInputValidator),
        });

        this.form7 = new FormGroup({
            withValidEmptyInputField: new FormControl(null)
        });
    }

    public onResetForm() {
        this.form.reset();
    }

    public onDisableField() {
        const formControl = this.form.get('datepicker');
        if(formControl.disabled) {
            formControl.enable();
        } else {
            formControl.disable();
        }
    }

    public onSubmit2() {
        markFormGroupTouched(this.form2.controls);
    }

    public onResetForm2() {
        this.form2.reset();
    }

    public onDisableField2() {
        const formControl = this.form2.get('datepicker');
        if(formControl.disabled) {
            formControl.enable();
        } else {
            formControl.disable();
        }
    }

    public onChangeValue() {
        this.form2.get('datepicker').setValue(new Date (new Date().setDate(new Date().getDate() + 5)));
    }

    getErrorMessage(dpref: EuiDatepickerComponent): string {
        if (!dpref.inputRef || dpref.inputRef.nativeElement.value === '') {
          return;
        }
        if (dpref.inputFormControl.value === null) {
          return 'Invalid date: Please provide a date with a valid format!';
        }

      }
}
