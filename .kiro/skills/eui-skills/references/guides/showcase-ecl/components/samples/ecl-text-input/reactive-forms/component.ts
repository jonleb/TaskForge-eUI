import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_TEXT_INPUT } from '@eui/ecl/components/ecl-text-input';

@Component({
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [FormsModule, ReactiveFormsModule, ...EUI_ECL_BUTTON, ...EUI_ECL_FEEDBACK_MESSAGE, ...EUI_ECL_ICON, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_TEXT_INPUT],
})
export class ReactiveFormsComponent implements OnInit {
    fg: FormGroup;
    model = 'Something';

    constructor(private fb: FormBuilder) { }

    ngOnInit() {

        this.fg = this.fb.group({
            default: [{ value: '', disabled: false }],
            disabled: [{ value: 'Some text', disabled: true }],
            required: [{ value: '', disabled: false }, Validators.required],
        });
    }

    onChangeValue() {
        this.model = `Something and ${Math.floor(Math.random() * 100)}`;
    }

    validateRequired() {
        return this.fg?.get('required')?.hasError('required') && this.fg?.get('required')?.touched;
    }
}
