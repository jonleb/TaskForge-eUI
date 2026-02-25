import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_TEXT_AREA } from '@eui/ecl/components/ecl-text-area';

@Component({
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [ReactiveFormsModule, ...EUI_ECL_ICON, ...EUI_ECL_FEEDBACK_MESSAGE, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK,
            ...EUI_ECL_TEXT_AREA],
})
export class ReactiveFormsComponent implements OnInit {
    fg: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {

        this.fg = this.fb.group({
            default: [{ value: 'Your content here', disabled: false }],
            disabled: [{ value: 'Your content here', disabled: true }],
            required: [{ value: '', disabled: false }, Validators.required],
        });
    }

    validateRequired() {
        return this.fg?.get('required')?.hasError('required') && this.fg?.get('required')?.touched;
    }
}
