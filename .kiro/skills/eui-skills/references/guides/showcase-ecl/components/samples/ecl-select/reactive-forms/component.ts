import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EUI_ECL_BUTTON } from '@eui/ecl/components/ecl-button';
import { EUI_ECL_FEEDBACK_MESSAGE } from '@eui/ecl/components/ecl-feedback-message';
import { EUI_ECL_FORM_GROUP } from '@eui/ecl/components/ecl-form-group';
import { EUI_ECL_FORM_LABEL } from '@eui/ecl/components/ecl-form-label';
import { EUI_ECL_HELP_BLOCK } from '@eui/ecl/components/ecl-help-block';
import { EUI_ECL_ICON } from '@eui/ecl/components/ecl-icon';
import { EUI_ECL_SELECT } from '@eui/ecl/components/ecl-select';

@Component({
    selector: 'reactive-forms',
    templateUrl: 'component.html',
    imports: [FormsModule, ReactiveFormsModule, ...EUI_ECL_BUTTON, ...EUI_ECL_FORM_GROUP, ...EUI_ECL_FORM_LABEL, ...EUI_ECL_HELP_BLOCK, ...EUI_ECL_ICON, ...EUI_ECL_FEEDBACK_MESSAGE,
        ...EUI_ECL_SELECT],
})
export class ReactiveFormsComponent implements OnInit {
    fg: FormGroup;

    countries = [
        { id: 1, label: 'Belgium' },
        { id: 2, label: 'Luxembourg' },
        { id: 3, label: 'Poland' },
    ]

    model = 0;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.fg = this.fb.group({
            default: new FormControl({ value: '', disabled: false }),
            disabled: new FormControl({ value: 1, disabled: true }),
            required: new FormControl({ value: '', disabled: false}, [Validators.required]),
        });

        this.fg.valueChanges.subscribe(val => {
            console.log('Selected value', val);
        })
    }

    onChangeValue() {
        this.model = (this.model + 1) % 4;
    }

    validateRequired() {
        return this.fg.get('required').hasError('required') && this.fg.get('required')?.touched;
    }
}
