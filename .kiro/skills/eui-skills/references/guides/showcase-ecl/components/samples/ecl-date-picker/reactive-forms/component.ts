import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EclDatePickerDatePickedEvent, EUI_ECL_DATE_PICKER } from '@eui/ecl/components/ecl-date-picker';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_TEXT_INPUT } from '@eui/ecl/components/ecl-text-input';

@Component({
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [...EUI_ECL_BUTTON, ...EUI_ECL_ICON, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_DATE_PICKER, FormsModule,
        ReactiveFormsModule, ...EUI_ECL_TEXT_INPUT],
})
export class ReactiveFormsComponent implements OnInit {
    fg: FormGroup;
    model = new Date();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.fg = this.fb.group({
            default: [{ value: null, disabled: false }],
            disabled: [{ value: new Date(), disabled: true }],
            required: [{ value: null, disabled: false }, Validators.required],
        });
    }

    onChangeValue() {
        const updatedModel: Date = new Date(this.model);
        updatedModel.setDate(updatedModel.getDate() + 1);
        this.model = updatedModel;
    }

    validateRequired() {
        return this.fg?.get('required')?.hasError('required') && this.fg?.get('required')?.touched;
    }

    onDatePicked(evt: EclDatePickerDatePickedEvent) {
        console.log('picked date', evt);
    }
}
